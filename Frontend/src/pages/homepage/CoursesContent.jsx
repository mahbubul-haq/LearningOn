import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext, useEffect } from "react";
import { CourseNextPrevButton } from "../../components/StyledBox";
import { HomePageContext } from "../../state/HomePageState";
import CourseWidget from "../../widgets/CourseWidget";

const CoursesContent = ({ handleScroll, selectedItem, selectedCourses, courseType, changingCourseType, changingCourseTypeRef }) => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { loading, courseFetchError, waitingForSelectedCoursesRef, waitingForSelectedCourses } = useContext(HomePageContext);


  useEffect(() => {
    console.log("Re rendering, loading:", loading, "waitingForSelectedCourses:", waitingForSelectedCourses, "waitingForSelectedCoursesRef:", waitingForSelectedCoursesRef.current);
  });

  useEffect(() => {
    let coursesContainer = document.querySelector(".courses-container");

    if (!coursesContainer) return;


    let initialX,
      finalX,
      prevTouchX = 0,
      curTouchX,
      startTime,
      endTime;

    const handleTouchStart = (event) => {
      initialX = event.changedTouches[0].clientX;
      startTime = Date.now();
      prevTouchX = initialX;
    };

    const handleTouchEnd = (event) => {
      finalX = event.changedTouches[0].clientX;
      let swipeDistance = finalX - initialX;
      endTime = Date.now();
      let time = endTime - startTime;
      if (swipeDistance > 0.001) {
        handleScroll("left", (swipeDistance * 1000) / time);
      } else if (Math.abs(swipeDistance) > 0.001) {
        handleScroll("right", (-swipeDistance * 1000) / time);
      }
    };

    const handleTouchMove = (event) => {
      ///event.preventDefault();
      curTouchX = event.touches[0].clientX;

      let distance = curTouchX - prevTouchX;

      if (distance > 0.001) {
        handleScroll("left", distance);
      } else if (distance < -0.001) {
        handleScroll("right", -distance);
      }
      prevTouchX = curTouchX;
    };

    coursesContainer.addEventListener("touchstart", handleTouchStart);
    coursesContainer.addEventListener("touchend", handleTouchEnd);
    coursesContainer.addEventListener("touchmove", handleTouchMove);

    return () => {
      coursesContainer.removeEventListener("touchstart", handleTouchStart);
      coursesContainer.removeEventListener("touchend", handleTouchEnd);
      coursesContainer.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
      }}
    >
      <CourseNextPrevButton
        className="right-arrow"
        sx={{
          right: isNonMobileScreens ? "0" : "-25px",
        }}
        onClick={() => {
          handleScroll("right");
        }}
      >
        <ArrowForwardIosIcon
          sx={{
            fontSize: isNonMobileScreens ? "3rem" : "1.5rem",
            color: "rgba(255, 255, 255, 1)",
            alignSelf: "center",
          }}
        />
      </CourseNextPrevButton>

      <CourseNextPrevButton
        className="left-arrow"
        sx={{
          left: isNonMobileScreens ? "0" : "-25px",
        }}
        onClick={() => {
          handleScroll("left");
        }}
      >
        <ArrowForwardIosIcon
          sx={{
            fontSize: isNonMobileScreens ? "3rem" : "1.5rem",
            color: "rgba(255, 255, 255, 1)",
            alignSelf: "center",
            transform: "rotate(180deg)",
          }}
        />
      </CourseNextPrevButton>
      <Box
        className="courses-container"
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          gap: isNonMobileScreens ? "1.5rem" : "1rem",
          overflowX: "hidden",
          width: "100%",
          height: "100%",
          scrollBehavior: "smooth",
          opacity: loading || waitingForSelectedCourses || changingCourseTypeRef.current ? 0.3 : 1,
        }}
      >
        {selectedCourses.map((course) => {
          if (course.courseStatus != "published") return null;

          return (
            <Box
              key={course?._id}
              sx={{
                display: "grid",
                gridTemplateRows: "1",
                // py: "1rem",
                gridTemplateColumns: isNonMobileScreens
                  ? "repeat(auto-fit, 300px)"
                  : "repeat(auto-fit, 250px)",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  //   transition: "transform 0.2s ease-out",
                  //   "&:hover": {
                  //     transform: "scale(1.02)",
                  //   },
                }}
              >
                <CourseWidget courseInfo={course} />
              </Box>
            </Box>
          );
        })}
        {selectedCourses.length === 0 && (loading || waitingForSelectedCoursesRef.current || changingCourseTypeRef.current) && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
              //border: "1px solid rgba(0, 0, 0, 0.23)",
            }}
          >
            <Typography variant="h4grey">Loading courses...</Typography>
          </Box>
        )}
        {selectedCourses.length === 0 && !loading && !waitingForSelectedCoursesRef.current && !courseFetchError && !changingCourseType && (
          <Box
            disabled={waitingForSelectedCourses && changingCourseType} //dummy to trigger re-render
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
              //border: "1px solid rgba(0, 0, 0, 0.23)",
            }}
          >
            {/* {selectedItem === "" ? ( */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                mt: isNonMobileScreens ? "2rem" : "2rem",
                alignItems: "center",
                height: "100%",
                mb: "2rem",
                // width: "100%",
                // border: "1px solid rgba(0, 0, 0, 0.23)",
              }}
            >
              <Typography variant="h4grey">{
                courseType == "Popular Courses" ? "No courses found" : courseType == "My Courses" ? 
                "No published courses yet" : "You don't have any active courses right now"}
              </Typography>
              <img
                src="/images/not_found_1.svg"
                style={{
                  // height: "30%",
                  maxHeight: isNonMobileScreens ? "250px" : "150px",
                  width: "auto",
                }}
              />
            </Box>
            {/* ) : (
                            <Typography variant="h4">
                                No courses found on <b>{selectedItem}</b>
                            </Typography>
                        )} */}
          </Box>
        )}
        {courseFetchError && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
              //border: "1px solid rgba(0, 0, 0, 0.23)",
            }}
          >
            <Typography variant="h4grey">
              Unable to fetch courses. Please refresh the page.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CoursesContent;
