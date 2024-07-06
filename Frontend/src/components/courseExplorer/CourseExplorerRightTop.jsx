import Box from "@mui/material/Box";
import FlexBetween from "../FlexBetween";
import Autocomplete from "@mui/material/Autocomplete";
import { Breadcrumbs, InputAdornment, Typography } from "@mui/material";
import { MdSearch } from "react-icons/md";
import { useContext } from "react";
import { CourseExplorerContext } from "../../state/CourseExplorerContext";
import StyledTextField2 from "../StyledTextField2";
import { GlobalContext } from "../../state/GlobalContext";
import useTheme from "@mui/material/styles/useTheme";

const CourseExplorerRightTop = () => {
  const {
    setShowCourseExplorer,
    setCloseBtnClicked,
    selectedCategory,
    selectedSubCategory,
    setSelectedCategory,
    setSelectedSubCategory,
  } = useContext(CourseExplorerContext);
  const { categoriesWithLabel } = useContext(GlobalContext);
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: "2rem 2rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        alignItems: "flex-end",
      }}
    >
      <FlexBetween
        sx={{
          width: "100%",
        }}
      >
        <Breadcrumbs
          sx={{
            color: theme.palette.grey.grey300,
            "& .MuiBreadcrumbs-separator": {
              color: theme.palette.grey.grey300,
            },
          }}
          aria-label="breadcrumb"
        >
          <FlexBetween
            sx={{
              cursor: "pointer",

              gap: "0.5rem",
            }}
          >
            <Typography sx={{ fontSize: "1rem" }}>Courses</Typography>
          </FlexBetween>

          {selectedSubCategory && (
            <Typography sx={{ fontSize: "1rem" }}>
              {selectedCategory}
            </Typography>
          )}

          
            <Typography
              sx={{
                fontSize: "1rem",
                color: theme.palette.grey.grey600,
              }}
            >
              {selectedSubCategory ? selectedSubCategory : selectedCategory || "all"}
            </Typography>

        </Breadcrumbs>
        <Typography
          onClick={() => {
            setShowCourseExplorer(false);
            setCloseBtnClicked(true);
          }}
          variant="grey"
          sx={{
            cursor: "pointer",
          }}
        >
          Close
        </Typography>
      </FlexBetween>

      <Autocomplete
        disablePortal
        value={selectedSubCategory || selectedCategory}
        onChange={(e, newValue) => {
          if (newValue) {
            if (newValue.label === newValue.category) {
              setSelectedCategory(newValue.category);
              setSelectedSubCategory("");
            } else {
              setSelectedCategory(newValue.category);
              setSelectedSubCategory(newValue.label);
            }
          } else {
            setSelectedCategory("");
            setSelectedSubCategory("");
          }
        }}
        id="combo-box-demo"
        options={categoriesWithLabel}
        sx={{
          minWidth: "250px",
          maxWidth: "300px",
          borderRadius: "50%",
        }}
        renderInput={(params) => (
          <StyledTextField2
            {...params}
            label="Category"
            placeholder="search category"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <MdSearch
                    style={{
                      marginLeft: "0.5rem",
                    }}
                    size={20}
                  />
                </InputAdornment>
              ),
            }}
            sx={{}}
          />
        )}
      />
    </Box>
  );
};

export default CourseExplorerRightTop;
