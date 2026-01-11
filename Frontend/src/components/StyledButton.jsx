import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import { colorTokens } from "../theme";

export const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: colorTokens.white.main,
    fontWeight: "bold",
    padding: "0.5rem 1.5rem",
    textTransform: "none",
    borderRadius: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
    boxShadow: `0 10px 20px -5px ${theme.palette.primary.main}80`,
    transition: "all 0.3s ease",
    "&:hover": {
        backgroundColor: theme.palette.primary.dark,
        boxShadow: `0 15px 25px -5px ${theme.palette.primary.main}90`,
        transform: "translateY(-2px)",
        color: colorTokens.white.main,
    },
}));

export const StyledBox1 = styled(Box)({
    display: "flex",
    gap: "0.5rem",
    cursor: "pointer",
    alignItems: "center",
});

export const StyledCheckbox = styled(Checkbox)({
    disableFocusRipple: true,
    disableRipple: true,
    disableTouchRipple: true,
    pointerEvents: "none",
    "&:hover": {
        backgroundColor: "transparent",
    },
    "&:focus": {
        backgroundColor: "transparent",
    },
    "&:active": {
        backgroundColor: "transparent",
    },
    color: (theme) => theme.palette.primary.dark,
    padding: "0",
});

