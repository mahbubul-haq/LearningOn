import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
    fontWeight: "600",
    padding: "0.5rem 1rem",
    textTransform: "capitalize",
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
