import Box from "@mui/material/Box";
import { useContext, useEffect } from "react";
import { CourseExplorerContext } from "../../state/CourseExplorerContext";
import useTheme from "@mui/material/styles/useTheme";
import { colorTokens } from "../../theme";
import CourseExplorerLeft from "./CourseExplorerLeft";
import CourseExplorerLeftHover from "./CourseExplorerLeftHover";
import { GlobalContext } from "../../state/GlobalContext";
import CourseExplorerRightTop from "./CourseExplorerRightTop";
import CourseExplorerRIghtBottom from "./CourseExplorerRIghtBottom";
const CourseExplorer = () => {
  const { openCourseExplorer, closeCourseExplorer, filteredCourses, categoryChangedRef, setCategoryChanged, getFilteredCourses, showCourseExplorer } = useContext(CourseExplorerContext);
  const { getCategories, listOfCategories, categories } =
    useContext(GlobalContext);
  const theme = useTheme();
  useEffect(() => {
    if (!categories || categories.length == 0) {
      getCategories();
    }
  }, [categories]);

  useEffect(() => {
    if (!filteredCourses || filteredCourses.length == 0) {
      categoryChangedRef.current = true;
      setCategoryChanged(true);
      getFilteredCourses(true);
    }
  }, []);


  return (
    <Box
      className="course-explorer"
      onMouseOver={() => openCourseExplorer(false)}
      onMouseOut={() => closeCourseExplorer(false)}
      sx={{
        position: "absolute",
        height: 0,
        maxHeight: "1000px",
        width: `calc(100% - 8rem)`,
        top: "5rem",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: theme.palette.courseExplorer.bg,
        backdropFilter: theme.palette.courseExplorer.backdropFilter,
        border: showCourseExplorer ? `1px solid ${theme.palette.courseExplorer.border}` : "none",
        borderRadius: "0 0 16px 16px",
        overflow: "hidden",
        zIndex: 1000000,
        display: "flex",
        transition: "height 0.3s ease-out",
        maxWidth: "2000px",
        mx: "auto",
        boxShadow: showCourseExplorer ? theme.palette.courseExplorer.shadow : "none",
      }}
    >
      <Box
        sx={{
          height: "100%",
          backgroundColor: theme.palette.courseExplorer.sidebarBg,
          minWidth: "300px",
          position: "relative",
          borderRight: `1px solid ${theme.palette.courseExplorer.divider}`,
        }}
      >
        <CourseExplorerLeft />
        <CourseExplorerLeftHover />
      </Box>
      <Box
        className="explorer-right-container custom-scrollbar"
        sx={{
          height: "100%",
          overflow: "auto",
          flex: 1,
          padding: "0",
          position: "relative",
          scrollBehavior: "smooth",
        }}
      >
        <CourseExplorerRightTop />

        <CourseExplorerRIghtBottom />
      </Box>
    </Box>
  );
};

export default CourseExplorer;
