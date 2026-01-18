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
import WaveLoader from "../../components/WaveLoader";


const CoursesContent = ({ handleScroll, selectedItem, selectedCourses, courseType, changingCourseType, changingCourseTypeRef, setCourseType }) => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 900px)");
  const { loading, courseFetchError, waitingForSelectedCoursesRef, waitingForSelectedCourses, setLoading, getCourses, setCourseFetchError } = useContext(HomePageContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Re rendering, loading:", loading, "waitingForSelectedCourses:", waitingForSelectedCourses, "waitingForSelectedCoursesRef:", waitingForSelectedCoursesRef.current);
  });

  useEffect(() => {
    let coursesContainer = document.querySelector(".courses-container");

    if (!coursesContainer) return;

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
        const direction = deltaX > 0 ? "left" : "right";

        handleScroll(direction, absDistance);
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
        const direction = totalDistance > 0 ? "left" : "right";
        // Apply momentum: velocity * time factor for smooth deceleration
        const momentumDistance = velocity * 400; // Adjust multiplier for desired scroll distance

        handleScroll(direction, momentumDistance);
      }

      isDragging = false;
    };

    coursesContainer.addEventListener("touchstart", handleTouchStart, { passive: true });
    coursesContainer.addEventListener("touchend", handleTouchEnd, { passive: true });
    coursesContainer.addEventListener("touchmove", handleTouchMove, { passive: true });

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
        // border: "2px solid red",
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
        <Box className="right-arrow-inner" sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: theme.palette.homepage.arrowBg,
          backdropFilter: "blur(10px) saturate(200%)",
          transition: "all 0.5s ease",
          "&:hover": {
            backgroundColor: theme.palette.homepage.arrowBgHover,
          },
        }}>
          <ArrowForwardIosIcon
            sx={{
              fontSize: isNonMobileScreens ? "3rem" : "1.5rem",
              color: (theme) => theme.palette.homepage.arrowColor,
              alignSelf: "center",
            }}
          />
        </Box>
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
        <Box className="left-arrow-inner" sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: theme.palette.homepage.arrowBg,
          backdropFilter: "blur(10px) saturate(200%)",
          transition: "all 0.5s ease",
          "&:hover": {
            backgroundColor: theme.palette.homepage.arrowBgHover,
          },
        }}>
          <ArrowForwardIosIcon
            sx={{
              fontSize: isNonMobileScreens ? "3rem" : "1.5rem",
              color: (theme) => theme.palette.homepage.arrowColor,
              alignSelf: "center",
              transform: "rotate(180deg)",
            }}
          />
        </Box>
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
          // border: "2px solid red",
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
                pt: "2rem",
                pb: "3rem",
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
                  // transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <CourseWidget courseInfo={course} />
              </Box>
            </Box>
          );
        })}
        {selectedCourses.length === 0 && (loading || waitingForSelectedCoursesRef.current || changingCourseTypeRef.current) && !courseFetchError && (
          <Box sx={{ py: 10, mx: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>

            <WaveLoader />
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
                setCourseFetchError(false);
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
