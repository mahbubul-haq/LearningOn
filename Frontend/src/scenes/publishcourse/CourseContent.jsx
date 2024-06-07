import React, { useEffect } from "react";
import { CreateCourseContext } from "../../state/CreateCourse.jsx";
import { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { GlobalContext } from "../../state/GlobalContext.jsx";
import CourseContentCourseAccordion from "./CourseContentCourseAccordion.jsx";

const CourseContent = () => {
    const { courseState, setCourseState, updateCourse } =
        useContext(CreateCourseContext);
    const { deleteFile } = useContext(GlobalContext);
    // const [lessons, setLessons] = React.useState(courseState.lessons);
    const [expanded, setExpanded] = React.useState("");
    const [subExpanded, setSubExpanded] = React.useState(""); // [panelIndex, subPanelIndex
    const [videoLinks, setVideoLinks] = React.useState([]); // [panelIndex, subPanelIndex

    const deleteLesson = (index) => {
        setExpanded("");
        for (const subLesson of courseState.lessons[index].subLessons) {
            const videoLink = subLesson.videoLink;
            if (videoLink) {
                deleteFile(videoLink);
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
    };

    const deleteSubLesson = (index, subIndex) => {
        setSubExpanded("");
        const videoLink =
            courseState.lessons[index].subLessons[subIndex].videoLink;
        if (videoLink) {
            deleteFile(videoLink);
        }

        setCourseState({
            ...courseState,
            lessons: [
                ...courseState.lessons.map((lesson, curIndex) => {
                    if (curIndex === index) {
                        return {
                            ...lesson,
                            subLessons: [
                                ...lesson.subLessons.filter(
                                    (subLesson, curSubIndex) => {
                                        return curSubIndex !== subIndex;
                                    }
                                ),
                            ],
                        };
                    }
                    return lesson;
                }),
            ],
        });
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
                                    ...lesson.subLessons.map(
                                        (subLesson, curSubIndex) => {
                                            if (curSubIndex === subIndex) {
                                                return {
                                                    ...subLesson,
                                                    [event.target.name]:
                                                        event.target.value,
                                                };
                                            }
                                            return subLesson;
                                        }
                                    ),
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
    // useEffect calls when videoLink is updated
    useEffect(() => {
        if (videoLinks.length === 0) return;
        updateCourse("draft");
        // console.log("videoLink updated");
        // console.log(videoLinks);
    }, [videoLinks]);

    return (
        <Box
            sx={{
                width: "100%",
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
                        backgroundColor: (theme) =>
                            theme.palette.background.buttonBgPink,
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
        </Box>
    );
};

export default CourseContent;
