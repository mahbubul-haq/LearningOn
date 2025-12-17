import { Box, Button, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import Rating from "../../components/Rating";
import { StyledButton } from "../../components/StyledButton";
import { getEnrollmentStatus, getEnrollmentText } from "../../utils/course";
import WidgetWrapper from "../../components/WidgetWrapper";

const TopSectionLarge = ({ courseInfo, purchased, enrollCourse }) => {
    const { user } = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const theme = useTheme();


    return (
        <Box sx={{
            padding: "3rem 5rem",
            display: "grid",
            gridTemplateColumns: "70% 30%",
            backgroundColor: theme.palette.background.bottom,
            backgroundImage: `linear-gradient(to bottom, ${theme.palette.background.top}, ${theme.palette.background.bottom})`,
            color: theme.palette.text.primary,
        }}>
            <Box sx={{
                // border: "1px solid red",
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                pr: "2rem",
            }}>
                <Box>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: "bold",
                            mb: "1rem",

                            textTransform: "capitalize",

                        }}
                    >
                        {courseInfo?.courseTitle}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "1.1rem",
                        }}
                    >
                        Instructors{" "}
                        {courseInfo?.courseInstructors?.map((instructor, index) => {
                            return (
                                <Button component="a"
                                    href={`${import.meta.env.VITE_CLIENT_URL}/profile/${instructor?._id}`}
                                    key={index}
                                    title="View Profile"
                                    sx={{
                                        fontWeight: "bold",
                                        color: theme.palette.text.primary,
                                        textTransform: "capitalize",
                                        fontSize: "1.1rem",
                                        m: 0,
                                        mb: "0.1rem",
                                        textDecoration: "underline",
                                        "&:hover": {
                                            color: theme.palette.text.primary,
                                            textDecoration: "underline",
                                        },
                                    }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate(`/profile/${instructor._id}`);
                                    }}
                                >
                                    {instructor.name}
                                </Button>
                            );
                        })}
                    </Typography>


                </Box>

                <Divider />

                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                }}>
                    <Box sx={{
                        fontSize: "1.1rem",
                    }}>
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
                        Language <b>{courseInfo?.courseLanguage}</b>
                    </Typography>


                    <Typography
                        sx={{
                            fontSize: "1.1rem",
                        }}
                    >
                        Time to complete <b>{courseInfo?.approxTimeToComplete} weeks</b> (Approx)
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "1.1rem",
                        }}
                    >
                        Requirements: {courseInfo?.studentRequirements}
                    </Typography>

                </Box>


            </Box>
            <Box sx={{
                // border: "1px solid blue",
                display: "flex",
                alignItems: "center",
                pl: "1rem",
            }}>
                <Box sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    // backgroundColor: "#e2a968ff",
                    p: "2rem",
                    width: "100%",
                    borderRadius: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    justifyContent: "center",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    backdropFilter: "blur(10px)"
                }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: "bold",
                        }}>
                        {`$ ${courseInfo?.coursePrice}`}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "1.1rem",
                        }}
                    >
                        {getEnrollmentText(purchased, user, courseInfo)}
                    </Typography>

                    <StyledButton
                        component="a"
                        href={`${import.meta.env.VITE_CLIENT_URL}/learning/course/${courseInfo?._id}`}
                        onClick={(e) => {
                            e.preventDefault();
                            if (purchased) {
                                navigate(`/learning/course/${courseInfo?._id}`);
                            } else {
                                if (user) {
                                    enrollCourse();
                                } else {
                                    navigate("/login", {
                                        state: {
                                            isLogin: true,
                                            redirect: `/course/${courseInfo?._id}`,
                                        },
                                    });
                                }
                            }
                        }}
                        sx={{
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                            color: "inherit",
                            mt: "2rem",
                            "&&": {
                                // backgroundColor: "#f37f4aff",
                                backgroundColor: theme.palette.primary.dark,
                                "&:hover": {
                                    backgroundColor: theme.palette.primary.darker,
                                    color: "inherit"
                                },
                            },
                        }}
                    >
                        {getEnrollmentStatus(purchased, user, courseInfo)}
                    </StyledButton>

                </Box>
            </Box>

        </Box>

    );
};

export default TopSectionLarge;
