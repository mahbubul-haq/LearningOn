import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import { red } from "@mui/material/colors";
import { useMediaQuery } from "@mui/material";

const StyledTextField = styled(TextField)(({ theme }) => {
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
    return {
        variant: "standard",
        marginBottom: "1rem",
        "& .MuiOutlinedInput-root": {
            backgroundColor: "white",

            // input text color
            "& input": {
                color: theme.palette.text.primary,
            },

            "& fieldset": {
                borderColor: theme.palette.text.primary,
                borderWidth: 0,
                borderRadius: "0.1rem",
                color: theme.palette.text.primary,
            },
            "&:hover fieldset": {
                borderWidth: 1,
                borderColor: theme.palette.text.secondary,
            },
            "&.Mui-focused fieldset": {
                borderWidth: 2,
            },
            "&.Mui-error fieldset": {
                borderColor: theme.palette.primary.main,
            },
            "&.Mui-focused:not(.Mui-error) fieldset": {
                borderColor: theme.palette.text.secondary,
            },
        },
        "& .MuiInputLabel-shrink": {
            color: isNonMobileScreen ? theme.palette.text.primary : theme.palette.text.secondary,
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: isNonMobileScreen ? theme.palette.text.primary : theme.palette.text.secondary,
        },
        "& .MuiFormLabel-root.Mui-error": {
            color: theme.palette.primary.main,
        },
        "& .MuiFormLabel-root.Mui-error:not(.Mui-focused)": {
            color: theme.palette.text.light,
        },
        "& .MuiFormLabel-root.Mui-error:not(.Mui-focused).MuiInputLabel-shrink": {
            color: isNonMobileScreen ? theme.palette.primary.main : theme.palette.text.light,
        },
        "& .MuiFormHelperText-root.Mui-error": {
            color: theme.palette.primary.main,
            color: "red",
        },
    };
});

export default StyledTextField;
