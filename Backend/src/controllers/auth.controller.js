import bcrypt from "bcrypt";
import People from "../models/People.js";
import { deleteImage, uploadImage } from "../utils/cloudinary.js";
import { generateAccessToken, generateRefreshToken } from "../services/token.service.js";
import redisClient from "../configs/redisClient.js";
import jwt from "jsonwebtoken";
import { deleteFile, uploadFile } from "../services/upload/uploadFile.js";

const register = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

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
            password: hashedPassword,
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
        const { email, password } = req.body;
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

        user.password = undefined;
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        await redisClient.set(`refresh:${user._id}`, refreshToken, { EX: 7 * 24 * 60 * 60 });
        await redisClient.set(`accessToken:${user._id}`, accessToken, { EX: 20 * 60 });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            token: accessToken,
            user: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            errors: { ...error.errors },
            message: "Login failed",
        });
    }
};

const refreshToken = async (req, res) => {
    try {
        // get refresh token from HttpOnly cookie
        const refreshToken = req.cookies.refreshToken;
        console.log("Refreshing access token");

        if (!refreshToken) {
            return res.status(401).json({ message: "No refresh token" });
        }

        // verify token
        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_SECRET
        );

        // check Redis (server-side validation)
        const storedToken = await redisClient.get(
            `refresh:${decoded.id}`
        );

        if (!storedToken || storedToken !== refreshToken) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        // generate new tokens (rotation)
        const newAccessToken = generateAccessToken(decoded);
        const newRefreshToken = generateRefreshToken(decoded);

        // update Redis
        await redisClient.set(
            `refresh:${decoded.id}`,
            newRefreshToken,
            { EX: 7 * 24 * 60 * 60 }
        );

        // update cookie
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
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

export { login, register, refreshToken, logout };

