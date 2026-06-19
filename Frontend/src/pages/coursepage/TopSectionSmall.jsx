import { Box, Button, Divider, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../components/StyledButton";
import { getEnrollmentButtonText, isOwnerOrInstructor } from "../../utils/course";
import TopSectionSmallInfo from "./TopSectionSmallInfo";
import { colorTokens } from "../../theme";

const TopSectionSmall = ({ user, courseInfo, enrollCourse, enrollmentStatus }) => {
    const isMobileScreen = useMediaQuery("(max-width: 600px)");
    const minWidth800 = useMediaQuery("(min-width: 800px)");
    const minWidth900 = useMediaQuery("(min-width: 900px)");

    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Box
            sx={{
                // New Gradient Background
                background: (theme) => theme.palette.mode === 'dark'
                    ? `linear-gradient(135deg, rgba(47, 24, 128, 0.5) 0%, rgba(143, 24, 68, 0.5) 100%), ${colorTokens.glassMorphism.backgroundImageDark}, #050505`
                    : `linear-gradient(135deg, rgba(69, 34, 186, 0.08) 0%, rgba(194, 33, 95, 0.08) 100%), ${colorTokens.glassMorphism.backgroundImageLight}, #e8eaf6`,

                color: (theme) => theme.palette.homepage.textPrimary,
                pb: "2rem",
                px: isMobileScreen ? "1rem" : "3rem"
            }}
        >
            <Box sx={{
                display: "flex",
                alignItems: isMobileScreen ? "left" : "center",
                flexDirection: "column",
                width: "100%",
                // border: "1px solid green"
                py: "1.5rem",
                gap: "0.5rem",
                px: isMobileScreen ? "0rem" : "4rem",
            }}>
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: "bold",
                        // my: "2rem",
                        textAlign: isMobileScreen ? "left" : "center",
                        textTransform: "capitalize",
                        // px: isMobileScreen ? "2rem" : "7rem",
                        fontSize: isMobileScreen ? "1.3rem" : "1.6rem",

                    }}
                >
                    {courseInfo?.courseTitle || "Course Title"}
                </Typography>
                <Typography
                    sx={{
                        fontSize: "1rem",
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
                                    fontSize: "1rem",

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

                {isMobileScreen && <Typography
                    variant="h3"
                    sx={{
                        fontWeight: "bold",
                        mt: '0.2rem',
                    }}>
                    {`$ ${courseInfo?.coursePrice}`}
                </Typography>}

                <StyledButton
                    component="a"
                    href="#"
                    disabled={enrollmentStatus?.status === "pending"}
                    onClick={(e) => {
                        e.preventDefault();
                        if (isOwnerOrInstructor(user, courseInfo) || enrollmentStatus?.status === "enrolled") {
                            navigate(`/learning/course/${courseInfo?._id}`);
                        } else if (user && enrollmentStatus?.status !== "pending") {
                            enrollCourse();
                        } else if (!user) {
                            navigate("/login", {
                                state: {
                                    isLogin: true,
                                    redirect: `/course/${courseInfo?._id}`,
                                },
                            });
                        }
                    }}
                    sx={{
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        color: "inherit",
                        mt: "0.5rem",
                        "&&": {
                            // backgroundColor: "#f37f4aff",
                            width: "fit-content",
                            px: "2rem",
                            backgroundColor: (theme) => theme.palette.homepage.buttonPrimary,
                            "&:hover": {
                                backgroundColor: (theme) => theme.palette.homepage.buttonPrimaryHover,
                                color: "inherit"
                            },
                        },
                    }}
                >
                    {getEnrollmentButtonText(user, courseInfo, enrollmentStatus)}
                </StyledButton>

            </Box>

            {
                !isMobileScreen && <Divider sx={{
                    width: minWidth900 ? "70%" : minWidth800 ? "80%" : "100%",
                    mx: "auto",
                }} />
            }

            <TopSectionSmallInfo courseInfo={courseInfo} enrollmentStatus={enrollmentStatus} user={user} />
        </Box >
    );
};

export default TopSectionSmall;
