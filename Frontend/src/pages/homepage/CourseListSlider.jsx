import React, { useEffect, useRef } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import { colorTokens } from "../../theme";
import { CourseNextPrevButton } from "../../components/StyledBox";
import CourseWidget from "../../widgets/CourseWidget";
import WaveLoader from "../../components/WaveLoader";

const CourseListSlider = ({ courses, title, loading }) => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 900px)");
  const containerRef = useRef(null);
  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);
  const leftArrowInnerRef = useRef(null);
  const rightArrowInnerRef = useRef(null);

  const handleScroll = (direction, scrollValue) => {
    const container = containerRef.current;
    if (!container) return;

    const scrollStep = scrollValue
      ? scrollValue
      : isNonMobileScreens
        ? 400
        : 200;

    if (direction === "left") {
      container.scrollLeft -= scrollStep;
    } else {
      container.scrollLeft += scrollStep;
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let lastTouchX = 0;
    let isDragging = false;
    let isHorizontalSwipe = null;

    const MIN_SWIPE_DISTANCE = 30;
    const MIN_SWIPE_VELOCITY = 0.3;

    const handleTouchStart = (event) => {
      touchStartX = event.changedTouches[0].clientX;
      touchStartY = event.changedTouches[0].clientY;
      lastTouchX = touchStartX;
      touchStartTime = Date.now();
      isDragging = false;
      isHorizontalSwipe = null;
      if (container) container.style.scrollBehavior = "auto";
    };

    const handleTouchMove = (event) => {
      const currentTouchX = event.touches[0].clientX;
      const currentTouchY = event.touches[0].clientY;
      const deltaX = currentTouchX - lastTouchX;

      if (isHorizontalSwipe === null) {
        const totalDeltaX = Math.abs(currentTouchX - touchStartX);
        const totalDeltaY = Math.abs(currentTouchY - touchStartY);
        
        if (totalDeltaX > 5 || totalDeltaY > 5) {
          isHorizontalSwipe = totalDeltaX > totalDeltaY;
        }
      }

      if (isHorizontalSwipe === false) return;

      if (isHorizontalSwipe && Math.abs(deltaX) > 0.5) {
        isDragging = true;
        const absDistance = Math.abs(deltaX);
        const direction = deltaX > 0 ? "left" : "right";

        handleScroll(direction, absDistance);
        lastTouchX = currentTouchX;
      }
    };

    const handleTouchEnd = (event) => {
      if (container) container.style.scrollBehavior = "smooth";
      if (isHorizontalSwipe === false) return;

      const touchEndX = event.changedTouches[0].clientX;
      const totalDistance = touchEndX - touchStartX;
      const totalTime = Date.now() - touchStartTime;
      const velocity = Math.abs(totalDistance) / totalTime;

      if (
        velocity > MIN_SWIPE_VELOCITY &&
        Math.abs(totalDistance) > MIN_SWIPE_DISTANCE &&
        totalTime < 300
      ) {
        const direction = totalDistance > 0 ? "left" : "right";
        const momentumDistance = velocity * 400;
        handleScroll(direction, momentumDistance);
      }
      isDragging = false;
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const rightArrow = rightArrowRef.current;
    const leftArrow = leftArrowRef.current;
    const leftArrowInner = leftArrowInnerRef.current;
    const rightArrowInner = rightArrowInnerRef.current;

    if (!container || !rightArrow || !leftArrow || !leftArrowInner || !rightArrowInner) return;

    const updateArrowVisibility = () => {
      if (!(courses?.length > 0) || container.scrollLeft <= 0) {
        leftArrowInner.style.display = "none";
        setTimeout(() => {
          if (leftArrow) leftArrow.style.display = "none";
        }, 1000);
      } else {
        leftArrowInner.style.display = "flex";
        setTimeout(() => {
          if (leftArrow) leftArrow.style.display = "flex";
        }, 1000);
      }

      if (
        !(courses?.length > 0) ||
        container.scrollLeft + 1 >= container.scrollWidth - container.clientWidth
      ) {
        rightArrowInner.style.display = "none";
        setTimeout(() => {
          if (rightArrow) rightArrow.style.display = "none";
        }, 1000);
      } else {
        rightArrowInner.style.display = "flex";
        setTimeout(() => {
          if (rightArrow) rightArrow.style.display = "flex";
        }, 1000);
      }
    };

    container.addEventListener("scroll", updateArrowVisibility);
    updateArrowVisibility();

    // Re-check visibility when window resizes or courses change
    window.addEventListener("resize", updateArrowVisibility);

    // Immediate update without timeout for initial render
    if (!(courses?.length > 0) || container.scrollLeft <= 0) {
      leftArrowInner.style.display = "none";
      leftArrow.style.display = "none";
    } else {
      leftArrowInner.style.display = "flex";
      leftArrow.style.display = "flex";
    }

    if (!(courses?.length > 0) || container.scrollLeft + 1 >= container.scrollWidth - container.clientWidth) {
      rightArrowInner.style.display = "none";
      rightArrow.style.display = "none";
    } else {
      rightArrowInner.style.display = "flex";
      rightArrow.style.display = "flex";
    }

    return () => {
      container.removeEventListener("scroll", updateArrowVisibility);
      window.removeEventListener("resize", updateArrowVisibility);
    };
  }, [courses, isNonMobileScreens]);

  if (!loading && (!courses || courses.length === 0)) {
    return null;
  }

  return (
    <Box sx={{ mt: 6, mb: 4, width: "100%" }}>
      <Box sx={{ mb: "1rem", textAlign: isNonMobileScreens ? "left" : "center" }}>
        <Typography variant="h3" sx={{ color: theme.palette.homepage.titleColor || "inherit" }}>
          {title}
        </Typography>
      </Box>

      <Box
        sx={{
          p: isNonMobileScreens ? "2rem" : "0",
          backgroundColor: isNonMobileScreens ? (theme) => theme.palette.homepage.cardBg : "transparent",
          backdropFilter: isNonMobileScreens ? "blur(20px)" : "none",
          WebkitBackdropFilter: isNonMobileScreens ? "blur(20px)" : "none",
          border: isNonMobileScreens ? (theme) => `1px solid ${theme.palette.homepage.cardBorder}` : "none",
          borderRadius: "12px",
          boxShadow: isNonMobileScreens ? (theme) => `0 8px 40px ${theme.palette.homepage.cardShadow}` : "none",
          width: "100%",
          height: isNonMobileScreens ? "520px" : "480px",
          position: "relative",
        }}
      >
        <Box sx={{ width: "100%", position: "relative", height: "100%" }}>
          <CourseNextPrevButton
            ref={rightArrowRef}
            sx={{ right: isNonMobileScreens ? "-1px" : "-25px" }}
            onClick={() => handleScroll("right")}
          >
            <Box ref={rightArrowInnerRef} sx={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "100%", height: "100%", background: theme.palette.homepage.arrowBg,
              backdropFilter: "blur(10px) saturate(200%)", transition: "all 0.5s ease",
              "&:hover": { backgroundColor: theme.palette.homepage.arrowBgHover },
            }}>
              <ArrowForwardIosIcon sx={{ fontSize: isNonMobileScreens ? "3rem" : "1.5rem", color: (theme) => theme.palette.homepage.arrowColor, alignSelf: "center" }} />
            </Box>
          </CourseNextPrevButton>

          <CourseNextPrevButton
            ref={leftArrowRef}
            sx={{ left: isNonMobileScreens ? "0" : "-25px" }}
            onClick={() => handleScroll("left")}
          >
            <Box ref={leftArrowInnerRef} sx={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "100%", height: "100%", background: theme.palette.homepage.arrowBg,
              backdropFilter: "blur(10px) saturate(200%)", transition: "all 0.5s ease",
              "&:hover": { backgroundColor: theme.palette.homepage.arrowBgHover },
            }}>
              <ArrowForwardIosIcon sx={{ fontSize: isNonMobileScreens ? "3rem" : "1.5rem", color: (theme) => theme.palette.homepage.arrowColor, alignSelf: "center", transform: "rotate(180deg)" }} />
            </Box>
          </CourseNextPrevButton>

          <Box
            ref={containerRef}
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              gap: isNonMobileScreens ? "1.5rem" : "1rem",
              overflowX: "hidden",
              width: "100%",
              height: "100%",
              scrollBehavior: "smooth",
              opacity: loading ? 0.3 : 1,
            }}
          >
            {courses?.map((course) => {
              if (course.courseStatus !== "published") return null;
              return (
                <Box
                  key={course?._id}
                  sx={{
                    display: "grid", gridTemplateRows: "1", pt: "2rem", pb: "3rem",
                    gridTemplateColumns: isNonMobileScreens ? "repeat(auto-fit, 300px)" : "repeat(auto-fit, 250px)",
                  }}
                >
                  <Box sx={{ height: "100%", display: "flex", "&:hover": { transform: "scale(1.02)" } }}>
                    <CourseWidget courseInfo={course} />
                  </Box>
                </Box>
              );
            })}

            {loading && (
              <Box sx={{ py: 10, mx: "auto", display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                <WaveLoader />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CourseListSlider;
