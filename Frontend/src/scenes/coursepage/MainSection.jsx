import React from "react";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import FlexBetween from "../../components/FlexBetween";
import { Chip, Divider } from "@mui/material";
import CoursePageLessons from "./CoursePageLessons";
import CoursePageInstructors from "./CoursePageInstructors";
import CoursePageReviews from "./CoursePageReviews";
import useMediaQuery from "@mui/material/useMediaQuery";

const MainSection = ({ courseInfo }) => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const isMobileScreens = useMediaQuery("(max-width:600px)");
    return (
        <Box>
            <Box
                sx={{
                    width: "100%",
                    padding: isNonMobileScreens ? "0.1rem 5rem" : "0rem 1rem",
                    backgroundColor: theme.palette.background.buttonBgPink,
                    position: "sticky",
                    top: "0",
                    zIndex: "100",
                    boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.1)",
                }}
            >
                <FlexBetween
                    sx={{
                        py: isNonMobileScreens ? "0.7rem" : "0.5rem",
                    }}
                >
                    <nav id="coursepage-mainsection" className="navbar navbar-light">
                        <ul
                            className="nav"
                            style={{
                                display: "flex",
                                gap: isNonMobileScreens ? "2.5rem" : isMobileScreens ? "1rem" : "2rem",
                                justifyContent: "flex-start",
                                flexWrap: "wrap",
                                padding: "0",
                                margin: "0",
                            }}
                        >
                            <li
                                className="nav-item"
                                style={{
                                    padding: "0",
                                    margin: "0",
                                }}
                            >
                                <a
                                    className="nav-link"
                                    style={{
                                        fontSize: isNonMobileScreens ? "1.2rem" : "1rem",
                                        color: theme.palette.text.primary,
                                        paddingLeft: "0",
                                        margin: "0",
                                    }}
                                    href="#coursepage-mainsection-about"
                                >
                                    About
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    href="#coursepage-mainsection-learn"
                                    className="nav-link"
                                    style={{
                                        fontSize: isNonMobileScreens ? "1.2rem" : "1rem",
                                        color: theme.palette.text.primary,
                                    }}
                                >
                                    You'll Learn
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    href="#coursepage-mainsection-lessons"
                                    className="nav-link"
                                    style={{
                                        fontSize: isNonMobileScreens ? "1.2rem" : "1rem",
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
                                        fontSize: isNonMobileScreens ? "1.2rem" : "1rem",
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
                                        fontSize: isNonMobileScreens ? "1.2rem" : "1rem",
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

            <Box data-bs-spy="scroll" data-bs-target="#coursepage-mainsection" data-bs-offset="0" data-bs-duration="800" tabIndex="0" sx={{}}>
                <Box
                    id="coursepage-mainsection-about"
                    sx={{
                        padding: isNonMobileScreens ? "2rem 5rem 3rem 5rem" : "2rem 1rem 3rem 1rem",
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
                    <Box
                        sx={{
                            width: "100%",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "0.9rem",
                                lineHeight: "1.5rem",
                                // wrap words break anywhere
                                overflowWrap: "anywhere",
                                // clearfix
                                "&::after": {
                                    content: '""',
                                    display: "table",
                                    clear: "both",
                                },

                                // float: "left",
                                // width: isNonMobileScreens ? "65%" : "100%",
                            }}
                        >
                            <video
                                controls
                                src={`${import.meta.env.VITE_SERVER_URL}/images/${courseInfo?.introVideo}`}
                                style={{
                                    // width: "100%",
                                    maxWidth: isMobileScreens ? "100%" : "400px",
                                    // minWidth: "100%",
                                    height: "auto",
                                    marginLeft: "1rem",
                                    marginBottom: "1rem",
                                    float: "right",
                                }}
                                //add title and caption
                                title={"Intro: " + courseInfo?.courseTitle}
                                alt="Intro video"
                                loading="lazy"
                            />
                            {/* convert newlines into <br> */}
                            {courseInfo?.courseDescription?.split("\n").map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}
                        </Typography>
                    </Box>
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
                        padding: isNonMobileScreens ? "2rem 5rem 3rem 5rem" : "2rem 1rem 3rem 1rem",
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
                                    backgroundColor: (theme) => theme.palette.background.buttonBgLightPink,
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
                        padding: isNonMobileScreens ? "2rem 5rem 3rem 5rem" : "2rem 1rem 3rem 1rem",
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
                        padding: isNonMobileScreens ? "2rem 5rem 3rem 5rem" : "2rem 1rem 3rem 1rem",
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
                        padding: isNonMobileScreens ? "2rem 5rem 3rem 5rem" : "2rem 1rem 3rem 1rem",
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
