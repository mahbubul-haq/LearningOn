import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../state/GlobalContext";
import { LearningCourseContext } from "../../state/LearningCourseContex";
import {
  fetchLessons,
  fetchProgress,
  setCourseId,
} from "../../state/reduxStore/learningPageSlice";
import { LearningLeftPanel } from "./LearningLeftPanel";
import LearningPageTop from "./LearningPageTop";
import LearningRightPanel from "./LearningRightPanel";
import NextPrevButtons from "./NextPrevButtons";

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
  const { courseInfo, progressData } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  //const state = useSelector(state => state);
  //console.log("learning page", user, token, state);

  useEffect(() => {
    setExpandedLessons([]);
    setOpenedLesson({
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
    console.log("courseId + info", courseInfo);
  }, [courseInfo]);

  const scrollTop = () => {
    document.querySelector(".learning-page-main").scrollTop = 0;
  };

  return (
    <>

      <Box
        className="learning-page-main"
        // ref={scrollPositionRef}
        sx={{
          // marginTop: isNonMobileScreens ? "5rem" : "4rem",
          height: "100%",
          overflowY: "scroll",
          width: "100%",
          scrollBehavior: "smooth",
          bgcolor: '#f0f9f4', // Very light mint/white base
          /* LAYER 1: SOFT ENVIRONMENTAL WASH (Fixed) */
          backgroundImage: 'linear-gradient(180deg, #eefaf256 0%, #b9f7d838 100%)',
          backgroundAttachment: 'fixed',
          position: "relative",
          zIndex: 0,
          // clipPath: 'inset(16px 0 0 0)',
        }}

      >
        {/* <Box sx={{ position: "absolute", top: "", left: "0", overflow: "hidden", width: "100%", height: "100%", background: "transparent", zIndex: 0 }}> */}

        {/* Mist Texture */}
        <Box sx={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 0,
          backgroundImage: `
      radial-gradient(circle at 0% 0%, rgba(121, 255, 159, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 100% 100%, rgba(121, 255, 159, 0.3) 0%, transparent 50%)
    `,
        }} />
        <Box sx={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 0,
          backgroundImage: `
      radial-gradient(circle at 0% 100%, rgba(121, 255, 159, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 100% 0%, rgba(121, 255, 159, 0.3) 0%, transparent 50%)
    `,
        }} />
        {/* </Box> */}
        {/* Noise Texture */}
        <Box sx={{
          position: 'fixed', // Stays over the screen while you scroll
          top: 0, left: 0, width: '100%', height: '100%',
          opacity: 0.03, // Very subtle
          pointerEvents: 'none',
          zIndex: 1,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          filter: 'contrast(150%) brightness(100%)',
          pointerEvents: 'none',
        }} />
        <Box
          sx={{
            position: "sticky",
            top: "0",
            zIndex: "1",
            height: isMobileScreens ? "4rem" : "5rem",
            //border: "2px solid red",

          }}
        >

          <LearningPageTop courseInfo={courseInfo} scrollTop={scrollTop} />
        </Box >

        {/* Gradient Background */}
        <Box sx={{
          width: "100%",
          backgroundImage: `
      radial-gradient(
        ellipse 50vw 40vh at 50vw 40vh, 
        rgba(134, 255, 168, 0.48) 0%, 
        transparent 100%
      ),

      radial-gradient(
        ellipse 50vw 80vh at 50vw 80vh, 
        rgba(121, 255, 159, 0.48) 0%, 
        transparent 100%
      )
    `,
          backgroundSize: '100% 160vh',
          backgroundRepeat: 'repeat-y',
          /* Use 'overlay' or 'multiply' for light backgrounds to prevent washing out */
          // mixBlendMode: 'overlay',
          zIndex: 2,
          // add scroll property
          backgroundAttachment: 'scroll',

        }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",

              padding: isNonMobileScreens
                ? "0 2rem"
                : isMobileScreens
                  ? "0 1rem"
                  : "0 2rem",
              width: "100%",
              maxWidth: "2000px",
              mx: "auto",
              position: "sticky",
              top: isNonMobileScreens ? "5rem" : "4rem",
              height: "10000px",



            }}
          >
            {isNonMobileScreens && (
              <Box
                sx={{
                  width: "25%",
                  maxWidth: "400px",
                  position: "fixed",
                  top: isNonMobileScreens ? "5rem" : "4rem",
                  height: `calc(100vh - 9rem)`,
                  height: "auto",
                  py: "1rem",
                  pb: "20rem",
                  maxHeight: `calc(100vh - 9rem)`,
                  // border: "1px solid red",

                  mt: "2rem",
                  background: "rgba(255, 255, 255, 0.5)",
                  backdropFilter: "blur(20px) saturate(200%)",
                  WebkitBackdropFilter: "blur(20px) saturate(200%)",
                  // border: '1px solid rgba(255, 255,255, 0.4)',
                  borderRadius: "1rem",
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.05), inset 0 0 10px rgba(255, 255, 255, 0.5)",
                  overflowY: "auto",
                }}
              >
                <LearningLeftPanel
                  courseInfo={courseInfo}
                  scrollTop={scrollTop}
                />
              </Box>
            )}

            <Box
              sx={{
                //width: isNonMobileScreens ? "65%" : "100%",
                // border: "1px solid red",
                width: isNonMobileScreens ? `calc(75% - 5rem)` : "100%",
                py: isNonMobileScreens ? "1.9rem" : "2rem",
                position: "relative",
                left: isNonMobileScreens ? `calc(25% + 5rem)` : "auto",
                display: "flex",
                flexDirection: "column",
                gap: "3rem",
              }}
            >
              <NextPrevButtons
                openedLesson={openedLesson}
                setOpenedLesson={setOpenedLesson}
                scrollTop={scrollTop}
                courseInfo={courseInfo}
                expandedLessons={expandedLessons}
                setExpandedLessons={setExpandedLessons}
                topButtons={true}
              />
              <LearningRightPanel
                courseInfo={courseInfo}
                progressData={progressData}
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
      </Box>
    </>
  );
};

export default LearningPage;
