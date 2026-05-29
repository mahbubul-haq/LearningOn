import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import React, { useContext, useEffect, useCallback } from "react";
import { CreateCourseContext } from "../../state/CreateCourse.jsx";
import CourseContentCourseAccordion from "./CourseContentCourseAccordion.jsx";
import RightPanelBottom from "./RightPanelBottom.jsx";
import { alpha } from "@mui/material/styles";
import {
  addLessonApi,
  addSubLessonApi,
  deleteLessonApi,
  deleteSubLessonApi,
} from "./api/courseLessonsApi.js";

const collectVideoLinks = (lessons = []) => {
  const links = [];
  for (const lesson of lessons) {
    for (const subLesson of lesson.subLessons || []) {
      if (subLesson.videoLink) {
        links.push(subLesson.videoLink);
      }
    }
  }
  return links;
};

const CourseContent = () => {
  const { courseState, setCourseState, courseStateRef } =
    useContext(CreateCourseContext);
  const [expanded, setExpanded] = React.useState("");
  const [subExpanded, setSubExpanded] = React.useState("");
  const [videoLinks, setVideoLinks] = React.useState([]);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isAdding, setIsAdding] = React.useState(false);

  const applyLessonsFromServer = useCallback((lessons) => {
    courseStateRef.current = {
      ...courseStateRef.current,
      lessons,
    };
    setCourseState({ ...courseStateRef.current });
    // setVideoLinks(collectVideoLinks(lessons));
  }, [courseStateRef, setCourseState]);

  const addLesson = async () => {
    const courseId = courseStateRef.current?._id;
    if (!courseId) return;

    setIsAdding(true)
    try {
      const data = await addLessonApi(courseId);
      if (data?.success) {
        applyLessonsFromServer(data.courseInfo.lessons)
      }
    } catch (err) {
      console.error("Failed to add lesson", err);
    } finally {
      setIsAdding(false);
    }
  };

  const addSubLesson = async (lessonIndex) => {
    const courseId = courseStateRef.current?._id;
    const lesson = courseStateRef.current.lessons[lessonIndex];
    if (!courseId || !lesson?._id) return;

    setIsAdding(true);
    try {
      const data = await addSubLessonApi(courseId, lesson._id);
      if (data?.success) {
        applyLessonsFromServer(data.courseInfo.lessons);
      }
    } catch (err) {
      console.error("Failed to add sublesson", err);
    } finally {
      setIsAdding(false);
    }
  };

  const deleteLesson = async (lessonId) => {
    const courseId = courseStateRef.current?._id;
    if (!courseId) return;

    const lesson = courseStateRef.current.lessons.find((l) => l._id == lessonId);
    if (!lesson) return;

    setExpanded("");
    setIsDeleting(true);

    try {
      const data = await deleteLessonApi(courseId, lesson);

      if (data?.success) {
        applyLessonsFromServer(data.courseInfo.lessons);
      }
    } catch (err) {
      console.error("Failed to delete lesson", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const deleteSubLesson = async (lessonId, subLessonId) => {
    const courseId = courseStateRef.current?._id;
    if (!courseId) return;

    const lesson = courseStateRef.current.lessons.find((l) => l._id == lessonId);
    if (!lesson) return;

    const subLesson = lesson?.subLessons?.find((s) => s._id == subLessonId);
    if (!subLesson) return;

    setSubExpanded("");
    setIsDeleting(true);

    try {
      const data = await deleteSubLessonApi(courseId, lesson._id, subLesson._id);

      if (data?.success) {
        applyLessonsFromServer(data.courseInfo.lessons);
      }
    } catch (err) {
      console.error("Failed to delete sublesson", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleExpand = (event, index, subIndex) => {
    if (subIndex === undefined) {
      if (expanded === `panel${index}`) {
        setExpanded("");
        setSubExpanded("");
      } else {
        setExpanded(`panel${index}`);
        setSubExpanded("");
      }
    } else {
      if (subExpanded === `subPanel${index}${subIndex}`) {
        setSubExpanded("");
      } else {
        setSubExpanded(`subPanel${index}${subIndex}`);
      }
    }
  };

  const handleInput = useCallback((event, index, subIndex) => {
    if (subIndex === undefined) {
      setCourseState((prevState) => ({
        ...prevState,
        lessons: [
          ...prevState.lessons.map((lesson, curIndex) => {
            if (curIndex === index) {
              return {
                ...lesson,
                [event.target.name]: event.target.value,
              };
            }
            return lesson;
          }),
        ],
      }));
    } else {
      setCourseState((prevState) => ({
        ...prevState,
        lessons: [
          ...prevState.lessons.map((lesson, curIndex) => {
            if (curIndex === index) {
              return {
                ...lesson,
                subLessons: [
                  ...lesson.subLessons.map((subLesson, curSubIndex) => {
                    if (curSubIndex === subIndex) {
                      if (event.target.name1 === "videoDuration") {
                        return {
                          ...subLesson,
                          [event.target.name]: event.target.value,
                          [event.target.name1]: event.target.value1,
                        };
                      }
                      return {
                        ...subLesson,
                        [event.target.name]: event.target.value,
                      };
                    }
                    return subLesson;
                  }),
                ],
              };
            }
            return lesson;
          }),
        ],
      }));
    }
  }, [setCourseState]);

  useEffect(() => {
    setVideoLinks(collectVideoLinks(courseState.lessons));
  }, []);

  useEffect(() => {
    let element = document.querySelector(".right-panel-course-content");
    if (element) {
      element.style.opacity = 1;
      element.style.transform = "translateY(0)";
    }
  }, []);

  return (
    <Box
      className="right-panel-course-content"
      sx={{
        width: "100%",
        opacity: 0,
        transform: "translateY(4rem)",
        transition: "opacity 0.5s, transform 0.5s",
      }}
    >
      <>
        {courseState.lessons?.length > 0 ? (
          courseState.lessons.map((lesson, index) => (
            <CourseContentCourseAccordion
              key={lesson._id || `lesson-${index}`}
              lesson={lesson}
              index={index}
              expanded={expanded}
              handleExpand={handleExpand}
              handleInput={handleInput}
              deleteLesson={deleteLesson}
              deleteSubLesson={deleteSubLesson}
              addSubLesson={addSubLesson}
              courseState={courseState}
              setCourseState={setCourseState}
              subExpanded={subExpanded}
              videoLinks={videoLinks}
              setVideoLinks={setVideoLinks}
              isDeleting={isDeleting}
              isAdding={isAdding}
              onLessonsSynced={applyLessonsFromServer}
            />
          ))
        ) : (
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: "1.5rem",
              color: (theme) => theme.palette.grey.grey400,
              textAlign: "center",
            }}
          >
            No lessons added yet!
          </Typography>
        )}

        <Fab
          variant="extended"
          size="medium"
          disabled={isDeleting || isAdding}
          sx={{
            mt: "1rem",
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
            color: (theme) => theme.palette.primary.main,
            border: "1px solid",
            borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
            boxShadow: "none",
            "&:hover": {
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.2),
              borderColor: (theme) => theme.palette.primary.main,
            },
          }}
          onClick={addLesson}
        >
          <AddIcon sx={{ mr: "0.5rem" }} />
          <Typography
            sx={{
              fontWeight: "600",
              color: "inherit",
              textTransform: "capitalize",
            }}
          >
            Add Lesson {courseState.lessons.length + 1}
          </Typography>
        </Fab>
      </>
      <RightPanelBottom />
    </Box>
  );
};

export default CourseContent;
