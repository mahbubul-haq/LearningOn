import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FlexBetween from '../../components/FlexBetween'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import useTheme from '@mui/material/styles/useTheme'
import { StyledCheckbox } from '../../components/StyledButton'


const LeftPanelCourseContent = ({
    courseState,
    setInputSection,
    inputSection,
    setMobileDrawerOpen,
}) => {

    const theme = useTheme()


  return (
    <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4rem",

                    // backgroundColor: inputSection === "basic info" ? backgroundColor : "",
                    cursor: "pointer",
                }}
                onClick={() => {
                    setInputSection("course content");
                    setMobileDrawerOpen(false);
                }}
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
                        // borderLeft:
                        //     inputSection === "course content"
                        //         ? `4px solid ${theme.palette.grey.grey400}`
                        //         : "",
                        padding: "0 0rem 0rem 2rem",
                        cursor: "pointer",
                        transition: "border 0.3s",
                    }}
                    onClick={() => setInputSection("course content")}
                >
                    {courseState.lessons?.length > 0 ? (
                        <React.Fragment key={courseState.lessons?.length}>
                            {courseState.lessons.map((lesson, index) => (
                                <React.Fragment key={index}>
                                    <FlexBetween
                                        gap="0.5rem"
                                        sx={{
                                            "&&": {
                                                justifyContent: "flex-start",
                                                alignItems: "flex-start",
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
  )
}

export default LeftPanelCourseContent