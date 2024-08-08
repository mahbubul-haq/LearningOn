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
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box
      className="course-explorer-right-bottom"
      sx={{
        width: "100%",
       
        p: isMobileScreens ? "1rem" : "2rem",
        px: isNonMobileScreens ? "64px" : "24px",
        display: filteredCourses?.length ? "grid" : "flex",
        gridTemplateColumns: isMobileScreens ? "repeat(auto-fill, minmax(250px, 1fr))" : "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1rem",
        opacity: 1,
        transition: "opacity 0.3s ease-out",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {filteredCourses?.map((course, index) => (
        <Box sx={{ height: "100%", display: "flex"}} key={index}>
        <CourseWidget key={index} courseInfo={course} />
        </Box>
      ))}

      {filteredCourses?.length == 0 && (
        <img style={{
          width: isNonMobileScreens ? "350px" : "250px",
          height: "auto",
          objectFit: "cover",
        }}src="/images/not_found_1.svg" alt="not found"/>
      )}

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
