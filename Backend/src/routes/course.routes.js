import { Router } from "express";
import { getCourseLessons, getCourses } from "../controllers/courses/course.query.controller.js";
import { getQuestions } from "../controllers/courses/course.quiz.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";
import { createOrUpdateReview, getUserCourseReview, getCourseReviews } from "../controllers/review.controller.js";
import { deleteCourse, getCourseById, getCourseByIdTemp, getDraftCourses, getMyCourses, updateCourse } from "../controllers/courses/course.controller.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();

router.get("/mine", verifyToken, getMyCourses);
router.get("/draft", verifyToken, getDraftCourses);
router.get("/:courseId/lessons", verifyToken, getCourseLessons);
router.get("/:courseId/lessons/:lessonId/quiz", verifyToken, getQuestions);
router.post("/:courseId/reviews", verifyToken, createOrUpdateReview);
router.get("/:courseId/reviews/me", verifyToken, getUserCourseReview);
router.get("/:courseId/reviews", verifyToken, getCourseReviews);
router.get("/", asyncHandler(getCourses));
router.get("/:courseId", getCourseByIdTemp);
router.delete("/:courseId", verifyToken, deleteCourse);
router.put("/:courseId", verifyToken, updateCourse);






export default router;
