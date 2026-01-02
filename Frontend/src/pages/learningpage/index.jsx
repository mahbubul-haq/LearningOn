import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
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
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const isMobileScreens = useMediaQuery("(max-width: 600px)");
  const theme = useTheme();
  const { openedLesson, setOpenedLesson, expandedLessons, setExpandedLessons } =
    useContext(LearningCourseContext);
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const { courseInfo, courseProgress } = useSelector((state) => state.course);
  const dispatch = useAppDispatch();
  const [learningPageWidth, setLearningPageWidth] = useState(0);

  useEffect(() => {
    let lessonId = openedLesson?.lesson > 0 && courseInfo?.lessons?.length > 0 ? courseInfo?.lessons[openedLesson.lesson - 1]?._id?.toString() || "" : "";
    let subLessonId = openedLesson?.subLesson > 0 && courseInfo?.lessons?.length > 0 && courseInfo?.lessons[openedLesson.lesson - 1]?.subLessons?.length > 0 ? courseInfo?.lessons[openedLesson.lesson - 1]?.subLessons[openedLesson.subLesson - 1]?._id?.toString() || "" : "";

    if (subLessonId) {
      console.log("inside", lessonId, subLessonId);
      if (courseInfo?.lessons[openedLesson.lesson - 1]?.subLessons[openedLesson.subLesson - 1]) {
        if (!courseInfo?.lessons[openedLesson.lesson - 1]?.subLessons[openedLesson.subLesson - 1]?.videoLink?.trim()) {
          console.log("dispatching", lessonId, subLessonId);
          dispatch(updateProgress({ courseId: courseInfo?._id, token: token, lessonId: lessonId, subLessonId: subLessonId }));
        }
      }
    }
  }, [openedLesson]);

  useEffect(() => {
    setExpandedLessons((prev) => [...prev, openedLesson.lesson ? openedLesson.lesson : 1]);
    setOpenedLesson(
      localStorage.getItem("openedLesson") ? JSON.parse(localStorage.getItem("openedLesson")) : {
        lesson: 1,
        subLesson: 0,
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
    console.log("courseId + info", courseInfo, courseProgress);
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
          bgcolor: '#1a060cff',
          /* LAYER 1: SOFT ENVIRONMENTAL WASH (Fixed) */
          backgroundImage: `linear-gradient(180deg, ${theme.palette.glassMorphism.fixedBackgroundTop} 0%, ${theme.palette.glassMorphism.fixedBackgroundBottom} 100%)`,
          backgroundColor: "#1a0b0bff",
          backgroundAttachment: "fixed",
          position: "relative",
          zIndex: 0,

        }}

      >

        {/* Mist Texture */}
        <Box sx={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 0,
          backgroundImage: theme.palette.glassMorphism.fixedBackgroundImage
        }} />

        {/* Noise Texture */}
        <Box sx={{
          ...theme.palette.glassMorphism.noise
        }} />
        {/* <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            height: isMobileScreens ? "4rem" : "5rem",
          }}
        >

          <LearningPageTop courseInfo={courseInfo} scrollTop={scrollTop} />
        </Box > */}


        <Box className="learning-page-container"
          sx={{

            width: "100%",
            maxWidth: "2000px",
            mx: "auto",
            px: "2rem",


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
