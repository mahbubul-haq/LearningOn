/**
 * Scenario: instructor builds course content with durable uploads
 * (structure first → media upload → replace → delete)
 */
import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import path from "path";
import { fileURLToPath } from "url";
import { clearTestDb } from "../helpers/db.js";
import { createTestAppWithUser } from "../helpers/testApp.js";
import { createDraftCourse, createTestUserId } from "../helpers/fixtures.js";
import Course from "../../models/Course.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sampleFile = path.join(__dirname, "../fixtures/sample-upload.bin");

describe("Scenario: course authoring upload persistence", () => {
    let app;
    let ownerId;
    let courseId;

    beforeEach(async () => {
        await clearTestDb();
        ownerId = createTestUserId();
        app = createTestAppWithUser(ownerId.toString());
        const course = await createDraftCourse(ownerId);
        courseId = course._id.toString();
    });

    it("instructor can leave after upload — video is already in MongoDB", async () => {
        // 1. Create lesson shell in backend
        const addLessonRes = await request(app).post(
            `/api/v1/courses/${courseId}/lessons`
        );
        expect(addLessonRes.body.success).toBe(true);
        const lessonId = addLessonRes.body.lesson._id;

        // 2. Upload sublesson video (no separate full-course save)
        const uploadRes = await request(app)
            .post(
                `/api/v1/courses/${courseId}/lessons/${lessonId}/sublessons/${addLessonRes.body.lesson.subLessons[0]._id}/video`
            )
            .attach("picture", sampleFile);

        expect(uploadRes.body.success).toBe(true);

        // 3. Simulate user closing browser — reload from DB only
        const reloaded = await Course.findById(courseId);
        const sub = reloaded.lessons.id(lessonId).subLessons[0];
        expect(sub.videoLink).toBe("learningon/videos/test-upload");
    });

    it("replacing intro video updates DB; thumbnail and lessons unchanged", async () => {
        await request(app)
            .post(`/api/v1/courses/${courseId}/media/thumbnail`)
            .attach("picture", sampleFile);

        const firstIntro = await request(app)
            .post(`/api/v1/courses/${courseId}/media/intro-video`)
            .attach("picture", sampleFile);

        expect(firstIntro.body.fileName).toBe("learningon/videos/test-upload");

        const secondIntro = await request(app)
            .post(`/api/v1/courses/${courseId}/media/intro-video`)
            .attach("picture", sampleFile);

        expect(secondIntro.body.success).toBe(true);

        const doc = await Course.findById(courseId);
        expect(doc.introVideo).toBe("learningon/videos/test-upload");
        expect(doc.courseThumbnail).toBe("learningon/images/test-upload");
        expect(doc.lessons).toHaveLength(0);
    });

    it("add sublesson → upload → delete sublesson cleans structure", async () => {
        const lessonRes = await request(app).post(
            `/api/v1/courses/${courseId}/lessons`
        );
        const lessonId = lessonRes.body.lesson._id;

        const subRes = await request(app).post(
            `/api/v1/courses/${courseId}/lessons/${lessonId}/sublessons`
        );
        const subLessonId = subRes.body.subLesson._id;

        await request(app)
            .post(
                `/api/v1/courses/${courseId}/lessons/${lessonId}/sublessons/${subLessonId}/video`
            )
            .attach("picture", sampleFile);

        const deleteRes = await request(app).delete(
            `/api/v1/courses/${courseId}/lessons/${lessonId}/sublessons/${subLessonId}`
        );

        expect(deleteRes.body.courseInfo.lessons[0].subLessons).toHaveLength(1);

        const doc = await Course.findById(courseId);
        expect(doc.lessons.id(lessonId).subLessons).toHaveLength(1);
        expect(
            doc.lessons.id(lessonId).subLessons.every((s) => !s.videoLink)
        ).toBe(true);
    });
});
