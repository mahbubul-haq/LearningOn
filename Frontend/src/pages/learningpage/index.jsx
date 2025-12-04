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
        }}
      >
        {/* <Box
                    className="learning-page-navbar"
                    sx={{
                        top: "0",
                        zIndex: "1000",
                        transition: "all 0.5s ease",
                    }}
                >
                    <Navbar />
                </Box> */}
        <Box
          sx={{
            position: "sticky",
            top: "0",
            zIndex: "1",
            height: isMobileScreens ? "4rem" : "10vh",
            //border: "2px solid red",
          }}
        >
          <LearningPageTop courseInfo={courseInfo} scrollTop={scrollTop} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",

            padding: isNonMobileScreens
              ? "0 5rem"
              : isMobileScreens
              ? "0 1rem"
              : "0 2rem",
            width: "100%",
            maxWidth: "2000px",
            mx: "auto",
            position: "sticky",
            top: "10vh",
          }}
        >
          {isNonMobileScreens && (
            <Box
              sx={{
                width: "25%",
                maxWidth: "400px",
                position: "fixed",
                top: "10vh",
                height: "90vh",
                // border: "1px solid red",
                py: "4rem",
                borderRight: `1px dashed ${theme.palette.customDivider.main}`,
                overflowY: "auto",
              }}
            >
              <LearningLeftPanel
                courseInfo={courseInfo}
                scrollTop={scrollTop}
              />
            </Box>
          )}

          {/* <Divider
                        sx={{
                            color: "red",
                            borderRight: "3px solid black",
                        }}
                        orientation="vertical"
                        flexItem
                        
                    /> */}

          <Box
            sx={{
              //width: isNonMobileScreens ? "65%" : "100%",
              // border: "1px solid red",
              width: isNonMobileScreens ? `calc(75% - 6.5rem)` : "100%",
              py: isNonMobileScreens ? "1.9rem" : "2rem",
              position: "relative",
              left: isNonMobileScreens ? `calc(25% + 6.5rem)` : "auto",
            }}
          >
            <NextPrevButtons
              openedLesson={openedLesson}
              setOpenedLesson={setOpenedLesson}
              scrollTop={scrollTop}
              courseInfo={courseInfo}
              expandedLessons={expandedLessons}
              setExpandedLessons={setExpandedLessons}
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
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LearningPage;
