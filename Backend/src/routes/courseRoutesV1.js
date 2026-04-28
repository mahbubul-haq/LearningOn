import { Router } from "express";
import { getCourses } from "../controllers/courses/course.query.controller.js";
import { getQuestions } from "../controllers/courses/course.quiz.controller.js";
import verifyToken from "../middlewares/auth.js";
import { createOrUpdateReview, getUserCourseReview, getCourseReviews } from "../controllers/review.controller.js";

const router = Router();

router.get("/", getCourses);
router.get("/:courseId/lessons/:lessonId/quiz", verifyToken, getQuestions);
router.post("/:courseId/reviews", verifyToken, createOrUpdateReview);
router.get("/:courseId/reviews/me", verifyToken, getUserCourseReview);
router.get("/:courseId/reviews", getCourseReviews);

export default router;
