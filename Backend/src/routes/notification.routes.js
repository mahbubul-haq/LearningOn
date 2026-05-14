import { Router } from "express";
import Notification from "../models/Notification.js";

import {
    getNotificationsByUserId,
    updateNotification,
    createNotification,
} from "../controllers/notification.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", createNotification);
router.get("/", verifyToken, getNotificationsByUserId);
router.patch("/:notificationId", verifyToken, updateNotification);

export default router;
