import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import React, { useContext, useEffect } from "react";
import { CreateCourseContext } from "../../state/CreateCourse.jsx";
import { GlobalContext } from "../../state/GlobalContext.jsx";
import CourseContentCourseAccordion from "./CourseContentCourseAccordion.jsx";
import RightPanelBottom from "./RightPanelBottom.jsx";

const CourseContent = () => {
  const { courseState, setCourseState, updateCallback } =
    useContext(CreateCourseContext);
  const { deleteFile } = useContext(GlobalContext);
  // const [lessons, setLessons] = React.useState(courseState.lessons);
  const [expanded, setExpanded] = React.useState("");
  const [subExpanded, setSubExpanded] = React.useState(""); // [panelIndex, subPanelIndex
  const [videoLinks, setVideoLinks] = React.useState([]); // [panelIndex, subPanelIndex
  const [deleteLessonStatus, setDeleteLessonStatus] = React.useState("");

  const deleteLesson = async (index) => {
    setExpanded("");
    setDeleteLessonStatus("deleting");
    for (const subLesson of courseState.lessons[index].subLessons) {
      const videoLink = subLesson.videoLink;
      if (videoLink) {
        await deleteFile(videoLink, true);
      }
    }

    setCourseState({
      ...courseState,
      lessons: [
        ...courseState.lessons.filter((lesson, curIndex) => {
          return curIndex !== index;
        }),
      ],
    });

    setDeleteLessonStatus("deleted");
  };

  const deleteSubLesson = async (index, subIndex) => {
    setSubExpanded("");
    setDeleteLessonStatus("deleting");
    const videoLink = courseState.lessons[index].subLessons[subIndex].videoLink;
    if (videoLink) {
      await deleteFile(videoLink, true);
    }

    setCourseState({
      ...courseState,
      lessons: [
        ...courseState.lessons.map((lesson, curIndex) => {
          if (curIndex === index) {
            return {
              ...lesson,
              subLessons: [
                ...lesson.subLessons.filter((subLesson, curSubIndex) => {
                  return curSubIndex !== subIndex;
                }),
              ],
            };
          }
          return lesson;
        }),
      ],
    });

    setDeleteLessonStatus("deleted");
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

  const handleInput = (event, index, subIndex) => {
    if (subIndex === undefined) {
      setCourseState({
        ...courseState,
        lessons: [
          ...courseState.lessons.map((lesson, curIndex) => {
            if (curIndex === index) {
              return {
                ...lesson,
                [event.target.name]: event.target.value,
              };
            }
            return lesson;
          }),
        ],
      });
    } else {
      setCourseState({
        ...courseState,
        lessons: [
          ...courseState.lessons.map((lesson, curIndex) => {
            if (curIndex === index) {
              return {
                ...lesson,
                subLessons: [
                  ...lesson.subLessons.map((subLesson, curSubIndex) => {
                    if (curSubIndex === subIndex) {
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
      });
    }
  };

  useEffect(() => {
    //videlinks is a 1D array of videoLinks
    const links = [];
    for (const lesson of courseState.lessons) {
      for (const subLesson of lesson.subLessons) {
        if (subLesson.videoLink) {
          links.push(subLesson.videoLink);
        }
      }
    }
    setVideoLinks(links);
  }, []);
  //useEffect calls when videoLink is updated
  useEffect(() => {
    if (deleteLessonStatus === "") return;
    // deleteLessonStatus will at least be "deleting" in case of any file deletion
    // because file deletion is async and takes time -> so before setState is called, it will be "deleting"
    // in case of no file deletion, it is not mandatory to call updateCourse

    console.log(deleteLessonStatus, "updateCourse.lessons");
    const callUpdate = async () => {
      await updateCallback();
    };
    callUpdate();

    setDeleteLessonStatus("");
  }, [courseState.lessons]);

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
              key={index}
              lesson={lesson}
              index={index}
              expanded={expanded}
              handleExpand={handleExpand}
              handleInput={handleInput}
              deleteLesson={deleteLesson}
              deleteSubLesson={deleteSubLesson}
              courseState={courseState}
              setCourseState={setCourseState}
              subExpanded={subExpanded}
              videoLinks={videoLinks}
              setVideoLinks={setVideoLinks}
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
          sx={{
            mt: "1rem",
            backgroundColor: (theme) => theme.palette.background.buttonBgPink,
            boxShadow: "none",
            "&:hover": {
              backgroundColor: (theme) =>
                theme.palette.background.buttonBgPinkDark,
            },
          }}
          onClick={() => {
            setCourseState({
              ...courseState,
              lessons:
                courseState.lessons.length == 0
                  ? [
                      {
                        title: "",
                        description: "",
                        subLessons: [
                          {
                            title: "",
                            videoLink: "",
                            lectureNode: "",
                          },
                        ],
                      },
                    ]
                  : [
                      ...courseState.lessons,
                      {
                        title: "",
                        description: "",
                        subLessons: [
                          {
                            title: "",
                            videoLink: "",
                            lectureNode: "",
                          },
                        ],
                      },
                    ],
            });
          }}
        >
          <AddIcon sx={{ mr: "0.5rem" }} />
          <Typography
            sx={{
              fontWeight: "600",
              color: (theme) => theme.palette.text.primary,
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
