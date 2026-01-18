import { AdvancedVideo, lazyload } from "@cloudinary/react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { colorTokens } from "../../theme";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useContext, useEffect } from "react";
import { cloudinaryCld } from "../../configs/cloudinary.config";
import { LearningCourseContext } from "../../state/LearningCourseContex";
import Questions from "./Questions";
import { Button } from "@mui/material";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import VideoPlayer from "./VideoPlayer";

const LearningRightPanel = ({ courseInfo, courseProgress }) => {
  const { openedLesson } = useContext(LearningCourseContext);
  const isNonMobileScreens = useMediaQuery("(min-width: 900px)");
  const theme = useTheme();



  return (
    <>
      {courseInfo && courseInfo.lessons && (
        <Box sx={{}}>
          {openedLesson.subLesson === 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                gap: "0.5rem",
                padding: "1.5rem",
                ...theme.palette.glassSheet, // Using centralized glass styles
                color: (theme) => theme.palette.learningPage.textPrimary,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: isNonMobileScreens ? "1.5rem" : "1.2rem",
                  mb: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                Lesson {openedLesson.lesson} &nbsp;&nbsp;
                {courseInfo?.lessons[openedLesson.lesson - 1]?.title}
              </Typography>
              <Box
                sx={{
                  padding: "1.5rem",
                  backgroundColor: (theme) => theme.palette.learningPage.cardBg,
                  borderRadius: "0.8rem",
                  border: (theme) => `1px solid ${theme.palette.learningPage.divider}`,
                }}
              >

                {courseInfo?.lessons[openedLesson.lesson - 1] &&
                  courseInfo?.lessons[openedLesson.lesson - 1].description && (
                    <Typography
                      sx={{
                        fontSize: "1.1rem",
                        lineHeight: "1.8rem",
                        mb: "3rem",
                        color: (theme) => theme.palette.learningPage.textPrimary,
                      }}
                    >
                      {courseInfo?.lessons[openedLesson.lesson - 1].description
                        ?.split("\n")
                        .map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                    </Typography>
                  )}

                <Typography
                  sx={{
                    fontSize: "1rem",
                    lineHeight: "1.5rem",
                    color: (theme) => theme.palette.learningPage.textSecondary,
                  }}
                >
                  This lesson has total &nbsp;
                  <b>
                    {courseInfo?.lessons[
                      openedLesson.lesson - 1
                    ].subLessons.reduce(
                      (acc, curr) => (curr.videoLink != "" ? acc + 1 : acc),

                      0
                    )}
                    &nbsp; Lecture Videos
                  </b>
                  &nbsp; & &nbsp;
                  <b>
                    {courseInfo?.lessons[
                      openedLesson.lesson - 1
                    ].subLessons.reduce(
                      (acc, curr) => (curr.lectureNote != "" ? acc + 1 : acc),
                      0
                    )}
                    &nbsp; Lecture Notes
                  </b>
                </Typography>
              </Box>
            </Box>
          )}
          {openedLesson.subLesson ===
            courseInfo?.lessons[openedLesson.lesson - 1]?.subLessons?.length +
            1 && <Questions courseInfo={courseInfo} courseProgress={courseProgress} />}
          {openedLesson.subLesson > 0 &&
            openedLesson.subLesson <=
            courseInfo?.lessons[openedLesson.lesson - 1]?.subLessons
              ?.length && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  gap: "2rem",
                }}
              >
                {courseInfo?.lessons[openedLesson.lesson - 1]?.subLessons[
                  openedLesson.subLesson - 1
                ]?.videoLink && (
                    <VideoPlayer courseInfo={courseInfo} openedLesson={openedLesson} courseProgress={courseProgress} />
                  )}

                {courseInfo?.lessons[openedLesson.lesson - 1].subLessons[
                  openedLesson.subLesson - 1
                ].lectureNote && (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                        padding: "1.5rem",
                        ...theme.palette.glassSheet,
                        color: (theme) => theme.palette.learningPage.textPrimary,
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          fontSize: isNonMobileScreens ? "1.3rem" : "1.1rem",
                          mb: "1rem",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          Lecture Note {openedLesson.lesson}.
                          {openedLesson.subLesson}
                        </span>
                        &nbsp;&nbsp;
                        {
                          courseInfo?.lessons[openedLesson.lesson - 1].subLessons[
                            openedLesson.subLesson - 1
                          ].title
                        }
                      </Typography>
                      <Box
                        sx={{
                          padding: "1.5rem",
                          backgroundColor: (theme) => theme.palette.learningPage.cardBg,
                          borderRadius: "0.8rem",
                          border: (theme) => `1px solid ${theme.palette.learningPage.divider}`,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "1rem",
                            letterSpacing: "0.005rem",
                            lineHeight: "2rem",
                            color: (theme) => theme.palette.learningPage.textPrimary,
                            fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
                          }}
                        >
                          {courseInfo?.lessons[
                            openedLesson.lesson - 1
                          ].subLessons[openedLesson.subLesson - 1].lectureNote
                            ?.split("\n")
                            .map((line, index) => (
                              <React.Fragment key={index}>
                                {line}
                                <br />
                              </React.Fragment>
                            ))}
                        </Typography>
                      </Box>
                    </Box>
                  )}
              </Box>
            )}
        </Box>
      )}
    </>
  );
};

export default LearningRightPanel;
