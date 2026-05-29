import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CourseMedia from "../../CourseMedia";
import { CreateCourseContext } from "../../../../state/CreateCourse";

vi.mock("../../api/courseLessonsApi", () => ({
  uploadCourseThumbnailApi: vi.fn(),
  deleteCourseThumbnailApi: vi.fn(),
  uploadIntroVideoApi: vi.fn(),
  deleteIntroVideoApi: vi.fn(),
}));

vi.mock("../../../../components/videoUpload/VideoUpload", () => ({
  default: ({ uploadHandler, deleteHandler, setFileName, fileName, isImage }) => (
    <div data-testid={`video-upload-${isImage ? "image" : "video"}`}>
      <span>{fileName || "empty"}</span>
      <button
        type="button"
        onClick={async () => {
          const data = await uploadHandler?.(
            new File(["x"], isImage ? "t.png" : "v.mp4", {
              type: isImage ? "image/png" : "video/mp4",
            }),
            {}
          );
          if (data?.success) setFileName(data.fileName, data.videoDuration);
        }}
      >
        Upload {isImage ? "thumbnail" : "intro"}
      </button>
      {fileName ? (
        <button type="button" onClick={() => deleteHandler?.().then(() => setFileName(""))}>
          Delete
        </button>
      ) : null}
    </div>
  ),
}));

vi.mock("../../RightPanelBottom", () => ({
  default: () => null,
}));

import {
  uploadCourseThumbnailApi,
  uploadIntroVideoApi,
} from "../../api/courseLessonsApi";

describe("CourseMedia (integration)", () => {
  const courseStateRef = {
    current: {
      _id: "course-abc",
      courseThumbnail: "",
      introVideo: "",
    },
  };
  const setCourseState = vi.fn((next) => {
    courseStateRef.current =
      typeof next === "function" ? next(courseStateRef.current) : next;
  });

  beforeEach(() => {
    vi.clearAllMocks();
    courseStateRef.current.courseThumbnail = "";
    courseStateRef.current.introVideo = "";
  });

  const renderCourseMedia = () =>
    render(
      <CreateCourseContext.Provider
        value={{
          courseState: courseStateRef.current,
          setCourseState,
          courseStateRef,
        }}
      >
        <CourseMedia />
      </CreateCourseContext.Provider>
    );

  it("thumbnail upload persists via API and updates context", async () => {
    uploadCourseThumbnailApi.mockResolvedValue({
      success: true,
      fileName: "learningon/images/thumb",
      updatedFields: { courseThumbnail: "learningon/images/thumb" },
    });

    renderCourseMedia();
    await userEvent.click(screen.getByRole("button", { name: /Upload thumbnail/i }));

    await waitFor(() => {
      expect(uploadCourseThumbnailApi).toHaveBeenCalledWith(
        "course-abc",
        expect.any(File),
        undefined
      );
      expect(courseStateRef.current.courseThumbnail).toBe(
        "learningon/images/thumb"
      );
    });
  });

  it("intro video upload uses intro-video endpoint", async () => {
    uploadIntroVideoApi.mockResolvedValue({
      success: true,
      fileName: "learningon/videos/intro",
      updatedFields: { introVideo: "learningon/videos/intro" },
    });

    renderCourseMedia();
    await userEvent.click(screen.getByRole("button", { name: /Upload intro/i }));

    await waitFor(() => {
      expect(uploadIntroVideoApi).toHaveBeenCalledWith(
        "course-abc",
        expect.any(File),
        undefined
      );
      expect(courseStateRef.current.introVideo).toBe("learningon/videos/intro");
    });
  });
});
