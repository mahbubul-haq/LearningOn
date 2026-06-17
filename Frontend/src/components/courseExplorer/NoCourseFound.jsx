import { Box, Typography } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import React, { useContext } from "react";
import { CourseExplorerContext } from "../../state/CourseExplorerContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import { StyledButton } from "../StyledButton";
import CircularProgress from "@mui/material/CircularProgress";
import SearchOffIcon from "@mui/icons-material/SearchOff";

const NoCourseFound = ({ refetchCourses, loading, isError }) => {
    const isNonMobileScreens = useMediaQuery("(min-width: 900px)");
    const theme = useTheme();

    return (
        <Box sx={{ width: "100%", gridColumn: "1 / -1" }}>
            {loading ? (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: isNonMobileScreens ? "4rem 2rem" : "3rem 1rem",
                        backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                        borderRadius: "16px",
                        border: `1px dashed ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                        margin: "2rem auto",
                        maxWidth: "600px",
                        textAlign: "center",
                        gap: "1.5rem",
                    }}
                >
                    <CircularProgress size={48} thickness={4} sx={{ color: theme.palette.primary?.main || theme.palette.text.primary }} />
                    <Box>
                        <Typography
                            variant="h4"
                            sx={{
                                color: theme.palette.text.primary,
                                fontWeight: 600,
                                letterSpacing: "-0.5px",
                                mb: 1
                            }}
                        >
                            Loading Courses...
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: theme.palette.text.secondary,
                                maxWidth: "300px",
                                mx: "auto"
                            }}
                        >
                            Please wait while we fetch the best learning materials for you.
                        </Typography>
                    </Box>
                </Box>
            ) : !isError ? (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: isNonMobileScreens ? "4rem 2rem" : "3rem 1rem",
                        backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                        borderRadius: "16px",
                        border: `1px dashed ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                        margin: "2rem auto",
                        maxWidth: "600px",
                        textAlign: "center",
                        gap: "1rem",
                        transition: "all 0.3s ease",
                        "&:hover": {
                            backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                            border: `1px dashed ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}`,
                        }
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                            borderRadius: "50%",
                            padding: "1rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "0.5rem"
                        }}
                    >
                        <SearchOffIcon sx={{ fontSize: "3rem", color: theme.palette.text.secondary, opacity: 0.7 }} />
                    </Box>
                    <Typography
                        variant="h3"
                        sx={{
                            color: theme.palette.text.primary,
                            fontWeight: 600,
                            letterSpacing: "-0.5px"
                        }}
                    >
                        No Courses Available
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: theme.palette.text.secondary,
                            maxWidth: "400px",
                            lineHeight: 1.6
                        }}
                    >
                        We couldn't find any courses matching your current filters. Try adjusting your search criteria or exploring other categories.
                    </Typography>
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
                    <Typography variant="h4" sx={{ color: theme.palette.courseExplorer.textSecondary }}>Failed to load courses</Typography>
                    <StyledButton
                        variant="contained"
                        onClick={() => {
                            refetchCourses();
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
