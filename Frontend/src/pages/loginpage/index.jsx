import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignupForm";
import useTheme from "@mui/material/styles/useTheme"
import { useState } from "react";

const LoginSignUp = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 900px)");
    const theme = useTheme();
    const isLogin = useLocation().state?.isLogin;
    const redirect = useLocation().state?.redirect;
    const navigate = useNavigate();
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);

    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "auto",
                position: "relative",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: isNonMobileScreens ? "2rem" : "1.5rem",
                    left: isNonMobileScreens ? "3rem" : "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    zIndex: 10,
                }}
            >
                {!isNonMobileScreens && (
                    <ArrowBackIcon
                        sx={{
                            fontSize: "1.5rem",
                            cursor: "pointer",
                            color: (theme) => theme.palette.text.primary,
                            "&:hover": { opacity: 0.8 },
                        }}
                        onClick={() => navigate("/")}
                    />
                )}
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: "600",
                        fontSize: isNonMobileScreens ? "2rem" : "1.5rem",
                        cursor: "pointer",
                    }}
                    onClick={() => navigate("/")}
                >
                    Learning
                    <Box
                        component="span"
                        sx={{ color: (theme) => theme.palette.text.primary }}
                    >
                        On
                    </Box>
                </Typography>
            </Box>

            <Box
                sx={{
                    borderRadius: "0.2rem",
                    // minHeight: isNonMobileScreens ? "85%" : "100%",
                    height: isNonMobileScreens ? "auto" : "100%",
                    minHeight: "600px",
                    minWidth: "85%",
                    maxWidth: isNonMobileScreens ? "90%" : "100%",
                    pr: isNonMobileScreens ? "5rem" : "0",
                    // border: "1px solid rgba(134, 143, 143, 0.3)",

                    // boxShadow: isNonMobileScreens
                    //     ? "0px 0px 43px rgba(134, 143, 143, 0.3)"
                    //     : "none",
                    position: "relative",
                    display: "flex",
                    justifyContent: isNonMobileScreens
                        ? "center"
                        : "center",
                    gap: "3rem",
                    // alignItems: isNonMobileScreens ? "flex-start" : "center",
                    flexDirection: isNonMobileScreens ? "row" : "column",
                    backgroundColor: isNonMobileScreens
                        ? (theme) => theme.palette.background.gradient2
                        : "transparent",
                }}
            >
                {isNonMobileScreens && (
                    <Box
                        sx={{
                            width: "50%",
                            padding: "3rem ",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
                                overflow: "hidden",
                                opacity: "0.7",
                            }}
                        >
                            <img
                                src={theme.palette.mode === "dark" ? "/images/login_img_dark.svg" : "/images/login_img_light.svg"}
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
                        maxWidth: isNonMobileScreens ? "500px" : "100%",
                        padding: isNonMobileScreens ? "3rem" : "0",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {isLogin ? (
                        <LoginForm redirect={redirect} isFormSubmitting={isFormSubmitting} setIsFormSubmitting={setIsFormSubmitting} />
                    ) : (
                        <SignUpForm redirect={redirect} isFormSubmitting={isFormSubmitting} setIsFormSubmitting={setIsFormSubmitting} />
                    )}

                </Box>
            </Box>
        </Box>
    );
};

export default LoginSignUp;
