import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import CourseWidget from "../../widgets/CourseWidget";
import { HeaderTypography2 } from "../../components/StyledTypography";
import { useSelector } from "react-redux";
import CourseWidgetSkeleton from "../../components/CourseWidgetSkeleton";

const RelatedCourses = ({ courseInfo }) => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const theme = useTheme();
    const token = useSelector((state) => state.auth.token);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState("Related Courses");

    useEffect(() => {
        const fetchRelatedCourses = async () => {
            // Initial check to avoid unnecessary fetch if courseInfo isn't ready, 
            // but we want to allow fallback even if courseInfo is missing category properties (though unlikely for a valid course).
            // if (!courseInfo?.category) return; 

            setLoading(true);
            const categoryToFetch = courseInfo?.subCategory || courseInfo?.category || "";
            let encodedCategory = encodeURIComponent(categoryToFetch);

            try {
                let response = await fetch(
                    `${import.meta.env.VITE_SERVER_URL}/course/getfiltered?page=1&coursePerPage=8&category=${encodedCategory}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "auth-token": token,
                        },
                    }
                );

                let data = await response.json();
                let filtered = [];

                if (data.success) {
                    filtered = data.courses.filter(course => course._id !== courseInfo?._id);
                }

                // Fallback: If no courses found (or only the current one was found), fetch generic courses
                if (filtered.length === 0) {
                    setTitle("More Courses You Might Like");
                    response = await fetch(
                        `${import.meta.env.VITE_SERVER_URL}/course/getfiltered?page=1&coursePerPage=8&category=`,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "auth-token": token,
                            },
                        }
                    );
                    data = await response.json();
                    if (data.success) {
                        filtered = data.courses.filter(course => course._id !== courseInfo?._id);
                    }
                } else {
                    setTitle("Related Courses");
                }

                setCourses(filtered.slice(0, 4));

            } catch (err) {
                console.error("Failed to fetch related courses:", err);
            } finally {
                setLoading(false);
            }
        };

        if (courseInfo?._id) {
            fetchRelatedCourses();
        }

    }, [courseInfo, token]);

    if (!loading && courses.length === 0) return null;

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
                {title}
            </HeaderTypography2>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    /// all have same height
                    gridAutoRows: "1fr",
                    gap: "1.5rem",
                    justifyContent: "center",
                }}
            >
                {loading ? (
                    Array.from(new Array(4)).map((_, index) => (
                        <Box key={index} sx={{ height: "100%" }}>
                            <CourseWidgetSkeleton />
                        </Box>
                    ))
                ) : (
                    courses.map((course, index) => (
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
