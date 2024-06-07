import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import { useMediaQuery } from "@mui/material";

const StyledTextField1 = styled(TextField)(({ theme }) => {
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
    return {
        variant: "standard",
        marginBottom: "1rem",
        "& .MuiOutlinedInput-root": {
            backgroundColor: "white",

            // input text color
            "& input": {
                color: theme.palette.grey.grey700,
            },

            "& fieldset": {
                borderColor: theme.palette.grey.grey200,
                borderWidth: 1,
                borderRadius: "0.2rem",
                color: theme.palette.text.secondary,
            },
            "&:hover fieldset": {
                borderWidth: 1,
                borderColor: theme.palette.grey.grey500,
            },
            "&.Mui-focused fieldset": {
                borderWidth: 2,
                borderColor: theme.palette.grey.grey800,
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
            color: theme.palette.neutral.shadow,
        },
        "& .MuiInputLabel-shrink": {
            color: isNonMobileScreen ? theme.palette.grey.grey400 : theme.palette.grey.grey400,
            fontSize: "1rem",

        },
        
        "& .MuiInputLabel-root.Mui-focused": {
            color: isNonMobileScreen ? theme.palette.text.secondary : theme.palette.text.secondary,
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
            color: "red",
        },
    };
});

export default StyledTextField1;
