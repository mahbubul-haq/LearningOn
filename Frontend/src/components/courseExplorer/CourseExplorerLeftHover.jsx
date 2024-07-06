import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import { useContext, useEffect } from "react";
import { CourseExplorerContext } from "../../state/CourseExplorerContext";
import FlexBetween from "../FlexBetween";
import { GlobalContext } from "../../state/GlobalContext";

const CourseExplorerLeftHover = () => {
  const theme = useTheme();
  const { showLeftHover, setShowLeftHover, categoryIndex, setSelectedCategory, setSelectedSubCategory } = useContext(
    CourseExplorerContext
  );
  const { categories } = useContext(GlobalContext);

  useEffect(() => {
    let leftHover = document.querySelector(".explorer-left-hover");

    if (!leftHover) return;
    if (showLeftHover) {
      leftHover.style.width = "300px";
        
    } else {
      leftHover.style.width = 0;
    }
  }, [showLeftHover]);

  return (
    <Box
      className="explorer-left-hover"
      sx={{
        position: "absolute",
        height: "100%",
        overflow: "hidden",
        padding: "2rem 0rem",
        right: 0,
        transform: "translateX(100%)",
        top: 0,
        background: theme.palette.background.light300,
        transition: "width 0.3s ease-out",
        width: 0,
      }}
      onMouseOver={() => setShowLeftHover(true)}
      onMouseOut={() => setShowLeftHover(false)}
    >
      {categories?.length > 0 &&
        categories[categoryIndex].subcategories.map((subcategory, index) => (
          <FlexBetween
            key={index}
            onClick={() => {
                setSelectedCategory(categories[categoryIndex].name);
                setSelectedSubCategory(subcategory)}
            }
            sx={{
              "&&": {
                padding: "0.7rem 2rem",
              },
              cursor: "pointer",
              "&:hover": {
                background: theme.palette.background.imagesBg,
              },
            }}

          >
            <Typography variant="body">{subcategory}</Typography>
          </FlexBetween>
        ))}
    </Box>
  );
};

export default CourseExplorerLeftHover;
