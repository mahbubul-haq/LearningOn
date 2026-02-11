import { CircularProgress, Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { colorTokens } from "../../theme";
import FlexBetween from "../../components/FlexBetween";
import { useTheme } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useContext } from "react"
import { LearningCourseContext } from "../../state/LearningCourseContex";
import "./LearningPage.css";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdOutlinePlayCircle } from "react-icons/md";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import QuizIcon from '@mui/icons-material/Quiz';
import { Button } from "@mui/material";
import QuizAttemptDialog from "./QuizAttemptDialog";

const LeftPanelLessons = ({ scrollTop, courseInfo, courseProgress }) => {

  const theme = useTheme();

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
    return lesson?.progressPercentage || 0;

  }
  const {
    openedLesson,
    setOpenedLesson,
    expandedLessons,
    setExpandedLessons,
    setOpenDrawer,
    quizStatus,
    setQuizStatus,
  } = useContext(LearningCourseContext);
  return (
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
            // pb: "2rem",
            background: "transparent",
            "&&:before": {
              display: "none",
            },
          }}>

          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: (theme) => theme.palette.learningPage.textPrimary }} />}
            sx={{
              "&:hover": {
                backgroundColor: (theme) => theme.palette.learningPage.lessonHover,
              },
              display: "flex",
              alignItems: "center",
              minHeight: "3.5rem",
              py: "0.4rem",
              color: (theme) => theme.palette.learningPage.textPrimary,
            }}>

            <Typography variant="h7" sx={{ display: "flex", alignItems: "center", mr: "1.5rem" }}>
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
                  color: (theme) => theme.palette.learningPage.textPrimary,
                  fontSize: "0.9rem",
                  fontWeight: "500",
                }}
              >
                {lesson?.title}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: (theme) => theme.palette.learningPage.textSecondary,
                  fontSize: "0.7rem",
                }}
              >
                {lesson?.subLessons?.length} lesson{lesson?.subLessons?.length > 1 ? "s" : ""}
              </Typography>
            </Box>
          </AccordionSummary>

          <AccordionDetails sx={{ p: 0 }}>

            {lesson.subLessons?.map((subLesson, subIndex) => (
              <FlexBetween
                key={subLesson.title + subIndex}

                sx={{
                  "&&": {
                    width: "100%",
                    cursor: "pointer",
                    pl: "3.1rem",
                    gap: "0.5rem",
                  },
                  background:
                    (openedLesson.subLesson === subIndex + 1 &&
                      openedLesson.lesson === index + 1) ?
                      (theme) => theme.palette.learningPage.lessonActive : "transparent",
                  // add 4ppx left boxShadoww inset
                  boxShadow: openedLesson.subLesson === subIndex + 1 &&
                    openedLesson.lesson === index + 1 ? (theme) => `inset 4px 0px 0px ${theme.palette.secondary.main}` : "none",

                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.learningPage.lessonHover,
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
                <Typography
                  variant="h7"
                  sx={{ fontSize: "0.7rem", color: theme.palette.text.secondary }}
                >
                  {index + 1}.{subIndex + 1}{" "}
                </Typography>

                <Box
                  sx={{
                    flex: 1,
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "0.7rem",
                    display: "flex",
                    py: "0.5rem",
                    minHeight: "3.5rem",
                    pr: "1.5rem",

                  }}
                >
                  <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    flexDirection: "column",
                    justifyContent: "center",
                    // overflow: "hidden",
                    transition: "all 0.3s ease-in-out",
                    pl: "1rem",
                    color: theme.palette.primary.dark1,
                  }}>
                    {getSubLessonProgress(lesson._id?.toString(), subLesson._id?.toString()) > 99 ?

                      <FaRegCircleCheck
                        style={{
                          height: "0.9rem",
                          width: "0.9rem",
                          color: theme.palette.secondary.main,
                          padding: 0,
                        }}
                      />
                      : courseInfo?.lessons[index]?.subLessons[subIndex]?.videoLink ?
                        <MdOutlinePlayCircle
                          style={{
                            // color: "#1febfaff",
                            height: "0.9rem",
                            width: "0.9rem",
                            transform: "scale(1.15)",
                          }}
                        />
                        :
                        <MdOutlineSpeakerNotes
                          style={{
                            // color: "#1febfaff",
                            height: "0.9rem",
                            width: "0.9rem",
                          }}
                        />
                    }
                  </Box>
                  <Typography
                    variant="h7"

                  >
                    {subLesson.title}
                  </Typography>
                </Box>
              </FlexBetween>
            ))}
            {lesson.questions?.questions?.length > 0 && (<>
              <Button
                onClick={() => {
                  setQuizStatus({
                    lessonNo: index + 1,
                    status: "attempting",
                  });
                }}
                title={getLessonProgress(lesson._id?.toString()) > 99 ? "" : "Lesson not completed"}
                sx={{
                  mx: "auto",
                  width: `calc(100% - 6.2rem)`,
                  // Gradient Background
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  "&:hover": {
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                    transform: "scale(1.02)",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.21)",

                  },
                  borderRadius: "0.7rem",
                  p: "0.5rem 1rem",
                  color: colorTokens.white.pure,
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  my: "1rem",
                  cursor: getLessonProgress(lesson._id?.toString()) > 99 ? "pointer" : "not-allowed",
                  opacity: getLessonProgress(lesson._id?.toString()) > 99 ? 1 : 0.5,
                }}>
                <QuizIcon sx={{ color: colorTokens.white.pure }} />
                {/*  */}
                {`TAKE MODULE ${(index + 1).toString().padStart(2, "0")} QUIZ`}

              </Button>

              <QuizAttemptDialog />
            </>
            )}
          </AccordionDetails>
        </Accordion>

      ))}
    </React.Fragment>
  )
}

export default LeftPanelLessons