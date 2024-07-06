import Box from "@mui/material/Box";
import { useContext, useEffect} from "react";
import { CourseExplorerContext } from "../../state/CourseExplorerContext";
import useTheme from "@mui/material/styles/useTheme";
import CourseExplorerLeft from "./CourseExplorerLeft";
import CourseExplorerLeftHover from "./CourseExplorerLeftHover";
import { GlobalContext } from "../../state/GlobalContext";
import CourseExplorerRightTop from "./CourseExplorerRightTop";
import CourseExplorerRIghtBottom from "./CourseExplorerRIghtBottom";
const CourseExplorer = () => {
  const { setShowCourseExplorer } = useContext(
    CourseExplorerContext
  );
  const {getCategories, listOfCategories, categories} = useContext(GlobalContext);
  const theme = useTheme();
  useEffect(() => {
    if (!categories || categories.length == 0) {
        console.log("calling for categories in explorer");
        getCategories();
    }
    console.log("inside explorer", listOfCategories, categories);
  }, [categories]);


  return (
    <Box
      className="course-explorer"
      onMouseOver={() => setShowCourseExplorer(true)}
      onMouseOut={() => setShowCourseExplorer(false)}
      sx={{
        position: "absolute",
        
        // height: "calc(100vh - 5rem)",
        height: 0,
        width: "100%",
        top: "5rem",
        // marginTop: "5rem",
        background: theme.palette.background.default,
        // border: "5px solid red",
        overflow: "hidden",
        //visibility: showCourseExplorer ? "visible" : "hidden",
        // zIndex: showCourseExplorer ? 10000000 : -100,
        zIndex: 1000000,
        display: "flex",
        transition: "height 0.3s ease-out"
      }}
    >
      <Box
        sx={{
          height: "100%",
    
        //   overflow: "hidden",
          background: theme.palette.background.light200,
          minWidth: "300px",
          position: "relative",
          
        }}
      >
        <CourseExplorerLeft />
        <CourseExplorerLeftHover />
        
      </Box>
      <Box
        sx={{
          height: "100%",
          overflow: "auto",
          flex: 1,
          padding: "0",
        }}
      >
        <CourseExplorerRightTop />
        <CourseExplorerRIghtBottom />
       
      </Box>
    </Box>
  );
};

export default CourseExplorer;
