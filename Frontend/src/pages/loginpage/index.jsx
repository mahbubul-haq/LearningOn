import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignupForm";

const LoginSignUp = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const isLogin = useLocation().state?.isLogin;
    const redirect = useLocation().state?.redirect;
    const navigate = useNavigate();

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
                // border: "2px solid red",
            }}
        >
            <Box
                sx={{
                    borderRadius: "0.2rem",
                    // minHeight: isNonMobileScreens ? "85%" : "100%",
                    height: isNonMobileScreens ? "auto" : "100%",
                    minHeight: "600px",
                    minWidth: "85%",
                    maxWidth: isNonMobileScreens ? "90%" : "100%",
                    // border: "1px solid rgba(134, 143, 143, 0.3)",

                    // boxShadow: isNonMobileScreens
                    //     ? "0px 0px 43px rgba(134, 143, 143, 0.3)"
                    //     : "none",
                    position: "relative",
                    display: "flex",
                    justifyContent: isNonMobileScreens
                        ? "space-between"
                        : "center",
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
                        }}
                    >
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: "600",
                                fontSize: "2rem",
                                cursor: "pointer",
                            }}
                            onClick={() => navigate("/")}
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
                {!isNonMobileScreens && (
                    <Box
                        sx={{
                            position: "absolute",
                            left: "0",
                            top: "3rem",
                            ///justifySelf: "flex-start",
                        }}
                    >
                        <ArrowBackIcon
                            sx={{
                                fontSize: "2rem",
                                cursor: "pointer",
                                color: (theme) => theme.palette.grey.grey500,
                                "&:hover": {
                                    color: (theme) =>
                                        theme.palette.grey.grey800,
                                },
                            }}
                            onClick={() => navigate("/")}
                        />
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
                    {isLogin ? (
                        <LoginForm redirect={redirect} />
                    ) : (
                        <SignUpForm redirect={redirect}/>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default LoginSignUp;
