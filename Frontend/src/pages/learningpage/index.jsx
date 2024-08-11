import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { StyledButton } from "../../components/StyledButton";
import { GlobalContext } from "../../state/GlobalContext";
import { LearningCourseContext } from "../../state/LearningCourseContex";
import { LearningLeftPanel } from "./LearningLeftPanel";
import LearningPageTop from "./LearningPageTop";
import LearningRightPanel from "./LearningRightPanel";

const LearningPage = () => {
    const { courseId } = useParams();
    const [courseInfo, setCourseInfo] = React.useState({});
    const { getCourseById, courseById, setOpenedItem } = useContext(GlobalContext);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const isMobileScreens = useMediaQuery("(max-width: 600px)");
    const theme = useTheme();
    const { openedLesson, setOpenedLesson, expandedLessons, setExpandedLessons } = useContext(LearningCourseContext);
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        setExpandedLessons([]);
        setOpenedLesson({
            lesson: 1,
            subLesson: 0,
        });
        if (!user) {
            navigate("/");
        }
        setOpenedItem("courses");
    }, []);

    useEffect(() => {
        ///console.log("courseId", courseId);
        if (courseId) {
            getCourseById(courseId);
        }
    }, [courseId]);

    useEffect(() => {
        if (courseById) {
            setCourseInfo(courseById);
        }
    }, [courseById]);

    const handleNext = () => {
        if (openedLesson.subLesson === 0) {
            setOpenedLesson({
                lesson: openedLesson.lesson,
                subLesson: openedLesson.subLesson + 1,
            });
            if (!expandedLessons.includes(openedLesson.lesson)) {
                setExpandedLessons([...expandedLessons, openedLesson.lesson]);
            }
        } else {
            if (openedLesson.subLesson === courseInfo.lessons[openedLesson.lesson - 1].subLessons.length) {
                setOpenedLesson({
                    lesson: openedLesson.lesson + 1,
                    subLesson: 0,
                });
            } else {
                setOpenedLesson({
                    lesson: openedLesson.lesson,
                    subLesson: openedLesson.subLesson + 1,
                });

                if (!expandedLessons.includes(openedLesson.lesson)) {
                    setExpandedLessons([...expandedLessons, openedLesson.lesson]);
                }
            }
        }

        scrollTop();
    };

    const handlePrev = () => {
        if (openedLesson.subLesson === 0) {
            if (openedLesson.lesson > 1) {
                setOpenedLesson({
                    lesson: openedLesson.lesson - 1,
                    subLesson: courseInfo.lessons[openedLesson.lesson - 2].subLessons.length,
                });

                if (!expandedLessons.includes(openedLesson.lesson - 1)) {
                    setExpandedLessons([...expandedLessons, openedLesson.lesson - 1]);
                }
            }
        } else {
            setOpenedLesson({
                lesson: openedLesson.lesson,
                subLesson: openedLesson.subLesson - 1,
            });
        }
        scrollTop();
    };

    const scrollTop = () => {
        document.querySelector(".learning-page-main").scrollTop = 0;
    };

    return (
        <>
            <Box
                className="learning-page-main"
                // ref={scrollPositionRef}
                sx={{
                    // marginTop: isNonMobileScreens ? "5rem" : "4rem",
                    height: "100%",
                    overflowY: "auto",
                    width: "100%",
                    scrollBehavior: "smooth",
                }}
            >
                {/* <Box
                    className="learning-page-navbar"
                    sx={{
                        top: "0",
                        zIndex: "1000",
                        transition: "all 0.5s ease",
                    }}
                >
                    <Navbar />
                </Box> */}
                <Box
                    sx={{
                        position: "sticky",
                        top: "0",
                        zIndex: "1",

                    }}
                >
                    <LearningPageTop courseInfo={courseInfo} />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",

                        padding: isNonMobileScreens ? "0 5rem" : isMobileScreens ? "0 1rem" : "0 2rem",
                        width: "100%",
                        maxWidth: "2000px",
                        mx: "auto"
                    }}
                >
                    {isNonMobileScreens && (
                        <Box
                            sx={{
                                width: "30%",

                                py: "4rem",
                                borderRight: `1px dashed ${theme.palette.customDivider.main}`,
                            }}
                        >
                            <LearningLeftPanel courseInfo={courseInfo} />
                        </Box>
                    )}

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
                            width: isNonMobileScreens ? "65%" : "100%",
                            // border: "1px solid red",
                            py: isNonMobileScreens ? "4rem" : "2rem",
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
                            {openedLesson.lesson == 1 && openedLesson.subLesson == 0 ? (
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
                                            color: (theme) => theme.palette.primary.dark,
                                            "&:hover": {
                                                color: (theme) => theme.palette.primary.darker,
                                                background: (theme) => theme.palette.background.alt,
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
                            {openedLesson.lesson == courseInfo?.lessons?.length &&
                            openedLesson.subLesson == courseInfo?.lessons[openedLesson.lesson - 1].subLessons.length ? (
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
                                            color: (theme) => theme.palette.primary.dark,
                                            "&:hover": {
                                                color: (theme) => theme.palette.primary.darker,
                                                background: (theme) => theme.palette.background.alt,
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
