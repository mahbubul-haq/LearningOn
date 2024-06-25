import Notification from "../models/Notification.js";

const createNotification = async (req, res) => {
    console.log("create notification called");
    try {
        // delete one notification if there are more than 5 notifications
        const notifications = await Notification.find({
            userId: req.body.userId,
        });
        //console.log(notifications, notifications?.length);
        // console.log("why not here");
        if (notifications?.length >= 50) {
            await Notification.deleteOne({
                _id: notifications[0]._id,
            });
        }

        const notification = new Notification({
            userId: req.body.userId,
            message: req.body.message,
            status: req.body.status,
            link: req.body.link,
            imageLink: req.body.imageLink,
        });

        const savedNotification = await notification.save();

        res.status(200).json({
            success: true,
            notification: savedNotification,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getNotificationsByUserId = async (req, res) => {
    try {
        let notifications = await Notification.find({
            userId: req.params.userId,
        });
        if (!notifications) {
            return res.status(404).json({
                success: false,
                message: "No notifications found",
            });
        }

        res.status(200).json({
            success: true,
            notifications: notifications,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateNotification = async (req, res) => {
    try {
        const notification = await Notification.findById(
            req.params.notificationId
        );
        const status = req.params.status;
        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "No notification found",
            });
        }

        notification.status = status;
        await notification.save();

        res.status(200).json({
            success: true,
            notification: notification,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export { getNotificationsByUserId, updateNotification, createNotification };
