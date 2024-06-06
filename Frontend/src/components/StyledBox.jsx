import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const StyledGrid2Cols = styled(Box)(() => ({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "2rem",
}));