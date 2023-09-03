import React from "react";
import WidgetWrapper from "./WidgetWrapper";
import Rating from "./Rating";
import FlexBetween from "./FlexBetween";
import { Box, Typography } from "@mui/material";
import { GlobalContext } from "../state/GlobalContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const InstructorProfile = ({ instructorId }) => {
    const { users } = useContext(GlobalContext);

    const instructor = users.find((user) => user._id == instructorId);
    const numberOfEnrolledStudents = instructor?.courses?.reduce(
        (acc, course) => {
            return (
                acc +
                (course.enrolledStudents ? course.enrolledStudents.length : 0)
            );
        },
        0
    );

    const profilePicture = instructor?.picturePath
        ? `${import.meta.env.VITE_REACT_APP_URL}/images/${
              instructor.picturePath
          }`
        : "/images/dummyPerson.jpeg";

    // console.log("instructor", instructor);
    const navigate = useNavigate();

    return (
        <WidgetWrapper
            sx={{
                "&&": {
                    paddingRight: "3rem",
                },
            }}
        >
            <FlexBetween
                sx={{
                    gap: "3rem",
                }}
            >
                <FlexBetween
                    sx={{
                        gap: "1rem",
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
                            src={profilePicture}
                            alt="instructor"
                            style={{
                                width: "4rem",
                                height: "4rem",
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
                            gap: "1rem",
                            justifyContent: "center",
                            alignItems: "flex-start",
                        }}
                    >
                        <Typography
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
                                "&:hover": {
                                    textDecoration: "underline",
                                },
                            }}
                            onClick={() => {
                                navigate(`/profile/${instructor?._id}`);
                            }}
                        >
                            {instructor?.name?.length > 20
                                ? instructor?.name?.slice(0, 20) + "..."
                                : instructor?.name}
                        </Typography>
                        <Rating
                            rating={{
                                rating: instructor
                                    ? instructor.rating.rating
                                    : 0,
                                count: instructor ? instructor.rating.count : 0,
                                showText: false,
                            }}
                        />
                    </Box>
                </FlexBetween>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        justifyContent: "center",
                        alignItems: "flex-start",
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
