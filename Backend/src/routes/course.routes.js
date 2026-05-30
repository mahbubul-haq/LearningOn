import { Router } from "express";
import { getCourseLessons, getCourses } from "../controllers/courses/course.query.controller.js";
import { getQuestions } from "../controllers/courses/course.quiz.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";
import { createOrUpdateReview, getUserCourseReview, getCourseReviews } from "../controllers/review.controller.js";
import { deleteCourse, getCourseById, getCourseByIdTemp, getDraftCourses, getMyCourses, updateCourse } from "../controllers/courses/course.controller.js";
import {
    addLesson,
    addSubLesson,
    deleteLesson,
    deleteSubLesson,
    removeIntroVideo,
    removeSubLessonVideo,
    removeThumbnail,
    uploadIntroVideo,
    uploadSubLessonVideo,
    uploadThumbnail,
} from "../controllers/courses/course.lesson.controller.js";
import asyncHandler from "../utils/asyncHandler.js";
import { upload } from "../configs/multer.config.js";

const router = Router();

router.get("/mine", verifyToken, getMyCourses);
router.get("/draft", verifyToken, getDraftCourses);
router.get("/:courseId/lessons", verifyToken, getCourseLessons);
router.get("/:courseId/lessons/:lessonId/quiz", verifyToken, getQuestions);
router.post("/:courseId/reviews", verifyToken, createOrUpdateReview);
router.get("/:courseId/reviews/me", verifyToken, getUserCourseReview);
router.get("/:courseId/reviews", getCourseReviews);
router.get("/", asyncHandler(getCourses));

router.post(
    "/:courseId/media/thumbnail",
    verifyToken,
    upload.single("picture"),
    asyncHandler(uploadThumbnail)
);
router.post(
    "/:courseId/media/intro-video",
    verifyToken,
    upload.single("picture"),
    asyncHandler(uploadIntroVideo)
);
router.delete(
    "/:courseId/media/thumbnail",
    verifyToken,
    asyncHandler(removeThumbnail)
);
router.delete(
    "/:courseId/media/intro-video",
    verifyToken,
    asyncHandler(removeIntroVideo)
);

router.post("/:courseId/lessons", verifyToken, asyncHandler(addLesson));
router.post(
    "/:courseId/lessons/:lessonId/sublessons",
    verifyToken,
    asyncHandler(addSubLesson)
);
router.post(
    "/:courseId/lessons/:lessonId/sublessons/:subLessonId/video",
    verifyToken,
    upload.single("picture"),
    asyncHandler(uploadSubLessonVideo)
);
router.delete(
    "/:courseId/lessons/:lessonId/sublessons/:subLessonId/video",
    verifyToken,
    asyncHandler(removeSubLessonVideo)
);

router.delete(
    "/:courseId/lessons/:lessonId/sublessons/:subLessonId",
    verifyToken,
    asyncHandler(deleteSubLesson)
);
router.delete(
    "/:courseId/lessons/:lessonId",
    verifyToken,
    asyncHandler(deleteLesson)
);

router.get("/:courseId", getCourseByIdTemp);
router.delete("/:courseId", verifyToken, deleteCourse);
router.put("/:courseId", verifyToken, updateCourse);

export default router;
