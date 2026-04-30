import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { colorTokens } from "../theme";

const StyledTextField = styled(TextField)(({ theme }) => {
    const isNonMobileScreen = useMediaQuery("(min-width: 900px)");
    return {
        variant: "standard",
        marginBottom: "1rem",
        "& .MuiOutlinedInput-root": {
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',

            // input text color
            "& input": {
                color: theme.palette.text.primary,
                "&::placeholder": {
                    color: theme.palette.text.secondary,
                    opacity: theme.palette.mode === 'dark' ? 0.5 : 0.7,
                }
            },

            // Fix Chrome autofill background completely keeping it transparent
            "& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active": {
                // Since Chrome completely ignores transparent backgrounds on autofill for security,
                // we perfectly fake the glass look by calculating the exact flattened hex color of the glass over the background.
                WebkitBoxShadow: `0 0 0 1000px ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0)'} inset !important`,
                WebkitTextFillColor: `${theme.palette.text.primary} !important`,
                transition: "background-color 5000s ease-in-out 0s",
            },

            "& fieldset": {
                borderColor: 'rgba(138, 43, 226, 0.2)',
                borderWidth: 1,
                borderRadius: "inherit",
                color: theme.palette.text.secondary,
            },
            "&:hover fieldset": {
                borderWidth: 1,
                borderColor: 'rgba(138, 43, 226, 0.5)',
            },
            "&.Mui-focused fieldset": {
                borderWidth: 1,
                borderColor: theme.palette.primary.main,
                boxShadow: '0 0 10px rgba(138, 43, 226, 0.2)',
            },
            "&.Mui-error fieldset": {
                borderColor: theme.palette.error.main,
            },
            "&.Mui-error input": {
                color: theme.palette.error.main,
            },
            "&.Mui-focused:not(.Mui-error) fieldset": {
                borderColor: theme.palette.text.secondary,
            },
        },
        "& .MuiInputLabel-root": {
            color: theme.palette.text.secondary,
            opacity: theme.palette.mode === 'dark' ? 0.7 : 0.8,
        },
        "& .MuiInputLabel-shrink": {
            color: theme.palette.text.secondary,
            opacity: theme.palette.mode === 'dark' ? 0.7 : 0.8,
            fontSize: "1rem",
        },

        "& .MuiInputLabel-root.Mui-focused": {
            color: theme.palette.text.primary,
            opacity: theme.palette.mode === 'dark' ? 0.8 : 1,
        },
        "& .MuiFormLabel-root.Mui-error": {
            color: theme.palette.error.main,
        },
        "& .MuiFormLabel-root.Mui-error:not(.Mui-focused)": {
            color: theme.palette.error.secondary,
        },
        "& .MuiFormLabel-root.Mui-error:not(.Mui-focused).MuiInputLabel-shrink": {
            color: isNonMobileScreen ? theme.palette.error.secondary : theme.palette.error.secondary,
        },
        "& .MuiFormHelperText-root.Mui-error": {
            color: colorTokens.utility.red,
        },
    };
});

export default StyledTextField;
