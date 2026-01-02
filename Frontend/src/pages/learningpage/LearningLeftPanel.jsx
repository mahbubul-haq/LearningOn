import { CircularProgress, Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import FlexBetween from "../../components/FlexBetween";
import LeftPanelTop from "./LeftPanelTop";
// import Checkbox from "@mui/material/Checkbox";
import { useTheme } from "@emotion/react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useContext } from "react";
import { StyledCheckbox } from "../../components/StyledButton";
import { LearningCourseContext } from "../../state/LearningCourseContex";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { CiPlay1 } from "react-icons/ci";
import { FiPlay } from "react-icons/fi";
import { PiPlayBold } from "react-icons/pi";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { BsCheckCircleFill } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckIcon from '@mui/icons-material/Check';
import "./LearningPage.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AdjustIcon from '@mui/icons-material/Adjust';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

export const LearningLeftPanel = ({ courseInfo, scrollTop, courseProgress }) => {
  const {
    openedLesson,
    setOpenedLesson,
    expandedLessons,
    setExpandedLessons,
    setOpenDrawer,
  } = useContext(LearningCourseContext);



  const getSubLessonProgress = (lessonId, subLessonId) => {
    let subLesson = courseProgress?.lessonsProgress?.find((lesson) => lesson.lessonId === lessonId)?.subLessonsProgress?.find((subLesson) => subLesson.subLessonId === subLessonId);
    if (subLesson?.completed) {
      return 100;
    }
    if (subLesson?.watchTime > 0) {
      return subLesson?.watchTime / subLesson?.videoDuration * 100;
    }
    return 0;
  }

  const getLessonProgress = (lessonId) => {
    let lesson = courseProgress?.lessonsProgress?.find((lesson) => lesson.lessonId === lessonId);
    if (lesson?.completed) {
      return 100;
    }
    let completedSubLessons = lesson?.subLessonsProgress?.filter((subLesson) => subLesson?.completed)?.length || 0;
    return completedSubLessons / Math.max(lesson?.subLessonsProgress?.length, 1) * 100;

  }

  const theme = useTheme();

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");



  return (
    <Box className="custom-scrollbar-thin"
      sx={{
        position: "sticky",
        top: "2rem",
        height: `calc(100vh - 4rem)`,
        ...theme.palette.glassMorphismCard,
        border: "none",
        overflow: "hidden",
        display: "grid",
        gridTemplateRows: "auto auto 1fr",
        gap: "0",
      }}>
      <LeftPanelTop courseInfo={courseInfo} courseProgress={courseProgress} />
      <Divider sx={{ mt: "0.5rem" }} />

      <Box className="custom-scrollbar-thin"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0rem",
          overflow: "auto",
        }}
      >
        {courseInfo?.lessons?.length > 0 ? (
          <React.Fragment key={courseInfo.lessons?.length}>
            {courseInfo.lessons.map((lesson, index) => (

              <Accordion key={index}
                expanded={expandedLessons.includes(index)}
                disableGutters
                elevation={0}
                onChange={() => {
                  if (expandedLessons.includes(index)) {
                    setExpandedLessons(expandedLessons.filter((lesson) => lesson !== index));
                  } else {
                    setExpandedLessons([...expandedLessons, index]);
                  }
                }}
                sx={{
                  background: "transparent"
                }}>

                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    background:
                      openedLesson.subLesson === 0 &&
                        openedLesson.lesson === index + 1
                        ? `linear-gradient(to right, #ffffff1a, #ffffff86)`
                        : "transparent",

                    boxShadow: openedLesson.subLesson === 0 && openedLesson.lesson === index + 1 ? `inset 4px 0 0 0 ${theme.palette.secondary.main},0 4px 12px rgba(0,0,0,0.03)` : "",
                    "&:hover": {
                      background: `linear-gradient(to right, #ffffff1a, #ffffff3f)`,
                    },
                    display: "flex",
                    alignItems: "center",

                  }}>

                  <Typography variant="h7" sx={{ display: "flex", alignItems: "center", mr: "2rem" }}>
                    {(index + 1).toString().padStart(2, "0")}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.text.primary,
                        fontSize: "0.9rem",
                      }}
                    >

                      {lesson?.title}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.text.primary,
                        fontSize: "0.7rem",
                      }}
                    >
                      {lesson?.subLessons?.length} Lessons
                    </Typography>



                  </Box>
                </AccordionSummary>

                <AccordionDetails sx={{ p: 0 }}>

                  <Box
                    sx={{
                      // height: expandedLessons.includes(index + 1)
                      //   ? "auto"
                      //   : "0px",
                      // maxHeight: expandedLessons.includes(index + 1)
                      //   ? "1000px"
                      //   : "0px",
                      transition: "all 0.5s ease",
                      ///add webkit transition
                      // transition not working
                      // overflow: "hidden",
                      // border: "2px solid green",
                    }}
                  >
                    {lesson.subLessons?.map((subLesson, subIndex) => (
                      <FlexBetween
                        key={subLesson.title + subIndex}

                        sx={{
                          "&&": {
                            // justifyContent: "flex-start",
                            // alignItems: "center",
                            cursor: "pointer",
                            // p: "0.9rem 1rem",
                            p: 0,
                            gap: "0.5rem",
                            // border: "2px solid green",
                            display: "grid",
                            gridTemplateColumns: "auto 1fr",
                            gridTemplateRows: "100%",
                            // paddingLeft: isNonMobileScreens ? "2rem" : "1.5rem",
                          },
                          background:
                            (openedLesson.subLesson === subIndex + 1 &&
                              openedLesson.lesson === index + 1) ?
                              "linear-gradient(to right, #ffffff1a, #ffffff86)" : "transparent",
                          boxShadow: openedLesson.subLesson === subIndex + 1 && openedLesson.lesson === index + 1 ? `inset 4px 0 0 0 ${theme.palette.secondary.main},0 4px 12px rgba(0,0,0,0.03)` : "",

                          "&:hover": {
                            background: "linear-gradient(to right, #ffffff1a, #ffffff3f)",
                          },
                        }}
                        onClick={() => {
                          setOpenedLesson({
                            lesson: index + 1,
                            subLesson: subIndex + 1,
                          });
                          setOpenDrawer(false);
                          scrollTop();
                        }}
                      >
                        <Box sx={{
                          display: "flex",
                          alignItems: "center",
                          height: "100%",
                          minHeight: "3.5rem",
                          // border: "2px solid white",
                          // justifyContent: "center",
                          flexDirection: "column",
                          justifyContent: "center",
                          // width: "2rem",
                          // height: "2rem",
                          // borderRadius: "500px",
                          // backgroundColor: (openedLesson.subLesson === subIndex + 1 && openedLesson.lesson === index + 1) || getSubLessonProgress(lesson._id?.toString(), subLesson._id?.toString()) > 99 ? theme.palette.secondary.main : "rgba(255, 255, 255, 0.5)",
                          // boxShadow: openedLesson.subLesson === subIndex + 1 && openedLesson.lesson === index + 1 ? `0 0 10px 0 ${theme.palette.secondary.main}` : "",
                          overflow: "hidden",
                          // alignSelf: "center",
                          // flexShrink: 0,
                          transition: "all 0.3s ease-in-out",
                          pl: "1rem",
                        }}>


                          {/* <CircularProgress variant="determinate" value={75} thickness={7} size={20} sx={{
                        color: "#31a3e6ff",
                      }} /> */}
                          {/* <PlayCircleIcon sx={{
                        color: "#5cb983ff",
                        //background: "#5cb983ff",
                        fontSize: "2rem",
                        height: "2rem",
                        width: "2rem",
                        borderRadius: "500px",
                        padding: "0",
                        boxShadow: "0 0 10px 0 #5cb983ff",
                      }} /> */}
                          {getSubLessonProgress(lesson._id?.toString(), subLesson._id?.toString()) > 99 ?
                            // <CheckIcon
                            //   style={{
                            //     // background: "rgba(255,255,255, 0.9)",
                            //     fontSize: "1rem",
                            //     color: "#1febfaff",
                            //     padding: 0,
                            //   }}
                            // />

                            <CheckCircleOutlineIcon
                              size={20}
                              style={{
                                // background: "rgba(255,255,255, 0.9)",
                                //fontSize: "1rem",
                                color: "#1febfaff",
                                padding: 0,

                              }}
                            />

                            : openedLesson.subLesson === subIndex + 1 && openedLesson.lesson === index + 1 ?

                              // <PiPlayBold
                              //   style={{
                              //     color: "#1febfaff",
                              //     height: "1rem",
                              //     width: "1rem",
                              //   }}
                              // />

                              <PlayCircleOutlineIcon
                                size={20}
                                style={{
                                  // background: "rgba(255,255,255, 0.9)",
                                  // fontSize: "1rem",
                                  color: "#1febfaff",
                                  padding: 0,

                                }}
                              />

                              : getSubLessonProgress(lesson._id?.toString(), subLesson._id?.toString()) > 0 ?
                                <RadioButtonUncheckedIcon
                                  size={20}
                                  style={{
                                    // background: "rgba(255,255,255, 0.9)",
                                    color: "#707070ff",
                                    padding: 0,
                                  }}
                                />
                                :


                                <AdjustIcon
                                  size={20}
                                  style={{
                                    // background: "rgba(255,255,255, 0.9)",
                                    color: "#707070ff",
                                    padding: 0,
                                  }}
                                />

                          }

                        </Box>
                        <Box
                          sx={{
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            gap: "0.7rem",
                            display: "flex",
                            py: "0.5rem",
                            // minHeight: "rem",
                            // border: "2px solid black"
                          }}
                        >
                          <Typography
                            variant="h7bold"
                          >
                            {index + 1}.{subIndex + 1}{" "}
                          </Typography>
                          <Typography
                            variant="h7"
                          >
                            {subLesson.title}
                          </Typography>
                        </Box>
                      </FlexBetween>
                    ))}
                    {lesson.questions?.length > 0 && (
                      <FlexBetween
                        key={lesson.questions[0].question + index}

                        sx={{
                          "&&": {
                            justifyContent: "flex-start",
                            alignItems: "center",
                            cursor: "pointer",
                            p: "0.9rem 1rem",
                            gap: "0.5rem",
                          },
                          backgroundColor:
                            openedLesson.subLesson === lesson.subLessons.length + 1 &&
                              openedLesson.lesson === index + 1
                              ? `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
                              : "transparent",
                          "&:hover": {
                            backgroundColor: theme.palette.primary.light,
                          },
                        }}
                        onClick={() => {
                          setOpenedLesson({
                            lesson: index + 1,
                            subLesson: lesson.subLessons.length + 1,
                          });
                          setOpenDrawer(false);
                          scrollTop();
                        }}
                      >
                        <Box sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "2rem",
                          height: "2rem",
                          borderRadius: "500px",
                          backgroundColor: 1 == 0 ? "#02b68fff" : "rgba(255, 255, 255, 0.7)",
                          boxShadow: 1 == 0 ? "0 0 10px 0 #02b68fff" : "",
                        }}>
                          <CircularProgress variant="determinate" value={75} thickness={5} size={16} sx={{
                            color: "#35a0dfff",
                          }} />


                        </Box>
                        <Box
                          sx={{
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            gap: "0.7rem",
                            display: "flex",
                            // border: "2px solid black"
                          }}
                        >
                          <Typography
                            variant="h7bold"
                          >
                            {index + 1}.{lesson.subLessons.length + 1}{" "}
                          </Typography>
                          <Typography
                            variant="h7"
                          >
                            Lesson {index + 1} Questions
                          </Typography>
                        </Box>
                      </FlexBetween>
                    )}
                  </Box>
                </AccordionDetails>
              </Accordion>

            ))}
          </React.Fragment>
        ) : (
          <Typography
            variant="body1"
            sx={{
              color: (theme) => theme.palette.grey.grey600,
              fontSize: "0.9rem",
            }}
          >
            No lessons found
          </Typography>
        )}
      </Box>
    </Box >
  );
};
