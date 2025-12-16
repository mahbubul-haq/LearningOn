import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";



export default function ToTopButton() {

    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const theme = useTheme();
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleClick = () => {
        let appContainer = document.querySelector(".app-container");
        if (appContainer) {
            appContainer.scrollTo({ top: 0, behavior: "smooth" });
            setScrollPosition(0);
        }
    };

    const calcScrollPosition = () => {
        let appContainer = document.querySelector(".app-container");
        if (appContainer) {
            return appContainer.scrollTop;
        }
        return 0;
    };

    useEffect(() => {
        const handleScroll = () => {
            // Force re-render to update button visibility
            setScrollPosition(calcScrollPosition());
        };

        let appContainer = document.querySelector(".app-container");
        if (appContainer) {
            appContainer.addEventListener("scroll", handleScroll);
        }


        return () => {
            if (appContainer) {
                appContainer.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    return (
        <IconButton
            onClick={handleClick}
            aria-label="scroll to top"
            sx={{
                position: "fixed",
                right: isNonMobileScreens ? "4rem" : "1.5rem",
                bottom: scrollPosition > 1000 ? (isNonMobileScreens ? "3rem" : "2rem") : "-100px",
                width: isNonMobileScreens ? 60 : 60,
                height: isNonMobileScreens ? 60 : 60,
                borderRadius: "50%",
                backgroundColor: theme.palette.primary.dark,
                color: theme.palette.background.alt,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: 3,
                transition: "all 0.3s ease-in-out",
                zIndex: 1400,
                "&:hover": { backgroundColor: theme.palette.primary.darker }
            }}
        >
            <ArrowUpwardIcon sx={{ fontSize: isNonMobileScreens ? 30 : 25 }} />
        </IconButton>
    );
}
