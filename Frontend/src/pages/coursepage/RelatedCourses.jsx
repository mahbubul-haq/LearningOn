import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import React, { useEffect, useState, useContext } from "react";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import RefreshIcon from '@mui/icons-material/Refresh';
import CourseWidget from "../../widgets/CourseWidget";
import { HeaderTypography2 } from "../../components/StyledTypography";
import { useSelector } from "react-redux";
import CourseWidgetSkeleton from "../../components/CourseWidgetSkeleton";
import { CoursePageContext } from "../../state/CoursePageContext";
import { useCoursePageRelatedCourses } from "./hooks/CoursePageHooks";


const RelatedCourses = ({ courseInfo }) => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const theme = useTheme();
    const { token, user } = useSelector((state) => state.auth);

    // const { relatedCourses, relatedCoursesLoading, fetchRelatedCourses } = useContext(CoursePageContext);

    const { data: relatedCourses, isLoading: relatedCoursesLoading, error: relatedCoursesError, refetch: relatedCoursesRefetch } = useCoursePageRelatedCourses(courseInfo?.category, courseInfo?._id);

    // if (!relatedCoursesLoading && relatedCourses.length === 0) return null;

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
                ) : relatedCoursesError ? (
                    <Box sx={{
                        gridColumn: "1 / -1",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        py: 8,
                        px: 4,
                        borderRadius: "24px",
                        background: theme.palette.mode === 'dark' ? alpha(theme.palette.error.main, 0.05) : alpha(theme.palette.error.main, 0.02),
                        border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
                        boxShadow: `inset 0 0 40px ${alpha(theme.palette.error.main, 0.05)}`
                    }}>
                        <ErrorOutlineIcon sx={{ fontSize: 64, color: theme.palette.error.main, mb: 2, opacity: 0.8 }} />
                        <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary", mb: 1, textAlign: "center", letterSpacing: "-0.02em" }}>
                            Oops! Something went wrong.
                        </Typography>
                        <Typography variant="body1" sx={{ color: "text.secondary", mb: 4, textAlign: "center", maxWidth: "400px" }}>
                            We couldn't load the related courses at this moment. Please check your connection or try again.
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<RefreshIcon />}
                            onClick={() => relatedCoursesRefetch()}
                            sx={{
                                borderRadius: "12px",
                                px: 4,
                                py: 1.2,
                                fontWeight: 600,
                                textTransform: "none",
                                fontSize: "1rem",
                                backgroundColor: theme.palette.error.main,
                                color: "#fff",
                                "&:hover": {
                                    backgroundColor: theme.palette.error.dark,
                                    transform: "translateY(-2px)",
                                    boxShadow: `0 8px 20px ${alpha(theme.palette.error.main, 0.3)}`
                                },
                                transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                            }}
                        >
                            Try Again
                        </Button>
                    </Box>
                ) : relatedCourses?.length === 0 ? (
                    <Box sx={{
                        gridColumn: "1 / -1",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        py: 8,
                        px: 4,
                        borderRadius: "24px",
                        background: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.03) : alpha(theme.palette.primary.main, 0.01),
                        border: `1px dashed ${alpha(theme.palette.primary.main, 0.2)}`,
                    }}>
                        <LibraryBooksIcon sx={{ fontSize: 64, color: theme.palette.text.disabled, mb: 2 }} />
                        <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary", mb: 1, textAlign: "center", letterSpacing: "-0.02em" }}>
                            No Related Courses Yet
                        </Typography>
                        <Typography variant="body1" sx={{ color: "text.secondary", textAlign: "center", maxWidth: "500px" }}>
                            It looks like we don't have any other courses in this specific category right now.
                        </Typography>
                    </Box>
                ) : (
                    relatedCourses?.slice(0, 4).map((course, index) => (
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
