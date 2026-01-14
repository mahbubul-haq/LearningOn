import FlexBetween from "../../components/FlexBetween.jsx";
import { colorTokens } from "../../theme.js";

import DashboardIcon from "@mui/icons-material/Dashboard";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Button from "@mui/material/Button";
import useTheme from "@mui/material/styles/useTheme";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../components/StyledButton.jsx";

const LandingView = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 900px)");
    const maxWidth1300 = useMediaQuery("(max-width: 1300px)");
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const theme = useTheme();

    const showDashboard = () => {
        return (
            user &&
            (user.courses.reduce((acc, course) => {
                return acc + (course.courseStatus == "draft" ? 0 : 1);
            }, 0) > 0 ||
                user.tutoring.length > 0 ||
                user.blogs.length > 0)
        );
    };

    const glowColor = 'rgba(146, 120, 230, 0.42)';
    const softShadow = 'rgba(69, 34, 186, 0.25)';

    return (
        <Box sx={{
            width: "100%",
            backgroundColor: theme.palette.mode === 'dark' ? "#0f0f13" : "#F0F4F8",

        }}>
            <Box
                sx={{
                    width: "100%",
                    // backgroundColor: theme.palette.homepage.heroBg,
                    marginTop: "-5rem",
                    paddingTop: "6rem",
                    position: "relative",
                    zIndex: 0,

                    // Full section background
                    backgroundImage: theme.palette.mode === 'dark'
                        ? colorTokens.glassMorphism.backgroundImageDark
                        : colorTokens.glassMorphism.backgroundImageLight,
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",

                    // Noise texture overlay
                    "&::before": {
                        ...colorTokens.glassMorphism.noise,
                        position: "absolute",
                    },

                }}
            >
                <Box
                    sx={{
                        mt: isNonMobileScreens ? "0rem" : "0",
                        padding: isNonMobileScreens ? "6rem 64px" : "2rem 24px",
                        maxWidth: "2000px",
                        mx: "auto",
                    }}
                >
                    <FlexBetween
                        sx={{
                            width: "100%",
                            flexDirection: isNonMobileScreens ? "row" : "column",
                        }}
                    >
                        <Box
                            sx={{
                                // mt: isNonMobileScreens ? "0" : "2rem",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: isNonMobileScreens
                                    ? "flex-start"
                                    : "center",
                                gap: isNonMobileScreens ? "2rem" : "1rem",
                                width: isNonMobileScreens ? maxWidth1300 ? "50%" : "45%" : "100%",
                            }}
                        >
                            {/* <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: "600",
                                    fontSize: isNonMobileScreens
                                        ? "5rem"
                                        : "2.5rem",
                                    color: theme.palette.homepage.heroText,
                                }}
                            >
                                LearningOn
                            </Typography> */}

                            <Typography
                                variant="h1"
                                sx={{
                                    fontWeight: 800,
                                    fontSize: { xs: '1.5rem', sm: '2.5rem', md: '4rem' },
                                    lineHeight: 1.1,
                                    textAlign: { xs: 'center', md: 'left' },
                                    color: theme.palette.homepage.heroText,
                                    mb: 4,
                                    maxWidth: '800px',
                                    letterSpacing: '-0.02em',
                                    textShadow: `0 4px 15px ${theme.palette.homepage.heroTextShadow}`,
                                }}
                            >
                                Build skills with simple, flexible online courses designed for everyone.
                            </Typography>
                            {/* <Typography
                                variant="body1"
                                sx={{
                                    mb: "1.5rem",
                                    textAlign: isNonMobileScreens
                                        ? "left"
                                        : "center",
                                    fontSize: isNonMobileScreens
                                        ? "1.7rem"
                                        : "1.2rem",
                                    color: theme.palette.homepage.heroTextSecondary,
                                }}
                            >
                                Build skills with simple, flexible online courses designed for everyone.
                            </Typography> */}

                            {isNonMobileScreens && (
                                <FlexBetween sx={{
                                    "&&": {
                                        width: "fit-content",
                                        mt: "1rem",
                                        //flex warp
                                        flexWrap: "wrap",
                                        gap: '1.5rem',
                                    }
                                }}>
                                    <StyledButton
                                        component="a"
                                        href={`${import.meta.env.VITE_CLIENT_URL}/publishcourse`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (user) {
                                                navigate("/publishcourse");
                                                return;
                                            }
                                            navigate("/login", {
                                                state: { isLogin: true, redirect: "/publishcourse" },
                                            });
                                        }}
                                        sx={{
                                            color: "inherit",
                                            "&:hover": {
                                                color: "inherit",
                                            },
                                            "&&": {
                                                padding: isNonMobileScreens
                                                    ? "0.5rem 1.5rem"
                                                    : "0.4rem 1.5rem",
                                                borderRadius: "2rem",
                                            },
                                        }}
                                    >
                                        <Typography variant="h4">
                                            {"Publish a Course"}
                                        </Typography>
                                    </StyledButton>
                                    {showDashboard() && isNonMobileScreens && (
                                        <Button
                                            component="a"
                                            href={`${import.meta.env.VITE_CLIENT_URL}/dashboard`}
                                            sx={{
                                                borderRadius: "1000px",
                                                border: "1px solid " + theme.palette.homepage.buttonSecondary,
                                                padding: "0.5rem 1rem",
                                                color: theme.palette.homepage.buttonSecondary,

                                                "&:hover": {
                                                    backgroundColor: `rgba(194, 33, 95, ${colorTokens.opacity[10]})`,
                                                    color: "inherit",
                                                },
                                            }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate("/dashboard");
                                            }}
                                        >
                                            {/* <DashboardIcon
                                            sx={{
                                                mr: "0.5rem",
                                            }}
                                        /> */}
                                            <Typography sx={{}} variant="h6">
                                                My Dashboard
                                            </Typography>
                                        </Button>
                                    )}
                                </FlexBetween>
                            )}
                            {isNonMobileScreens && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: isNonMobileScreens
                                            ? "flex-start"
                                            : "center",
                                        gap: "1.5rem",
                                        mt: isNonMobileScreens
                                            ? user
                                                ? "2rem"
                                                : "0"
                                            : "0",
                                    }}
                                >

                                    {/* {isNonMobileScreens && (
                                    <FlexBetween
                                        sx={{
                                            gap: "1.5rem",
                                            flexWrap: "wrap",
                                            "&&": {
                                                flexDirection:
                                                    isNonMobileScreens
                                                        ? "row"
                                                        : "column",
                                                alignItems: isNonMobileScreens
                                                    ? "flex-start"
                                                    : "center",
                                            },
                                        }}
                                    >
                                        {/* <StyledButton disabled
                                            onClick={() => {
                                                navigate("/signup", {
                                                    state: { isLogin: false },
                                                });
                                            }}
                                            sx={{
                                                opacity: 0.5,
                                                "&&": {
                                                    padding: isNonMobileScreens
                                                        ? "0.5rem 2rem"
                                                        : "0.4rem 1.5rem",
                                                    borderRadius: "2rem",
                                                    backgroundColor: (theme) =>
                                                        theme.palette.background
                                                            .buttonBgPink,
                                                    "&:hover": {
                                                        backgroundColor: (
                                                            theme
                                                        ) =>
                                                            theme.palette
                                                                .background
                                                                .buttonBgPinkDark,
                                                    },
                                                },
                                            }}
                                        >
                                            <Typography variant="h4">
                                                Start Tutoring
                                            </Typography>
                                        </StyledButton> */}
                                    {/* {isNonMobileScreens && (
                                            <StyledButton disabled
                                                onClick={() => {
                                                    navigate("/signup", {
                                                        state: {
                                                            isLogin: false,
                                                        },
                                                    });
                                                }}
                                                sx={{
                                                    opacity: 0.5,
                                                    "&&": {
                                                        padding:
                                                            isNonMobileScreens
                                                                ? "0.5rem 2rem"
                                                                : "0.4rem 1.5rem",
                                                        borderRadius: "2rem",
                                                        backgroundColor: (
                                                            theme
                                                        ) =>
                                                            theme.palette
                                                                .background
                                                                .buttonBgLightPink,
                                                        "&:hover": {
                                                            backgroundColor: (
                                                                theme
                                                            ) =>
                                                                theme.palette
                                                                    .background
                                                                    .buttonBgLightPinkDark,
                                                        },
                                                    },
                                                }}
                                            >
                                                <Typography variant="h4">
                                                    Browse Blogs
                                                </Typography>
                                            </StyledButton>
                                        )} 
                                    </FlexBetween>
                                )} */}
                                </Box>
                            )}
                        </Box>
                        <Box
                            sx={{
                                textAlign: "center",
                                width: isNonMobileScreens ? "45%" : "90%",
                                mt: isNonMobileScreens ? "0" : "0",
                                mb: isNonMobileScreens ? "0" : "0rem",
                                overflow: "visible",
                                filter: theme.palette.mode === 'light' ? `drop-shadow(0 4px 6px ${softShadow}) drop-shadow(0 10px 15px rgba(0,0,0,0.05)) blur(0px) brightness(0.8)` : `drop-shadow(0 0 8px ${glowColor}) drop-shadow(0 0 20px ${glowColor}) blur(0px) brightness(0.8)`,

                                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',

                                '&:hover': {
                                    filter: theme.palette.mode === 'light' ? `drop-shadow(0 12px 20px ${softShadow}) brightness(0.8)` : `drop-shadow(0 0 10px ${glowColor}) drop-shadow(0 0 30px ${glowColor}) brightness(0.8)`,
                                },
                            }}
                        >
                            <img
                                className="landing-page-img"
                                src={theme.palette.mode === "dark" ? "images/landing_page_dark.svg" : "images/landing_page_light.svg"}
                                alt="landing-page-img"
                                width="100%"
                                height="auto"
                                loading="lazy"
                                style={{
                                    maxHeight: "100%",
                                    // maskImage: "linear-gradient(to left, transparent, black 20%)",
                                }}
                            // maskImage="linear-gradient(to right, transparent, black 20%)"
                            />
                        </Box>
                    </FlexBetween>


                </Box>
            </Box>
        </Box>
    );
};

export default LandingView;
