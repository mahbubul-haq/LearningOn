import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const verifyAdminToken = async (req, res, next) => {
    try {
        const authToken = req.headers["auth-token"];
        if (!authToken) {
            return res.status(401).json({
                success: false,
                message: "Access Denied",
            });
        }
        const verified = jwt.verify(authToken, process.env.JWT_SECRET);

        const admin = await Admin.findById(verified.id);

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Access Denied",
            });
        }

        //console.log(verified);
        req.adminId = verified.id;
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }

};

export default verifyAdminToken;