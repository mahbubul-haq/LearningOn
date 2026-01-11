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
            backgroundColor: (theme) => theme.palette.homepage.sectionBg,
            backgroundImage: (theme) => `linear-gradient(to bottom, ${theme.palette.homepage.heroBg}, ${theme.palette.homepage.sectionBg})`,
            color: (theme) => theme.palette.homepage.textPrimary,
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
                            color: (theme) => theme.palette.homepage.textSecondary,
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
                                        // fontWeight: "bold",
                                        color: (theme) => theme.palette.homepage.textPrimary,
                                        textTransform: "capitalize",
                                        fontSize: "1.2rem",

                                        mb: "0.1rem",
                                        textDecoration: "underline",
                                        "&:hover": {
                                            color: (theme) => theme.palette.homepage.textPrimary,
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

                <Divider sx={{ backgroundColor: (theme) => theme.palette.homepage.divider }} />

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
                            color: (theme) => theme.palette.homepage.textSecondary,
                        }}
                    >
                        Language <b>{courseInfo?.courseLanguage}</b>
                    </Typography>


                    <Typography
                        sx={{
                            fontSize: "1.1rem",
                            color: (theme) => theme.palette.homepage.textSecondary,
                        }}
                    >
                        Time to complete <b>{courseInfo?.approxTimeToComplete} weeks</b> (Approx)
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "1.1rem",
                            color: (theme) => theme.palette.homepage.textSecondary,
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
                    backgroundColor: (theme) => theme.palette.homepage.cardBg,
                    p: "2rem",
                    width: "100%",
                    borderRadius: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    justifyContent: "center",
                    boxShadow: (theme) => theme.palette.homepage.cardShadow,
                    backdropFilter: "blur(20px)",
                    border: (theme) => `1px solid ${theme.palette.homepage.cardBorder}`,
                }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: "bold",
                            color: (theme) => theme.palette.homepage.textPrimary,
                            textAlign: "center",
                            fontSize: "2rem",
                        }}>
                        {`$ ${courseInfo?.coursePrice}`}
                    </Typography>
                    <Typography
                        sx={{
                            textAlign: "center",
                            fontSize: "0.9rem",
                            color: (theme) => theme.palette.homepage.textSecondary,
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
                                backgroundColor: (theme) => theme.palette.homepage.buttonPrimary,
                                "&:hover": {
                                    backgroundColor: (theme) => theme.palette.homepage.buttonPrimaryHover,
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
