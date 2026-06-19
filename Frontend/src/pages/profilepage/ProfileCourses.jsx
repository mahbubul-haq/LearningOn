import React, { useRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CourseWidget from "../../widgets/CourseWidget";
import { colorTokens } from "../../theme";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const ProfileCourses = ({ userCourses, userPublishedCourses }) => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 900px)");
  const containerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkArrows = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1);
    }
  };

  useEffect(() => {
    checkArrows();
    window.addEventListener("resize", checkArrows);
    return () => window.removeEventListener("resize", checkArrows);
  }, [userPublishedCourses]);

  const handleScroll = (direction) => {
    if (containerRef.current) {
      const scrollDistance = isNonMobileScreens ? 500 : 200;
      if (direction === "right") {
        containerRef.current.scrollBy({ left: scrollDistance, behavior: "smooth" });
      } else {
        containerRef.current.scrollBy({ left: -scrollDistance, behavior: "smooth" });
      }
    }
  };

  return (
    <Box
      sx={{
        position: "relative",

        width: "100%",
      }}
    >
      {userPublishedCourses && userPublishedCourses.length > 0 && (
        <Box
          //className="courses-wrapper"
          sx={{
            width: "100%",
            position: "relative",
          }}
        >
          <Box
            className="profile-course-right-arrow"
            sx={{
              display: showRightArrow ? "flex" : "none",
              position: "absolute",
              right: isNonMobileScreens ? "-25px" : "-15px",
              top: "50%",
              transform: "translateY(-50%)",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: (theme) => theme.palette.mode === 'dark' ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              border: (theme) => theme.palette.mode === 'dark' ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid rgba(0, 0, 0, 0.1)",
              ":hover": {
                backgroundColor: (theme) => theme.palette.mode === 'dark' ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
                transform: "translateY(-50%) scale(1.1)",
              },
              cursor: "pointer",
              transition: "all 0.3s ease",
              zIndex: "10",
              height: isNonMobileScreens ? "50px" : "40px",
              width: isNonMobileScreens ? "50px" : "40px",
              borderRadius: "50%",
            }}
            onClick={() => {
              handleScroll("right");
            }}
          >
            <ArrowForwardIosIcon
              sx={{
                fontSize: isNonMobileScreens ? "1.5rem" : "1.2rem",
                color: (theme) => theme.palette.mode === 'dark' ? colorTokens.white.main : "black",
                alignSelf: "center",
                ml: "3px", // visually center
              }}
            />
          </Box>

          <Box
            className="profile-course-left-arrow"
            sx={{
              display: showLeftArrow ? "flex" : "none",
              position: "absolute",
              left: isNonMobileScreens ? "-25px" : "-15px",
              top: "50%",
              transform: "translateY(-50%)",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: (theme) => theme.palette.mode === 'dark' ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              border: (theme) => theme.palette.mode === 'dark' ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid rgba(0, 0, 0, 0.1)",
              ":hover": {
                backgroundColor: (theme) => theme.palette.mode === 'dark' ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
                transform: "translateY(-50%) scale(1.1)",
              },
              cursor: "pointer",
              transition: "all 0.3s ease",
              zIndex: "10",
              height: isNonMobileScreens ? "50px" : "40px",
              width: isNonMobileScreens ? "50px" : "40px",
              borderRadius: "50%",
            }}
            onClick={() => {
              handleScroll("left");
            }}
          >
            <ArrowForwardIosIcon
              sx={{
                fontSize: isNonMobileScreens ? "1.5rem" : "1.2rem",
                color: (theme) => theme.palette.mode === 'dark' ? colorTokens.white.main : "black",
                alignSelf: "center",
                transform: "rotate(180deg)",
                mr: "2px", // visually center
              }}
            />
          </Box>
          <Box
            ref={containerRef}
            className="profile-courses-container"
            onScroll={checkArrows}
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              gap: isNonMobileScreens ? "1.5rem" : "1rem",
              overflowX: "auto",
              width: "100%",
              height: "100%",
              scrollBehavior: "smooth",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            {userPublishedCourses?.map((course) => {
              // if (course?.courseStatus !== "published") return null;
              return (
                <Box
                  key={course._id}
                  sx={{
                    display: "grid",
                    gridTemplateRows: "1",
                  }}
                >
                  <CourseWidget courseInfo={course} />
                </Box>
              );
            })}
          </Box>
          {/* <Typography>
                        Brows better in courses page
                    </Typography> */}
        </Box>
      )}
      {(!userPublishedCourses || userPublishedCourses.length === 0) && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            color: theme.palette.text.secondary,
            fontSize: "1rem",
            // fontWeight: "600",
          }}
        >
          User has not published any courses yet
        </Box>
      )}
    </Box>
  );
};

export default ProfileCourses;
