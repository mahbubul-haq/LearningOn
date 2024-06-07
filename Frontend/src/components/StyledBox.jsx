import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

export const StyledGrid2Cols = styled(Box)(() => ({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "2rem",
}));

export const CourseNextPrevButton = styled(Box)(() => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    return {
        position: "absolute",
        top: isNonMobileScreens ? "0" : "50%",
        transform: isNonMobileScreens ? "none" : "translateY(-50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        cursor: "pointer",
        transition: "all 0.5s ease",
        zIndex: "1",
        height: isNonMobileScreens ? "100%" : "45px",
        width: isNonMobileScreens ? "auto" : "45px",
        borderRadius: isNonMobileScreens ? "0" : "50%",

    }
});