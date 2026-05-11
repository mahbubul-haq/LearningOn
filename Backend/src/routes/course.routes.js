import { Router } from "express";
import { getCourses } from "../controllers/courses/course.query.controller.js";
import { getQuestions } from "../controllers/courses/course.quiz.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";
import { createOrUpdateReview, getUserCourseReview, getCourseReviews } from "../controllers/review.controller.js";
import { getMyCourses } from "../controllers/courses/course.controller.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();

router.get("/mine", verifyToken, getMyCourses);

router.get("/:courseId/lessons/:lessonId/quiz", verifyToken, getQuestions);
router.post("/:courseId/reviews", verifyToken, createOrUpdateReview);
router.get("/:courseId/reviews/me", verifyToken, getUserCourseReview);
router.get("/:courseId/reviews", verifyToken, getCourseReviews);
router.get("/", asyncHandler(getCourses));

export default router;
