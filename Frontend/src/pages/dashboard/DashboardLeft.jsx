import { Chip } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { StyledButton } from "../../components/StyledButton";
import { DashboardContext } from "../../state/DashboardContext";

const DashboardLeft = () => {
    const {selectedCourse, setSelectedCourse } = useContext(DashboardContext);

    const user = useSelector((state) => state.auth.user);
    const theme = useTheme();

    return (
        <Box>
            {!selectedCourse && (
                <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "600" }}>
                    Select a course
                </Typography>
            )}
            {selectedCourse && (
                <StyledButton variant="contained" sx={{ width: "100%", my: "0.5rem" }} onClick={() => setSelectedCourse(null)}>
                    Remove selection
                </StyledButton>
            )}

            <Divider sx={{ mt: "0.5rem", mb: "1rem", zIndex: "-100" }} />
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1rem",
                }}
            >
                {user?.courses
                    ?.slice(0)
                    .reverse()
                    .map((course, index) => {
                        if (course.courseStatus != "draft")
                            return (
                                <Box
                                    key={index}
                                    sx={{
                                        cursor: "pointer",
                                        border: "1px solid " + theme.palette.grey.grey300,
                                        width: "100%",
                                        borderRadius: "0.5rem",
                                        // padding: "0.5rem",
                                        overflow: "hidden",
                                        backgroundColor: selectedCourse?._id == course._id ? theme.palette.primary.main : "transparent",
                                        outline: selectedCourse?._id == course._id ? "2px solid " + theme.palette.grey.grey600 : "none",

                                        "&:hover": {
                                            backgroundColor: theme.palette.primary.main,
                                        },
                                    }}
                                    onClick={() => {
                                        if (selectedCourse && selectedCourse._id == course._id) {
                                            setSelectedCourse(null);
                                        } else {
                                            setSelectedCourse(course);
                                        }
                                    }}
                                >
                                    <img
                                        src={`${import.meta.env.VITE_SERVER_URL}/images/${course.courseThumbnail}`}
                                        alt=""
                                        style={{
                                            width: "100%",

                                            // height: "100%",
                                            maxHeight: "120px",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <h6
                                        style={{
                                            padding: "0.5rem",
                                        }}
                                    >
                                        {course.courseTitle}
                                    </h6>
                                    <Box
                                        sx={{
                                            // mt: "0.5rem",
                                            padding: "0.5rem",
                                            fontSize: "1rem",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.5rem",
                                        }}
                                    >
                                        {/* <Typography> You are </Typography> */}
                                        {course?.owner == user._id && (
                                            <Chip
                                                sx={{
                                                    color: "white",
                                                    backgroundColor: theme.palette.error.main,
                                                }}
                                                label="Owner"
                                                size="small"
                                                variant="contained"
                                            />
                                        )}
                                        {course?.courseInstructors?.reduce((acc, curr) => {
                                            if (curr == user._id) return true;
                                            else return acc;
                                        }, false) && (
                                            <Chip
                                                sx={{
                                                    color: "white",
                                                    backgroundColor: theme.palette.grey.grey800,
                                                }}
                                                label="Instructor"
                                                size="small"
                                                variant="contained"
                                            />
                                        )}
                                    </Box>
                                </Box>
                            );
                        else return null;
                    })}
            </Box>
        </Box>
    );
};

export default DashboardLeft;
