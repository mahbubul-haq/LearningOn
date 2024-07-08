import Box from "@mui/material/Box";
import { useContext } from "react";
import CourseWidget from "../../widgets/CourseWidget";
import { CourseExplorerContext } from "../../state/CourseExplorerContext";
import CourseWidgetSkeleton from "../CourseWidgetSkeleton";

const CourseExplorerRIghtBottom = () => {
  const { filteredCourses, loading, totalDocuments } = useContext(
    CourseExplorerContext
  );

  return (
    <Box
      sx={{
        width: "100%",
        p: "2rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1rem",
      }}
    >
      {filteredCourses?.map((course, index) => (
        <CourseWidget key={index} courseInfo={course} />
      ))}
      {loading && (
        <>
          {new Array(Math.min(6, totalDocuments - filteredCourses.length))
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
