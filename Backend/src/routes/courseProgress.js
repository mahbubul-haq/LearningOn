import { Router } from "express";
import { updateCompletionDate } from "../controllers/courses/course.progress.controller.js";
import verifyToken from "../middlewares/auth.js";

const router = Router();

router.post("/:courseId/complete", verifyToken, updateCompletionDate)

export default router;
