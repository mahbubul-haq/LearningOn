import express from "express";
import errorHandler from "../../errors/errorHandler.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { upload } from "../../configs/multer.config.js";
import {
    addLesson,
    addSubLesson,
    deleteLesson,
    deleteLessonAtIndex,
    deleteSubLesson,
    deleteSubLessonAtIndex,
    removeIntroVideo,
    removeSubLessonVideo,
    removeThumbnail,
    uploadIntroVideo,
    uploadSubLessonVideo,
    uploadThumbnail,
} from "../../controllers/courses/course.lesson.controller.js";

const createAuthedCourseRouter = (userId) => {
    const router = express.Router({ mergeParams: true });

    router.use((req, _res, next) => {
        req.userId = userId;
        next();
    });

    router.post(
        "/:courseId/media/thumbnail",
        upload.single("picture"),
        asyncHandler(uploadThumbnail)
    );
    router.post(
        "/:courseId/media/intro-video",
        upload.single("picture"),
        asyncHandler(uploadIntroVideo)
    );
    router.delete("/:courseId/media/thumbnail", asyncHandler(removeThumbnail));
    router.delete("/:courseId/media/intro-video", asyncHandler(removeIntroVideo));
    router.post("/:courseId/lessons", asyncHandler(addLesson));
    router.post(
        "/:courseId/lessons/:lessonId/sublessons",
        asyncHandler(addSubLesson)
    );
    router.post(
        "/:courseId/lessons/:lessonId/sublessons/:subLessonId/video",
        upload.single("picture"),
        asyncHandler(uploadSubLessonVideo)
    );
    router.delete(
        "/:courseId/lessons/:lessonId/sublessons/:subLessonId/video",
        asyncHandler(removeSubLessonVideo)
    );
    router.delete(
        "/:courseId/lessons-index/:lessonIndex/sublessons-index/:subLessonIndex",
        asyncHandler(deleteSubLessonAtIndex)
    );
    router.delete(
        "/:courseId/lessons-index/:lessonIndex",
        asyncHandler(deleteLessonAtIndex)
    );
    router.delete(
        "/:courseId/lessons/:lessonId/sublessons/:subLessonId",
        asyncHandler(deleteSubLesson)
    );
    router.delete("/:courseId/lessons/:lessonId", asyncHandler(deleteLesson));

    return router;
};

/** Express app for Supertest — auth injected, no JWT/People lookup */
export const createTestAppWithUser = (userId) => {
    const app = express();
    app.use(express.json());
    app.use("/api/v1/courses", createAuthedCourseRouter(userId));
    app.use(errorHandler);
    return app;
};
