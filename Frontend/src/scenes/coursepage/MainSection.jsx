import React from "react";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import FlexBetween from "../../components/FlexBetween";
import { Chip, Divider } from "@mui/material";
import CoursePageLessons from "./CoursePageLessons";
import CoursePageInstructors from "./CoursePageInstructors";
import CoursePageReviews from "./CoursePageReviews";

const MainSection = ({ courseInfo }) => {
    const theme = useTheme();
    return (
        <Box>
            <Box
                sx={{
                    width: "100%",
                    padding: "0.1rem 5rem",
                    backgroundColor: theme.palette.background.buttonBgPink,
                    position: "sticky",
                    top: "0",
                    zIndex: "5000",
                }}
            >
                <FlexBetween sx={{}}>
                    <nav
                        id="coursepage-mainsection"
                        className="navbar navbar-light"
                    >
                        <ul
                            className="nav nav-pills"
                            style={{
                                display: "flex",
                                gap: "1rem",
                                justifyContent: "space-between",
                                padding: "0",
                                margin: "0",
                            }}
                        >
                            <li className="nav-item" style={{
                                padding: "0",
                                margin: "0",
                            }}>
                                <a

                                    className="nav-link"
                                    style={{
                                        fontSize: "1.2rem",
                                        color: theme.palette.text.primary,
                                        paddingLeft: "0",
                                        margin: "0",
                                    }}
                                    href="#coursepage-mainsection-about"
                                >
                                    About
                                </a>
                            </li>
                            <Box
                                component="li"
                                sx={{
                                    "&&": {},
                                }}
                                className="nav-item"
                            >
                                <Box
                                    component="a"
                                    className="nav-link"
                                    href="#coursepage-mainsection-learn"
                                    sx={{
                                        fontSize: "1.2rem",

                                        "&&": {
                                            color: theme.palette.text.primary,
                                        },
                                    }}
                                >
                                    You'll Learn
                                </Box>
                            </Box>
                            <li className="nav-item">
                                <a
                                    href="#coursepage-mainsection-lessons"
                                    className="nav-link"
                                    style={{
                                        fontSize: "1.2rem",
                                        color: theme.palette.text.primary,
                                    }}
                                >
                                    Lessons
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    href="#coursepage-mainsection-instructors"
                                    className="nav-link"
                                    style={{
                                        fontSize: "1.2rem",
                                        color: theme.palette.text.primary,
                                    }}
                                >
                                    Instructors
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    href="#coursepage-mainsection-reviews"
                                    className="nav-link"
                                    style={{
                                        fontSize: "1.2rem",
                                        color: theme.palette.text.primary,
                                    }}
                                >
                                    Reviews
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <Box></Box>
                </FlexBetween>
            </Box>

            <Box
                data-bs-spy="scroll"
                data-bs-target="#coursepage-mainsection"
                data-bs-offset="0"
                data-bs-duration="800"
                tabIndex="0"
                sx={{}}
            >
                <Box
                    id="coursepage-mainsection-about"
                    sx={{
                        padding: "2rem 5rem 3rem 5rem",
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: "600",
                            mb: "1.5rem",
                            color: theme.palette.grey.grey700,
                        }}
                    >
                        About this course
                    </Typography>
                    {/* <pre> */}
                    <Typography
                        sx={{
                            fontSize: "0.9rem",
                            lineHeight: "1.5rem",
                            // wrap words break anywhere
                            overflowWrap: "anywhere",
                        }}
                    >
                        {/* convert newlines into <br> */}
                        {courseInfo?.courseDescription
                            ?.split("\n")
                            .map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}
                    </Typography>
                    {/* </pre> */}
                </Box>
                <Divider
                    light
                    sx={{
                        color: theme.palette.customDivider.main,
                    }}
                />
                <Box
                    id="coursepage-mainsection-learn"
                    sx={{
                        padding: "2rem 5rem 3rem 5rem",
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: "600",
                            mb: "1.5rem",
                            color: theme.palette.grey.grey700,
                        }}
                    >
                        You'll learn
                    </Typography>
                    <FlexBetween
                        sx={{
                            gap: "1rem",
                            "&&": {
                                flexWrap: "wrap",
                                justifyContent: "flex-start",
                            },
                        }}
                    >
                        {courseInfo?.skillTags?.map((skill, index) => (
                            <Chip
                                label={skill}
                                key={index}
                                size="small"
                                sx={{
                                    // mr: "1rem",
                                    borderRadius: "2rem",
                                    fontSize: "1rem",
                                    padding: "1.2rem 0.5rem",
                                    backgroundColor: (theme) =>
                                        theme.palette.background
                                            .buttonBgLightPink,
                                }}
                            />
                        ))}
                    </FlexBetween>
                </Box>
                <Divider
                    sx={{
                        color: theme.palette.customDivider.main,
                    }}
                    light
                />
                <Box
                    id="coursepage-mainsection-lessons"
                    sx={{
                        padding: "2rem 5rem 3rem 5rem",
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: "600",
                            mb: "1.5rem",
                            color: theme.palette.grey.grey700,
                        }}
                    >
                        Lessons
                    </Typography>
                    <CoursePageLessons courseInfo={courseInfo} />
                </Box>
                <Divider
                    light
                    sx={{
                        color: theme.palette.customDivider.main,
                    }}
                />
                <Box
                    id="coursepage-mainsection-instructors"
                    sx={{
                        padding: "2rem 5rem 3rem 5rem",
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: "600",
                            mb: "1.5rem",
                            color: theme.palette.grey.grey700,
                        }}
                    >
                        Instructors
                    </Typography>
                    <CoursePageInstructors courseInfo={courseInfo} />
                </Box>

                <Divider
                    light
                    sx={{
                        color: theme.palette.customDivider.main,
                    }}
                />

                <Box
                    id="coursepage-mainsection-reviews"
                    sx={{
                        padding: "2rem 5rem 3rem 5rem",
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: "600",
                            mb: "1.5rem",
                            color: theme.palette.grey.grey700,
                        }}
                    >
                        Reviews
                    </Typography>

                    <CoursePageReviews courseInfo={courseInfo} />
                </Box>
            </Box>
        </Box>
    );
};

export default MainSection;
