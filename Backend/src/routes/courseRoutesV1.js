import { Router } from "express";
import { getCourses } from "../controllers/courses/course.query.controller.js";
import { getQuestions } from "../controllers/courses/course.quiz.controller.js";
import verifyToken from "../middlewares/auth.js";

const router = Router();

router.get("/", getCourses);
router.get("/:courseId/lessons/:lessonId/quiz", verifyToken, getQuestions);


export default router;
