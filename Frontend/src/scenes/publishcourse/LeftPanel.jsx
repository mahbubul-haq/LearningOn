import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import FlexBetween from "../../components/FlexBetween";

import Checkbox from "@mui/material/Checkbox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { StyledCheckbox } from "../../components/StyledButton";
import { useContext } from "react";
import { CreateCourseContext } from "../../state/CreateCourse";
import state from "../../state";
import { useTheme } from "@emotion/react";

const basicInfo = [
    ["Category", "category", 1],
    ["Course Title", "courseTitle", 2],
    ["Course Description", "courseDescription", 3],
    ["Student Requirements", "studentRequirements", 4],
    ["Skill Tags", "skillTags", 5],
];

const media = [
    ["Course Thumbnail", "courseThumbnail", 6],
    ["Intro Video", "introVideo", 7],
];
const moreInfo = [
    ["Course Language", "courseLanguage", 8],
    ["Course Price", "coursePrice", 9],
    ["Approx Time to Complete", "approxTimeToComplete", 10],
    ["Course Instructors", "courseInstructors", 11],
];

const LeftPanel = () => {
    const { courseState, setCourseState, inputSection, setInputSection } =
        useContext(CreateCourseContext);

    const theme = useTheme();
    const backgroundColor = theme.palette.primary.dark;

    // setCourseState({
    //     ...courseState,
    //     category: "hello"
    // });

    useEffect(() => {
        // setCourseState({
        //     ...courseState,
        //     category: "hello",
        //     courseTitle: "hello",
        //     courseDescription: "hello",
        //     studentRequirements: "hello",
        //     skillTags: "hello",
        // });
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                paddingRight: "0.5rem",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4rem",

                    cursor: "pointer",
                }}
                onClick={() => setInputSection("basic info")}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "600",
                        mb: "0.2rem",
                        cursor: "pointer",
                        padding: "0 0rem 0rem 2rem",
                    }}
                    onClick={() => setInputSection("basic info")}
                >
                    Basic Info
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                        borderLeft:
                            inputSection === "basic info"
                                ? `4px solid ${theme.palette.grey.grey400}`
                                : "",
                        padding: "0 0rem 0rem 2rem",
                    }}
                >
                    {basicInfo.map((item, index) => (
                        <FlexBetween
                            key={item}
                            gap="0.5rem"
                            sx={{
                                "&&": {
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    cursor: "pointer",
                                },
                            }}
                            onClick={() => setInputSection("basic info")}
                        >
                            <StyledCheckbox
                                icon={
                                    <RadioButtonUncheckedIcon
                                        sx={{
                                            fontSize: "1.1rem",
                                        }}
                                    />
                                }
                                checkedIcon={
                                    <CheckCircleIcon
                                        sx={{
                                            fontSize: "1.1rem",
                                        }}
                                    />
                                }
                                checked={courseState[item[1]].length > 0}
                                sx={{
                                    "&&": {
                                        // different color if checked vs unchecked
                                        color:
                                            courseState[item[1]].length > 0
                                                ? (theme) =>
                                                      theme.palette.primary.dark
                                                : (theme) =>
                                                      theme.palette.grey
                                                          .grey400,
                                    },
                                    // border: "1px solid #E0E0E0"
                                }}
                            />

                            <Typography
                                variant="body1"
                                sx={{
                                    color: (theme) =>
                                        theme.palette.text.secondary,
                                    // border: "1px solid #E0E0E0",
                                    padding: "0",
                                    fontSize: "0.9rem",
                                }}
                            >
                                {item[0]}
                            </Typography>
                        </FlexBetween>
                    ))}
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4rem",

                    // backgroundColor: inputSection === "basic info" ? backgroundColor : "",
                    cursor: "pointer",
                }}
                onClick={() => setInputSection("course media")}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "600",
                        mb: "0.2rem",
                        cursor: "pointer",
                        padding: "0 0rem 0rem 2rem",
                    }}
                    onClick={() => setInputSection("course media")}
                >
                    Media
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                        borderLeft:
                            inputSection === "course media"
                                ? `4px solid ${theme.palette.grey.grey400}`
                                : "",
                        padding: "0 0rem 0rem 2rem",
                    }}
                >
                    {media.map((item, index) => (
                        <FlexBetween
                            key={item}
                            gap="0.5rem"
                            sx={{
                                "&&": {
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    cursor: "pointer",
                                },
                            }}
                            onClick={() => setInputSection("course media")}
                        >
                            <StyledCheckbox
                                icon={
                                    <RadioButtonUncheckedIcon
                                        sx={{
                                            fontSize: "1.1rem",
                                        }}
                                    />
                                }
                                checkedIcon={
                                    <CheckCircleIcon
                                        sx={{
                                            fontSize: "1.1rem",
                                        }}
                                    />
                                }
                                checked={courseState[item[1]].length > 0}
                                sx={{
                                    "&&": {
                                        // different color if checked vs unchecked
                                        color:
                                            courseState[item[1]].length > 0
                                                ? (theme) =>
                                                      theme.palette.primary.dark
                                                : (theme) =>
                                                      theme.palette.grey
                                                          .grey400,
                                    },
                                    // border: "1px solid #E0E0E0"
                                }}
                            />
                            <Typography
                                variant="body1"
                                sx={{
                                    color: (theme) =>
                                        theme.palette.grey.grey600,

                                    fontSize: "0.9rem",
                                }}
                            >
                                {item[0]}
                            </Typography>
                        </FlexBetween>
                    ))}
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4rem",

                    // backgroundColor: inputSection === "basic info" ? backgroundColor : "",
                    cursor: "pointer",
                }}
                onClick={() => setInputSection("more info")}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "600",
                        mb: "0.2rem",
                        cursor: "pointer",
                        padding: "0 0rem 0rem 2rem",
                    }}
                    onClick={() => setInputSection("more info")}
                >
                    More Info
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                        borderLeft:
                            inputSection === "more info"
                                ? `4px solid ${theme.palette.grey.grey400}`
                                : "",
                        padding: "0 0rem 0rem 2rem",
                    }}
                >
                    {moreInfo.map((item, index) => (
                        <FlexBetween
                            key={item}
                            gap="0.5rem"
                            sx={{
                                "&&": {
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    cursor: "pointer",
                                },
                            }}
                            onClick={() => setInputSection("more info")}
                        >
                            <StyledCheckbox
                                icon={
                                    <RadioButtonUncheckedIcon
                                        sx={{
                                            fontSize: "1.1rem",
                                        }}
                                    />
                                }
                                checkedIcon={
                                    <CheckCircleIcon
                                        sx={{
                                            fontSize: "1.1rem",
                                        }}
                                    />
                                }
                                checked={courseState[item[1]].length > 0}
                                sx={{
                                    "&&": {
                                        // different color if checked vs unchecked
                                        color:
                                            courseState[item[1]].length > 0
                                                ? (theme) =>
                                                      theme.palette.primary.dark
                                                : (theme) =>
                                                      theme.palette.grey
                                                          .grey400,
                                    },
                                    // border: "1px solid #E0E0E0"
                                }}
                            />
                            <Typography
                                variant="body1"
                                sx={{
                                    color: (theme) =>
                                        theme.palette.grey.grey600,
                                    fontSize: "0.9rem",
                                }}
                            >
                                {item[0]}
                            </Typography>
                        </FlexBetween>
                    ))}
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4rem",

                    // backgroundColor: inputSection === "basic info" ? backgroundColor : "",
                    cursor: "pointer",
                }}
                onClick={() => setInputSection("course content")}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "600",
                        mb: "0.2rem",
                        cursor: "pointer",
                        padding: "0 0rem 0rem 2rem",
                    }}
                    onClick={() => setInputSection("course content")}
                >
                    Course Content
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                        borderLeft:
                            inputSection === "course content"
                                ? `4px solid ${theme.palette.grey.grey400}`
                                : "",
                        padding: "0 0rem 0rem 2rem",
                        cursor: "pointer",
                    }}
                    onClick={() => setInputSection("course content")}
                >
                    {courseState.lessons.length > 0 ? (
                        <React.Fragment key={courseState.lessons?.length}>
                            {courseState.lessons.map((lesson, index) => (
                                <React.Fragment key={index}>
                                    <FlexBetween
                                        gap="0.5rem"
                                        sx={{
                                            "&&": {
                                                justifyContent: "flex-start",
                                                alignItems: "center",
                                                cursor: "pointer",
                                            },
                                        }}
                                        onClick={() =>
                                            setInputSection("course content")
                                        }
                                    >
                                        <StyledCheckbox
                                            icon={
                                                <RadioButtonUncheckedIcon
                                                    sx={{
                                                        fontSize: "1.1rem",
                                                    }}
                                                />
                                            }
                                            checkedIcon={
                                                <CheckCircleIcon
                                                    sx={{
                                                        fontSize: "1.1rem",
                                                    }}
                                                />
                                            }
                                            checked={
                                                Boolean(lesson.title) &&
                                                Boolean(lesson.subLessons) &&
                                                lesson.subLessons.length > 0 &&
                                                lesson.subLessons.every(
                                                    (subLesson) =>
                                                        subLesson.videoLink
                                                            ?.length > 0 ||
                                                        subLesson.lectureNote
                                                            ?.length > 0
                                                )
                                            }
                                            sx={{
                                                "&&": {
                                                    // different color if checked vs unchecked
                                                    color:
                                                        Boolean(lesson.title) &&
                                                        Boolean(
                                                            lesson.subLessons
                                                        ) &&
                                                        lesson.subLessons
                                                            .length > 0 &&
                                                        lesson.subLessons.every(
                                                            (subLesson) =>
                                                                subLesson
                                                                    .videoLink
                                                                    ?.length >
                                                                    0 ||
                                                                subLesson
                                                                    .lectureNote
                                                                    ?.length > 0
                                                        )
                                                            ? (theme) =>
                                                                  theme.palette
                                                                      .primary
                                                                      .dark
                                                            : (theme) =>
                                                                  theme.palette
                                                                      .grey
                                                                      .grey400,
                                                },
                                                // border: "1px solid #E0E0E0"
                                            }}
                                        />
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: (theme) =>
                                                    theme.palette.grey.grey600,
                                                fontSize: "0.9rem",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontWeight: "600",
                                                }}
                                            >
                                                {index + 1}
                                            </span>{" "}
                                            {lesson.title}
                                        </Typography>
                                    </FlexBetween>

                                    {lesson.subLessons?.map(
                                        (subLesson, subIndex) => (
                                            <FlexBetween
                                                key={subLesson.title + subIndex}
                                                gap="0.5rem"
                                                sx={{
                                                    "&&": {
                                                        justifyContent:
                                                            "flex-start",
                                                        alignItems: "center",
                                                        cursor: "pointer",
                                                        paddingLeft: "1.5rem",
                                                    },
                                                }}
                                                onClick={() =>
                                                    setInputSection(
                                                        "course content"
                                                    )
                                                }
                                            >
                                                <StyledCheckbox
                                                    icon={
                                                        <RadioButtonUncheckedIcon
                                                            sx={{
                                                                fontSize:
                                                                    "1.1rem",
                                                            }}
                                                        />
                                                    }
                                                    checkedIcon={
                                                        <CheckCircleIcon
                                                            sx={{
                                                                fontSize:
                                                                    "1.1rem",
                                                            }}
                                                        />
                                                    }
                                                    checked={
                                                        Boolean(
                                                            subLesson.title
                                                        ) &&
                                                        (Boolean(
                                                            subLesson.videoLink
                                                        ) ||
                                                            Boolean(
                                                                subLesson.lectureNote
                                                            ))
                                                    }
                                                    sx={{
                                                        "&&": {
                                                            // different color if checked vs unchecked
                                                            color:
                                                                Boolean(
                                                                    subLesson.title
                                                                ) &&
                                                                (Boolean(
                                                                    subLesson.videoLink
                                                                ) ||
                                                                    Boolean(
                                                                        subLesson.lectureNote
                                                                    ))
                                                                    ? (theme) =>
                                                                          theme
                                                                              .palette
                                                                              .primary
                                                                              .dark
                                                                    : (theme) =>
                                                                          theme
                                                                              .palette
                                                                              .grey
                                                                              .grey400,
                                                        },
                                                        // border: "1px solid #E0E0E0"
                                                    }}
                                                />
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        color: (theme) =>
                                                            theme.palette.grey
                                                                .grey600,
                                                        fontSize: "0.9rem",
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            fontWeight: "600",
                                                        }}
                                                    >
                                                        {index + 1}.
                                                        {subIndex + 1}{" "}
                                                    </span>
                                                    {subLesson.title}
                                                </Typography>
                                            </FlexBetween>
                                        )
                                    )}
                                </React.Fragment>
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
                            No lessons added yet
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default LeftPanel;
