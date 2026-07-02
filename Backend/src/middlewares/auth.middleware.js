import jwt from "jsonwebtoken";
import People from "../models/People.js";
import { authUserRateLimiter } from "./rateLimit.middleware.js";


const verifyToken = async (req, res, next) => {
    try {
        const authToken = req.headers["auth-token"];
        //console.log("authToken verify", authToken);
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
        // console.log("verified", verified);
        req.userId = verified.id;

        // Apply per-user rate limiting after successful authentication
        authUserRateLimiter(req, res, next);
    } catch (error) {
        // console.log("verifytoken error")
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }

};


export const verifyTokenLight = async (req, res, next) => {
    try {
        const authToken = req.headers["auth-token"];
        // console.log("verifytokenlight", authToken)
        //console.log("authToken verify", authToken);
        if (!authToken) {
            return res.status(401).json({
                success: false,
                message: "Access Denied",
            });
        }
        const verified = jwt.verify(authToken, process.env.JWT_SECRET);
        req.userId = verified.id;

        // Apply per-user rate limiting after successful authentication
        authUserRateLimiter(req, res, next);
    } catch (error) {
        // console.log("verifytokenlight error")
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }

};

/**
 * Optional auth middleware - extracts userId if token is present,
 * but does not block the request if no token or invalid token.
 */
export const optionalAuth = async (req, res, next) => {
    try {
        const authToken = req.headers["auth-token"];
        if (authToken) {
            const verified = jwt.verify(authToken, process.env.JWT_SECRET);
            req.userId = verified.id;
        }
    } catch (error) {
        // Token invalid or expired — continue without userId
    }
    next();
};

export default verifyToken;