import { Box, Chip } from "@mui/material";
import { colorTokens } from "../theme";
//import arrow left and right icon
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { useTheme } from "@mui/material/styles";
import { useEffect } from "react";


const CustomSlider1 = ({ items, selectedItem, setSelectedItem }) => {
    const theme = useTheme();

    const random = Math.floor(Math.random() * 1000000000000 + Date.now());

    const updateVisibility = () => {
        let slider = document.querySelector(`.custom-slider-items1-${random}`);
        let rightArrow = document.querySelector(`.custom-slider-right-arrow1-${random}`);
        let leftArrow = document.querySelector(`.custom-slider-left-arrow1-${random}`);
        if (slider.scrollLeft + slider.clientWidth + 5 >= slider.scrollWidth) {
            rightArrow.style.display = "none";
        } else {
            rightArrow.style.display = "flex";
        }

        // check if slider has reached start
        if (slider.scrollLeft === 0) {
            leftArrow.style.display = "none";
        } else {
            leftArrow.style.display = "flex";
        }
    }

    const handleNext = (side) => {
        let slider = document.querySelector(`.custom-slider-items1-${random}`);

        if (side === "next") {
            slider.scrollLeft += 200;
        }
        if (side === "prev") {
            slider.scrollLeft -= 200;
        }

        console.log(slider.scrollLeft, slider.clientWidth, slider.scrollWidth);

        updateVisibility();

    };

    useEffect(() => {
        updateVisibility();

        if (items?.length > 0) {
            if (setSelectedItem) setSelectedItem(items[0]);
        }
    }, []);

    useEffect(() => {
        let slider = document.querySelector(`.custom-slider-items1-${random}`);
        slider.addEventListener("scroll", updateVisibility);

        return () => {
            slider.removeEventListener("scroll", updateVisibility);
        };
    }, []);

    return (
        <Box
            className={`custom-slider-${random}`}
            sx={{
                width: "100%",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // px: "3rem",
                position: "relative",
                // border: "2px solid red",
            }}
        >
            <Box
                className={`custom-slider-left-arrow1-${random}`}
                sx={{
                    position: "absolute",
                    left: "0",
                    top: "0",
                    bottom: "0",
                    // set color if parent elements content has overflown
                    cursor: "pointer",
                    background: theme.palette.homepage.arrowBg,
                    borderRadius: "50%",
                    flexShrink: 0,
                    alignSelf: "center",
                    backdropFilter: "blur(10px) saturate(200%)",
                    WebkitBackdropFilter: "blur(10px) saturate(200%)",

                    // pr: "3rem",
                    zIndex: "1",
                    display: "flex",
                    alignItems: "center"
                }}
                onClick={() => {
                    handleNext("prev");
                }}
            >
                <KeyboardDoubleArrowLeftIcon
                    sx={{
                        color: theme.palette.homepage.arrowColor,
                    }}
                />
            </Box>
            <Box
                className={`custom-slider-right-arrow1-${random}`}
                sx={{
                    position: "absolute",
                    right: "0",
                    top: 0,
                    bottom: 0,
                    // border: "2px solid red",
                    // set color if parent elements content has overflown
                    cursor: "pointer",
                    background: theme.palette.homepage.arrowBg,
                    borderRadius: "50%",
                    flexShrink: "0",
                    alignSelf: "center",
                    // pl: "3rem",
                    zIndex: "1",
                    display: "flex",
                    alignItems: "center",
                    backdropFilter: "blur(10px) saturate(200%)",
                    WebkitBackdropFilter: "blur(10px) saturate(200%)",

                    // backdropFilter: "blur(10px)"
                }}
                onClick={() => {
                    handleNext("next");
                }}
            >
                <KeyboardDoubleArrowRightIcon
                    sx={{
                        color: theme.palette.homepage.arrowColor,
                        // border: "2px solid green",
                    }}
                />
            </Box>
            <Box
                className={`custom-slider-items1-${random}`}
                sx={{
                    width: "100%",
                    overflowX: "hidden",
                    display: "flex",
                    flexWrap: "nowrap",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "0.4rem",
                    scrollBehavior: "smooth",
                    // px: "3rem",
                }}
            >
                {items?.map((item, i) => (
                    <Chip
                        key={i}
                        label={item}
                        size="small"
                        sx={{
                            px: "0.1rem",
                            background:
                                item === selectedItem
                                    ? theme.palette.homepageSliderChipSelectedBg
                                    : theme.palette.homepageSliderChipBg,
                            color:
                                item === selectedItem
                                    ? theme.palette.homepageSliderChipSelectedText
                                    : theme.palette.text.primary,
                        }}

                    />
                ))}
            </Box>
        </Box>
    );
};

export default CustomSlider1;
