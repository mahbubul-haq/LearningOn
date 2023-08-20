import React, { useEffect } from "react";
import { useContext } from "react";
import Navbar from "../../components/Navbar";
import { Divider, useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import { HomePageContext } from "../../state/HomePageState";
import Box from "@mui/material/Box";
import LearningPageTop from "./LearningPageTop";
import { LearningLeftPanel } from "./LearningLeftPanel";
import LearningRightPanel from "./LearningRightPanel";
import { useTheme } from "@mui/material/styles";
import { StyledButton } from "../../components/StyledButton";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Typography from "@mui/material/Typography";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { LearningCourseContext } from "../../state/LearningCourseContex";

const LearningPage = () => {
    const { courseId } = useParams();
    const [courseInfo, setCourseInfo] = React.useState({});
    const { courses, getCourses } = useContext(HomePageContext);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const theme = useTheme();
    const { openedLesson, setOpenedLesson } = useContext(LearningCourseContext);

    useEffect(() => {
        //console.log(courseId, courses);
        if (courseId && courses && courses.length > 0) {
            const course = courses.find((c) => c._id == courseId);
            setCourseInfo(course);
        }
    }, [courseId, courses]);

    const handleNext = () => {
        if (openedLesson.subLesson === 0) {
            setOpenedLesson({
                lesson: openedLesson.lesson,
                subLesson: openedLesson.subLesson + 1,
            });
        } else {
            if (
                openedLesson.subLesson ===
                courseInfo.lessons[openedLesson.lesson - 1].subLessons.length
            ) {
                setOpenedLesson({
                    lesson: openedLesson.lesson + 1,
                    subLesson: 0,
                });
            } else {
                setOpenedLesson({
                    lesson: openedLesson.lesson,
                    subLesson: openedLesson.subLesson + 1,
                });
            }
        }
    };

    const handlePrev = () => {
        if (openedLesson.subLesson === 0) {
            if (openedLesson.lesson > 1) {
                setOpenedLesson({
                    lesson: openedLesson.lesson - 1,
                    subLesson:
                        courseInfo.lessons[openedLesson.lesson - 2].subLessons
                            .length,
                });
            }
        } else {
            setOpenedLesson({
                lesson: openedLesson.lesson,
                subLesson: openedLesson.subLesson - 1,
            });
        }
    };

    useEffect(() => {
        if (!courses || courses.length == 0) {
            getCourses();
        }
    }, []);
    return (
        <>
            <Navbar />
            <Box
                sx={{
                    marginTop: isNonMobileScreens ? "5rem" : "4rem",
                    height: "calc(100% - 5rem)",
                    overflowY: "auto",
                    width: "100%",
                }}
            >
                <LearningPageTop courseInfo={courseInfo} />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",

                        padding: "0 5rem",
                        width: "100%",
                    }}
                >
                    <Box
                        sx={{
                            width: "30%",

                            py: "4rem",
                            borderRight: `1px dashed ${theme.palette.customDivider.main}`,
                        }}
                    >
                        <LearningLeftPanel courseInfo={courseInfo} />
                    </Box>

                    {/* <Divider
                        sx={{
                            color: "red",
                            borderRight: "3px solid black",
                        }}
                        orientation="vertical"
                        flexItem
                        
                    /> */}

                    <Box
                        sx={{
                            width: "65%",
                            // border: "1px solid red",
                            py: "4rem",
                        }}
                    >
                        <LearningRightPanel courseInfo={courseInfo} />
                        <Box
                            sx={{
                                mt: "3rem",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            {openedLesson.lesson == 1 &&
                            openedLesson.subLesson == 0 ? (
                                <Box></Box>
                            ) : (
                                <StyledButton
                                    sx={{
                                        textTransform: "capitalize",
                                        fontWeight: "600",

                                        cursor: "pointer",
                                        "&&": {
                                            padding: "0.4rem 0.8rem",
                                            fontWeight: "600",
                                            background: "transparent",
                                            color: (theme) =>
                                                theme.palette.primary.dark,
                                            "&:hover": {
                                                color: (theme) =>
                                                    theme.palette.primary
                                                        .darker,
                                                background: (theme) =>
                                                    theme.palette.background
                                                        .alt,
                                            },
                                        },
                                    }}
                                    onClick={handlePrev}
                                >
                                    <KeyboardDoubleArrowLeftIcon />
                                    <Typography
                                        sx={{
                                            fontWeight: "600",
                                            pl: "0.5rem",
                                        }}
                                    >
                                        Prev
                                    </Typography>
                                </StyledButton>
                            )}
                            {openedLesson.lesson ==
                                courseInfo?.lessons?.length &&
                            openedLesson.subLesson ==
                                courseInfo?.lessons[openedLesson.lesson - 1]
                                    .subLessons.length ? (
                                <Box></Box>
                            ) : (
                                <StyledButton
                                    sx={{
                                        textTransform: "capitalize",
                                        fontWeight: "600",

                                        cursor: "pointer",
                                        "&&": {
                                            padding: "0.4rem 0.8rem",
                                            fontWeight: "600",

                                            background: "transparent",
                                            color: (theme) =>
                                                theme.palette.primary.dark,
                                            "&:hover": {
                                                color: (theme) =>
                                                    theme.palette.primary
                                                        .darker,
                                                background: (theme) =>
                                                    theme.palette.background
                                                        .alt,
                                            },
                                        },
                                    }}
                                    onClick={handleNext}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: "600",
                                            pr: "0.5rem",
                                        }}
                                    >
                                        Next
                                    </Typography>
                                    <KeyboardDoubleArrowRightIcon />
                                </StyledButton>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default LearningPage;
