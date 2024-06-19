import  Button  from "@mui/material/Button";
import styled from "@emotion/styled";
import  Box  from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";

export const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
    fontWeight: "600",
    padding: "0.5rem 1rem",
    textTransform: "capitalize",
    borderRadius: "0.2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.9rem",
    "&:hover": {
        backgroundColor: theme.palette.primary.dark,
        
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

