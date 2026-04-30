import { Router } from "express";
import { getQuizAttempt } from "../controllers/quiz.controller.js";
import verifyToken from "../middlewares/auth.js";
import { processAnswer } from "../controllers/quiz.controller.js";

const router = Router();

router.post("/:courseId/:lessonId/attempt", verifyToken, getQuizAttempt);
router.patch("/:courseId/:lessonId/attempt/:attemptId", verifyToken, processAnswer);

export default router;
