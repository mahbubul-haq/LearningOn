import React from "react";
import { useContext } from "react";
import { DashboardContext } from "../../state/DashboardContext";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";


const DashboardLeft = () => {
    const { openedTab, setOpenedTab, selectedCourse, setSelectedCourse } =
        useContext(DashboardContext);

    const user = useSelector((state) => state.user);
    const theme = useTheme();

    return (
        <Box>
            <Typography
                variant="h6"
                sx={{ textAlign: "center", fontWeight: "600" }}
            >
                Courses
            </Typography>
            <Divider sx={{ mt: "0.5rem", mb: "1rem", zIndex: "-100" }} />
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1rem",
                }}
            >
                {user?.courses?.map((course, index) => (
                    <Box
                        key={index}
                        sx={{
                            cursor: "pointer",
                            border: "1px solid " + theme.palette.grey.grey300,
                            width: "100%",
                            borderRadius: "0.5rem",
                            // padding: "0.5rem",
                            overflow: "hidden",
                            backgroundColor:
                                selectedCourse?._id == course._id
                                    ? theme.palette.primary.main
                                    : "transparent",
                            outline:
                                selectedCourse?._id == course._id
                                    ? "2px solid " + theme.palette.grey.grey600
                                    : "none",

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
                            src={`${
                                import.meta.env.VITE_REACT_APP_URL
                            }/images/${course.courseThumbnail}`}
                            alt=""
                            style={{
                                width: "100%",

                                // height: "100%",
                                maxHeight: "150px",
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
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default DashboardLeft;
