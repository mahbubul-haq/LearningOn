import AppError from "../../errors/AppError.js";
import {
    addLessonToCourse,
    addSubLessonToLesson,
    clearCourseThumbnail,
    clearIntroVideo,
    clearSubLessonVideo,
    deleteLessonFromCourse,
    deleteSubLessonFromCourse,
    uploadAndSetCourseThumbnail,
    uploadAndSetIntroVideo,
    uploadAndSetSubLessonVideo,
} from "../../services/courses/course.lesson.service.js";

import { unlinkUploadFile } from "../../utils/file.utils.js";

const sendCourseResponse = (res, course, extra = {}) => {
    res.status(200).json({
        success: true,
        courseInfo: course,
        ...extra
    });
};

const deleteLesson = async (req, res) => {
    const course = await deleteLessonFromCourse(
        req.params.courseId,
        req.userId,
        req.params.lessonId
    );
    sendCourseResponse(res, course);
};


const deleteSubLesson = async (req, res) => {
    const course = await deleteSubLessonFromCourse(
        req.params.courseId,
        req.userId,
        req.params.lessonId,
        req.params.subLessonId
    );
    sendCourseResponse(res, course);
};


const addLesson = async (req, res) => {
    const { course, lesson } = await addLessonToCourse(
        req.params.courseId,
        req.userId
    );
    sendCourseResponse(res, course, { lesson });
};

const addSubLesson = async (req, res) => {
    const { course, subLesson } = await addSubLessonToLesson(
        req.params.courseId,
        req.userId,
        req.params.lessonId
    );
    sendCourseResponse(res, course, { subLesson });
};

const uploadThumbnail = async (req, res) => {
    try {
        if (!req.file) {
            throw new AppError("FILE_MISSING", 400);
        }

        const { course, updatedFields } = await uploadAndSetCourseThumbnail(
            req.params.courseId,
            req.userId,
            req.file
        );

        res.status(200).json({
            success: true,
            updatedFields,
            fileName: updatedFields?.courseThumbnail?.public_id
        });
    } finally {
        unlinkUploadFile(req.file);
    }
};

const uploadIntroVideo = async (req, res) => {
    try {
        if (!req.file) {
            throw new AppError("FILE_MISSING", 400);
        }

        const { course, updatedFields } = await uploadAndSetIntroVideo(
            req.params.courseId,
            req.userId,
            req.file
        );

        res.status(200).json({
            success: true,
            updatedFields,
            fileName: updatedFields?.introVideo?.public_id
        });
    } finally {
        unlinkUploadFile(req.file);
    }
};

const removeThumbnail = async (req, res) => {
    const { course, updatedFields } = await clearCourseThumbnail(
        req.params.courseId,
        req.userId
    );

    res.status(200).json({
        success: true,
        updatedFields,
        fileName: ""
    });
};

const removeIntroVideo = async (req, res) => {
    const { course, updatedFields } = await clearIntroVideo(
        req.params.courseId,
        req.userId
    );

    res.status(200).json({
        success: true,
        updatedFields,
        fileName: ""
    });
};

const uploadSubLessonVideo = async (req, res) => {
    try {
        if (!req.file) {
            throw new AppError("FILE_MISSING", 400);
        }

        const { course, subLesson, updatedFields } =
            await uploadAndSetSubLessonVideo(
                req.params.courseId,
                req.userId,
                req.params.lessonId,
                req.params.subLessonId,
                req.file
            );

        res.status(200).json({
            success: true,
            courseInfo: course,
            subLesson,
            updatedFields,
            fileName: updatedFields.videoLink.public_id,
        });
    } finally {
        unlinkUploadFile(req.file);
    }
};

const removeSubLessonVideo = async (req, res) => {
    const { course, subLesson, updatedFields } = await clearSubLessonVideo(
        req.params.courseId,
        req.userId,
        req.params.lessonId,
        req.params.subLessonId
    );

    res.status(200).json({
        success: true,
        updatedFields,
        subLesson,
        courseInfo: course,
        fileName: ""
    });
};

export {
    deleteLesson,
    deleteSubLesson,
    addLesson,
    addSubLesson,
    uploadThumbnail,
    uploadIntroVideo,
    removeThumbnail,
    removeIntroVideo,
    uploadSubLessonVideo,
    removeSubLessonVideo,
};
