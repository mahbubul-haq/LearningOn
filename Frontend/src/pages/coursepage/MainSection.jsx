import { AdvancedVideo, lazyload } from "@cloudinary/react";
import { Chip, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import FlexBetween from "../../components/FlexBetween";
import { HeaderTypography2 } from "../../components/StyledTypography";
import { cloudinaryCld } from "../../configs/cloudinary.config";
import CoursePageInstructors from "./CoursePageInstructors";
import CoursePageLessons from "./CoursePageLessons";
import CoursePageReviews from "./CoursePageReviews";
import MainSectionNav from "./MainSectionNav";

const MainSection = ({ courseInfo }) => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const isMobileScreens = useMediaQuery("(max-width:600px)");
    return (
        <Box>
            <Box
                sx={{
                    height: isNonMobileScreens ? "5rem" : "auto",
                    minHeight: isNonMobileScreens ? "5rem" : "4rem",
                    width: "100%",
                    padding: isNonMobileScreens ? "0.1rem 5rem" : "0rem 1rem",
                    ...theme.palette.glassNavbar, // Apply glass navbar styles

                    // Unified Look Adjustments
                    borderRadius: "0 0 0 0", // Top corners only
                    borderBottom: `1px solid ${theme.palette.divider}`, // Restore border
                    marginBottom: "0px", // Touch content below

                    position: "sticky",
                    top: "0",
                    zIndex: 100,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <MainSectionNav />
            </Box>

            <Box
                data-bs-spy="scroll"
                data-bs-target="#coursepage-mainsection"
                data-bs-offset="0"
                data-bs-duration="800"
                tabIndex="0"
                sx={{
                    ...theme.palette.glassSheet,
                    maxWidth: "2000px",
                    mx: "auto",
                    mt: "0rem", // No gap
                    mb: "4rem",
                    borderTop: "none", // Remove top border to blend
                    borderRadius: "0 0 16px 16px", // Bottom corners only

                    overflow: "hidden" // Ensure rounded corners work
                }}
            >
                <Box
                    id="coursepage-mainsection-about"
                    sx={{
                        padding: isNonMobileScreens
                            ? "2rem 5rem 3rem 5rem"
                            : "2rem 1rem 3rem 1rem",
                    }}
                >
                    <HeaderTypography2>
                        About this course
                    </HeaderTypography2>
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

                            <AdvancedVideo
                                cldVid={cloudinaryCld.video(courseInfo?.introVideo)}
                                plugins={[lazyload()]}
                                style={{
                                    maxWidth: isMobileScreens ? "100%" : "400px",
                                    height: "auto",
                                    marginLeft: "1rem",
                                    marginBottom: "1rem",
                                    float: "right",
                                }}
                                //add title and caption
                                title={"Intro: " + courseInfo?.courseTitle}
                                alt="Intro video"
                                controls
                            />
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
                    </Box>
                    {/* </pre> */}
                </Box>
                <Divider
                    light
                    sx={{
                        borderColor: (theme) => theme.palette.mode === 'dark'
                            ? "rgba(255, 255, 255, 0.05)" // Very subtle in dark mode
                            : "rgba(0, 0, 0, 0.05)",      // Very subtle in light mode
                        borderWidth: "1px", // Ensure thinness
                    }}
                />
                <Box
                    id="coursepage-mainsection-learn"
                    sx={{
                        padding: isNonMobileScreens
                            ? "2rem 5rem 3rem 5rem"
                            : "2rem 1rem 3rem 1rem",
                    }}
                >
                    <HeaderTypography2>
                        You&apos;ll learn
                    </HeaderTypography2>
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
                                    backgroundColor: (theme) => theme.palette.homepage.chipBg,
                                    color: (theme) => theme.palette.homepage.chipText,
                                }}
                            />
                        ))}
                    </FlexBetween>
                </Box>
                <Divider
                    sx={{
                        borderColor: (theme) => theme.palette.mode === 'dark'
                            ? "rgba(255, 255, 255, 0.05)"
                            : "rgba(0, 0, 0, 0.05)",
                    }}
                    light
                />
                <Box
                    id="coursepage-mainsection-lessons"
                    sx={{
                        padding: isNonMobileScreens
                            ? "2rem 5rem 3rem 5rem"
                            : "2rem 1rem 3rem 1rem",
                    }}
                >
                    <HeaderTypography2>
                        Lessons
                    </HeaderTypography2>
                    <CoursePageLessons courseInfo={courseInfo} />
                </Box>
                <Divider
                    light
                    sx={{
                        borderColor: (theme) => theme.palette.mode === 'dark'
                            ? "rgba(255, 255, 255, 0.05)"
                            : "rgba(0, 0, 0, 0.05)",
                    }}
                />
                <Box
                    id="coursepage-mainsection-instructors"
                    sx={{
                        padding: isNonMobileScreens
                            ? "2rem 5rem 3rem 5rem"
                            : "2rem 1rem 3rem 1rem",
                    }}
                >
                    <HeaderTypography2>
                        Instructors
                    </HeaderTypography2>
                    <CoursePageInstructors courseInfo={courseInfo} />
                </Box>

                <Divider
                    light
                    sx={{
                        borderColor: (theme) => theme.palette.mode === 'dark'
                            ? "rgba(255, 255, 255, 0.05)"
                            : "rgba(0, 0, 0, 0.05)",
                    }}
                />

                <Box
                    id="coursepage-mainsection-reviews"
                    sx={{
                        padding: isNonMobileScreens
                            ? "2rem 5rem 3rem 5rem"
                            : "2rem 1rem 3rem 1rem",
                    }}
                >
                    <HeaderTypography2>Reviews</HeaderTypography2>

                    <CoursePageReviews courseInfo={courseInfo} />
                </Box>
            </Box>
        </Box >
    );
};

export default MainSection;
