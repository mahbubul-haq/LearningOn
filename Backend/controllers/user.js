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

const getUser = async (req, res) => {
    try {
        const user = await People.findById(req.userId)
            .populate("courses")
            .exec();
        console.log(user);
        res.status(200).json({
            success: true,
            user: user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await People.findById(req.params.userId)
            .populate("courses")
            .exec();
        //console.log(user);
        res.status(200).json({
            success: true,
            user: user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export { getAllUsers, getUser, getUserById };
