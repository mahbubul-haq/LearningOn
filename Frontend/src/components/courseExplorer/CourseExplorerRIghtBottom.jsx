import Box from "@mui/material/Box";
import { useEffect } from "react";
import { useContext } from "react";
import { HomePageContext } from "../../state/HomePageState";
import CourseWidget from "../../widgets/CourseWidget";

const CourseExplorerRIghtBottom = () => {
  const { courses } = useContext(HomePageContext);

  useEffect(() => {
    console.log("right bottom ", courses);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        p: "2rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1rem",
      }}
    >
      {courses?.map((course, index) => (
        <CourseWidget key={index} courseInfo={course} />
      ))}
    </Box>
  );
};

export default CourseExplorerRIghtBottom;
