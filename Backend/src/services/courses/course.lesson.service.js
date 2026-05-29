import fs from "fs";
import mongoose from "mongoose";
import Course from "../../models/Course.js";
import AppError from "../../errors/AppError.js";
import { deleteFile, uploadFile } from "../upload/uploadFile.js";

const emptySubLesson = () => ({
    title: "Untitled sublesson",
    videoLink: { public_id: "", secure_url: "", duration: 0 },
    lectureNote: "",
});

const emptyLesson = () => ({
    title: "Untitled lesson",
    description: "",
    subLessons: [emptySubLesson()],
    questions: { questions: [], examDuration: Number.MAX_SAFE_INTEGER },
});



const findOwnedCourse = async (courseId, userId) => {
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
        throw new AppError("COURSE_NOT_FOUND", 404);
    }

    const course = await Course.findOne({ _id: courseId, owner: userId });

    if (!course) {
        throw new AppError("COURSE_NOT_FOUND", 404);
    }

    return course;
};

const deleteSubLessonVideos = async (subLessons = []) => {
    for (const subLesson of subLessons) {
        if (subLesson?.videoLink?.public_id) {
            await deleteFile(subLesson.videoLink.public_id, "video");
        }
    }
};

const deleteLessonFromCourse = async (courseId, userId, lessonId) => {
    const course = await findOwnedCourse(courseId, userId);
    const lesson = course.lessons.id(lessonId);

    if (!lesson) {
        throw new AppError("LESSON_NOT_FOUND", 404);
    }

    await deleteSubLessonVideos(lesson.subLessons);
    course.lessons.pull({ _id: lessonId });
    await course.save();

    return course;
};


const deleteSubLessonFromCourse = async (
    courseId,
    userId,
    lessonId,
    subLessonId
) => {
    const course = await findOwnedCourse(courseId, userId);
    const lesson = course.lessons.id(lessonId);

    if (!lesson) {
        throw new AppError("LESSON_NOT_FOUND", 404);
    }

    if (lesson.subLessons.length <= 1) {
        throw new AppError("CANNOT_DELETE_LAST_SUBLESSON", 400);
    }

    const subLesson = lesson.subLessons.id(subLessonId);

    if (!subLesson) {
        throw new AppError("SUBLESSON_NOT_FOUND", 404);
    }

    if (subLesson.videoLink?.public_id) {
        await deleteFile(subLesson.videoLink.public_id, "video");
    }

    lesson.subLessons.pull({ _id: subLessonId });
    await course.save();

    return course;
};



const addLessonToCourse = async (courseId, userId) => {
    const course = await findOwnedCourse(courseId, userId);
    course.lessons.push(emptyLesson());
    await course.save();

    const lesson = course.lessons[course.lessons.length - 1];

    return { course, lesson };
};

const addSubLessonToLesson = async (courseId, userId, lessonId) => {
    const course = await findOwnedCourse(courseId, userId);
    const lesson = course.lessons.id(lessonId);

    if (!lesson) {
        throw new AppError("LESSON_NOT_FOUND", 404);
    }

    lesson.subLessons.push(emptySubLesson());
    await course.save();

    const subLesson = lesson.subLessons[lesson.subLessons.length - 1];

    return { course, subLesson };
};

const setCourseThumbnail = async (courseId, userId, public_id, secure_url) => {
    const course = await findOwnedCourse(courseId, userId);

    if (course.courseThumbnail?.public_id && course.courseThumbnail.public_id !== public_id) {
        await deleteFile(course.courseThumbnail.public_id, "image");
    }

    course.courseThumbnail = { public_id, secure_url };
    await course.save();

    return {
        course,
        updatedFields: { courseThumbnail: { public_id, secure_url } },
    };
};

const clearCourseThumbnail = async (courseId, userId) => {
    const course = await findOwnedCourse(courseId, userId);

    if (course.courseThumbnail?.public_id) {
        await deleteFile(course.courseThumbnail.public_id, "image");
    }

    course.courseThumbnail = { public_id: "", secure_url: "" };
    await course.save();

    return {
        course,
        updatedFields: { courseThumbnail: { public_id: "", secure_url: "" } },
    };
};

const setIntroVideo = async (courseId, userId, public_id, secure_url, videoDuration = 0) => {
    const course = await findOwnedCourse(courseId, userId);

    if (course.introVideo?.public_id && course.introVideo.public_id !== public_id) {
        await deleteFile(course.introVideo.public_id, "video");
    }

    course.introVideo = { public_id, secure_url, duration: videoDuration };
    await course.save();

    return {
        course,
        updatedFields: { introVideo: { public_id, secure_url, duration: videoDuration } },
    };
};

const clearIntroVideo = async (courseId, userId) => {
    const course = await findOwnedCourse(courseId, userId);

    if (course.introVideo?.public_id) {
        await deleteFile(course.introVideo.public_id, "video");
    }

    course.introVideo = { public_id: "", secure_url: "", duration: 0 };
    await course.save();

    return {
        course,
        updatedFields: { introVideo: { public_id: "", secure_url: "", duration: 0 } },
    };
};

const setSubLessonVideo = async (
    courseId,
    userId,
    lessonId,
    subLessonId,
    { public_id, secure_url, duration }
) => {
    const course = await findOwnedCourse(courseId, userId);
    const lesson = course.lessons.id(lessonId);

    if (!lesson) {
        throw new AppError("LESSON_NOT_FOUND", 404);
    }

    const subLesson = lesson.subLessons.id(subLessonId);

    if (!subLesson) {
        throw new AppError("SUBLESSON_NOT_FOUND", 404);
    }

    if (subLesson.videoLink?.public_id && subLesson.videoLink.public_id != public_id) {
        await deleteFile(subLesson.videoLink.public_id, "video");
    }

    subLesson.videoLink = { public_id, secure_url, duration };
    await course.save();

    return {
        course,
        subLesson,
        updatedFields: {
            videoLink: { public_id, secure_url, duration }
        },
    };
};

const clearSubLessonVideo = async (courseId, userId, lessonId, subLessonId) => {
    const course = await findOwnedCourse(courseId, userId);
    const lesson = course.lessons.id(lessonId);

    if (!lesson) {
        throw new AppError("LESSON_NOT_FOUND", 404);
    }

    const subLesson = lesson.subLessons.id(subLessonId);

    if (!subLesson) {
        throw new AppError("SUBLESSON_NOT_FOUND", 404);
    }

    if (subLesson.videoLink?.public_id) {
        await deleteFile(subLesson.videoLink.public_id, "video");
    }

    subLesson.videoLink = { public_id: "", secure_url: "", duration: 0 };
    await course.save();

    return {
        course,
        subLesson,
        updatedFields: { videoLink: { public_id: "", secure_url: "", duration: 0 } },
    };
};

const uploadAndSetCourseThumbnail = async (courseId, userId, file) => {
    const { public_id, secure_url } = await uploadFile(file.path, "image");
    return setCourseThumbnail(courseId, userId, public_id, secure_url);
};

const uploadAndSetIntroVideo = async (courseId, userId, file) => {
    const { public_id, secure_url, duration } = await uploadFile(file.path, "video");
    return setIntroVideo(courseId, userId, public_id, secure_url, duration);
};

const uploadAndSetSubLessonVideo = async (
    courseId,
    userId,
    lessonId,
    subLessonId,
    file
) => {
    const { public_id, secure_url, duration } = await uploadFile(file.path, "video");
    return setSubLessonVideo(
        courseId,
        userId,
        lessonId,
        subLessonId,
        { public_id, secure_url, duration },
    );
};

export {
    deleteLessonFromCourse,
    deleteSubLessonFromCourse,
    addLessonToCourse,
    addSubLessonToLesson,
    setCourseThumbnail,
    clearCourseThumbnail,
    setIntroVideo,
    clearIntroVideo,
    setSubLessonVideo,
    clearSubLessonVideo,
    uploadAndSetCourseThumbnail,
    uploadAndSetIntroVideo,
    uploadAndSetSubLessonVideo,
};
