import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { CourseExplorerContext } from "../../state/CourseExplorerContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import { StyledButton } from "../StyledButton";

const NoCourseFound = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const {
        getFilteredCourses,
        selectedCategory,
        selectedSubCategory,
        categoryChanged,
        categoryChangedRef,
        setCategoryChanged,
        courseLoadingError,
        setCourseLoadingError,
    } = useContext(CourseExplorerContext);
    return (
        <Box>
            {categoryChangedRef.current ? (
                <Box>
                    <Typography variant="h4grey">Loading courses...</Typography>
                </Box>
            ) : !courseLoadingError ? (<Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "2rem",
                }}
            >
                <Typography variant="h4grey">No courses found</Typography>
                <img
                    style={{
                        width: isNonMobileScreens ? "350px" : "250px",
                        height: "auto",
                        objectFit: "cover",
                    }}
                    src="/images/not_found_1.svg"
                    alt="not found"
                />
            </Box>

            ) : (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "2rem",
                    }}
                >
                    <Typography variant="h4grey">Failed to load courses</Typography>
                    <StyledButton
                        variant="contained"
                        onClick={() => {
                            categoryChangedRef.current = true;
                            setCategoryChanged(true);
                            getFilteredCourses(true)
                        }
                        }
                        sx={{ padding: "0.5rem 1.5rem", fontSize: "1rem" }}
                    >
                        Load Courses
                    </StyledButton>
                </Box>
            )}
        </Box>
    );
};

export default NoCourseFound;
