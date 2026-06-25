import React from "react";
import { Box, Alert } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient.js";
import { updateDateLogin } from "../api/authStore.js";

const GoogleAuthButton = ({ redirect, isFormSubmitting, setIsFormSubmitting }) => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = React.useState("");

    const handleGoogleSuccess = async (credentialResponse) => {
        setErrorMessage("");
        setIsFormSubmitting?.(true);

        try {
            const response = await axiosClient({
                url: "/api/v1/auth/google",
                method: "POST",
                data: {
                    credential: credentialResponse.credential,
                },
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = response.data;

            if (!data.success) {
                setErrorMessage(data.message || "Google sign in failed.");
                return;
            }

            updateDateLogin(data.user, data.token, Date.now());
            navigate(redirect || "/");
        } catch (error) {
            setErrorMessage(
                error.response?.data?.message ||
                error.message ||
                "Google sign in failed."
            );
        } finally {
            setIsFormSubmitting?.(false);
        }
    };

    return (
        <Box
            sx={{
                width: "100%",
                display: "grid",
                gap: "0.75rem",
                pointerEvents: isFormSubmitting ? "none" : "auto",
                opacity: isFormSubmitting ? 0.65 : 1,
            }}
        >
            {errorMessage && (
                <Alert severity="error">
                    {errorMessage}
                </Alert>
            )}

            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => {
                        setErrorMessage("Google sign in was cancelled or failed.");
                    }}
                    useOneTap={false}
                />
            </Box>
        </Box>
    );
};

export default GoogleAuthButton;