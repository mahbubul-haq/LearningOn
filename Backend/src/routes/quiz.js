import { Router } from "express";
import { getQuizAttempt } from "../controllers/quiz.js";
import verifyToken from "../middlewares/auth.js";

const router = Router();

router.post("/attempt", verifyToken, getQuizAttempt);

export default router;
