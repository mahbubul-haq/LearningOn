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
import { colorTokens } from "../../theme";

const TopSectionLarge = ({ courseInfo, purchased, enrollCourse }) => {
    const { user } = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const theme = useTheme();


    return (
        <Box sx={{
            padding: "3rem 5rem",
            display: "grid",
            gridTemplateColumns: "70% 30%",

            // New Gradient Background
            background: (theme) => theme.palette.mode === 'dark'
                ? `linear-gradient(135deg, rgba(47, 24, 128, 0.5) 0%, rgba(143, 24, 68, 0.5) 100%), ${colorTokens.glassMorphism.backgroundImageDark}, #050505`
                : `linear-gradient(135deg, rgba(69, 34, 186, 0.08) 0%, rgba(194, 33, 95, 0.08) 100%), ${colorTokens.glassMorphism.backgroundImageLight}, #e8eaf6`,
            
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
                            color: (theme) => theme.palette.mode === 'light' ? theme.palette.text.primary : theme.palette.homepage.textSecondary,
                            opacity: (theme) => theme.palette.mode === 'light' ? 0.8 : 1,
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
                                        color: (theme) => theme.palette.mode === 'light' ? theme.palette.text.primary : theme.palette.homepage.textPrimary,
                                        textTransform: "capitalize",
                                        fontSize: "1.2rem",

                                        mb: "0.1rem",
                                        textDecoration: "underline",
                                        "&:hover": {
                                            color: (theme) => theme.palette.mode === 'light' ? theme.palette.secondary.main : theme.palette.homepage.textPrimary,
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
                                rating: courseInfo?.ratings?.numberOfRatings > 0 ? courseInfo?.ratings?.totalRating / courseInfo?.ratings?.numberOfRatings : 0,
                                count: courseInfo?.ratings?.numberOfRatings,
                                showText: true,
                            }}
                        />
                    </Box>

                    <Typography
                        sx={{
                            fontSize: "1.1rem",
                            color: (theme) => theme.palette.mode === 'light' ? theme.palette.text.primary : theme.palette.homepage.textSecondary,
                            opacity: (theme) => theme.palette.mode === 'light' ? 0.8 : 1,
                        }}
                    >
                        Language <b>{courseInfo?.courseLanguage}</b>
                    </Typography>


                    <Typography
                        sx={{
                            fontSize: "1.1rem",
                            color: (theme) => theme.palette.mode === 'light' ? theme.palette.text.primary : theme.palette.homepage.textSecondary,
                            opacity: (theme) => theme.palette.mode === 'light' ? 0.8 : 1,
                        }}
                    >
                        Time to complete <b>{courseInfo?.approxTimeToComplete} weeks</b> (Approx)
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "1.1rem",
                            color: (theme) => theme.palette.mode === 'light' ? theme.palette.text.primary : theme.palette.homepage.textSecondary,
                            opacity: (theme) => theme.palette.mode === 'light' ? 0.8 : 1,
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
                    backgroundColor: (theme) => theme.palette.mode === "light"
                        ? colorTokens.white.main // Distinct white for light mode
                        : theme.palette.homepage.cardBg,
                    p: "2rem",
                    width: "100%",
                    borderRadius: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    justifyContent: "center",
                    boxShadow: (theme) => theme.palette.mode === "light"
                        ? "0 20px 40px rgba(0,0,0,0.1)" // Stronger shadow for light mode
                        : theme.palette.homepage.cardShadow,
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
