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


    useEffect(() => {
        const fetchRelatedCourses = async () => {

            setLoading(true);
            const categoryToFetch = courseInfo?.category || "";
            let encodedCategory = encodeURIComponent(categoryToFetch);

            try {
                let response = await fetch(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/courses?category=${encodedCategory}&courseId=${courseInfo?._id}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "auth-token": token,
                        },
                    }
                );

                let data = await response.json();

                if (data.success) {
                    setCourses([...data.courses]);
                }
                else {
                    setCourses([]);
                }

            } catch (err) {
                console.error("Failed to fetch related courses:", err);
                setCourses([]);
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
                {loading ? (
                    Array.from(new Array(4)).map((_, index) => (
                        <Box key={index} sx={{ height: "100%" }}>
                            <CourseWidgetSkeleton />
                        </Box>
                    ))
                ) : (
                    courses.slice(0, 4).map((course, index) => (
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
