import { Box, Button } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import FlexBetween from "../../components/FlexBetween";
import Rating from "../../components/Rating";
import { StyledButton } from "../../components/StyledButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const TopSection = ({ courseInfo }) => {
    const { user, token } = useSelector((state) => state);

    const [purchased, setPurchased] = React.useState(
        courseInfo?.enrolledStudents?.reduce((cur, enrollMent) => {
            return cur || enrollMent.userId == user?._id;
        }, false)
    );
    const navigate = useNavigate();
    const theme = useTheme();

    React.useEffect(() => {
        console.log(user, courseInfo);
        if (user && courseInfo) {
            if (
                courseInfo.enrolledStudents?.reduce((cur, enrollMent) => {
                    return cur || enrollMent.userId == user._id;
                }, false)
            )
                setPurchased(true);
            if (
                courseInfo.courseInstructors?.reduce((cur, instructor) => {
                    return cur || instructor._id == user._id;
                }, false)
            ) {
                setPurchased(true);
            }

            if (courseInfo.owner?._id == user._id) {
                setPurchased(true);
            }
        }
    }, [user, courseInfo]);

    const enrollCourse = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_URL}/data/create-payment-sesson`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
                body: JSON.stringify({
                    courseId: courseInfo._id,
                }),
            });
            const data = await response.json();
            if (data.success) {
                window.location = data.url;
            }
            console.log(data);
        } catch (e) {}
    };

    return (
        <Box
            sx={{
                padding: "3rem 5rem",
                backgroundColor: theme.palette.background.bottom,
                backgroundImage: `linear-gradient(to bottom, ${theme.palette.background.top}, ${theme.palette.background.bottom})`,
                color: theme.palette.text.primary,
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
            }}
        >
            <Typography
                variant="h2"
                sx={{
                    fontWeight: "bold",
                    mb: "1rem",
                    textAlign: "center",
                    textTransform: "capitalize",
                    px: "2rem",
                }}
            >
                {courseInfo?.courseTitle}
            </Typography>
            <FlexBetween
                sx={{
                    width: "100%",
                }}
            >
                <FlexBetween
                    sx={{
                        gap: "1rem",
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: "1.1rem",
                        }}
                    >
                        Course Cost
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: "bold",
                        }}
                    >
                        $ {courseInfo?.coursePrice}
                    </Typography>
                </FlexBetween>
                <Box
                    sx={{
                        fontSize: "1.1rem",
                    }}
                >
                    <Rating
                        rating={{
                            rating: courseInfo?.ratings?.totalRating,
                            count: courseInfo?.ratings?.numberOfRatings,
                            showText: true,
                        }}
                    />
                </Box>
                <Typography
                    sx={{
                        fontSize: "1.1rem",
                    }}
                >
                    Enrolled by <b>{courseInfo?.enrolledStudents?.length}</b> students
                </Typography>
                <Typography
                    sx={{
                        fontSize: "1.1rem",
                    }}
                >
                    Time to complete <b>{courseInfo?.approxTimeToComplete} weeks</b> (Approx)
                </Typography>
            </FlexBetween>
            <FlexBetween>
                <Typography
                    sx={{
                        fontSize: "1.1rem",
                    }}
                >
                    Instructors{" "}
                    {courseInfo?.courseInstructors?.map((instructor, index) => {
                        return (
                            <Button
                                key={index}
                                sx={{
                                    fontWeight: "bold",
                                    color: theme.palette.text.primary,
                                    textTransform: "capitalize",
                                    fontSize: "1.1rem",
                                    "&:hover": {
                                        color: theme.palette.text.primary,
                                        textDecoration: "underline",
                                    },
                                }}
                                onClick={() => {
                                    navigate(`/profile/${instructor._id}`);
                                }}
                            >
                                {instructor.name}
                            </Button>
                        );
                    })}
                </Typography>
                <Typography
                    sx={{
                        fontSize: "1.1rem",
                    }}
                >
                    Language <b>{courseInfo?.courseLanguage}</b>
                </Typography>
                <StyledButton
                    onClick={() => {
                        if (purchased) {
                            navigate(`/learning/course/${courseInfo._id}`);
                        } else {
                            if (user) {
                                enrollCourse();
                            } else {
                                navigate("/login", {
                                    state: {
                                        isLogin: true,
                                        redirect: `/course/${courseInfo._id}`,
                                    },
                                });
                            }
                        }
                    }}
                    sx={{
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        "&&": {
                            backgroundColor: theme.palette.primary.main1,
                            "&:hover": {
                                backgroundColor: theme.palette.primary.dark,
                            },
                        },
                    }}
                >
                    {purchased
                        ? courseInfo.courseInstructors?.reduce((cur, instructor) => {
                              return cur || instructor._id == user._id;
                          }, false) || courseInfo.owner?._id == user._id
                            ? "Open Lessons"
                            : "Start Learning"
                        : "Enroll Now"}
                </StyledButton>

                <Box></Box>
            </FlexBetween>
            <Typography
                sx={{
                    fontSize: "0.9rem",
                }}
            >
                {courseInfo?.studentRequirements}
            </Typography>
        </Box>
    );
};

export default TopSection;
