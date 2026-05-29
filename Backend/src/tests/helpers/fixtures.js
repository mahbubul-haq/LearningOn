import mongoose from "mongoose";
import Course from "../../models/Course.js";

export const createTestUserId = () => new mongoose.Types.ObjectId();

export const createDraftCourse = async (ownerId, overrides = {}) => {
    return Course.create({
        owner: ownerId,
        courseStatus: "draft",
        courseTitle: "Test Course",
        lessons: [],
        ...overrides,
    });
};

export const createCourseWithLesson = async (ownerId) => {
    const course = await createDraftCourse(ownerId);
    course.lessons.push({
        title: "Lesson 1",
        description: "",
        subLessons: [
            {
                title: "Sub 1",
                videoLink: "",
                lectureNote: "",
            },
        ],
    });
    await course.save();
    return course;
};
