import Notification from "../models/Notification.js";

const deleteAllNotifications = async (req, res) => {
    try {
        await Notification.deleteMany();

        res.status(200).json({
            success: true,
        })

    }
    catch (error) {
        res.status(500).json ({
            success: false,
            error: error.message
        })
    }
}

export {
    deleteAllNotifications
};