import { Box, Chip } from "@mui/material";
import { useCallback, useEffect } from "react";
//import arrow left and right icon
// import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
// import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import { useTheme } from "@mui/material/styles";

const CustomSlider = ({ items, selectedItem, setSelectedItem }) => {
  const theme = useTheme();
  const isMobileScreens = useMediaQuery("(max-width: 600px)");

  const handleNext = useCallback((side, swipeDistance = 300, focus = false) => {
    let slider = document.querySelector(".custom-slider-items");
    let leftArrow = document.querySelector(".custom-slider-left-arrow");
    let rightArrow = document.querySelector(".custom-slider-right-arrow");
    if (!slider || !leftArrow || !rightArrow) return;

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
      setTimeout(() => {
        leftArrow.style.display = "none";
      }, 300);
    } else {
      setTimeout(() => {
        leftArrow.style.display = "flex";
      }, 300);
    }

    if (slider.scrollLeft + slider.clientWidth + 5 >= slider.scrollWidth) {
      setTimeout(() => {
        rightArrow.style.display = "none";
      }, 300);
    } else {
      setTimeout(() => {
        rightArrow.style.display = "flex";
      }, 300);
    }
  }, []);

  useEffect(() => {
    handleNext("", 0);

    if (items?.length > 0) {
      if (setSelectedItem) setSelectedItem(items[0]);
    }
  }, []);

  useEffect(() => {
    handleNext("", 0);
  }, [items]);

  useEffect(() => {
    let slider = document.querySelector(".custom-slider-items");
    let leftArrow = document.querySelector(".custom-slider-left-arrow");
    let rightArrow = document.querySelector(".custom-slider-right-arrow");
    if (!slider || !leftArrow || !rightArrow) return;

    const handleScroll = () => {
      //console.log("handleScroll");
      if (slider.scrollLeft === 0) {
        setTimeout(() => {
          leftArrow.style.display = "none";
        }, 300);
      } else {
        setTimeout(() => {
          leftArrow.style.display = "flex";
        }, 300);
      }

      if (slider.scrollLeft + slider.clientWidth + 5 >= slider.scrollWidth) {
        setTimeout(() => {
          rightArrow.style.display = "none";
        }, 300);
      } else {
        setTimeout(() => {
          rightArrow.style.display = "flex";
        }, 300);
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
          backgroundImage: isMobileScreens
            ? "linear-gradient(to right, rgba(0, 0, 0, 0.7) 60%, rgba(255, 255, 255, 0))"
            : "linear-gradient(to right, rgba(0, 0, 0, 0.7) 50%, rgba(255, 255, 255, 0))",

          background: "rgba(0, 0, 0, 0.7)",
          display: "none",
          alignItems: "center",
          justifyContent: "center",

          //   pr: isMobileScreens ? "1rem" : "1rem",
          zIndex: "1",

          borderRadius: "1000px",
          height: "30px",
          width: "30px",
        }}
        onClick={() => {
          handleNext("prev", 300, true);
        }}
      >
        <MdOutlineKeyboardArrowLeft
          style={{
            color: "white",
            fontSize: isMobileScreens ? "1.5rem" : "1.7rem",
            // border: "2px solid green",
            // marginTop: isMobileScreens ? "0.05rem" : "-0.05rem",
          }}
        />
      </Box>
      <Box
        className="custom-slider-right-arrow"
        sx={{
          position: "absolute",
          right: "-1rem",
          top: "50%",

          // set color if parent elements content has overflown
          cursor: "pointer",
          backgroundImage: isMobileScreens
            ? "linear-gradient(to right, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.7) 40%)"
            : "linear-gradient(to right, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.7) 50%)",
          // pl: isMobileScreens ? "1rem" : "1rem",
          background: "rgba(0, 0, 0, 0.7)",
          display: "none",
          alignItems: "center",
          justifyContent: "center",
          transform: "translateY(-50%)",
          zIndex: "1",
          borderRadius: "1000px",
          height: "30px",
          width: "30px",
        }}
        onClick={() => {
          handleNext("next", 300, true);
        }}
      >
        <MdOutlineKeyboardArrowRight
          style={{
            color: "white",
            fontSize: isMobileScreens ? "1.5rem" : "1.7rem",
            // marginTop: isMobileScreens ? "0.05rem" : "-0.05rem",
          }}
        />
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
                  ? theme.palette.text.primary
                  : theme.palette.grey.grey100,
              color:
                item === selectedItem ? "white" : theme.palette.text.primary,
              "&:hover": {
                background:
                  item === selectedItem
                    ? theme.palette.text.primary
                    : theme.palette.grey.grey200,
                color:
                  item === selectedItem ? "white" : theme.palette.text.primary,
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
