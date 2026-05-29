import { vi, beforeAll, afterAll } from "vitest";
import { connectTestDb, disconnectTestDb } from "../helpers/db.js";

process.env.JWT_SECRET = process.env.JWT_SECRET || "test-jwt-secret";

beforeAll(async () => {
    await connectTestDb();
}, 120000);

afterAll(async () => {
    await disconnectTestDb();
}, 60000);

vi.mock("../../utils/cloudinary.js", () => ({
    uploadImage: vi.fn(async (_filePath, isVideo) => ({
        success: true,
        uploadResponse: {
            public_id: isVideo
                ? "learningon/videos/test-upload"
                : "learningon/images/test-upload",
            duration: isVideo ? 125.5 : undefined,
        },
    })),
    deleteImage: vi.fn(async () => ({
        success: true,
        deleteRes: { result: "ok" },
    })),
    cloudinaryConfig: vi.fn(),
}));
