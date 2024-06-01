import { Box, Typography } from "@mui/material";
import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import FlexBetween from "../../components/FlexBetween";
import Rating from "../../components/Rating";
import { StyledButton } from "../../components/StyledButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";

const TopSectionSmall = ({ courseInfo }) => {
    const isMobibleScreen = useMediaQuery("(max-width: 600px)");

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
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/data/create-payment-sesson`, {
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
                backgroundColor: theme.palette.background.bottom,
                backgroundImage: `linear-gradient(to bottom, ${theme.palette.background.top}, ${theme.palette.background.bottom})`,
                color: theme.palette.text.primary,
                pb: "2rem",
                ///border: "0.1px solid" + theme.palette.background.bottom,
                border: "0.1px solid" + theme.palette.background.top,
            }}
        >
            <Typography
                variant="h3"
                sx={{
                    fontWeight: "bold",
                    my: "2rem",
                    textAlign: "center",
                    textTransform: "capitalize",
                    px: "1rem",
                    fontSize: isMobibleScreen ? "1rem" : "1.3rem",
                }}
            >
                {courseInfo?.courseTitle}
            </Typography>
            {isMobibleScreen ? (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1rem 2rem",
                        px: "1rem",
                        mx: "auto",
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: "1rem",
                            gridColumn: "1/2",
                            textAlign: "right",
                        }}
                    >
                        Course Cost
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: "bold",
                            gridColumn: "2/3",
                        }}
                    >
                        $ {courseInfo?.coursePrice}
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: "1rem",
                            gridColumn: "1/2",
                            textAlign: "right",
                        }}
                    >
                        Rating
                    </Typography>
                    <Box
                        sx={{
                            gridColumn: "2/3",
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
                        variant="h6"
                        sx={{
                            fontSize: "1rem",
                            gridColumn: "1/2",
                            textAlign: "right",
                        }}
                    >
                        Enrolled by
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: "1rem",
                            gridColumn: "2/3",
                        }}
                    >
                        <b>{courseInfo?.enrolledStudents?.length}</b> students
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: "1rem",
                            gridColumn: "1/2",
                            textAlign: "right",
                        }}
                    >
                        Time to complete
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: "1rem",
                            gridColumn: "2/3",
                        }}
                    >
                        <b>{courseInfo?.approxTimeToComplete} weeks</b>
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: "1rem",
                            gridColumn: "1/2",
                            textAlign: "right",
                        }}
                    >
                        Language
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: "1rem",
                            gridColumn: "2/3",
                        }}
                    >
                        <b>{courseInfo?.courseLanguage}</b>
                    </Typography>
                </Box>
            ) : (
                <Box
                    sx={{
                        width: "100%",
                        // maxWidth: "400px",
                        display: "grid",
                        gridTemplateColumns: isMobibleScreen ? "1fr" : "1fr 1fr",
                        gap: "1rem",
                        px: "1rem",
                        mx: "auto",

                        // alignItems: "center",
                    }}
                >
                    <FlexBetween
                        sx={{
                            gap: "2rem",
                            "&&": {
                                justifyContent: isMobibleScreen ? "center" : "center",
                            },
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: "1rem",
                                justifySelf: isMobibleScreen ? "flex-end" : "center",
                            }}
                        >
                            Course Cost
                        </Typography>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: "bold",
                                justifySelf: isMobibleScreen ? "flex-start" : "center",
                            }}
                        >
                            $ {courseInfo?.coursePrice}
                        </Typography>
                    </FlexBetween>
                    <FlexBetween
                        sx={{
                            gap: "2rem",
                            "&&": {
                                justifyContent: isMobibleScreen ? "center" : "center",
                            },
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: "1rem",
                                justifySelf: isMobibleScreen ? "flex-end" : "center",
                            }}
                        >
                            Rating
                        </Typography>
                        <Box
                            sx={{
                                justifySelf: isMobibleScreen ? "flex-start" : "center",
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
                    </FlexBetween>
                    <FlexBetween
                        sx={{
                            gap: "2rem",
                            "&&": {
                                justifyContent: isMobibleScreen ? "center" : "center",
                            },
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: "1rem",
                            }}
                        >
                            Enrolled by
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: "1rem",
                            }}
                        >
                            <b>{courseInfo?.enrolledStudents?.length}</b> students
                        </Typography>
                    </FlexBetween>
                    <FlexBetween
                        sx={{
                            gap: "2rem",
                            "&&": {
                                justifyContent: isMobibleScreen ? "center" : "center",
                            },
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: "1rem",
                            }}
                        >
                            Time to complete
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: "1rem",
                            }}
                        >
                            <b>{courseInfo?.approxTimeToComplete} weeks</b>
                        </Typography>
                    </FlexBetween>

                    <FlexBetween
                        sx={{
                            gap: "2rem",
                            "&&": {
                                justifyContent: isMobibleScreen ? "center" : "center",
                            },
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: "1rem",
                            }}
                        >
                            Language
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: "1rem",
                            }}
                        >
                            <b>{courseInfo?.courseLanguage}</b>
                        </Typography>
                    </FlexBetween>
                </Box>
            )}
            <Box
                sx={{
                    gap: "1rem",
                    px: "1rem",
                    // mx: "auto",
                    width: "100%",
                    mt: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "1rem",
                        width: "100%",
                        textAlign: "center",
                    }}
                >
                    {courseInfo?.studentRequirements}
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
                            maxWidth: "200px",
                            // ml: "auto",
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
            </Box>
        </Box>
    );
};

export default TopSectionSmall;
