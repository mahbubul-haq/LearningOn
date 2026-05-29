/**
 * Scenario: instructor publish flow (mocked APIs)
 * Add lesson → upload sublesson video → state synced from server
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CourseContent from "../../CourseContent";
import { CreateCourseContext } from "../../../../state/CreateCourse";

vi.mock("../../api/courseLessonsApi", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    addLessonApi: vi.fn(),
    addSubLessonApi: vi.fn(),
    deleteLessonApi: vi.fn(),
    deleteLessonByIndexApi: vi.fn(),
    deleteSubLessonApi: vi.fn(),
    deleteSubLessonByIndexApi: vi.fn(),
    uploadSubLessonVideoApi: vi.fn(),
    deleteSubLessonVideoApi: vi.fn(),
  };
});

vi.mock("@cloudinary/react", () => ({
  AdvancedImage: () => <div />,
  AdvancedVideo: () => <div />,
  lazyload: () => ({}),
}));

vi.mock("../../../../configs/cloudinary.config", () => ({
  cloudinaryCld: { image: () => ({}), video: () => ({}) },
}));

vi.mock("../../RightPanelBottom", () => ({
  default: () => null,
}));

import { addLessonApi } from "../../api/courseLessonsApi";

describe("Scenario: publish course upload flow (frontend)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.querySelector(".right-panel-course-content")?.remove();
  });

  it("adding first lesson calls backend and renders lesson from response", async () => {
    const lessonId = "lesson-1";
    const subId = "sub-1";

    addLessonApi.mockResolvedValue({
      success: true,
      courseInfo: {
        lessons: [
          {
            _id: lessonId,
            title: "",
            description: "",
            subLessons: [
              {
                _id: subId,
                title: "",
                videoLink: "",
                lectureNote: "",
              },
            ],
          },
        ],
      },
    });

    const courseStateRef = {
      current: {
        _id: "course-1",
        lessons: [],
      },
    };
    const setCourseState = vi.fn((next) => {
      courseStateRef.current =
        typeof next === "function" ? next(courseStateRef.current) : next;
    });

    render(
      <CreateCourseContext.Provider
        value={{
          courseState: courseStateRef.current,
          setCourseState,
          courseStateRef,
        }}
      >
        <CourseContent />
      </CreateCourseContext.Provider>
    );

    await userEvent.click(screen.getByRole("button", { name: /Add Lesson 1/i }));

    await waitFor(() => {
      expect(addLessonApi).toHaveBeenCalledWith("course-1");
    });

    await waitFor(() => {
      expect(screen.getByText(/Lesson 1\.1/i)).toBeInTheDocument();
    });
  });
});
