import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext, useEffect, useState } from "react";
import { CourseExplorerContext } from "../../state/CourseExplorerContext";
import CourseWidget from "../../widgets/CourseWidget";
import CourseWidgetSkeleton from "../CourseWidgetSkeleton";
import { StyledButton } from "../StyledButton";
import NoCourseFound from "./NoCourseFound";

const CourseExplorerRIghtBottom = ({
  filteredCourses,
  loading,
  isError,
  totalDocuments,
  coursePerPage,
  fetchNextPage,
  hasNextPage,
  refetchCourses
}) => {

  const isMobileScreens = useMediaQuery("(max-width: 600px)");
  const isNonMobileScreens = useMediaQuery("(min-width: 900px)");
  const theme = useTheme();
  // const [showLoadMore, setShowLoadMore] = useState(true);

  // useEffect(() => {
  //   console.log("loading,", loading);
  //   console.log("filteredCourses,", filteredCourses);
  // }, [loading, filteredCourses])

  // useEffect(() => {
  //   let t;
  //   if (loading) {
  //     setShowLoadMore(false);
  //   } else {
  //     t = setTimeout(() => setShowLoadMore(true), 500);
  //   }
  //   return () => {
  //     if (t) clearTimeout(t);
  //   };
  // }, [loading]);

  useEffect(() => {
    const sentinel = document.getElementById("explorer-end-sentinel");
    if (!sentinel) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage && !loading) {
          // console.log("Observer triggered");
          fetchNextPage();
        }
      });
    }, { threshold: 0.5 });

    observer.observe(sentinel);
    // console.log("Observer running with hasNextPage:", hasNextPage);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage, loading]);

  return (
    <Box
      className="course-explorer-right-bottom"
      sx={{
        width: "100%",

        p: isMobileScreens ? "1rem" : "2rem",
        px: isNonMobileScreens ? "64px" : "24px",
        display: filteredCourses?.length ? "grid" : "flex",
        gridTemplateColumns: isMobileScreens
          ? "repeat(auto-fill, minmax(250px, 1fr))"
          : "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1rem",
        opacity: 1,
        transition: "opacity 0.3s ease-out",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {filteredCourses?.map((course, index) => (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            "&:hover": {
              transform: "scale(1.02)",
            },
          }}
          key={index}
        >
          <CourseWidget key={index} courseInfo={course} />
        </Box>
      ))}

      {filteredCourses?.length == 0 && <NoCourseFound refetchCourses={refetchCourses} loading={loading} isError={isError} />}

      {loading && hasNextPage && (
        <>
          {new Array(
            Math.min(coursePerPage, Math.max(5, totalDocuments - filteredCourses.length))
          )
            .fill(0)
            .map((_, index) => (
              <Box sx={{ height: "100%", display: "flex" }} key={index}>
                <CourseWidgetSkeleton />
              </Box>
            ))}
        </>
      )}
      {hasNextPage && !loading && (
        <Box
          // onClick={() => setLoading(true)}
          sx={{
            border: `1px solid ${theme.palette.courseExplorer.border}`,
            height: "100%",
            display: "flex",
            alignItems: "center",
            borderRadius: isNonMobileScreens ? "0.5rem" : "0.2rem",
            cursor: "pointer",
            minHeight: "300px",
          }}
        >
          <StyledButton
            onClick={() => fetchNextPage()}
            sx={{
              mx: "auto",
              width: "fit-content",
            }}
          >
            Load More
          </StyledButton>
        </Box>
      )}

      <Box id="explorer-end-sentinel" sx={{
        height: "1px",
        visibility: "hidden",
      }}></Box>
    </Box>
  );
};

export default CourseExplorerRIghtBottom
