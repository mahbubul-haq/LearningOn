import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import { colorTokens } from "../../theme";
import { useContext, useEffect } from "react";
import { CourseNextPrevButton } from "../../components/StyledBox";
import { HomePageContext } from "../../state/HomePageState";
import CourseWidget from "../../widgets/CourseWidget";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useNavigate } from "react-router-dom";

const CoursesContent = ({ handleScroll, selectedItem, selectedCourses, courseType, changingCourseType, changingCourseTypeRef, setCourseType }) => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 900px)");
  const { loading, courseFetchError, waitingForSelectedCoursesRef, waitingForSelectedCourses, setLoading, getCourses } = useContext(HomePageContext);
  const navigate = useNavigate();

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
        handleScroll("left", (swipeDistance * 500) / time);
      } else if (Math.abs(swipeDistance) > 0.001) {
        handleScroll("right", (-swipeDistance * 500) / time);
      }
    };

    const handleTouchMove = (event) => {
      ///event.preventDefault();
      curTouchX = event.touches[0].clientX;

      let distance = curTouchX - prevTouchX;

      if (distance > 0) {
        handleScroll("left", distance);
      } else if (distance < 0) {
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
          right: isNonMobileScreens ? "-1px" : "-25px",
        }}
        onClick={() => {
          handleScroll("right");
        }}
      >
        <ArrowForwardIosIcon
          sx={{
            fontSize: isNonMobileScreens ? "3rem" : "1.5rem",
            color: (theme) => theme.palette.homepage.arrowColor,
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
            color: (theme) => theme.palette.homepage.arrowColor,
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
          // overflowY: "auto",
          width: "100%",
          height: "100%",
          scrollBehavior: "smooth",
          opacity: loading || waitingForSelectedCourses || changingCourseTypeRef.current ? 0.3 : 1,
        }}
      >
        {selectedCourses.map((course) => {
          if (course.courseStatus != "published") return null;
          // return null;

          return (
            <Box
              key={course?._id}
              sx={{
                display: "grid",
                gridTemplateRows: "1",
                // boxShadow: `0 8px 32px black`,
                // py: "1rem",
                pb: "2rem",
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
        {selectedCourses.length === 0 && !loading && !waitingForSelectedCoursesRef.current && !courseFetchError && !changingCourseType &&
          <>
            {courseType == "I am Learning" &&
              <Box sx={{ mx: "auto", display: 'flex', flexDirection: 'column', alignItems: 'center', py: 10 }}>
                <Box sx={{
                  width: 80, height: 80, borderRadius: '50%', bgcolor: theme.palette.homepage.coursePlaceholder.adventureIconBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3,
                  animation: 'pulse 2s infinite ease-in-out',
                  '@keyframes pulse': { '0%': { transform: 'scale(0.95)' }, '50%': { transform: 'scale(1.05)' }, '100%': { transform: 'scale(0.95)' } }
                }}>
                  <AutoStoriesIcon sx={{ fontSize: 40, color: theme.palette.homepage.coursePlaceholder.adventureIcon }} />
                </Box>
                <Typography variant="h5" fontWeight={700} gutterBottom sx={{ textAlign: 'center' }}>Start your first adventure</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 350, textAlign: 'center' }}>
                  Your learning shelf is empty. Pick a subject and start building skills today!
                </Typography>
                <Button variant="contained" size="large" sx={{ bgcolor: theme.palette.homepage.coursePlaceholder.adventureButton, borderRadius: 3, px: 4 }}
                  onClick={() => {
                    setCourseType("Popular Courses");
                  }}
                >
                  Browse Popular Courses
                </Button>
              </Box>
            }
            {
              courseType == "My Courses" &&
              <Box sx={{ mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', py: 10 }}>
                <Box sx={{
                  width: 80, height: 80, borderRadius: 3,
                  background: theme.palette.homepage.coursePlaceholder.createIconGradient,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3,
                  boxShadow: theme.palette.homepage.coursePlaceholder.createIconShadow
                }}>
                  <AddBoxIcon sx={{ fontSize: 40, color: colorTokens.white.pure }} />
                </Box>
                <Typography variant="h5" fontWeight={700} gutterBottom sx={{ textAlign: 'center' }}>Ready to share your knowledge?</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 350, textAlign: 'center' }}>
                  You haven't published any courses yet. Create your first course and reach students worldwide.
                </Typography>
                <Button variant="outlined" size="large" sx={{ borderColor: theme.palette.homepage.coursePlaceholder.createButtonText, color: theme.palette.homepage.coursePlaceholder.createButtonText, borderRadius: 3, px: 4, '&:hover': { bgcolor: theme.palette.homepage.coursePlaceholder.createButtonHover } }}
                  onClick={() => {
                    navigate('/publishcourse');
                  }}
                >
                  Create New Course
                </Button>
              </Box>
            }
          </>
        }

        {courseFetchError && (
          <Box sx={{ mx: "auto", display: 'flex', flexDirection: 'column', alignItems: 'center', py: 10 }}>
            <Box sx={{ mb: 3, position: 'relative' }}>
              <WifiOffIcon sx={{ fontSize: 60, color: 'text.disabled' }} />
              <Box sx={{
                position: 'absolute', top: -5, right: -5, width: 20, height: 20,
                bgcolor: theme.palette.homepage.coursePlaceholder.errorIndicator, borderRadius: '50%', border: `3px solid ${colorTokens.white.pure}`
              }} />
            </Box>
            <Typography variant="h5" fontWeight={700} gutterBottom sx={{ textAlign: 'center' }}>Something went wrong</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 350, textAlign: 'center' }}>
              We couldn't fetch the latest courses. It might be a temporary connection issue.
            </Typography>
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              sx={{ bgcolor: theme.palette.homepage.coursePlaceholder.reloadButtonBg, color: colorTokens.white.pure, borderRadius: 3, px: 4, '&:hover': { bgcolor: theme.palette.homepage.coursePlaceholder.reloadButtonHover } }}
              onClick={() => {
                setLoading(true);
                getCourses(selectedItem == "All" ? "all" : selectedItem);
              }}
            >
              Reload Courses
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CoursesContent;
