import bcrypt from "bcrypt";
import People from "../models/People.js";
import fs from "fs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
    try {
        //console.log("req.body", { ...req.body });
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

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
        if (req.body.picturePath) {
            fs.unlink("assets/images/" + req.body.picturePath, (err) => {
                if (err) {
                    console.log(err);
                }
            });
            console.log("File removed");
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

        const user = await People.findOne({
            email: email,
        });

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

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                name: user.name,
            },
            process.env.JWT_SECRET
            // no expiration time
        );

        res.status(200).json({
            success: true,
            token: token,
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

export { register, login };
