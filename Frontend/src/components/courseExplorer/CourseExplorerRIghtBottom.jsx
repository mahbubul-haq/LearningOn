import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext } from "react";
import { CourseExplorerContext } from "../../state/CourseExplorerContext";
import CourseWidget from "../../widgets/CourseWidget";
import CourseWidgetSkeleton from "../CourseWidgetSkeleton";
import { StyledButton } from "../StyledButton";
import NoCourseFound from "./NoCourseFound";

const CourseExplorerRIghtBottom = () => {
  const {
    filteredCourses,
    loading,
    totalDocuments,
    coursePerPage,
    setLoading,
  } = useContext(CourseExplorerContext);
  const isMobileScreens = useMediaQuery("(max-width: 600px)");
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();

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
            transition: "transform 0.2s ease-out",
            "&:hover": {
              transform: "scale(1.02)",
            },
          }}
          key={index}
        >
          <CourseWidget key={index} courseInfo={course} />
        </Box>
      ))}

      {filteredCourses?.length == 0 && <NoCourseFound />}

      {loading && (
        <>
          {new Array(
            Math.min(coursePerPage, totalDocuments - filteredCourses.length)
          )
            .fill(0)
            .map((_, index) => (
              <Box sx={{ height: "100%", display: "flex" }} key={index}>
                <CourseWidgetSkeleton />
              </Box>
            ))}
        </>
      )}
      {filteredCourses?.length !== totalDocuments && !loading && (
        <Box
          onClick={() => setLoading(true)}
          sx={{
            border: `1px solid ${theme.palette.grey.grey200}`,
            height: "100%",
            display: "flex",
            alignItems: "center",
            borderRadius: isNonMobileScreens ? "0.5rem" : "0.2rem",
            cursor: "pointer",
            minHeight: "300px",
          }}
        >
          <StyledButton
            onClick={() => setLoading(true)}
            sx={{
              mx: "auto",
              width: "fit-content",
            }}
          >
            Load More
          </StyledButton>
        </Box>
      )}
    </Box>
  );
};

export default CourseExplorerRIghtBottom;
