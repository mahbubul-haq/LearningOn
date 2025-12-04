import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";

export const BreadCrumbTypography = styled(Typography)(({ theme }) => ({
    fontSize: "1rem",
    cursor: "pointer",
    color: theme.palette.grey.grey600,
    "&:hover": {
        textDecoration: "underline",
    },
}));

export const HeaderTypography2 = styled(Typography)(({ theme }) => ({
    fontFamily: ["Rubik", "sans-serif"].join(","),
    fontSize: 20,
    fontWeight: "600",
    marginBottom: "1.5rem",
    color: theme.palette.grey.grey700,
}));
