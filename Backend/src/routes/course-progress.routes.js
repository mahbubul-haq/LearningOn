import { Router } from "express";
import { getCourseProgress, updateCompletionDate, updateProgress, updateWatchTime } from "../controllers/courses/course.progress.controller.js";
import verifyToken, { verifyTokenLight } from "../middlewares/auth.middleware.js";

const router = Router();

router.patch("/:courseId/complete", verifyToken, updateCompletionDate)
router.patch("/:courseId/watch-time", verifyTokenLight, updateWatchTime);
router.get("/:courseId", verifyToken, getCourseProgress);
router.put("/:courseId", verifyToken, updateProgress);



export default router;
