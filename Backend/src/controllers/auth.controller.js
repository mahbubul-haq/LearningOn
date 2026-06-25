import bcrypt from "bcrypt";
import People from "../models/People.js";
import { deleteImage, uploadImage } from "../utils/cloudinary.js";
import { generateAccessToken, generateRefreshToken } from "../services/token.service.js";
import redisClient from "../configs/redisClient.js";
import jwt from "jsonwebtoken";
import { deleteFile, uploadFile } from "../services/upload/uploadFile.js";
import Course from "../models/Course.js";
import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const normalizeEmail = (email) => {
    return String(email || "").trim().toLowerCase();
}

const sendAuthResponse = async (res, user) => {
    const userObject = user.toObject ? user.toObject() : { ...user };

    const myCoursesCount = await Course.countDocuments({
        $or: [
            { owner: userObject._id },
            { courseInstructors: userObject._id }
        ]
    });

    userObject.myCoursesCount = myCoursesCount;
    userObject.password = undefined;

    const accessToken = generateAccessToken(userObject);
    const refreshToken = generateRefreshToken(userObject);

    await redisClient.set(`refresh:${userObject._id}`, refreshToken, { EX: 7 * 24 * 60 * 60 });
    await redisClient.set(`accessToken:${userObject._id}`, accessToken, { EX: 20 * 60 });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
    });

    return res.status(200).json({
        success: true,
        token: accessToken,
        user: userObject,
    });
};

const register = async (req, res) => {
    try {
        const email = normalizeEmail(req.body.email);
        const password = req.body.password;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and password are required.",
            });
        }

        const existingUser = await People.findOne({ email })
            .select("email +password")
            .lean();

        if (existingUser) {
            const message = existingUser.password
                ? "Email already exists."
                : "This account was created with Google. Continue with Google, then set a password from your profile.";

            return res.status(409).json({
                success: false,
                message,
                errors: {
                    email: {
                        message,
                    },
                },
            });
        }

        req.body.email = email;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        if (req.body.picture) {
            try {
                const res = await uploadFile(req.body.picture, 'image');
                req.body.avatar = res

            } catch (err) {
                console.log(err);
            }
        }

        //remove picture from req.body
        if (req.body.picture) delete req.body.picture;
        //console.log(req.body);

        const newUser = new People({
            ...req.body,
            email,
            password: hashedPassword,
            emailVerified: false,
        });

        const savedUser = await newUser.save();

        //console.log(savedUser);
        res.status(201).json({
            success: true,
            user: savedUser,
        });
    } catch (error) {
        // if (req.body.picturePath) {
        //     fs.unlink("assets/images/" + req.body.picturePath, (err) => {
        //         if (err) {
        //             console.log(err);
        //         }
        //     });
        //     console.log("File removed");
        // }
        try {
            if (req.body.avatar) {
                await deleteFile(req.body.avatar.public_id);
            }
        } catch (err) {
            //console.log(err);
        }

        res.status(400).json({
            success: false,
            errors: { ...error.errors },
        });
    }
};

const login = async (req, res) => {
    try {
        //console.log("req.body", req.body);
        //console.log(req.body);
        const { password } = req.body;
        const email = normalizeEmail(req.body.email);
        //console.log(emailOrPhone, password);

        let user = await People.findOne({
            email: email,
        }).select("name email avatar +password").lean();



        if (!user) {
            return res.status(401).json({
                success: false,
                errors: {
                    email: {
                        message: "Invalid email",
                    },
                },
            });
        }

        if (!user.password) {
            return res.status(401).json({
                success: false,
                errors: {
                    password: {
                        message: "Password not set yet. Please add password after logging in with previous method",
                    },
                },
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                errors: {
                    password: {
                        message: "Invalid password",
                    },
                },
            });
        }

        return await sendAuthResponse(res, user);
    } catch (error) {
        res.status(500).json({
            success: false,
            errors: { ...error.errors },
            message: "Login failed",
        });
    }
}


const googleLogin = async (req, res) => {
    try {
        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json({
                success: false,
                message: "Google credential is required.",
            });
        }

        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        if (!payload?.email || !payload.email_verified) {
            return res.status(401).json({
                success: false,
                message: "Google email is not verified.",
            });
        }

        const email = normalizeEmail(payload.email);

        let user = await People.findOne({ email })
            .select("name email avatar emailVerified +password");

        if (!user) {
            user = await People.create({
                name: payload.name || email.split("@")[0],
                email,
                emailVerified: true,
                avatar: {
                    public_id: "",
                    secure_url: payload.picture || "",
                },
            });
        }

        return sendAuthResponse(res, user);
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Google login failed.",
        });
    }
};

const refreshToken = async (req, res) => {
    try {
        // get refresh token from HttpOnly cookie
        const refreshToken = req.cookies.refreshToken;
        // console.log("Refreshing access token", req.cookies.refreshToken);

        if (!refreshToken) {
            return res.status(401).json({ success: false, message: "No refresh token" });
        }

        // verify token
        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_SECRET
        );

        // check Redis (server-side validation)
        const storedToken = await redisClient.get(
            `refresh:${decoded._id}`
        );


        // console.log("storedToken", storedToken);
        // console.log("refreshToken", refreshToken);

        // const keys = await redisClient.keys("*");
        // console.log("All keys of redis", keys);
        // console.log("decoded", decoded);

        if (!storedToken || storedToken !== refreshToken) {
            return res.status(403).json({ success: false, message: "Invalid refresh token" });
        }

        // generate new tokens (rotation)

        const newAccessToken = generateAccessToken(decoded);
        const newRefreshToken = generateRefreshToken(decoded);

        // update Redis
        await redisClient.set(
            `refresh:${decoded._id}`,
            newRefreshToken,
            { EX: 7 * 24 * 60 * 60 }
        );

        //print all keys of redis

        // update cookie
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/",
        });

        return res.json({
            success: true,
            token: newAccessToken,
        });
    } catch (err) {
        return res.status(403).json({
            success: false,
            message: "Token expired or invalid",
        });
    }
};

const logout = async (req, res) => {
    try {
        const userId = req.userId;

        // 1. remove refresh token from Redis (invalidate session)
        await redisClient.del(`refresh:${userId}`);

        // 2. clear refresh token cookie
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Logout failed",
        });
    }
};

export { login, register, refreshToken, logout, googleLogin };

