import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const register = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const istaken = await Admin.countDocuments({
            $or: [
                {
                    email: req.body.email,
                },
                { username: req.body.username },
            ],
        });

        if (istaken) {
            return res.status(200).json({
                success: false,
                message: "username or email is taken",
            });
        }
        const newAdmin = new Admin({
            ...req.body,
            password: hashedPassword,
        });

        const admin = await newAdmin.save();

        res.status(201).json({
            success: true,
            admin: admin,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            errors: { ...error.errors },
        });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({
            username: username,
        });

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Invalid username",
            });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }

        const token = jwt.sign(
            {
                id: admin._id,
                username: admin.username,
                email: admin.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            success: true,
            token: token,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Login error",
        });
    }
};



export { login, register };

