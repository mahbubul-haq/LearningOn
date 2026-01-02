import { AdvancedVideo, lazyload } from "@cloudinary/react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
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
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
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
                padding: "1rem",
                ...theme.palette.glassMorphismCard,
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
                  Lesson {openedLesson.lesson}
                </span>
                &nbsp;&nbsp;
                {courseInfo?.lessons[openedLesson.lesson - 1]
                  ? courseInfo?.lessons[openedLesson.lesson - 1].title
                  : ""}
              </Typography>
              <Box
                sx={{
                  padding: isNonMobileScreens ? "1rem" : "1rem",
                  ...theme.palette.glassMorphismCard,
                  background: 'rgba(255, 255,255, 0.2)',
                  border: "none",
                  boxShadow: "none",
                }}
              >
                {courseInfo?.lessons[openedLesson.lesson - 1] &&
                  courseInfo?.lessons[openedLesson.lesson - 1].description && (
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        lineHeight: "1.5rem",
                        mb: "3rem",
                        color: theme.palette.grey.grey1000,
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

                    color: theme.palette.grey.grey1000,
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
            courseInfo?.lessons[openedLesson.lesson - 1].subLessons?.length +
            1 && <Questions courseInfo={courseInfo} courseProgress={courseProgress} />}
          {openedLesson.subLesson > 0 &&
            openedLesson.subLesson <=
            courseInfo?.lessons[openedLesson.lesson - 1].subLessons
              ?.length && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  gap: "2rem",
                }}
              >
                {courseInfo?.lessons[openedLesson.lesson - 1].subLessons[
                  openedLesson.subLesson - 1
                ].videoLink && (
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
                        padding: "0.7rem",
                        ...theme.palette.glassMorphismCard,
                        background: 'rgba(255, 255,255, 0.2)',
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
                          padding: isNonMobileScreens ? "1rem" : "1rem",
                          ...theme.palette.glassMorphismCard,
                          border: "none",
                          boxShadow: "none",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "0.9rem",
                            // perfect letterspacing & lineheight combination for verdana font
                            letterSpacing: "0.005rem",
                            lineHeight: "2rem",

                            color: theme.palette.grey.grey1000,
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
