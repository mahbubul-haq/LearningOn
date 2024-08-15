import { Box, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../state/GlobalContext";
import FlexBetween from "./FlexBetween";
import Rating from "./Rating";
import WidgetWrapper from "./WidgetWrapper";

const InstructorProfile = ({ instructorId }) => {
    const { users } = useContext(GlobalContext);
    const isMobileScreens = useMediaQuery("(max-width: 600px)");
    const instructor = users.find((user) => user._id == instructorId);
    const numberOfEnrolledStudents = instructor?.courses?.reduce((acc, course) => {
        return acc + (course.enrolledStudents ? course.enrolledStudents.length : 0);
    }, 0);
    // console.log("instructor", instructor);
    const navigate = useNavigate();

    return (
        <WidgetWrapper
            sx={{
                width: "100%",
                height: "100%",
                maxHeight: "300px",
                "&&": {
                    paddingRight: isMobileScreens ? "2rem" : "3rem",

                },
            }}
        >
            <FlexBetween
                sx={{
                    gap: isMobileScreens ? "2rem" : "3rem",

                    flexDirection: isMobileScreens ? "column" : "row",
                    //alignItems: isMobileScreens ? "flex-start" : "center",
                    "&&": {
                        justifyContent: isMobileScreens ? "flex-start" : "space-between",
                        alignItems: isMobileScreens ? "flex-start" : "center",
                    },
                    //border: "2px solid black"
                }}
            >
                <FlexBetween
                    sx={{
                        gap: "1rem",
                        flexDirection: isMobileScreens ? "row" : "row",
                        // alignItems: isMobileScreens ? "flex-start" : "center",
                        // justifyContent: isMobileScreens ? "flex-start" : "space-between",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <img
                            // load image from public/image folder
                            src={instructor?.picturePath ? `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/${instructor?.picturePath}` : "/images/dummyPerson.jpeg"}
                            alt="instructor"
                            style={{
                                width: isMobileScreens ? "3rem" : "4rem",
                                height: isMobileScreens ? "3rem" : "4rem",
                                borderRadius: "50%",
                                objectFit: "cover",
                            }}
                            loading="lazy"
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: isMobileScreens ? "0rem" : "1rem",
                            justifyContent: "flex-start",
                            alignItems: isMobileScreens ? "flex-start" : "flex-start",
                        }}
                    >
                        <Typography
                            component="a"
                            href={`${import.meta.env.VITE_CLIENT_URL}/profile/${instructor?._id}`}
                            sx={{
                                fontWeight: "600",
                                fontSize: "1rem",
                                // ellipsis: true,
                                // overflow: "hidden",

                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                maxWidth: "100%",
                                // ellipsis after 20 characters
                                cursor: "pointer",
                                color: "inherit",
                                "&:hover": {
                                    textDecoration: "underline",
                                    color: "inherit"
                                },
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(`/profile/${instructor?._id}`);
                            }}
                        >
                            {instructor?.name?.length > 20 ? instructor?.name?.slice(0, 20) + "..." : instructor?.name}
                        </Typography>
                        <Rating
                            rating={{
                                rating: instructor ? instructor.rating.rating : 0,
                                count: instructor ? instructor.rating.count : 0,
                                showText: false,
                                oneStar: true,
                            }}
                        />
                    </Box>
                </FlexBetween>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: isMobileScreens ? "row" : "column",
                        gap: "1rem",
                        justifyContent: "center",
                        alignItems: isMobileScreens ? "space-between" : "flex-start",
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: "600",
                        }}
                    >
                        {instructor?.courses.length} courses
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: "600",
                        }}
                    >
                        {numberOfEnrolledStudents} students
                    </Typography>
                </Box>
            </FlexBetween>
        </WidgetWrapper>
    );
};

export default InstructorProfile;
