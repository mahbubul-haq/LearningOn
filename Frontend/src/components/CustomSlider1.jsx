import React, { useEffect } from "react";
import { Box, Button, Chip, IconButton } from "@mui/material";
//import arrow left and right icon
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { useTheme } from "@mui/material/styles";


const testItems = [
    "Programming",
    "Web Development",
    "Mobile Development",
    "Game Development",
    "Database",
    "Software Testing",
    "Software Engineering",
    "Development Tools",
    "No-Code Development",
    "Cybersecurity",
    "DevOps",
    "Data Science",
    "Machine Learning",
    "Deep Learning",
    "Artificial Intelligence",
    "Data Analysis",
    "Data Visualization",
];

const CustomSlider1 = ({ items, selectedItem, setSelectedItem }) => {
    const theme = useTheme();

    const random = Math.floor(Math.random() * 1000000000000);

    const handleNext = (side) => {
        let slider = document.querySelector(`.custom-slider-items1-${random}`);

        if (side === "next") {
            slider.scrollLeft += 100;
        }
        if (side === "prev") {
            slider.scrollLeft -= 100;
        }
        
        console.log(slider.scrollLeft, slider.clientWidth, slider.scrollWidth);

        if (slider.scrollLeft + slider.clientWidth + 5 >= slider.scrollWidth) {
            document.querySelector(`.custom-slider-right-arrow1-${random}`).style.display =
                "none";
        } else {
            document.querySelector(`.custom-slider-right-arrow1-${random}`).style.display =
                "block";
        }

        // check if slider has reached start
        if (slider.scrollLeft === 0) {
            document.querySelector(`.custom-slider-left-arrow1-${random}`).style.display =
                "none";
        } else {
            document.querySelector(`.custom-slider-left-arrow1-${random}`).style.display =
                "block";
        }
    };

    useEffect(() => {
        if (document.querySelector(`.custom-slider-items1-${random}`).scrollLeft === 0) {
            document.querySelector(`.custom-slider-left-arrow1-${random}`).style.display =
                "none";
        } else {
            document.querySelector(`.custom-slider-left-arrow1-${random}`).style.display =
                "block";
        }
        let slider = document.querySelector(`.custom-slider-items1-${random}`);
        if (slider.scrollLeft + slider.clientWidth + 5 >= slider.scrollWidth) {
            document.querySelector(`.custom-slider-right-arrow1-${random}`).style.display =
                "none";
        } else {
            document.querySelector(`.custom-slider-right-arrow1-${random}`).style.display =
                "block";
        }

        if (items?.length > 0) {
            if (setSelectedItem) setSelectedItem(items[0]);
        }
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
                    background: "white",

                    pr: "0.5rem",
                    zIndex: "1",
                }}
                onClick={() => {
                    handleNext("prev");
                }}
            >
                <KeyboardDoubleArrowLeftIcon
                    sx={{
                        color: theme.palette.grey.grey600,
                    }}
                />
            </Box>
            <Box
                className={`custom-slider-right-arrow1-${random}`}
                sx={{
                    position: "absolute",
                    right: "0",
                    top: "0",
                    bottom: "0",
                    // set color if parent elements content has overflown
                    cursor: "pointer",
                    background: "white",
                    pl: "0.5rem",

                    zIndex: "1",
                }}
                onClick={() => {
                    handleNext("next");
                }}
            >
                <KeyboardDoubleArrowRightIcon
                    sx={{
                        color: theme.palette.grey.grey600,
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
                    gap: "1rem",
                    // px: "3rem",
                }}
            >
                {items?.map((item, i) => (
                    <Chip
                        key={i}
                        label={item}
                        size="small"
                        sx={{
                            
                            background:
                                item === selectedItem
                                    ? theme.palette.text.primary
                                    : theme.palette.grey.grey200,
                            color:
                                item === selectedItem
                                    ? "white"
                                    : theme.palette.text.primary,
                            // "&:hover": {
                            //     background:
                            //         item === selectedItem
                            //             ? theme.palette.text.primary
                            //             : theme.palette.grey.grey200,
                            //     color:
                            //         item === selectedItem
                            //             ? "white"
                            //             : theme.palette.text.primary,
                            // },
                        }}
                        
                    />
                ))}
            </Box>
        </Box>
    );
};

export default CustomSlider1;
