import { Box, Chip } from "@mui/material";
import { useCallback, useEffect } from "react";
//import arrow left and right icon
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import useMediaQuery from "@mui/material/useMediaQuery";

import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import { useTheme } from "@mui/material/styles";
import { colorTokens } from "../theme";

const CustomSlider = ({ items, selectedItem, setSelectedItem, selectedItemRef }) => {
  const theme = useTheme();
  const isMobileScreens = useMediaQuery("(max-width: 600px)");

  const handleNext = useCallback((side, swipeDistance = 300, focus = false) => {
    let slider = document.querySelector(".custom-slider-items");
    let leftArrow = document.querySelector(".custom-slider-left-arrow");
    let rightArrow = document.querySelector(".custom-slider-right-arrow");
    let leftArrowInner = document.querySelector(".custom-slider-left-arrow-inner");
    let rightArrowInner = document.querySelector(".custom-slider-right-arrow-inner");
    if (!slider || !leftArrow || !rightArrow || !leftArrowInner || !rightArrowInner) return;

    if (focus) slider.focus();
    // console.log(slider.scrollLeft, swipeDistance);
    ///console.log("handleNext");

    if (side === "next") {
      slider.scrollLeft += swipeDistance;
    }
    if (side === "prev") {
      slider.scrollLeft -= swipeDistance;
    }
    if (side == "") slider.scrollLeft = 0;

    if (slider.scrollLeft === 0) {
      leftArrowInner.style.display = "none";
      setTimeout(() => {
        leftArrow.style.display = "none";
      }, 1000);
    } else {
      leftArrowInner.style.display = "flex";
      setTimeout(() => {
        leftArrow.style.display = "flex";
      }, 1000);
    }

    if (slider.scrollLeft + slider.clientWidth + 5 >= slider.scrollWidth) {
      rightArrowInner.style.display = "none";
      setTimeout(() => {
        rightArrow.style.display = "none";
      }, 1000);
    } else {
      rightArrowInner.style.display = "flex";
      setTimeout(() => {
        rightArrow.style.display = "flex";
      }, 1000);
    }
  }, []);

  useEffect(() => {
    handleNext("", 0);

    if (items?.length > 0) {
      if (setSelectedItem) {
        selectedItemRef.current = items[0];
        setSelectedItem(items[0]);
      }
    }
  }, []);

  useEffect(() => {
    handleNext("", 0);
  }, [items]);

  useEffect(() => {
    let slider = document.querySelector(".custom-slider-items");
    let leftArrow = document.querySelector(".custom-slider-left-arrow");
    let rightArrow = document.querySelector(".custom-slider-right-arrow");
    let leftArrowInner = document.querySelector(".custom-slider-left-arrow-inner");
    let rightArrowInner = document.querySelector(".custom-slider-right-arrow-inner");
    if (!slider || !leftArrow || !rightArrow || !leftArrowInner || !rightArrowInner) return;

    const handleScroll = () => {
      //console.log("handleScroll");
      if (slider.scrollLeft === 0) {
        leftArrowInner.style.display = "none";
        setTimeout(() => {
          leftArrow.style.display = "none";
        }, 1000);
      } else {
        leftArrowInner.style.display = "flex";
        setTimeout(() => {
          leftArrow.style.display = "flex";
        }, 1000);
      }

      if (slider.scrollLeft + slider.clientWidth + 5 >= slider.scrollWidth) {
        rightArrowInner.style.display = "none";
        setTimeout(() => {
          rightArrow.style.display = "none";
        }, 1000);
      } else {
        rightArrowInner.style.display = "flex";
        setTimeout(() => {
          rightArrow.style.display = "flex";
        }, 1000);
      }
    };

    slider.addEventListener("scroll", handleScroll);

    return () => {
      slider.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    let customSlider = document.querySelector(".custom-slider");

    let slider = document.querySelector(".custom-slider-items");
    if (!slider || !customSlider) return;

    let initialX,
      finalX,
      prevTouchX = 0,
      curTouchX;
    const handleTouchStart = (event) => {
      initialX = event.changedTouches[0].clientX;
      prevTouchX = initialX;
    };
    const handleTouchEnd = (event) => {
      finalX = event.changedTouches[0].clientX;
      let swipeDistance = finalX - initialX;
      if (swipeDistance > 0) {
        handleNext("prev", swipeDistance * 2);
      } else {
        handleNext("next", -swipeDistance * 2);
      }
    };

    const handleTouchMove = (event) => {
      curTouchX = event.touches[0].clientX;

      let distance = curTouchX - prevTouchX;
      if (curTouchX > prevTouchX) handleNext("prev", distance);
      else handleNext("next", -distance);
      prevTouchX = curTouchX;
    };

    const handleMouseOver = () => {
      // console.log("focusing");
      slider.focus();
    };

    const handleKeyDown = (event) => {
      if (event.keyCode === 37) {
        // Left arrow key
        handleNext("prev");
      } else if (event.keyCode === 39) {
        // Right arrow key
        handleNext("next");
      }
    };
    customSlider.addEventListener("mouseover", handleMouseOver);
    slider.addEventListener("keydown", handleKeyDown);
    slider.addEventListener("touchstart", handleTouchStart);
    slider.addEventListener("touchend", handleTouchEnd);
    slider.addEventListener("touchmove", handleTouchMove);

    return () => {
      if (slider) {
        slider.removeEventListener("keydown", handleKeyDown);
        slider.removeEventListener("touchstart", handleTouchStart);
        slider.removeEventListener("touchend", handleTouchEnd);
        slider.removeEventListener("touchmove", handleTouchMove);
      }
      if (customSlider)
        customSlider.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

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
        minHeight: "2.5rem",
        // borderRadius: "1000px",
        // overflowY: "hidden",
      }}
    >
      <Box
        className="custom-slider-left-arrow"
        sx={{
          position: "absolute",
          left: "-1rem",
          top: "50%",
          transform: "translateY(-50%)",
          //   bottom: "0",
          // set color if parent elements content has overflown
          cursor: "pointer",


          background: "transparent",

          //   pr: isMobileScreens ? "1rem" : "1rem",
          zIndex: "1",

          borderRadius: "1000px",
          height: "30px",
          width: "30px",
          overflow: "hidden",
        }}
        onClick={() => {
          handleNext("prev", 300, true);
        }}
      >
        <Box className="custom-slider-left-arrow-inner"
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: theme.palette.homepage.arrowBg,
          }}>
          <KeyboardDoubleArrowLeftIcon
            style={{
              color: theme.palette.homepage.arrowColor,
              fontSize: isMobileScreens ? "1.5rem" : "1.7rem",
              // border: "2px solid green",
              // marginTop: isMobileScreens ? "0.05rem" : "-0.05rem",
            }}
          />
        </Box>
      </Box>
      <Box
        className="custom-slider-right-arrow"
        sx={{
          position: "absolute",
          right: "-1rem",
          top: "50%",

          // set color if parent elements content has overflown
          cursor: "pointer",

          background: "transparent",

          transform: "translateY(-50%)",
          zIndex: "1",
          borderRadius: "1000px",
          height: "30px",
          width: "30px",
          overflow: "hidden",
        }}
        onClick={() => {
          handleNext("next", 300, true);
        }}
      >
        <Box className="custom-slider-right-arrow-inner"
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: theme.palette.homepage.arrowBg,
          }}>
          <KeyboardDoubleArrowRightIcon
            style={{
              color: theme.palette.homepage.arrowColor,
              fontSize: isMobileScreens ? "1.5rem" : "1.7rem",
              // marginTop: isMobileScreens ? "0.05rem" : "-0.05rem",
            }}
          />
        </Box>
      </Box>
      <Box
        tabIndex="0"
        className="custom-slider-items"
        sx={{
          width: "100%",
          overflowX: "hidden",
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "center",
          justifyContent: "flex-start",
          position: "relative",
          gap: "0.8rem",
          // px: "3rem",
          scrollBehavior: "smooth",
          "&:focus": {
            border: "none",
            outline: "none",
          },
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
              background:
                item === selectedItem
                  ? theme.palette.homepageSliderChipSelectedBg
                  : theme.palette.homepageSliderChipBg,
              color:
                item === selectedItem ? theme.palette.text.primary : theme.palette.text.primary,
              "&:hover": {
                background:
                  item === selectedItem
                    ? theme.palette.homepageSliderChipSelectedBg
                    : theme.palette.homepageSliderChipHoverBg,
              },
              color:
                item === selectedItem ? theme.palette.homepageSliderChipSelectedText : theme.palette.text.primary,
            }}
            onClick={() => {
              if (setSelectedItem) {
                selectedItemRef.current = item;
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
