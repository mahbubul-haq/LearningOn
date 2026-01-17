import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { colorTokens } from "../theme";

export const StyledGrid2Cols = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "2rem",
}));

export const CourseNextPrevButton = styled(Box)(({ theme }) => {
  const isNonMobileScreens = useMediaQuery("(min-width: 900px)");

  return {
    position: "absolute",
    top: isNonMobileScreens ? "2rem" : "50%",
    transform: isNonMobileScreens ? "none" : "translateY(-50%)",
    backgroundColor: "transparent",
    minWidth: isNonMobileScreens ? "50px" : "45px",
    display: "flex",
    cursor: "pointer",
    zIndex: 10,
    height: isNonMobileScreens ? `calc(100% - 5rem)` : "45px",
    width: isNonMobileScreens ? "auto" : "45px",
    borderRadius: isNonMobileScreens ? "0" : "50%",
    overflow: "hidden",
  };
});

export const MobileNavItem = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "1.2rem",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.mobileNav.itemHover,
    transform: "translateX(5px)",
  },
  padding: "0.8rem",
  borderRadius: "0.5rem",
}));
