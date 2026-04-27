import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import CourseWidget from "../../widgets/CourseWidget";
import { HeaderTypography2 } from "../../components/StyledTypography";
import { useSelector } from "react-redux";
import CourseWidgetSkeleton from "../../components/CourseWidgetSkeleton";
import { CoursePageContext } from "../../state/CoursePageContext";


const RelatedCourses = ({ courseInfo }) => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const theme = useTheme();
    const token = useSelector((state) => state.auth.token);

    const { relatedCourses, relatedCoursesLoading, fetchRelatedCourses } = useContext(CoursePageContext);

    useEffect(() => {
        if (courseInfo?._id && token) {
            fetchRelatedCourses(courseInfo?.category, courseInfo?._id, token);
        }
    }, [courseInfo, token]);

    if (!relatedCoursesLoading && relatedCourses.length === 0) return null;

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: "2000px",
                mx: "auto",
                padding: isNonMobileScreens ? "2rem 5rem" : "1rem",
                marginTop: "2rem",
            }}
        >
            <HeaderTypography2 sx={{ marginBottom: "1.5rem" }}>
                More Courses You Might Like
            </HeaderTypography2>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    /// all have same height
                    gridAutoRows: "1fr",
                    gap: "1.5rem",
                    justifyContent: "center",
                }}
            >
                {relatedCoursesLoading ? (
                    Array.from(new Array(4)).map((_, index) => (
                        <Box key={index} sx={{ height: "100%" }}>
                            <CourseWidgetSkeleton />
                        </Box>
                    ))
                ) : (
                    relatedCourses.slice(0, 4).map((course, index) => (
                        <Box key={index} sx={{ height: "100%" }}>
                            <CourseWidget courseInfo={course} />
                        </Box>
                    ))
                )}
            </Box>
        </Box>
    );
};

export default RelatedCourses;
