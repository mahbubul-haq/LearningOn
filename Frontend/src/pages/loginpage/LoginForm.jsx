import { Alert, Box, Snackbar, Typography } from "@mui/material";
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
import { apiFetch } from "../../api/apiFetch.js";
import axiosClient from "../../api/axiosClient.js";
import { updateDateLogin } from "../../api/authStore.js";

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
    const [snackbarConfig, setSnackbarConfig] = React.useState({ open: false, message: "", severity: "success" });
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const showSnackbar = (message, severity = "success") => {
        setSnackbarConfig({ open: true, message, severity });
    };

    const login = async (values, onSubmitProps) => {
        setIsFormSubmitting(true);
        try {
            const response = await axiosClient({
                url: "/api/v1/auth/login",
                method: "POST",
                data: {
                    email: values.email,
                    password: values.password,
                },
                headers: {
                    "Content-Type": "application/json"
                },
            })

            if (response.status === 429) {
                alert("too many login attempts. Please try again later.");
                return;
            }

            const data = response.data;
            if (data.success) {
                // console.log(data);
                showSnackbar("Login successful!", "success");
                onSubmitProps.resetForm();

                /// dispatch token & user from data
                updateDateLogin(data.user, data.token, Date.now())
                setTimeout(() => {
                    if (redirect) {
                        navigate(redirect);
                    } else {
                        navigate("/");
                    }
                }, 1000);
            } else {
                // console.log(data);
                showSnackbar(data.message || "Login failed", "error");

                console.log(data.errors);
                if (data.errors?.email) {
                    setEmailError("Email is incorrect");
                    setPasswordError("");
                }
                if (data.errors?.password) {
                    setPasswordError("Password is incorrect");
                    setEmailError("");
                }
            }
        } catch (error) {
            console.log(error);
            showSnackbar(error.response?.data?.message || error.message || "An error occurred", "error");

            if (error.response?.data?.errors?.email) {
                setEmailError("Email is incorrect");
                setPasswordError("");
            }
            if (error.response?.data?.errors?.password) {
                setPasswordError("Password is incorrect");
                setEmailError("");
            }
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
                            <Snackbar
                                open={snackbarConfig.open}
                                autoHideDuration={6000}
                                onClose={() => setSnackbarConfig({ ...snackbarConfig, open: false })}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "center",
                                }}
                            >
                                <Alert
                                    onClose={() => setSnackbarConfig({ ...snackbarConfig, open: false })}
                                    severity={snackbarConfig.severity}
                                    sx={{
                                        width: "100%",
                                        ...(snackbarConfig.severity === "success" && {
                                            backgroundColor: (theme) => theme.palette.primary.main,
                                            color: "#fff",
                                            "& .MuiAlert-icon": { color: "#fff" }
                                        })
                                    }}
                                >
                                    {snackbarConfig.message}
                                </Alert>
                            </Snackbar>

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
