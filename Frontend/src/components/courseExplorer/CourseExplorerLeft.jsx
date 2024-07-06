import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MdOutlineChevronRight } from "react-icons/md";
import FlexBetween from "../FlexBetween";
import useTheme from "@mui/material/styles/useTheme";
import { useContext } from "react";
import { CourseExplorerContext } from "../../state/CourseExplorerContext";
import { GlobalContext } from "../../state/GlobalContext";

const CourseExplorerLeft = () => {
  const theme = useTheme();
  const {
    setShowLeftHover,
    setCloseLeftHover,
    setCategoryIndex,
    setSelectedCategory,
    setSelectedSubCategory,
  } = useContext(CourseExplorerContext);
  const { categories } = useContext(GlobalContext);
  return (
    <Box
      className="explorer-left"
      sx={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        py: "2rem",
      }}
    >
      {categories?.length > 0 &&
        categories.map((category, index) => (
          <FlexBetween
            key={index}
            onClick={() => {
              setSelectedSubCategory("");
              setSelectedCategory(category.name);
            }}
            onMouseOver={() => {
              setCategoryIndex(index);
              setShowLeftHover(true);
              setCloseLeftHover(false);
            }}
            onMouseOut={() => setShowLeftHover(false)}
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
            <Typography variant="body">{category.name}</Typography>
            <MdOutlineChevronRight size={20} />
          </FlexBetween>
        ))}
    </Box>
  );
};

export default CourseExplorerLeft;
