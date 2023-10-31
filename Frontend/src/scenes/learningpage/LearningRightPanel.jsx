import React from "react";
import { useContext } from "react";
import { LearningCourseContext } from "../../state/LearningCourseContex";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

const LearningRightPanel = ({ courseInfo }) => {
    const { openedLesson, setOpenedLesson } = useContext(LearningCourseContext);
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
                                {
                                    courseInfo?.lessons[openedLesson.lesson - 1] ? 
                                    courseInfo?.lessons[openedLesson.lesson - 1].title : ""
                                }
                            </Typography>
                            <Box
                                sx={{
                                    backgroundColor:
                                        theme.palette.background.imagesBg,
                                    padding: isNonMobileScreens ? "2rem" : "1rem",
                                }}
                            >
                                {courseInfo?.lessons[openedLesson.lesson - 1] &&
                                    courseInfo?.lessons[openedLesson.lesson - 1]
                                    .description && (
                                    <Typography
                                        sx={{
                                            fontSize: "1rem",
                                            lineHeight: "1.5rem",
                                            mb: "3rem",
                                            color: theme.palette.grey.grey1000,
                                        }}
                                    >
                                        {courseInfo?.lessons[
                                            openedLesson.lesson - 1
                                        ].description
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
                                            (acc, curr) =>
                                                curr.videoLink != ""
                                                    ? acc + 1
                                                    : acc,

                                            0
                                        )}
                                        &nbsp; Lecture Videos
                                    </b>
                                    &nbsp; & &nbsp;
                                    <b>
                                        {courseInfo?.lessons[
                                            openedLesson.lesson - 1
                                        ].subLessons.reduce(
                                            (acc, curr) =>
                                                curr.lectureNote != ""
                                                    ? acc + 1
                                                    : acc,
                                            0
                                        )}
                                        &nbsp; Lecture Notes
                                    </b>
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    {openedLesson.subLesson !== 0 && (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                gap: "2rem",
                            }}
                        >
                            {courseInfo?.lessons[openedLesson.lesson - 1]
                                .subLessons[openedLesson.subLesson - 1]
                                .videoLink && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "0.5rem",
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
                                            Lecture Video {openedLesson.lesson}.
                                            {openedLesson.subLesson}
                                        </span>
                                        &nbsp;&nbsp;
                                        {
                                            courseInfo?.lessons[
                                                openedLesson.lesson - 1
                                            ].subLessons[
                                                openedLesson.subLesson - 1
                                            ].title
                                        }
                                    </Typography>
                                    <Box
                                        sx={{
                                            width: "100%",
                                            // maxHeight: "500px",
                                            borderRadius: "0.05rem",
                                            border: `1px solid ${theme.palette.grey.grey200}`,
                                            padding: "0",
                                        }}
                                    >
                                        <video
                                            src={
                                                `${
                                                    import.meta.env
                                                        .VITE_REACT_APP_URL
                                                }/images/` +
                                                courseInfo?.lessons[
                                                    openedLesson.lesson - 1
                                                ].subLessons[
                                                    openedLesson.subLesson - 1
                                                ].videoLink
                                            }
                                            controls
                                            style={{
                                                width: "100%",
                                                height: "auto",
                                                padding: "0",
                                                margin: "0",
                                            }}
                                            title={
                                                courseInfo?.lessons[
                                                    openedLesson.lesson - 1
                                                ].subLessons[
                                                    openedLesson.subLesson - 1
                                                ].title
                                            }
                                        />
                                    </Box>
                                </Box>
                            )}

                            {courseInfo?.lessons[openedLesson.lesson - 1]
                                .subLessons[openedLesson.subLesson - 1]
                                .lectureNote && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "0.5rem",
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
                                            courseInfo?.lessons[
                                                openedLesson.lesson - 1
                                            ].subLessons[
                                                openedLesson.subLesson - 1
                                            ].title
                                        }
                                    </Typography>
                                    <Box
                                        sx={{
                                            backgroundColor:
                                                theme.palette.background
                                                    .imagesBg,
                                            padding: isNonMobileScreens ? "2rem" : "1rem",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: "0.9rem",
                                                // perfect letterspacing & lineheight combination for verdana font
                                                letterSpacing: "0.005rem",
                                                lineHeight: "2rem",
                                                
                                               
                                                color: theme.palette.grey
                                                    .grey1000,
                                                fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
                                            }}
                                        >
                                            {courseInfo?.lessons[
                                                openedLesson.lesson - 1
                                            ].subLessons[
                                                openedLesson.subLesson - 1
                                            ].lectureNote
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
