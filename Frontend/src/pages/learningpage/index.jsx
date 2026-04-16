import { useMediaQuery, Drawer, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { colorTokens } from "../../theme";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../state/GlobalContext";
import { LearningCourseContext } from "../../state/LearningCourseContex";
import {
  fetchLessons,
  fetchProgress,
  setCourseId,
  updateProgress,
} from "../../state/reduxStore/learningPageSlice";
import { LearningLeftPanel } from "./LearningLeftPanel";
import LearningPageTop from "./LearningPageTop";
import LearningRightPanel from "./LearningRightPanel";
import NextPrevButtons from "./NextPrevButtons";
import { useAppDispatch } from "../../state/reduxStore/hooks";
import "./LearningPage.css"
import { BsBox } from "react-icons/bs";

const LearningPage = () => {
  const { courseId } = useParams();
  const { setOpenedItem } = useContext(GlobalContext);
  const isNonMobileScreens = useMediaQuery("(min-width: 900px)");
  const isMobileScreens = useMediaQuery("(max-width: 600px)");
  const theme = useTheme();
  const { openedLesson, setOpenedLesson, expandedLessons, setExpandedLessons, quizAttempt } =
    useContext(LearningCourseContext);
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const { courseInfo, courseProgress } = useSelector((state) => state.course);
  const dispatch = useAppDispatch();
  const [learningPageWidth, setLearningPageWidth] = useState(0);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [aggregatedProgress, setAggregatedProgress] = useState(0);
  const [subLessonCount, setSubLessonCount] = useState(0);

  useEffect(() => {
    let lessonId = openedLesson?.lesson > 0 && courseInfo?.lessons?.length > 0 ? courseInfo?.lessons[openedLesson.lesson - 1]?._id?.toString() || "" : "";
    let subLessonId = openedLesson?.subLesson > 0 && courseInfo?.lessons?.length > 0 && courseInfo?.lessons[openedLesson.lesson - 1]?.subLessons?.length > 0 ? courseInfo?.lessons[openedLesson.lesson - 1]?.subLessons[openedLesson.subLesson - 1]?._id?.toString() || "" : "";

    if (subLessonId) {
      //console.log("inside", lessonId, subLessonId);
      if (courseInfo?.lessons[openedLesson.lesson - 1]?.subLessons[openedLesson.subLesson - 1]) {
        if (!courseInfo?.lessons[openedLesson.lesson - 1]?.subLessons[openedLesson.subLesson - 1]?.videoLink?.trim()) {
          //console.log("dispatching", lessonId, subLessonId);
          dispatch(updateProgress({ courseId: courseInfo?._id, token: token, lessonId: lessonId, subLessonId: subLessonId }));
        }
      }
    }
  }, [openedLesson]);

  useEffect(() => {
    setOpenedLesson(
      localStorage.getItem("openedLesson") ? JSON.parse(localStorage.getItem("openedLesson")) : {
        lesson: 1,
        subLesson: 1,
      });
    if (!user) {
      navigate("/");
    }
    setOpenedItem("courses");
  }, []);

  useEffect(() => {
    ///console.log("courseId", courseId);
    console.log(courseId, token);
    if (courseId) {
      dispatch(setCourseId({ courseId: courseId }));
      dispatch(fetchLessons({ courseId: courseId, token: token }));
      dispatch(fetchProgress({ courseId: courseId, token: token }));
    }
  }, [courseId]);

  useEffect(() => {
    console.log(theme.palette.mode);
    console.log("courseId + info", courseInfo, courseProgress);
    let totalSubLessons = 0;
    if (subLessonCount === 0) {
      courseInfo?.lessons?.forEach((lesson) => {
        totalSubLessons += lesson?.subLessons?.length;
      });
      setSubLessonCount(totalSubLessons);
    } else totalSubLessons = subLessonCount;


    let quizCount = 0, completedQuizCount = 0;
    courseInfo?.lessons?.forEach((lesson) => {
      if (lesson.quiz) quizCount++;
      if (lesson.quiz?.metadata) {
        if (lesson.quiz.metadata.status === "completed" || lesson.quiz.metadata.status == "completed_can_improve") {
          completedQuizCount++;
        }
      }
    });

    console.log(totalSubLessons, completedQuizCount, quizCount);

    let progress = courseProgress?.progressPercentage || 0;
    let realProgress = (totalSubLessons + completedQuizCount) * progress / (totalSubLessons + quizCount);
    setAggregatedProgress(realProgress);


  }, [courseInfo, courseProgress]);

  const scrollTop = () => {
    document.querySelector(".learning-page-main").scrollTop = 0;
  };

  return (
    <>

      <Box
        className="learning-page-main"
        sx={{
          height: "100vh",
          overflow: "auto",
          width: "100%",
          position: "relative",
          zIndex: 0,
        }}
      >
        {!isNonMobileScreens && (
          <Box sx={{
            position: "fixed",
            top: "1rem",
            left: "1rem",
            zIndex: 100,
          }}>
            <IconButton
              onClick={() => setIsMobileDrawerOpen(true)}
              sx={{
                backgroundColor: (theme) => theme.palette.glassSheet.background,
                backdropFilter: "blur(10px)",
                border: (theme) => theme.palette.glassSheet.border,
                color: (theme) => theme.palette.text.primary,
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: "white"
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        )}

        <Drawer
          anchor="left"
          open={isMobileDrawerOpen}
          onClose={() => setIsMobileDrawerOpen(false)}
          PaperProps={{
            sx: {
              width: "85%",
              maxWidth: "360px",
              backgroundColor: "transparent",
              boxShadow: "none",
            }
          }}
        >
          <Box sx={{
            height: "100%",
            backgroundColor: (theme) => theme.palette.glassSheet.background,
            backdropFilter: "blur(20px)",
            p: "1rem",
            display: "flex",
            flexDirection: "column"
          }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: "1rem" }}>
              <IconButton onClick={() => setIsMobileDrawerOpen(false)}>
                <CloseIcon sx={{ color: (theme) => theme.palette.text.primary }} />
              </IconButton>
            </Box>
            <LearningLeftPanel
              courseInfo={courseInfo}
              scrollTop={scrollTop}
              courseProgress={courseProgress}
              aggregatedProgress={aggregatedProgress}
            />
          </Box>
        </Drawer>

        <Box className="learning-page-container"
          sx={{
            width: "100%",
            maxWidth: "2000px",
            mx: "auto",
            px: { xs: "1rem", md: "2rem" },


            display: "grid",
            gridTemplateColumns: isNonMobileScreens ? "35% 1fr" : "1fr",
            gap: "2rem",
            gridTemplateRows: "1fr",
            // overflowY: "hidden",
            position: "sticky",
            top: 0,
            // border: "2px solid red",

          }}
        >
          {isNonMobileScreens && (
            <Box className="sidebar-container"
              sx={{
                width: "100%",
                height: "100vh",
                position: "sticky",
                top: "0",
              }}>

              <LearningLeftPanel
                courseInfo={courseInfo}
                scrollTop={scrollTop}
                courseProgress={courseProgress}
                aggregatedProgress={aggregatedProgress}
              />

            </Box>
          )}

          <Box className="rightpanel-container"
            sx={{
              // height: `calc(100vh)`,
              width: "100%",
              py: isNonMobileScreens ? "1.9rem" : "2rem",
              pb: "5rem",

              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              // overflow: "auto",
              scrollBehavior: "smooth",
              zIndex: 1,
              position: "sticky",

              top: 0,
            }}
          >
            {/* <NextPrevButtons
                openedLesson={openedLesson}
                setOpenedLesson={setOpenedLesson}
                scrollTop={scrollTop}
                courseInfo={courseInfo}
                expandedLessons={expandedLessons}
                setExpandedLessons={setExpandedLessons}
                topButtons={true}
              /> */}
            <LearningRightPanel
              courseInfo={courseInfo}
              courseProgress={courseProgress}

            />
            <NextPrevButtons
              openedLesson={openedLesson}
              setOpenedLesson={setOpenedLesson}
              scrollTop={scrollTop}
              courseInfo={courseInfo}
              expandedLessons={expandedLessons}
              setExpandedLessons={setExpandedLessons}
              topButtons={false}
            />
          </Box>
        </Box>

      </Box >
    </>
  );
};

export default LearningPage;
