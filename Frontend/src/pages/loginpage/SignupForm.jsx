import { Formik } from "formik";
import React from "react";
import * as yup from "yup";

import { Alert, Box, Snackbar, Typography } from "@mui/material";

import { useMediaQuery } from "@mui/material";
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../components/StyledButton.jsx";
import StyledTextField from "../../components/StyledInputField.jsx";

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

const SignUpForm = ({redirect}) => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const [picturePath, setPicturePath] = React.useState("");
    const [emailExists, setEmailExists] = React.useState("");
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const navigate = useNavigate();

    const register = async (values, onSubmitProps) => {
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
            console.log(data);
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
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
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
            }) => (
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
                                        width: isNonMobileScreens
                                            ? "100px"
                                            : "80px",
                                        height: isNonMobileScreens
                                            ? "100px"
                                            : "80px",
                                        overflow: "hidden",
                                        mb: "1rem",
                                        backgroundColor: "white",
                                    }}
                                >
                                    <input {...getInputProps()} />
                                    {!values.picture ? (
                                        <img
                                            src="/images/dummyPerson.jpeg"
                                            alt="profile"
                                            width="100%"
                                            height="100%"
                                            style={{
                                                borderRadius: "50%",
                                                objectFit: "cover",
                                            }}
                                        />
                                    ) : (
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
                        <Box
                            sx={{
                                textAlign: "center",
                            }}
                        >
                            <StyledButton
                                type="submit"
                                sx={{
                                    mt: isNonMobileScreens ? "1rem" : "1rem",
                                    fontSize: isNonMobileScreens
                                        ? "1rem"
                                        : "1rem",
                                    fontWeight: "600",
                                    "&&": {
                                        padding: isNonMobileScreens
                                            ? "0.5rem 2rem"
                                            : "0.5rem 1rem",
                                        backgroundColor: isNonMobileScreens
                                            ? (theme) =>
                                                  theme.palette.primary.main
                                            : (theme) =>
                                                  theme.palette.primary.main,
                                        color: isNonMobileScreens
                                            ? (theme) =>
                                                  theme.palette.text.primary
                                            : (theme) =>
                                                  theme.palette.text.primary,
                                        "&:hover": {
                                            backgroundColor: isNonMobileScreens
                                                ? (theme) =>
                                                      theme.palette.primary.dark
                                                : (theme) =>
                                                      theme.palette.primary
                                                          .dark,
                                        },
                                    },
                                    width: isNonMobileScreens ? "auto" : "100%",
                                    borderRadius: isNonMobileScreens
                                        ? "2rem"
                                        : "0.1rem",
                                }}
                            >
                                Sign Up
                            </StyledButton>
                            <Typography
                                variant="body1"
                                sx={{
                                    mt: "1rem",
                                    fontSize: isNonMobileScreens
                                        ? "1rem"
                                        : "0.8rem",
                                }}
                            >
                                Already have an account?{" "}
                                <Typography
                                    variant="body1"
                                    component="button"
                                    sx={{
                                        color: (theme) =>
                                            theme.palette.error.main,
                                        fontWeight: "600",
                                        fontSize: isNonMobileScreens
                                            ? "1rem"
                                            : "0.8rem",
                                        cursor: "pointer",
                                        backgroundColor: "transparent",
                                        border: "none",
                                        "&:hover": {
                                            color: (theme) =>
                                                theme.palette.error.main,
                                            textDecoration: "underline",
                                        },
                                    }}
                                    onClick={() => {
                                        navigate("/login", {
                                            state: {
                                                isLogin: true,
                                                redirect: redirect
                                            },
                                        });
                                    }}
                                >
                                    Log In
                                </Typography>
                            </Typography>
                        </Box>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default SignUpForm;
