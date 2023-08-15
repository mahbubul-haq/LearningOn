import People from "../models/People.js";

const getAllUsers = async (req, res) => {
    try {
        const users = await People.find().populate("courses").exec();
        res.status(200).json({
            success: true,
            users: users,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


export { getAllUsers };