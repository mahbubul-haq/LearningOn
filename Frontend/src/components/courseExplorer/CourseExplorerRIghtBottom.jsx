import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext } from "react";
import { CourseExplorerContext } from "../../state/CourseExplorerContext";
import CourseWidget from "../../widgets/CourseWidget";
import CourseWidgetSkeleton from "../CourseWidgetSkeleton";

const CourseExplorerRIghtBottom = () => {
  const { filteredCourses, loading, totalDocuments, coursePerPage } =
    useContext(CourseExplorerContext);
    const isMobileScreens = useMediaQuery("(max-width: 600px)");

  return (
    <Box
      className="course-explorer-right-bottom"
      sx={{
        width: "100%",
        p: isMobileScreens ? "1rem" : "2rem",
        display: "grid",
        gridTemplateColumns: isMobileScreens ? "repeat(auto-fill, minmax(250px, 1fr))" : "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1rem",
        opacity: 1,
        transition: "opacity 0.3s ease-out",
      }}
    >
      {filteredCourses?.map((course, index) => (
        <CourseWidget key={index} courseInfo={course} />
      ))}
      {new Array(10).fill(0).map((_, index) => (
        <CourseWidget key={index} courseInfo={{}} />
      ))}
      {loading && (
        <>
          {new Array(
            Math.min(coursePerPage, totalDocuments - filteredCourses.length)
          )
            .fill(0)
            .map((_, index) => (
              <CourseWidgetSkeleton key={index} />
            ))}
        </>
      )}
    </Box>
  );
};

export default CourseExplorerRIghtBottom;
