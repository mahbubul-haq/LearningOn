import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import path from "path";
import { fileURLToPath } from "url";
import { deleteImage, uploadImage } from "../../utils/cloudinary.js";
import { clearTestDb } from "../helpers/db.js";
import { createTestAppWithUser } from "../helpers/testApp.js";
import {
    createDraftCourse,
    createTestUserId,
} from "../helpers/fixtures.js";
import Course from "../../models/Course.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sampleFile = path.join(__dirname, "../fixtures/sample-upload.bin");

describe("Course media routes (integration)", () => {
    let app;
    let ownerId;
    let course;

    beforeEach(async () => {
        await clearTestDb();
        ownerId = createTestUserId();
        course = await createDraftCourse(ownerId);
        app = createTestAppWithUser(ownerId.toString());
    });

    it("POST /media/thumbnail uploads and persists courseThumbnail", async () => {
        const res = await request(app)
            .post(`/api/v1/courses/${course._id}/media/thumbnail`)
            .attach("picture", sampleFile);

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.fileName).toBe("learningon/images/test-upload");
        expect(res.body.updatedFields.courseThumbnail).toBe(
            "learningon/images/test-upload"
        );

        const updated = await Course.findById(course._id);
        expect(updated.courseThumbnail).toBe("learningon/images/test-upload");
        expect(uploadImage).toHaveBeenCalled();
    });

    it("POST /media/intro-video uploads and persists introVideo", async () => {
        const res = await request(app)
            .post(`/api/v1/courses/${course._id}/media/intro-video`)
            .attach("picture", sampleFile);

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.fileName).toBe("learningon/videos/test-upload");

        const updated = await Course.findById(course._id);
        expect(updated.introVideo).toBe("learningon/videos/test-upload");
    });

    it("returns 400 when no file is attached", async () => {
        const res = await request(app).post(
            `/api/v1/courses/${course._id}/media/thumbnail`
        );

        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toMatch(/upload/i);
    });

    it("DELETE /media/thumbnail clears field and calls Cloudinary delete", async () => {
        course.courseThumbnail = "learningon/images/existing";
        await course.save();

        const res = await request(app).delete(
            `/api/v1/courses/${course._id}/media/thumbnail`
        );

        expect(res.status).toBe(200);
        expect(res.body.updatedFields.courseThumbnail).toBe("");

        const updated = await Course.findById(course._id);
        expect(updated.courseThumbnail).toBe("");
        expect(deleteImage).toHaveBeenCalledWith(
            "learningon/images/existing",
            "image"
        );
    });

    it("returns 404 when course is not owned by user", async () => {
        const otherUserApp = createTestAppWithUser(createTestUserId().toString());

        const res = await request(otherUserApp)
            .post(`/api/v1/courses/${course._id}/media/thumbnail`)
            .attach("picture", sampleFile);

        expect(res.status).toBe(404);
        expect(res.body.success).toBe(false);
    });
});
