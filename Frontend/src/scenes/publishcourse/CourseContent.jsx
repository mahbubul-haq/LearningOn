import React, { useEffect } from "react";
import VideoUpload from "../../components/VideoUpload.jsx";

import { CreateCourseContext } from "../../state/CreateCourse.jsx";
import { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionActions from "@mui/material/AccordionActions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import useTheme from "@mui/material/styles/useTheme";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import InputLabel from "@mui/material/InputLabel";
import StyledTextField1 from "../../components/StyledInputField1.jsx";
import { StyledButton } from "../../components/StyledButton.jsx";
import { GlobalContext } from "../../state/GlobalContext.jsx";
import { Divider } from "@mui/material";

const CourseContent = () => {
    const { courseState, setCourseState, updateCourse } =
        useContext(CreateCourseContext);
    const { deleteFile } = useContext(GlobalContext);
    // const [lessons, setLessons] = React.useState(courseState.lessons);
    const [expanded, setExpanded] = React.useState("");
    const [subExpanded, setSubExpanded] = React.useState(""); // [panelIndex, subPanelIndex
    const [videoLinks, setVideoLinks] = React.useState([]); // [panelIndex, subPanelIndex
    const theme = useTheme();

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
                        <Accordion
                            key={index}
                            sx={{
                                backgroundColor: "white",
                            }}
                            expanded={expanded === `panel${index}`}
                        >
                            <AccordionSummary
                                expandIcon={
                                    <ExpandMoreIcon
                                        sx={{
                                            color: theme.palette.grey.grey800,
                                            fontSize: "2rem",
                                            p: 0,
                                            m: 0,
                                        }}
                                        onClick={(event) => {
                                            handleExpand(event, index);
                                        }}
                                    />
                                }
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{
                                    backgroundColor: (theme) =>
                                        theme.palette.grey.grey50,
                                }}
                                onClick={(event) => {
                                    handleExpand(event, index);
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "1.2rem",
                                        color: theme.palette.grey.grey800,
                                    }}
                                >
                                    <span
                                        style={{
                                            color: theme.palette.grey.grey800,
                                            fontWeight: "600",
                                        }}
                                    >
                                        Lesson {index + 1}
                                    </span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    {lesson.title}
                                </Typography>
                                <StyledButton
                                    variant="outlined"
                                    sx={{
                                        ml: "auto",
                                        mr: "1rem",
                                        color: (theme) =>
                                            theme.palette.grey.grey600,
                                        borderColor: (theme) =>
                                            theme.palette.grey.grey600,
                                        "&&": {
                                            padding: "0.3rem 1rem",
                                        },
                                    }}
                                    onClick={(event) => {
                                        event.stopPropagation();

                                        deleteLesson(index);
                                    }}
                                >
                                    Delete
                                </StyledButton>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{
                                    padding: "1.5rem",
                                }}
                            >
                                <InputLabel htmlFor="title">
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            mb: "0.5rem",
                                            fontWeight: "600",
                                            color: (theme) =>
                                                theme.palette.grey.grey600,
                                        }}
                                    >
                                        Title{" "}
                                        <span
                                            style={{
                                                color: "red",
                                                fontSize: "1.1rem",
                                            }}
                                        >
                                            *
                                        </span>
                                    </Typography>
                                </InputLabel>

                                <StyledTextField1
                                    placeholder="Title of the lesson"
                                    multiline
                                    rows={1}
                                    id="title"
                                    name="title"
                                    inputProps={{
                                        maxLength: 100,
                                    }}
                                    // change font size of input
                                    onChange={(event) =>
                                        handleInput(event, index)
                                    }
                                    value={lesson.title}
                                    sx={{
                                        p: 0,
                                        "& .MuiInputBase-input": {
                                            fontSize: "1rem",
                                            fontWeight: "600",
                                            color: (theme) =>
                                                theme.palette.grey.grey600,
                                        },
                                        width: "100%",
                                    }}
                                />

                                <InputLabel htmlFor="description">
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            mb: "0.5rem",
                                            fontWeight: "600",
                                            color: (theme) =>
                                                theme.palette.grey.grey600,
                                        }}
                                    >
                                        Description
                                    </Typography>
                                </InputLabel>

                                <StyledTextField1
                                    placeholder="Description of the lesson"
                                    multiline
                                    rows={5}
                                    id="description"
                                    name="description"
                                    inputProps={{
                                        maxLength: 2000,
                                    }}
                                    // change font size of input
                                    onChange={(event) =>
                                        handleInput(event, index)
                                    }
                                    value={lesson.description}
                                    sx={{
                                        fontSize: "0.9rem",
                                        letterSpacing: "0.01rem",
                                        lineHeight: "1.5rem",
                                        fontWeight: "400",
                                        width: "100%",

                                        color: (theme) =>
                                            theme.palette.grey.grey600,
                                    }}
                                />

                                {lesson.subLessons.map(
                                    (subLesson, subIndex) => (
                                        <Accordion
                                            key={index + " " + subIndex}
                                            expanded={
                                                subExpanded ===
                                                `subPanel${index}${subIndex}`
                                            }
                                        >
                                            <AccordionSummary
                                                expandIcon={
                                                    <ExpandMoreIcon
                                                        sx={{
                                                            color: theme.palette
                                                                .grey.grey800,
                                                            fontSize: "1.5rem",
                                                        }}
                                                        onClick={(event) => {
                                                            handleExpand(
                                                                event,
                                                                index,
                                                                subIndex
                                                            );
                                                        }}
                                                    />
                                                }
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                                sx={{
                                                    backgroundColor:
                                                        theme.palette.grey
                                                            .grey10,
                                                }}
                                                onClick={(event) => {
                                                    handleExpand(
                                                        event,
                                                        index,
                                                        subIndex
                                                    );
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: "1rem",
                                                        color: theme.palette
                                                            .grey.grey800,
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            color: theme.palette
                                                                .grey.grey800,
                                                            fontWeight: "600",
                                                        }}
                                                    >
                                                        Lesson {index + 1}.
                                                        {subIndex + 1}
                                                    </span>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                                    {subLesson.title}
                                                </Typography>
                                                <StyledButton
                                                    variant="outlined"
                                                    disabled={
                                                        lesson.subLessons
                                                            .length === 1
                                                    }
                                                    sx={{
                                                        ml: "auto",
                                                        mr: "1rem",

                                                        color: (theme) =>
                                                            theme.palette.grey
                                                                .grey600,
                                                        borderColor: (theme) =>
                                                            theme.palette.grey
                                                                .grey600,
                                                        "&&": {
                                                            padding:
                                                                "0.3rem 1rem",
                                                        },
                                                    }}
                                                    onClick={(event) => {
                                                        event.stopPropagation();

                                                        deleteSubLesson(
                                                            index,
                                                            subIndex
                                                        );
                                                    }}
                                                >
                                                    Delete {index + 1}.
                                                    {subIndex + 1}
                                                </StyledButton>
                                            </AccordionSummary>
                                            <AccordionDetails
                                                sx={{
                                                    padding: "1.5rem",
                                                }}
                                            >
                                                <InputLabel htmlFor="sublesson-title">
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            mb: "0.5rem",
                                                            fontWeight: "600",
                                                            color: (theme) =>
                                                                theme.palette
                                                                    .grey
                                                                    .grey600,
                                                        }}
                                                    >
                                                        Title{" "}
                                                        <span
                                                            style={{
                                                                color: "red",
                                                                fontSize:
                                                                    "1.1rem",
                                                            }}
                                                        >
                                                            *
                                                        </span>
                                                    </Typography>
                                                </InputLabel>

                                                <StyledTextField1
                                                    placeholder="Title of the lesson"
                                                    multiline
                                                    rows={1}
                                                    id="sublesson-title"
                                                    name="title"
                                                    inputProps={{
                                                        maxLength: 100,
                                                    }}
                                                    // change font size of input
                                                    onChange={(event) =>
                                                        handleInput(
                                                            event,
                                                            index,
                                                            subIndex
                                                        )
                                                    }
                                                    value={subLesson.title}
                                                    sx={{
                                                        p: 0,
                                                        "& .MuiInputBase-input":
                                                            {
                                                                fontSize:
                                                                    "1rem",
                                                                fontWeight:
                                                                    "600",
                                                                color: (
                                                                    theme
                                                                ) =>
                                                                    theme
                                                                        .palette
                                                                        .grey
                                                                        .grey600,
                                                            },
                                                        width: "100%",
                                                    }}
                                                />

                                                <InputLabel htmlFor="sublesson-video">
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            mb: "0.5rem",
                                                            fontWeight: "600",
                                                            color: (theme) =>
                                                                theme.palette
                                                                    .grey
                                                                    .grey600,
                                                        }}
                                                    >
                                                        Add Video
                                                    </Typography>
                                                </InputLabel>

                                                <VideoUpload
                                                    id="sublesson-video"
                                                    name="videoLink"
                                                    fileName={
                                                        subLesson.videoLink
                                                    }
                                                    setFileName={(fileName) => {
                                                        const e = {
                                                            target: {
                                                                name: "videoLink",
                                                                value: fileName,
                                                            },
                                                        };

                                                        handleInput(
                                                            e,
                                                            index,
                                                            subIndex
                                                        );

                                                        if (fileName) {
                                                            setVideoLinks([
                                                                ...videoLinks,
                                                                fileName,
                                                            ]);
                                                        } else {
                                                            setVideoLinks([
                                                                ...videoLinks.filter(
                                                                    (link) =>
                                                                        link !==
                                                                        subLesson.videoLink
                                                                ),
                                                            ]);
                                                        }
                                                    }}
                                                />

                                                <InputLabel htmlFor="sublesson-note">
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            mb: "0.5rem",
                                                            mt: "1rem",
                                                            fontWeight: "600",
                                                            color: (theme) =>
                                                                theme.palette
                                                                    .grey
                                                                    .grey600,
                                                        }}
                                                    >
                                                        Add Lecture Note
                                                    </Typography>
                                                </InputLabel>

                                                <StyledTextField1
                                                    placeholder="Add lecture note"
                                                    multiline
                                                    rows={20}
                                                    id="sublesson-note"
                                                    name="lectureNote"
                                                    inputProps={{
                                                        maxLength: 10000,
                                                    }}
                                                    // change font size of input
                                                    onChange={(event) =>
                                                        handleInput(
                                                            event,
                                                            index,
                                                            subIndex
                                                        )
                                                    }
                                                    value={
                                                        subLesson.lectureNote
                                                    }
                                                    sx={{
                                                        fontSize: "0.9rem",
                                                        letterSpacing:
                                                            "0.01rem",
                                                        lineHeight: "1.5rem",
                                                        fontWeight: "400",
                                                        width: "100%",

                                                        color: (theme) =>
                                                            theme.palette.grey
                                                                .grey600,
                                                    }}
                                                />
                                            </AccordionDetails>
                                        </Accordion>
                                    )
                                )}
                                <Fab
                                    variant="extended"
                                    size="medium"
                                    sx={{
                                        mt: "1rem",
                                        backgroundColor: (theme) =>
                                            theme.palette.background
                                                .buttonBgPink,
                                        boxShadow: "none",
                                        "&:hover": {
                                            backgroundColor: (theme) =>
                                                theme.palette.background
                                                    .buttonBgPinkDark,
                                        },
                                    }}
                                    onClick={() => {
                                        setCourseState({
                                            ...courseState,
                                            lessons: [
                                                ...courseState.lessons.map(
                                                    (curLesson, curIndex) => {
                                                        if (
                                                            curIndex === index
                                                        ) {
                                                            return {
                                                                ...curLesson,
                                                                subLessons: [
                                                                    ...curLesson.subLessons,
                                                                    {
                                                                        title: "",
                                                                        lectureNode:
                                                                            "",
                                                                        videoLink:
                                                                            "",
                                                                    },
                                                                ],
                                                            };
                                                        }
                                                        return curLesson;
                                                    }
                                                ),
                                            ],
                                        });
                                    }}
                                >
                                    <AddIcon sx={{ mr: "0.5rem" }} />
                                    <Typography
                                        sx={{
                                            fontWeight: "600",
                                            color: (theme) =>
                                                theme.palette.text.primary,
                                            textTransform: "capitalize",
                                        }}
                                    >
                                        Add Lesson {index + 1}.
                                        {lesson.subLessons.length + 1}
                                    </Typography>
                                </Fab>
                            </AccordionDetails>
                            <AccordionActions></AccordionActions>
                        </Accordion>
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
