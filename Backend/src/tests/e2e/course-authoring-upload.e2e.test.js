/**
 * E2E (API-level): full HTTP stack for publish-course upload flows.
 * Uses in-memory MongoDB + mocked Cloudinary (no external services).
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

describe("E2E: course authoring uploads (HTTP + DB)", () => {
    let app;
    let ownerId;
    let courseId;

    beforeEach(async () => {
        await clearTestDb();
        ownerId = createTestUserId();
        app = createTestAppWithUser(ownerId.toString());
        const course = await createDraftCourse(ownerId, {
            courseTitle: "E2E Draft Course",
        });
        courseId = course._id.toString();
    });

    it("complete publish-media path: thumbnail + intro + lesson + sublesson video", async () => {
        const thumb = await request(app)
            .post(`/api/v1/courses/${courseId}/media/thumbnail`)
            .attach("picture", sampleFile);
        expect(thumb.status).toBe(200);

        const intro = await request(app)
            .post(`/api/v1/courses/${courseId}/media/intro-video`)
            .attach("picture", sampleFile);
        expect(intro.status).toBe(200);

        const lesson = await request(app).post(
            `/api/v1/courses/${courseId}/lessons`
        );
        const lessonId = lesson.body.lesson._id;
        const subLessonId = lesson.body.lesson.subLessons[0]._id;

        const video = await request(app)
            .post(
                `/api/v1/courses/${courseId}/lessons/${lessonId}/sublessons/${subLessonId}/video`
            )
            .attach("picture", sampleFile);
        expect(video.status).toBe(200);

        const finalDoc = await Course.findById(courseId).lean();
        expect(finalDoc.courseThumbnail).toBeTruthy();
        expect(finalDoc.introVideo).toBeTruthy();
        expect(finalDoc.lessons[0].subLessons[0].videoLink).toBeTruthy();
        expect(finalDoc.owner.toString()).toBe(ownerId.toString());
    });

    it("rejects unauthenticated-style access when course belongs to another owner", async () => {
        const intruder = createTestAppWithUser(createTestUserId().toString());

        const res = await request(intruder)
            .post(`/api/v1/courses/${courseId}/media/intro-video`)
            .attach("picture", sampleFile);

        expect(res.status).toBe(404);
        expect(res.body.success).toBe(false);

        const unchanged = await Course.findById(courseId);
        expect(unchanged.introVideo).toBeFalsy();
    });
});
