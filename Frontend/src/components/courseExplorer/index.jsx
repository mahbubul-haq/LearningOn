import Box from "@mui/material/Box";
import { useContext, useEffect } from "react";
import { CourseExplorerContext } from "../../state/CourseExplorerContext";
import useTheme from "@mui/material/styles/useTheme";
import { colorTokens } from "../../theme";
import CourseExplorerLeft from "./CourseExplorerLeft";
import CourseExplorerLeftHover from "./CourseExplorerLeftHover";
import { GlobalContext } from "../../state/GlobalContext";
import { AppContext } from "../../state/AppContext";
import CourseExplorerRightTop from "./CourseExplorerRightTop";
import CourseExplorerRIghtBottom from "./CourseExplorerRIghtBottom";
import { useLocation } from "react-router-dom";
import { useExplorerCourses } from "./hooks/CourseExplorerHooks";
import { useMemo } from "react";
const CourseExplorer = () => {
  const location = useLocation();
  const { openCourseExplorer, closeCourseExplorer, showCourseExplorer, selectedCategory, selectedSubCategory } = useContext(CourseExplorerContext);
  const { fetchCategories, listOfCategories, categories } = useContext(AppContext);
  const theme = useTheme();

  const { data: explorerCourses, hasNextPage: hasMorePages, fetchNextPage: fetchMoreCourses, isLoading: isLoadingCourses, isFetching: isFetchingCourses, isError: isErrorCourses, error: errorCourses, refetch: refetchCourses } = useExplorerCourses({
    category: selectedSubCategory || selectedCategory || "",
    coursePerPage: 15
  });

  const filteredCourses = useMemo(() => {
    if (!explorerCourses) return [];
    return explorerCourses.pages.flatMap((page) => page.courses);
  }, [explorerCourses]);

  const totalDocuments = useMemo(() => {
    return explorerCourses?.pages?.[0]?.totalDocuments || 0;
  }, [explorerCourses]);


  useEffect(() => {
    if (!categories || categories.length == 0) {
      fetchCategories();
    }
  }, [categories]);
  const locationPathname = location.pathname.toLowerCase();



  const isCoursesPage = locationPathname.startsWith("/courses")

  if (isCoursesPage) return null;


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
        <CourseExplorerRightTop totalDocuments={totalDocuments} filteredCourses={filteredCourses} />

        <CourseExplorerRIghtBottom totalDocuments={totalDocuments} filteredCourses={filteredCourses} loading={isLoadingCourses || isFetchingCourses} isError={isErrorCourses} coursePerPage={15} fetchNextPage={fetchMoreCourses} hasNextPage={hasMorePages} refetchCourses={refetchCourses} />
      </Box>
    </Box>
  );
};

export default CourseExplorer;
