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

    let touchStartX = 0;
    let touchStartTime = 0;
    let lastTouchX = 0;
    let isDragging = false;

    const MIN_SWIPE_DISTANCE = 30; // Minimum distance to trigger swipe
    const MIN_SWIPE_VELOCITY = 0.3; // Minimum velocity (px/ms) to trigger momentum scroll

    const handleTouchStart = (event) => {
      touchStartX = event.changedTouches[0].clientX;
      lastTouchX = touchStartX;
      touchStartTime = Date.now();
      isDragging = false;
    };

    const handleTouchMove = (event) => {
      const currentTouchX = event.touches[0].clientX;
      const deltaX = currentTouchX - lastTouchX;

      // Only scroll if there's meaningful movement
      if (Math.abs(deltaX) > 0.5) {
        isDragging = true;
        const absDistance = Math.abs(deltaX);
        const direction = deltaX > 0 ? "prev" : "next";

        handleNext(direction, absDistance);
        lastTouchX = currentTouchX;
      }
    };

    const handleTouchEnd = (event) => {
      const touchEndX = event.changedTouches[0].clientX;
      const totalDistance = touchEndX - touchStartX;
      const totalTime = Date.now() - touchStartTime;

      // Calculate velocity (pixels per millisecond)
      const velocity = Math.abs(totalDistance) / totalTime;

      // Only trigger momentum scroll if:
      // 1. User swiped with sufficient velocity
      // 2. Total distance exceeds minimum threshold
      // 3. User didn't just drag (quick flick gesture)
      if (
        velocity > MIN_SWIPE_VELOCITY &&
        Math.abs(totalDistance) > MIN_SWIPE_DISTANCE &&
        totalTime < 300 // Quick gesture (less than 300ms)
      ) {
        const direction = totalDistance > 0 ? "prev" : "next";
        // Apply momentum: velocity * time factor for smooth deceleration
        const momentumDistance = velocity * 400; // Adjust multiplier for desired scroll distance

        handleNext(direction, momentumDistance);
      }

      isDragging = false;
    };

    const handleMouseOver = () => {
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
    slider.addEventListener("touchstart", handleTouchStart, { passive: true });
    slider.addEventListener("touchend", handleTouchEnd, { passive: true });
    slider.addEventListener("touchmove", handleTouchMove, { passive: true });

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
          flexShrink: 0,
          alignSelf: "center",
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
            backdropFilter: "blur(20px) saturate(200%)",
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
          flexShrink: 0,
          alignSelf: "center",
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
            backdropFilter: "blur(20px) saturate(200%)",
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
