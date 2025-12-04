import Notification from "../models/Notification.js";
import Course from "../models/Course.js";

const deleteAllNotifications = async (req, res) => {
  try {
    await Notification.deleteMany();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const deleteAllDraftCourses = async (req, res) => {
  try {
    await Course.deleteMany({
      courseStatus: "draft",
    });
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export { deleteAllNotifications, deleteAllDraftCourses };
