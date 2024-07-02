import { useEffect } from "react";
import { Box, Chip,  } from "@mui/material";
//import arrow left and right icon
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { useTheme } from "@mui/material/styles";


const CustomSlider = ({ items, selectedItem, setSelectedItem }) => {
    const theme = useTheme();

    const handleNext = (side) => {
        let slider = document.querySelector(".custom-slider-items");

        if (side === "next") {
            slider.scrollLeft += 300;
        }
        if (side === "prev") {
            slider.scrollLeft -= 300;
        }

        // console.log(slider.scrollLeft, slider.clientWidth, slider.scrollWidth);

        if (slider.scrollLeft + slider.clientWidth + 5 >= slider.scrollWidth) {
            document.querySelector(".custom-slider-right-arrow").style.display = "none";
        } else {
            document.querySelector(".custom-slider-right-arrow").style.display = "block";
        }

        // check if slider has reached start
        if (slider.scrollLeft === 0) {
            document.querySelector(".custom-slider-left-arrow").style.display = "none";
        } else {
            document.querySelector(".custom-slider-left-arrow").style.display = "block";
        }
    };

    useEffect(() => {
        if (document.querySelector(".custom-slider-items").scrollLeft === 0) {
            document.querySelector(".custom-slider-left-arrow").style.display = "none";
        } else {
            document.querySelector(".custom-slider-left-arrow").style.display = "block";
        }

        if (items?.length > 0) {
            if (setSelectedItem) setSelectedItem(items[0]);
        }
    }, []);

    useEffect(() => {
        let slider = document.querySelector(".custom-slider-items");
        if (!slider) return;

        if (slider.scrollLeft + slider.clientWidth + 5 >= slider.scrollWidth) {
            document.querySelector(".custom-slider-right-arrow").style.display = "none";
        } else {
            document.querySelector(".custom-slider-right-arrow").style.display = "block";
        }
    }, [items]);

    return (
        <Box
            className="custom-slider"
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
                className="custom-slider-left-arrow"
                sx={{
                    position: "absolute",
                    left: "0",
                    top: "0",
                    bottom: "0",
                    // set color if parent elements content has overflown
                    cursor: "pointer",
                    background: "white",

                    pr: "1rem",
                    zIndex: "1",
                }}
                onClick={() => {
                    handleNext("prev");
                }}
            >
                <KeyboardDoubleArrowLeftIcon
                    sx={{
                        color: theme.palette.grey.grey900,
                    }}
                />
            </Box>
            <Box
                className="custom-slider-right-arrow"
                sx={{
                    position: "absolute",
                    right: "0",
                    top: "0",
                    bottom: "0",
                    // set color if parent elements content has overflown
                    cursor: "pointer",
                    background: "white",
                    pl: "1rem",

                    zIndex: "1",
                }}
                onClick={() => {
                    handleNext("next");
                }}
            >
                <KeyboardDoubleArrowRightIcon
                    sx={{
                        color: theme.palette.grey.grey900,
                    }}
                />
            </Box>
            <Box
                className="custom-slider-items"
                sx={{
                    width: "100%",
                    overflowX: "hidden",
                    display: "flex",
                    flexWrap: "nowrap",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "0.8rem",
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
                            cursor: "pointer",
                            fontSize: "0.8rem",
                            background: item === selectedItem ? theme.palette.text.primary : theme.palette.grey.grey100,
                            color: item === selectedItem ? "white" : theme.palette.text.primary,
                            "&:hover": {
                                background: item === selectedItem ? theme.palette.text.primary : theme.palette.grey.grey200,
                                color: item === selectedItem ? "white" : theme.palette.text.primary,
                            },
                        }}
                        onClick={() => {
                            if (setSelectedItem) {
                                setSelectedItem(item);
                            }
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default CustomSlider;
