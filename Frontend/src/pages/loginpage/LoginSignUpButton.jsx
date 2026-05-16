import React from 'react'
import { StyledButton } from '../../components/StyledButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';

const LoginSignUpButton = ({ isSubmitDisabled, redirect, isLogin }) => {
    const isNonMobileScreens = useMediaQuery("(min-width: 900px)");
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                textAlign: "center",
            }}
        >
            <StyledButton
                type="submit"
                disabled={isSubmitDisabled}
                sx={{
                    mt: isNonMobileScreens ? "1rem" : "1rem",
                    fontSize: isNonMobileScreens ? "1rem" : "1rem",
                    fontWeight: "600",
                    "&&": {
                        padding: isNonMobileScreens ? "0.5rem 2rem" : "0.5rem 1rem",
                        backgroundColor: (theme) => theme.palette.primary.main,
                        color: "#ffffff",
                        boxShadow: '0 0 15px rgba(107, 76, 221, 0.4)',
                        "&:hover": {
                            backgroundColor: (theme) => theme.palette.primary.dark,
                            boxShadow: '0 0 25px rgba(107, 76, 221, 0.7)',
                        },
                        "&:disabled": {
                            backgroundColor: (theme) => theme.palette.primary.main,
                            color: "#ffffff",
                            opacity: 0.5,
                        }
                    },
                    width: "100%",
                    borderRadius: isNonMobileScreens ? "2rem" : "0.1rem",
                }}
            >
                {isLogin ? "Log In" : "Sign Up"}
            </StyledButton>
            <Typography
                variant="body1"
                sx={{
                    mt: "1rem",
                    fontSize: isNonMobileScreens ? "1rem" : "0.8rem",
                }}
            >
                {isLogin ? "Already have an account? " : <>Don&apos;t have an account?{" "}</>}
                <Typography
                    variant="body1"
                    component="button"
                    sx={{
                        color: (theme) => theme.palette.error.main,
                        fontWeight: "600",
                        fontSize: isNonMobileScreens ? "1rem" : "0.8rem",
                        cursor: "pointer",
                        backgroundColor: "transparent",
                        border: "none",
                        "&:hover": {
                            color: (theme) => theme.palette.error.main,
                            textDecoration: "underline",
                        },
                    }}
                    onClick={() => {
                        navigate(isLogin ? "/signup" : "/login", {
                            state: {
                                isLogin: !isLogin,
                                redirect: redirect
                            },
                        });
                    }}
                >
                    {isLogin ? "Sign Up" : "Log In"}
                </Typography>
            </Typography>
        </Box>
    )
}

export default LoginSignUpButton