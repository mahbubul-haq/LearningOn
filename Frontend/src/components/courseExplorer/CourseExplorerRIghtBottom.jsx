import Box from "@mui/material/Box";
import { useEffect } from "react";
import { useContext } from "react";
import CourseWidget from "../../widgets/CourseWidget";
import { CourseExplorerContext } from "../../state/CourseExplorerContext";
const CourseExplorerRIghtBottom = () => {
  const { filteredCourses} = useContext(CourseExplorerContext);


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
    </Box>
  );
};

export default CourseExplorerRIghtBottom;
