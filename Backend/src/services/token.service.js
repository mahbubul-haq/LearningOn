import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            name: user.name,
            timestamp: Date.now()
        },
        process.env.JWT_SECRET,
        { expiresIn: "20m" }
    );
};

export const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
        },
        process.env.REFRESH_SECRET,
        { expiresIn: "7d" }
    );
};