import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import FlexBetween from "../../components/FlexBetween.jsx";
import { Box, Button, TextField, Typography } from "@mui/material";

import StyledTextField from "../../components/StyledInputField.jsx";
import { useMediaQuery } from "@mui/material";
import { StyledButton } from "../../components/StyledButton.jsx";
import { useNavigate } from "react-router-dom";

const loginSchema = yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
});

const initialValuesLogin = {
    email: "",
    password: "",
};

const LoginForm = ({ redirect }) => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const [emailError, setEmailError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const login = async (values, onSubmitProps) => {
        const response = await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            body: JSON.stringify({
                email: values.email,
                password: values.password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        if (data.success) {
            console.log(data);
            onSubmitProps.resetForm();

            /// dispatch token & user from data
            dispatch(
                setLogin({
                    token: data.token,
                    user: data.user,
                })
            );
            if (redirect) {
                navigate(redirect);
            } else {
                navigate("/");
            }
        } else {
            console.log(data);
            if (data.errors.email) {
                setEmailError("Email is incorrect");
                setPasswordError("");
            }
            if (data.errors.password) {
                setPasswordError("Password is incorrect");
                setEmailError("");
            }
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        //console.log(values);
        await login(values, onSubmitProps);
    };

    return (
        <Formik initialValues={initialValuesLogin} validationSchema={loginSchema} onSubmit={handleFormSubmit}>
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, resetForm }) => (
                <form
                    style={{
                        width: "100%",
                    }}
                    onSubmit={handleSubmit}
                >
                    <Box
                        sx={{
                            textAlign: "center",
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            gap: "0.5rem",
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                mb: "2rem",
                                fontSize: isNonMobileScreens ? "2rem" : "1.5rem",
                                fontWeight: isNonMobileScreens ? "700" : "600",
                            }}
                        >
                            Login
                        </Typography>

                        <StyledTextField
                            onBlur={handleBlur}
                            onChange={handleChange}
                            onInput={(e) => {
                                setEmailError("");
                            }}
                            value={values.email}
                            name="email"
                            error={touched.email && (Boolean(errors.email) || emailError !== "")}
                            helperText={touched.email && (errors.email || emailError)}
                            label="Email"
                        />

                        <StyledTextField
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={touched.password && (Boolean(errors.password) || passwordError !== "")}
                            helperText={touched.password && (errors.password || passwordError)}
                            label="Password"
                        />
                        <Box
                            sx={{
                                textAlign: "center",
                            }}
                        >
                            <StyledButton
                                type="submit"
                                sx={{
                                    mt: isNonMobileScreens ? "1rem" : "1rem",
                                    fontSize: isNonMobileScreens ? "1rem" : "1rem",
                                    fontWeight: "600",
                                    "&&": {
                                        padding: isNonMobileScreens ? "0.5rem 2rem" : "0.5rem 1rem",
                                        backgroundColor: isNonMobileScreens
                                            ? (theme) => theme.palette.primary.main
                                            : (theme) => theme.palette.primary.main,
                                        color: isNonMobileScreens ? (theme) => theme.palette.text.primary : (theme) => theme.palette.text.primary,
                                        "&:hover": {
                                            backgroundColor: isNonMobileScreens
                                                ? (theme) => theme.palette.primary.dark
                                                : (theme) => theme.palette.primary.dark,
                                        },
                                    },
                                    width: isNonMobileScreens ? "auto" : "100%",
                                    borderRadius: isNonMobileScreens ? "2rem" : "0.1rem",
                                }}
                            >
                                Log In
                            </StyledButton>
                            <Typography
                                variant="body1"
                                sx={{
                                    mt: "1rem",
                                    fontSize: isNonMobileScreens ? "1rem" : "0.8rem",
                                }}
                            >
                                Don't have an account?{" "}
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
                                        navigate("/signup", {
                                            state: {
                                                isLogin: false,
                                            },
                                        });
                                    }}
                                >
                                    Sign Up
                                </Typography>
                            </Typography>
                        </Box>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default LoginForm;
