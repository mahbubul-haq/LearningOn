import bcrypt from "bcrypt";
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

export { register };

