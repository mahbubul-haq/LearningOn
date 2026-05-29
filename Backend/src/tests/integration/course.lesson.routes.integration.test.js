import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import path from "path";
import { fileURLToPath } from "url";
import { deleteImage } from "../../utils/cloudinary.js";
import { clearTestDb } from "../helpers/db.js";
import { createTestAppWithUser } from "../helpers/testApp.js";
import {
    createCourseWithLesson,
    createDraftCourse,
    createTestUserId,
} from "../helpers/fixtures.js";
import Course from "../../models/Course.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sampleFile = path.join(__dirname, "../fixtures/sample-upload.bin");

describe("Course lesson & sublesson routes (integration)", () => {
    let app;
    let ownerId;

    beforeEach(async () => {
        await clearTestDb();
        ownerId = createTestUserId();
        app = createTestAppWithUser(ownerId.toString());
    });

    it("POST /lessons creates lesson with default sublesson in DB", async () => {
        const course = await createDraftCourse(ownerId);

        const res = await request(app).post(
            `/api/v1/courses/${course._id}/lessons`
        );

        expect(res.status).toBe(200);
        expect(res.body.lesson).toBeDefined();
        expect(res.body.courseInfo.lessons).toHaveLength(1);
        expect(res.body.courseInfo.lessons[0].subLessons).toHaveLength(1);

        const updated = await Course.findById(course._id);
        expect(updated.lessons).toHaveLength(1);
    });

    it("POST /sublessons adds sublesson to existing lesson", async () => {
        const course = await createCourseWithLesson(ownerId);
        const lessonId = course.lessons[0]._id;

        const res = await request(app).post(
            `/api/v1/courses/${course._id}/lessons/${lessonId}/sublessons`
        );

        expect(res.status).toBe(200);
        expect(res.body.subLesson).toBeDefined();
        expect(res.body.courseInfo.lessons[0].subLessons).toHaveLength(2);
    });

    it("POST sublesson video persists videoLink without full course PUT", async () => {
        const course = await createCourseWithLesson(ownerId);
        const lessonId = course.lessons[0]._id;
        const subLessonId = course.lessons[0].subLessons[0]._id;

        const res = await request(app)
            .post(
                `/api/v1/courses/${course._id}/lessons/${lessonId}/sublessons/${subLessonId}/video`
            )
            .attach("picture", sampleFile);

        expect(res.status).toBe(200);
        expect(res.body.fileName).toBe("learningon/videos/test-upload");
        expect(res.body.updatedFields.videoLink).toBe(
            "learningon/videos/test-upload"
        );

        const updated = await Course.findById(course._id);
        const sub = updated.lessons.id(lessonId).subLessons.id(subLessonId);
        expect(sub.videoLink).toBe("learningon/videos/test-upload");
        expect(sub.videoDuration).toBe(125.5);
    });

    it("DELETE sublesson video clears DB and calls Cloudinary", async () => {
        const course = await createCourseWithLesson(ownerId);
        const lessonId = course.lessons[0]._id;
        const sub = course.lessons[0].subLessons[0];
        sub.videoLink = "learningon/videos/existing";
        await course.save();

        const res = await request(app).delete(
            `/api/v1/courses/${course._id}/lessons/${lessonId}/sublessons/${sub._id}/video`
        );

        expect(res.status).toBe(200);
        expect(res.body.updatedFields.videoLink).toBe("");

        const updated = await Course.findById(course._id);
        const updatedSub = updated.lessons.id(lessonId).subLessons.id(sub._id);
        expect(updatedSub.videoLink).toBe("");
        expect(deleteImage).toHaveBeenCalledWith(
            "learningon/videos/existing",
            "video"
        );
    });

    it("DELETE lesson removes lesson and sublesson videos from Cloudinary", async () => {
        const course = await createCourseWithLesson(ownerId);
        course.lessons[0].subLessons[0].videoLink = "learningon/videos/v1";
        await course.save();
        const lessonId = course.lessons[0]._id;

        const res = await request(app).delete(
            `/api/v1/courses/${course._id}/lessons/${lessonId}`
        );

        expect(res.status).toBe(200);
        expect(res.body.courseInfo.lessons).toHaveLength(0);
        expect(deleteImage).toHaveBeenCalledWith(
            "learningon/videos/v1",
            "video"
        );
    });
});
