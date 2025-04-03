import { Router } from "express";
import { getCourseProgress } from "../controllers/courseProgress.js";
import verifyToken from "../middlewares/auth.js";

const router = Router();

router.get("/:courseId", verifyToken, getCourseProgress);

export default router;