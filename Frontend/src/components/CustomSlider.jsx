import { Box, Chip } from "@mui/material";
import { useEffect } from "react";
//import arrow left and right icon
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useTheme } from "@mui/material/styles";

const CustomSlider = ({ items, selectedItem, setSelectedItem }) => {
  const theme = useTheme();
  const isMobileScreens = useMediaQuery("(max-width: 600px)");

  const handleNext = (side, swipeDistance = 300) => {
    let slider = document.querySelector(".custom-slider-items");
    slider.focus();

    if (side === "next") {
      slider.scrollLeft += swipeDistance;
    }
    if (side === "prev") {
      slider.scrollLeft -= swipeDistance;
    }

    // console.log(slider.scrollLeft, slider.clientWidth, slider.scrollWidth);

    if (slider.scrollLeft + slider.clientWidth + 5 >= slider.scrollWidth) {
      document.querySelector(".custom-slider-right-arrow").style.display =
        "none";
    } else {
      document.querySelector(".custom-slider-right-arrow").style.display =
        "block";
    }

    // check if slider has reached start
    if (slider.scrollLeft === 0) {
      document.querySelector(".custom-slider-left-arrow").style.display =
        "none";
    } else {
      document.querySelector(".custom-slider-left-arrow").style.display =
        "block";
    }
  };

  useEffect(() => {
    if (document.querySelector(".custom-slider-items").scrollLeft === 0) {
      document.querySelector(".custom-slider-left-arrow").style.display =
        "none";
    } else {
      document.querySelector(".custom-slider-left-arrow").style.display =
        "block";
    }

    if (items?.length > 0) {
      if (setSelectedItem) setSelectedItem(items[0]);
    }
  }, []);

  useEffect(() => {
    let slider = document.querySelector(".custom-slider-items");
    if (!slider) return;

    if (slider.scrollLeft + slider.clientWidth + 5 >= slider.scrollWidth) {
      document.querySelector(".custom-slider-right-arrow").style.display =
        "none";
    } else {
      document.querySelector(".custom-slider-right-arrow").style.display =
        "block";
    }
  }, [items]);

  useEffect(() => {
    let customSlider = document.querySelector(".custom-slider");
    
    let slider = document.querySelector(".custom-slider-items");
    if (!slider || !customSlider) return;

    let initialX, finalX;
    const handleTouchStart = (event) => {
        initialX = event.changedTouches[0].clientX;
    }
    const handleTouchEnd = (event) => {
        finalX = event.changedTouches[0].clientX;
        let swipeDistance = finalX - initialX;
        if (swipeDistance > 0) {
            handleNext("prev", swipeDistance * 3);
        }
        else {
            handleNext("next", -swipeDistance * 3);
        }
    }

    const handleMouseOver = () => {
       // console.log("focusing");
        slider.focus();
    }

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

    return () => {
      if (slider) slider.removeEventListener("keydown", handleKeyDown);
      if (customSlider) customSlider.removeEventListener("mouseover", handleMouseOver);
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
        overflow: "hidden"
      }}
    >
      <Box
        className="custom-slider-left-arrow"
        sx={{
          position: "absolute",
          left: "0",
          top: "50%",
          transform: "translateY(-50%)",
          //   bottom: "0",
          // set color if parent elements content has overflown
          cursor: "pointer",
          backgroundImage: isMobileScreens ? 
            "linear-gradient(to right, rgba(255, 255, 255, 1) 60%, rgba(255, 255, 255, 0))" :
            "linear-gradient(to right, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0))",
          display: "flex",
          alignItems: "center",

          pr: isMobileScreens ? "1rem" : "3rem",
          height: "110%",
          zIndex: "1",
          
        //   border: "2px solid red"
        }}
        onClick={() => {
          handleNext("prev");
        }}
      >
        <KeyboardDoubleArrowLeftIcon
          style={{
            color: theme.palette.grey.grey900,
            fontSize: isMobileScreens ? "1.5rem" :  "1.7rem",
            // border: "2px solid green",
            marginTop: isMobileScreens ? "0.05rem" :  "-0.05rem",
          }}
        />
      </Box>
      <Box
        className="custom-slider-right-arrow"
        sx={{
          position: "absolute",
          right: "0rem",
          top: "50%",

          // set color if parent elements content has overflown
          cursor: "pointer",
          backgroundImage:
            isMobileScreens ? "linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 40%)"
            : "linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 50%)",
          pl: isMobileScreens ? "1rem" : "3rem",
          display: "flex",
          alignItems: "center",
          transform: "translateY(-50%)",
          zIndex: "1",
          height: "110%"
        }}
        onClick={() => {
          handleNext("next");
        }}
      >
        <KeyboardDoubleArrowRightIcon
          sx={{
            color: theme.palette.grey.grey900,
            fontSize: isMobileScreens ? "1.5rem" :  "1.7rem",
            marginTop: isMobileScreens ? "0.05rem" : "-0.05rem",
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
          }
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
