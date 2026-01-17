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
        // scrollbarColor handled globally
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
            // onMouseOut={() => setShowLeftHover(false)} // handled by parent container logic mostly, but keep if needed. 
            // In original code: onMouseOut={() => setShowLeftHover(false)}
            onMouseOut={() => setShowLeftHover(false)}
            sx={{
              padding: "0.8rem 2rem",
              cursor: "pointer",
              backgroundColor: (selectedCategory === category.name) ? theme.palette.courseExplorer.activeItemBg : "transparent",
              color: (selectedCategory === category.name) ? theme.palette.primary.main : theme.palette.courseExplorer.textPrimary,
              borderLeft: (selectedCategory === category.name) ? `3px solid ${theme.palette.primary.main}` : "3px solid transparent",
              transition: "all 0.2s ease",
              "&:hover": {
                background: theme.palette.courseExplorer.itemHover,
              },
            }}
          >
            <Typography variant="body" sx={{ fontWeight: (selectedCategory === category.name) ? 600 : 400 }}>{category.name}</Typography>
            <MdOutlineChevronRight size={20} style={{ opacity: 0.7 }} />
          </FlexBetween>
        ))}
    </Box>
  );
};

export default CourseExplorerLeft;
