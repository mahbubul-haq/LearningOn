import { Router } from "express";
import { getCourses } from "../controllers/courses/course.query.controller.js";
import { getQuestions } from "../controllers/courses/course.quiz.controller.js";
import verifyToken from "../middlewares/auth.js";
import { createOrUpdateReview, getUserCourseReview, getCourseReviews } from "../controllers/review.controller.js";
import { getMyCourses } from "../controllers/courses/course.controller.js";
import { getMyPublishedCourses } from "../controllers/courses/course.query.controller.js";

const router = Router();

router.get("/mine/published", verifyToken, getMyPublishedCourses);
router.get("/mine", verifyToken, getMyCourses);

router.get("/:courseId/lessons/:lessonId/quiz", verifyToken, getQuestions);
router.post("/:courseId/reviews", verifyToken, createOrUpdateReview);
router.get("/:courseId/reviews/me", verifyToken, getUserCourseReview);
router.get("/:courseId/reviews", verifyToken, getCourseReviews);
router.get("/", getCourses);

export default router;
