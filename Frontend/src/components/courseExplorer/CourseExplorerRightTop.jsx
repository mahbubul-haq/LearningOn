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
import { HomePageContext } from "../../state/HomePageState";
import useMediaQuery from "@mui/material/useMediaQuery";

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
  const { courses } = useContext(HomePageContext);
  const theme = useTheme();
  const minWidth300 = useMediaQuery("(min-width: 1300px)");

  return (
    <Box
      sx={{
        position: "sticky",
        top: "-3.5rem",
        padding: "1rem 2rem 0rem 2rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        alignItems: "flex-end",
        background: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
        zIndex: "500000",
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
          <Typography sx={{ fontSize: "1rem" }}>Courses</Typography>

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
            {selectedSubCategory
              ? selectedSubCategory
              : selectedCategory || "all"}
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

      <FlexBetween
        sx={{
          width: "100%",
          "&&": {
            alignItems: "center",
          },
        }}
      >
        <FlexBetween
          sx={{
            mb: "1rem",
            height: "100%",
            // flexWrap: "wrap",

            "&&": {
              gap: "1rem",
              // alignItems: "flex-end",
            },
          }}
        >
          <Typography
            variant={minWidth300 ? "h2" : "h4"}
            sx={{
              maxWidth: "25ch",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {selectedSubCategory || selectedCategory || "Courses"}
          </Typography>
          <Typography
            variant="h4grey"
            sx={{
              mb: minWidth300 ? "-0.25rem" : "0rem",
              height: "100%",
              width: "fit-content",
            }}
          >
            ({courses.length ? courses?.length : 0} /{" "}
            {courses?.length ? courses.length : 0})
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
            />
          )}
        />
      </FlexBetween>
    </Box>
  );
};

export default CourseExplorerRightTop;
