import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useLocation } from "react-router-dom";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";

const LoginSignUp = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const isLogin = useLocation().state?.isLogin;

    const theme = useTheme();

    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    borderRadius: "0.2rem",
                    minHeight: "85%",
                    minWidth: "85%",
                    maxWidth: isNonMobileScreens ? "90%" : "100%",

                    // boxShadow: isNonMobileScreens
                    //     ? "0px 0px 43px rgba(134, 143, 143, 0.3)"
                    //     : "none",
                    display: "flex",
                    justifyContent: isNonMobileScreens
                        ? "space-between"
                        : "center",
                    backgroundColor: isNonMobileScreens ? (theme) =>
                        theme.palette.background.gradient2: "transparent",
                }}
            >
                {isNonMobileScreens && (
                    <Box
                        sx={{
                            width: "50%",
                            padding: "3rem ",
                        }}
                    >
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: "600",
                                fontSize: "2rem",
                            }}
                        >
                            Learning
                            <Box
                                sx={{
                                    display: "inline-block",
                                    color: (theme) =>
                                        theme.palette.text.primary,
                                }}
                            >
                                On
                            </Box>
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "100%",
                                overflow: "hidden",
                                opacity: "0.7",
                            }}
                        >
                            <img
                                src="/images/login_light.svg"
                                width="100%"
                                height="auto"
                                alt="client svg"
                            />
                        </Box>
                    </Box>
                )}
                <Box
                    sx={{
                        width: isNonMobileScreens ? "50%" : "100%",
                        padding: isNonMobileScreens ? "3rem" : "0",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {isLogin ? <LoginForm /> : <SignUpForm />}
                </Box>
            </Box>
        </Box>
    );
};

export default LoginSignUp;


