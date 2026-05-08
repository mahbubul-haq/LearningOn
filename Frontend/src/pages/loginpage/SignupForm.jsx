import { Formik } from "formik";
import React from "react";
import * as yup from "yup";

import { Alert, Box, Snackbar, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

import { useMediaQuery } from "@mui/material";
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../components/StyledButton.jsx";
import StyledTextField from "../../components/StyledInputField.jsx";
import { colorTokens } from "../../theme.js";
import LoginSignUpButton from "./LoginSignUpButton.jsx";

const registerSchema = yup.object().shape({
    name: yup.string().trim().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .min(5, "Password must be at least 5 characters")
        .required("Password is required"),
});

const initialValuesRegister = {
    name: "",
    email: "",
    phone: "",
    password: "",
};

const SignUpForm = ({ redirect, isFormSubmitting, setIsFormSubmitting }) => {
    const isNonMobileScreens = useMediaQuery("(min-width: 900px)");
    const [picturePath, setPicturePath] = React.useState("");
    const [emailExists, setEmailExists] = React.useState("");
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const navigate = useNavigate();

    const register = async (values, onSubmitProps) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/auth/register`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        name: values.name,
                        email: values.email,
                        password: values.password,
                        picture: values.picture,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();
            if (data.success) {
                // console.log(data);
                setOpenSnackbar(true);
                onSubmitProps.resetForm();

                setTimeout(() => {
                    navigate("/login", {
                        state: {
                            isLogin: true,
                            redirect: redirect
                        },
                    });
                }, 2000);
            } else {
                //console.log(data);
                if (data.errors.email) {
                    setEmailExists("Email already exists");
                    console.log("email exists");
                }
            }
        } catch (error) {
            // console.log(error);
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        setIsFormSubmitting(true);
        try {
            if (values.picture) {
                // make base64 image to file
                const reader = new FileReader();
                reader.readAsDataURL(values.picture);
                reader.onloadend = async () => {
                    values.picture = reader.result;
                    await register(values, onSubmitProps);
                };
                reader.onerror = () => {
                    console.error("Signup file reader error");
                };
            } else {
                values.picture = "";
                await register(values, onSubmitProps);
            }
        } catch (error) {
            // console.log(error);
        } finally {
            setIsFormSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={initialValuesRegister}
            validationSchema={registerSchema}
            onSubmit={handleFormSubmit}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                isValid,
            }) => {
                const isSubmitDisabled = !isValid || !values.name || !values.email || !values.password || emailExists !== "" || isFormSubmitting;
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
                                gap: "0rem",
                            }}
                        >
                            <Snackbar
                                open={openSnackbar}
                                autoHideDuration={6000}
                                onClose={() => setOpenSnackbar(false)}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "center",
                                }}
                            >
                                <Alert
                                    onClose={() => setOpenSnackbar(false)}
                                    severity="success"
                                    sx={{
                                        width: "100%",
                                        backgroundColor: (theme) =>
                                            theme.palette.primary.main,
                                    }}
                                >
                                    Signup successful!
                                </Alert>
                            </Snackbar>

                            <Typography
                                variant="h5"
                                sx={{
                                    mb: "1rem",
                                    fontSize: isNonMobileScreens
                                        ? "2rem"
                                        : "1.5rem",
                                    fontWeight: isNonMobileScreens ? "700" : "600",
                                }}
                            >
                                Sign Up
                            </Typography>
                            <Dropzone
                                acceptedFiles=".png,jpg,.jpeg"
                                multiple={false}
                                onDrop={(acceptedFiles) => {
                                    setFieldValue("picture", acceptedFiles[0]);
                                    setPicturePath(
                                        URL.createObjectURL(acceptedFiles[0])
                                    );
                                }}
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <Box
                                        {...getRootProps()}
                                        sx={{
                                            marginInline: "auto",
                                            cursor: "pointer",
                                            borderRadius: "50%",
                                            width: isNonMobileScreens ? "100px" : "80px",
                                            height: isNonMobileScreens ? "100px" : "80px",
                                            overflow: "hidden",
                                            mb: "1.5rem",
                                            backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.07)' : colorTokens.white.main,
                                            border: (theme) => theme.palette.mode === 'dark' ? '1px solid rgba(138, 43, 226, 0.3)' : '1px solid transparent',
                                            boxShadow: (theme) => theme.palette.mode === 'dark' ? '0 0 20px rgba(138, 43, 226, 0.3)' : '0 2px 10px rgba(0,0,0,0.1)',
                                        }}
                                    >
                                        <input {...getInputProps()} />
                                        {!values.picture ? (
                                            <Box sx={{
                                                width: '100%', height: '100%',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                position: 'relative',
                                            }}>
                                                <PersonIcon sx={{ fontSize: isNonMobileScreens ? 60 : 50, color: 'text.secondary', opacity: 0.4 }} />
                                                <Box sx={{
                                                    position: 'absolute',
                                                    bottom: 0, width: '100%', height: '35%',
                                                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)',
                                                    backdropFilter: 'blur(2px)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                }}>
                                                    <Typography variant="caption" sx={{ color: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: 0.5 }}>
                                                        ADD PHOTO
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        ) : (
                                            <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
                                                <img
                                                    src={picturePath}
                                                    alt="profile"
                                                    width="100%"
                                                    height="100%"
                                                    style={{
                                                        borderRadius: "50%",
                                                        objectFit: "cover",
                                                    }}
                                                />
                                                <Box sx={{
                                                    position: 'absolute',
                                                    bottom: 0, width: '100%', height: '35%',
                                                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                                                    backdropFilter: 'blur(2px)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    opacity: 0, transition: 'opacity 0.2s',
                                                    "&:hover": { opacity: 1 }
                                                }}>
                                                    <Typography variant="caption" sx={{ color: '#ffffff', fontSize: '0.6rem', fontWeight: 700, letterSpacing: 0.5 }}>
                                                        CHANGE
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        )}
                                    </Box>
                                )}
                            </Dropzone>
                            <StyledTextField
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                                name="name"
                                error={touched.name && Boolean(errors.name)}
                                //add helper text from backend

                                helperText={touched.name && errors.name}
                                label="Name"
                            />
                            <StyledTextField
                                onBlur={handleBlur}
                                onChange={handleChange}
                                onInput={() => {
                                    setEmailExists("");
                                }}
                                value={values.email}
                                name="email"
                                error={
                                    touched.email &&
                                    (Boolean(errors.email) || emailExists !== "")
                                }
                                helperText={
                                    touched.email && (errors.email || emailExists)
                                }
                                label="Email"
                            />

                            <StyledTextField
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                error={touched.password && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                label="Password"
                            />
                            <LoginSignUpButton
                                isSubmitDisabled={isSubmitDisabled}
                                redirect={redirect}
                                isLogin={false}
                            />
                        </Box>
                    </form>
                );
            }}
        </Formik>
    );
};

export default SignUpForm;
