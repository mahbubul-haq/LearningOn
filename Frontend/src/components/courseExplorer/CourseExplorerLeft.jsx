import Box from "@mui/material/Box";
import { colorTokens } from "../../theme";
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
    setCategoryChanged,
    categoryChangedRef,
    selectedCategory,
    selectedSubCategory,
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
        scrollbarColor: `${colorTokens.grey[400]} ${colorTokens.white.nearWhite}`,
        ...theme.palette.glassSheet, // Apply glass style
        borderRadius: "0", // Reset border radius for full height panel if needed, or keep it. Let's keep distinct panel look.
        // actually, reset radius if it's a sidebar, but user said "left", typically sidebars are rects. 
        // But let's assume it's a panel inside a layout.
        // Overriding partial styles for sidebar fit:
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderLeft: "none",
        borderTop: "none",
        borderBottom: "none",
      }}
    >
      {categories?.length > 0 &&
        categories.map((category, index) => (
          <FlexBetween
            key={index}
            onClick={() => {
              if (selectedSubCategory || selectedCategory != category.name) {
                categoryChangedRef.current = true;
                setCategoryChanged(true);
              }
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
