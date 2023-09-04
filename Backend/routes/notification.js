import { Router } from "express";

import {
    getNotificationsByUserId,
    updateNotification,
    createNotification,
} from "../controllers/notification.js";
import verifyToken from "../middlewares/auth.js";

const router = Router();

router.post("/create", createNotification);
router.get("/get/:userId", verifyToken, getNotificationsByUserId);
router.put("/update/:notificationId/:status", verifyToken, updateNotification);

export default router;
