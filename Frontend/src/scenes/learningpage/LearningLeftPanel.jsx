import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import FlexBetween from "../../components/FlexBetween";

// import Checkbox from "@mui/material/Checkbox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { StyledCheckbox } from "../../components/StyledButton";
import { useContext } from "react";
import { CreateCourseContext } from "../../state/CreateCourse";
import state from "../../state";
import { useTheme } from "@emotion/react";
import { LearningCourseContext } from "../../state/LearningCourseContex";

export const LearningLeftPanel = ({ courseInfo }) => {
    const { openedLesson, setOpenedLesson } = useContext(LearningCourseContext);

    const theme = useTheme();

    return (
        <Box sx={{
           
        }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4rem",

                    // backgroundColor: inputSection === "basic info" ? backgroundColor : "",
                    // cursor: "pointer",
                }}
                // onClick={() => setInputSection("course content")}
            >
                <Typography
                    
                    sx={{
                        fontWeight: "600",
                        mb: "0.8rem",
                        pl: "0rem",
                        fontSize: "1.1rem",
                        // cursor: "pointer",
                        // padding: "0 0rem 0rem 2rem",
                    }}
                    // onClick={() => setInputSection("course content")}
                >
                    Lessons
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0rem",
                    // borderLeft:
                    //     inputSection === "course content"
                    //         ? `4px solid ${theme.palette.grey.grey400}`
                    //         : "",
                    // padding: "0 0rem 0rem 2rem",
                    // cursor: "pointer",
                }}
                // onClick={() => setInputSection("course content")}
            >
                {courseInfo?.lessons?.length > 0 ? (
                    <React.Fragment key={courseInfo.lessons?.length}>
                        {courseInfo.lessons.map((lesson, index) => (
                            <React.Fragment key={index}>
                                <FlexBetween
                                    gap="0.8rem"
                                    sx={{
                                        "&&": {
                                            justifyContent: "flex-start",
                                            alignItems: "flex-start",
                                            cursor: "pointer",
                                            p: "1rem 1rem",
                                        },
                                        backgroundColor:
                                            openedLesson.subLesson === 0 &&
                                            openedLesson.lesson === index + 1
                                                ? theme.palette.primary.main
                                                : "transparent",
                                        "&:hover": {
                                            backgroundColor:
                                                theme.palette.primary.main,
                                        },
                                    }}
                                    onClick={() => {
                                        setOpenedLesson({
                                            lesson: index + 1,
                                            subLesson: 0,
                                        });
                                    }}
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
                                        checked={false}
                                        sx={{
                                            "&&": {
                                                // different color if checked vs unchecked
                                                color: theme.palette.grey
                                                    .grey400,
                                            },
                                            // border: "1px solid #E0E0E0"
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            justifyContent: "flex-start",
                                            alignItems: "flex-start",
                                            gap: "1rem",
                                            display: "flex",
                                            // border: "2px solid black"
                                        }}
                                    >
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: (theme) =>
                                                    theme.palette.grey.grey600,
                                                fontSize: "0.9rem",
                                                fontWeight: "600",
                                            }}
                                        >
                                            {index + 1}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: (theme) =>
                                                    theme.palette.grey.grey600,
                                                fontSize: "0.9rem",
                                            }}
                                        >
                                            {lesson.title}
                                        </Typography>
                                    </Box>
                                </FlexBetween>

                                {lesson.subLessons?.map(
                                    (subLesson, subIndex) => (
                                        <FlexBetween
                                            key={subLesson.title + subIndex}
                                            gap="0.8rem"
                                            sx={{
                                                "&&": {
                                                    justifyContent:
                                                        "flex-start",
                                                    alignItems: "flex-start",
                                                    cursor: "pointer",
                                                    p: "1rem 1rem",
                                                    paddingLeft: "2rem",
                                                },
                                                backgroundColor:
                                                    openedLesson.subLesson ===
                                                        subIndex + 1 &&
                                                    openedLesson.lesson ===
                                                        index + 1
                                                        ? theme.palette.primary
                                                              .main
                                                        : "transparent",
                                                "&:hover": {
                                                    backgroundColor:
                                                        theme.palette.primary
                                                            .main,
                                                },
                                            }}
                                            onClick={() =>
                                                setOpenedLesson({
                                                    lesson: index + 1,
                                                    subLesson: subIndex + 1,
                                                })
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
                                                checked={false}
                                                sx={{
                                                    "&&": {
                                                        // different color if checked vs unchecked
                                                        color: theme.palette
                                                            .grey.grey400,
                                                    },
                                                    // border: "1px solid #E0E0E0"
                                                }}
                                            />
                                            <Box
                                                sx={{
                                                    justifyContent:
                                                        "flex-start",
                                                    alignItems: "flex-start",
                                                    gap: "1rem",
                                                    display: "flex",
                                                    // border: "2px solid black"
                                                }}
                                            >
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        color: (theme) =>
                                                            theme.palette.grey
                                                                .grey600,
                                                        fontSize: "0.9rem",
                                                        fontWeight: "600",
                                                    }}
                                                >
                                                    {index + 1}.{subIndex + 1}{" "}
                                                </Typography>
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        color: (theme) =>
                                                            theme.palette.grey
                                                                .grey600,
                                                        fontSize: "0.9rem",
                                                    }}
                                                >
                                                    {subLesson.title}
                                                </Typography>
                                            </Box>
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
                        No lessons found
                    </Typography>
                )}
            </Box>
        </Box>
    );
};
