import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  uploadCourseThumbnailApi,
  uploadIntroVideoApi,
  uploadSubLessonVideoApi,
  deleteSubLessonVideoApi,
  addLessonApi,
} from "../../api/courseLessonsApi";

vi.mock("../../../../api/apiFetch", () => ({
  apiFetch: vi.fn(),
}));

import { apiFetch } from "../../../../api/apiFetch";

describe("courseLessonsApi (unit)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("uploadCourseThumbnailApi posts multipart to media/thumbnail", async () => {
    const file = new File(["x"], "thumb.png", { type: "image/png" });
    apiFetch.mockResolvedValue({
      success: true,
      fileName: "learningon/images/test-upload",
      updatedFields: { courseThumbnail: "learningon/images/test-upload" },
    });

    const result = await uploadCourseThumbnailApi("course123", file);

    expect(apiFetch).toHaveBeenCalledWith(
      expect.objectContaining({
        url: "/api/v1/courses/course123/media/thumbnail",
        method: "POST",
      })
    );
    expect(result.updatedFields.courseThumbnail).toBe(
      "learningon/images/test-upload"
    );
  });

  it("uploadIntroVideoApi posts to media/intro-video", async () => {
    const file = new File(["x"], "intro.mp4", { type: "video/mp4" });
    apiFetch.mockResolvedValue({ success: true, fileName: "learningon/videos/v1" });

    await uploadIntroVideoApi("c1", file);

    expect(apiFetch).toHaveBeenCalledWith(
      expect.objectContaining({
        url: "/api/v1/courses/c1/media/intro-video",
        method: "POST",
      })
    );
  });

  it("uploadSubLessonVideoApi targets sublesson video endpoint", async () => {
    const file = new File(["x"], "lesson.mp4", { type: "video/mp4" });
    apiFetch.mockResolvedValue({
      success: true,
      fileName: "learningon/videos/sub",
      courseInfo: { lessons: [] },
    });

    await uploadSubLessonVideoApi("c1", "l1", "s1", file);

    expect(apiFetch).toHaveBeenCalledWith(
      expect.objectContaining({
        url: "/api/v1/courses/c1/lessons/l1/sublessons/s1/video",
        method: "POST",
      })
    );
  });

  it("deleteSubLessonVideoApi sends DELETE to video resource", async () => {
    apiFetch.mockResolvedValue({ success: true });

    await deleteSubLessonVideoApi("c1", "l1", "s1");

    expect(apiFetch).toHaveBeenCalledWith({
      url: "/api/v1/courses/c1/lessons/l1/sublessons/s1/video",
      method: "DELETE",
    });
  });

  it("addLessonApi creates lesson shell on backend", async () => {
    apiFetch.mockResolvedValue({ success: true, lesson: { _id: "l1" } });

    const result = await addLessonApi("c1");

    expect(apiFetch).toHaveBeenCalledWith({
      url: "/api/v1/courses/c1/lessons",
      method: "POST",
    });
    expect(result.lesson._id).toBe("l1");
  });
});
