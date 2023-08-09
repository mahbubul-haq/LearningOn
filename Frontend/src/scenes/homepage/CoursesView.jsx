import React from "react";
import { Box, useMediaQuery, Typography } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import CourseWidget from "../../widgets/CourseWidget";

const CoursesView = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const [courseType, setCourseType] = React.useState("Popular Courses");

    return (
        <Box
            sx={{
                backgroundColor: (theme) => theme.palette.background.default,
                padding: isNonMobileScreens ? "3rem 5rem" : "2rem",
            }}
        >
            <FlexBetween>
                <Box>
                    <Typography variant="h3">
                        {courseType}
                    </Typography>
                </Box>
            </FlexBetween>
            <CourseWidget courseInfo={{
                title: "Python: Make your Career in Python - Beginner to Advanced",
                instructor: "Course Instrutor",
                rating: {
                    rating: 4.5,
                    count: 24
                }
                
            }} />
        </Box>
    );
};

export default CoursesView;
