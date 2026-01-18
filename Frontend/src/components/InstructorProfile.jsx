import { Box, Typography, Divider, useTheme, Avatar } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../state/GlobalContext";
import Rating from "./Rating";

const InstructorProfile = ({ instructorId }) => {
    const { users } = useContext(GlobalContext);
    const theme = useTheme();
    const isMobileScreens = useMediaQuery("(max-width: 600px)");
    const instructor = users.find((user) => user._id == instructorId);

    // Calculate stats
    const numberOfEnrolledStudents = instructor?.courses?.reduce((acc, course) => {
        return acc + (course.enrolledStudents ? course.enrolledStudents.length : 0);
    }, 0) || 0;

    const numberOfCourses = instructor?.courses?.length || 0;

    const navigate = useNavigate();

    if (!instructor) return null;

    return (
        <Box
            sx={{
                width: "100%",
                ...theme.palette.glassSheet, // Apply centralized glassmorphism style
                padding: "1.5rem",
                transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: theme.palette.mode === 'dark'
                        ? "0 12px 40px 0 rgba(0, 0, 0, 0.4)"
                        : "0 12px 40px 0 rgba(31, 38, 135, 0.15)",
                }
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: isMobileScreens ? "column" : "row",
                    flexWrap: "wrap", // Allow wrapping if space is tight
                    alignItems: "center",
                    gap: isMobileScreens ? "1rem" : "1.5rem",
                    justifyContent: "space-between",
                }}
            >
                {/* Left Side: Image and Info */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: isMobileScreens ? "column" : "row",
                        alignItems: "center",
                        gap: "1.5rem",
                        textAlign: isMobileScreens ? "center" : "left",
                        flex: "1 1 200px", // Grow, shrink, min-basis
                    }}
                >
                    <Avatar
                        src={instructor?.picturePath
                            ? `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/${instructor?.picturePath}`
                            : "/images/dummyPerson.jpeg"}
                        alt={instructor?.name}
                        sx={{
                            width: isMobileScreens ? 80 : 90,
                            height: isMobileScreens ? 80 : 90,
                            border: `2px solid ${theme.palette.primary.light}`,
                            boxShadow: theme.palette.mode === 'dark' ? "0 0 20px rgba(107, 79, 217, 0.3)" : "none",
                        }}
                    />

                    <Box>
                        <Typography
                            variant="h5"
                            component="div"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(`/profile/${instructor?._id}`);
                            }}
                            sx={{
                                fontWeight: "700",
                                cursor: "pointer",
                                color: theme.palette.text.primary,
                                marginBottom: "0.25rem",
                                textDecoration: "none",
                                "&:hover": {
                                    color: theme.palette.primary.main,
                                    textDecoration: "underline",
                                },
                            }}
                        >
                            {instructor?.name}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ marginBottom: "0.5rem" }}
                        >
                            Instructor
                        </Typography>

                        <Box sx={{ display: "flex", justifyContent: isMobileScreens ? "center" : "flex-start" }}>
                            <Rating
                                rating={{
                                    rating: instructor?.rating?.rating || 0,
                                    count: instructor?.rating?.count || 0,
                                    showText: true,
                                    textStyle: { opacity: 0.8, fontSize: "0.85rem" }
                                }}
                            />
                        </Box>
                    </Box>
                </Box>

                {/* Divider for Desktop */}
                {!isMobileScreens && (
                    <Divider orientation="vertical" flexItem sx={{ borderColor: theme.palette.divider }} />
                )}

                {/* Divider for Mobile */}
                {isMobileScreens && (
                    <Divider flexItem sx={{ width: "100%", borderColor: theme.palette.divider }} />
                )}

                {/* Right Side: Stats */}
                <Box
                    sx={{
                        display: "flex",
                        gap: "2rem",
                        justifyContent: "center",
                        minWidth: isMobileScreens ? "100%" : "auto",
                    }}
                >
                    <Box sx={{ textAlign: "center" }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: "800",
                                color: theme.palette.primary.main
                            }}
                        >
                            {numberOfCourses}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: "1px" }}>
                            Courses
                        </Typography>
                    </Box>

                    <Box sx={{ textAlign: "center" }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: "800",
                                color: theme.palette.secondary.main
                            }}
                        >
                            {numberOfEnrolledStudents}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: "1px" }}>
                            Students
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default InstructorProfile;
