import People from "../models/People.js";
import jwt from "jsonwebtoken";


const verifyToken = async (req, res, next) => {
    try {
        const authToken = req.headers["auth-token"];
        if (!authToken) {
            return res.status(401).json({
                success: false,
                message: "Access Denied",
            });
        }
        const verified = jwt.verify(authToken, process.env.JWT_SECRET);

        const user = await People.findById(verified.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Access Denied",
            });
        }

        //console.log(verified);
        req.userId = verified.id;
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }

};

export default verifyToken;