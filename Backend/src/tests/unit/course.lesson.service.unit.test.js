import { describe, it, expect, vi, beforeEach } from "vitest";
import mongoose from "mongoose";
import { deleteImage } from "../../utils/cloudinary.js";
import {
    setCourseThumbnail,
    setIntroVideo,
    setSubLessonVideo,
    clearSubLessonVideo,
} from "../../services/courses/course.lesson.service.js";

vi.mock("../../models/Course.js", () => {
    const mockSave = vi.fn();
    const createMockCourse = (data) => ({
        ...data,
        save: mockSave.mockResolvedValue(undefined),
        lessons: data.lessons || {
            id: vi.fn(),
            push: vi.fn(),
            length: 0,
        },
    });

    return {
        default: {
            findOne: vi.fn(),
            create: vi.fn(),
        },
        __mockSave: mockSave,
        __createMockCourse: createMockCourse,
    };
});

import Course from "../../models/Course.js";

describe("course.lesson.service (unit)", () => {
    const ownerId = new mongoose.Types.ObjectId().toString();
    const courseId = new mongoose.Types.ObjectId().toString();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("setCourseThumbnail", () => {
        it("updates thumbnail and deletes previous Cloudinary asset", async () => {
            const course = {
                courseThumbnail: "learningon/images/old-thumb",
                save: vi.fn().mockResolvedValue(undefined),
            };
            Course.findOne.mockResolvedValue(course);

            const result = await setCourseThumbnail(
                courseId,
                ownerId,
                "learningon/images/new-thumb"
            );

            expect(deleteImage).toHaveBeenCalledWith(
                "learningon/images/old-thumb",
                "image"
            );
            expect(course.courseThumbnail).toBe("learningon/images/new-thumb");
            expect(course.save).toHaveBeenCalled();
            expect(result.updatedFields).toEqual({
                courseThumbnail: "learningon/images/new-thumb",
            });
        });

        it("throws COURSE_NOT_FOUND when course does not exist", async () => {
            Course.findOne.mockResolvedValue(null);

            await expect(
                setCourseThumbnail(courseId, ownerId, "learningon/images/x")
            ).rejects.toMatchObject({ message: "COURSE_NOT_FOUND", statusCode: 404 });
        });
    });

    describe("setIntroVideo", () => {
        it("persists intro video public id only in updatedFields", async () => {
            const course = {
                introVideo: "",
                save: vi.fn().mockResolvedValue(undefined),
            };
            Course.findOne.mockResolvedValue(course);

            const result = await setIntroVideo(
                courseId,
                ownerId,
                "learningon/videos/intro-1",
                99
            );

            expect(course.introVideo).toBe("learningon/videos/intro-1");
            expect(result.updatedFields).toEqual({
                introVideo: "learningon/videos/intro-1",
            });
        });
    });

    describe("setSubLessonVideo", () => {
        it("updates only the targeted sublesson video fields", async () => {
            const lessonId = new mongoose.Types.ObjectId();
            const subLessonId = new mongoose.Types.ObjectId();
            const subLesson = {
                _id: subLessonId,
                videoLink: "",
                videoDuration: 0,
            };
            const lesson = {
                _id: lessonId,
                subLessons: {
                    id: vi.fn((id) =>
                        String(id) === subLessonId.toString() ? subLesson : null
                    ),
                },
            };
            const course = {
                lessons: {
                    id: vi.fn((id) =>
                        String(id) === lessonId.toString() ? lesson : null
                    ),
                },
                save: vi.fn().mockResolvedValue(undefined),
            };
            Course.findOne.mockResolvedValue(course);

            const result = await setSubLessonVideo(
                courseId,
                ownerId,
                lessonId.toString(),
                subLessonId.toString(),
                "learningon/videos/sub-1",
                200
            );

            expect(subLesson.videoLink).toBe("learningon/videos/sub-1");
            expect(subLesson.videoDuration).toBe(200);
            expect(result.updatedFields).toEqual({
                videoLink: "learningon/videos/sub-1",
                videoDuration: 200,
            });
        });

        it("throws SUBLESSON_NOT_FOUND for invalid sublesson id", async () => {
            const lessonId = new mongoose.Types.ObjectId();
            const lesson = {
                subLessons: { id: vi.fn(() => null) },
            };
            Course.findOne.mockResolvedValue({
                lessons: { id: vi.fn(() => lesson) },
                save: vi.fn(),
            });

            await expect(
                setSubLessonVideo(
                    courseId,
                    ownerId,
                    lessonId.toString(),
                    new mongoose.Types.ObjectId().toString(),
                    "learningon/videos/x",
                    1
                )
            ).rejects.toMatchObject({ message: "SUBLESSON_NOT_FOUND", statusCode: 404 });
        });
    });

    describe("clearSubLessonVideo", () => {
        it("clears videoLink and deletes from Cloudinary", async () => {
            const subLesson = {
                videoLink: "learningon/videos/old",
                videoDuration: 50,
            };
            const lesson = { subLessons: { id: vi.fn(() => subLesson) } };
            const course = {
                lessons: { id: vi.fn(() => lesson) },
                save: vi.fn().mockResolvedValue(undefined),
            };
            Course.findOne.mockResolvedValue(course);

            const result = await clearSubLessonVideo(
                courseId,
                ownerId,
                new mongoose.Types.ObjectId().toString(),
                new mongoose.Types.ObjectId().toString()
            );

            expect(deleteImage).toHaveBeenCalledWith(
                "learningon/videos/old",
                "video"
            );
            expect(subLesson.videoLink).toBe("");
            expect(subLesson.videoDuration).toBe(0);
            expect(result.updatedFields).toEqual({
                videoLink: "",
                videoDuration: 0,
            });
        });
    });
});
