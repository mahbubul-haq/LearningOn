import { Box, Typography } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { setLogin } from "../../state/reduxStore/authSlice.js";

import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../components/StyledButton.jsx";
import StyledTextField from "../../components/StyledInputField.jsx";
import LoginSignUpButton from "./LoginSignUpButton.jsx";

const loginSchema = yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
});

const initialValuesLogin = {
    email: "",
    password: "",
};

const LoginForm = ({ redirect, isFormSubmitting, setIsFormSubmitting }) => {
    const isNonMobileScreens = useMediaQuery("(min-width: 900px)");

    const [emailError, setEmailError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const login = async (values, onSubmitProps) => {
        setIsFormSubmitting(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/login`, {
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
                // console.log(data);
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
                // console.log(data);
                if (data.errors.email) {
                    setEmailError("Email is incorrect");
                    setPasswordError("");
                }
                if (data.errors.password) {
                    setPasswordError("Password is incorrect");
                    setEmailError("");
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsFormSubmitting(false);
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        //console.log(values);
        await login(values, onSubmitProps);
    };

    return (
        <Formik initialValues={initialValuesLogin} validationSchema={loginSchema} onSubmit={handleFormSubmit}>
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid }) => {
                const isSubmitDisabled = !isValid || !values.email || !values.password || emailError !== "" || passwordError !== "" || isFormSubmitting;
                return (
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
                                onInput={() => {
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
                            <LoginSignUpButton
                                isSubmitDisabled={isSubmitDisabled}
                                redirect={redirect}
                                isLogin={true}
                            />

                        </Box>
                    </form>
                );
            }}
        </Formik>
    );
};

export default LoginForm;
