import { Breadcrumbs, InputAdornment, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext } from "react";
import { MdSearch } from "react-icons/md";
import { CourseExplorerContext } from "../../state/CourseExplorerContext";
import { GlobalContext } from "../../state/GlobalContext";
import FlexBetween from "../FlexBetween";
import StyledTextField2 from "../StyledTextField2";

const CourseExplorerRightTop = ({ coursePage }) => {
  const {
    closeCourseExplorer,
    selectedCategory,
    selectedSubCategory,
    setSelectedCategory,
    setSelectedSubCategory,
    filteredCourses,
    totalDocuments,
    categoryChangedRef,
    setCategoryChanged,
  } = useContext(CourseExplorerContext);
  const { categoriesWithLabel } = useContext(GlobalContext);
  const theme = useTheme();
  const minWidth1300 = useMediaQuery("(min-width: 1300px)");
  const isMobileScreens = useMediaQuery("(max-width: 600px)");
  const maxWidth700 = useMediaQuery("(max-width: 700px)");
  const isNonMobileScreens = useMediaQuery("(min-width: 900px)");
  return (
    <Box
      sx={{
        position: "sticky",
        top: coursePage ? (isNonMobileScreens ? `calc(5rem + 1px)` : "0rem") : "-3.5rem",
        padding: isNonMobileScreens ? "1rem 64px 0 64px" : "1rem 24px 0rem 24px",

        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        alignItems: "flex-end",
        backgroundColor: coursePage ? theme.palette.glassNavbar.background : theme.palette.courseExplorer.headerBg,
        backdropFilter: coursePage ? theme.palette.glassNavbar.backdropFilter : theme.palette.courseExplorer.backdropFilter,
        borderBottom: coursePage ? theme.palette.glassNavbar.borderBottom : `1px solid ${theme.palette.courseExplorer.border}`,
        boxShadow: coursePage ? theme.palette.glassNavbar.boxShadow : "none",
        zIndex: "5000",
      }}
    >
      {!coursePage && (
        <FlexBetween
          sx={{
            width: "100%",
          }}
        >
          <Breadcrumbs
            sx={{
              color: theme.palette.courseExplorer.textSecondary,
              "& .MuiBreadcrumbs-separator": {
                color: theme.palette.courseExplorer.textSecondary,
              },
            }}
            aria-label="breadcrumb"
          >
            <Typography sx={{ fontSize: "1rem", color: theme.palette.courseExplorer.textSecondary }}>Courses</Typography>

            {selectedSubCategory && (
              <Typography sx={{ fontSize: "1rem", color: theme.palette.courseExplorer.textSecondary }}>
                {selectedCategory}
              </Typography>
            )}

            <Typography
              sx={{
                fontSize: "1rem",
                color: theme.palette.courseExplorer.textPrimary,
                fontWeight: 600,
              }}
            >
              {selectedSubCategory
                ? selectedSubCategory
                : selectedCategory || "all"}
            </Typography>
          </Breadcrumbs>

          <Typography
            onClick={() => closeCourseExplorer(true)}
            sx={{
              cursor: "pointer",
              color: theme.palette.courseExplorer.textSecondary,
              fontSize: "0.95rem",
              "&:hover": {
                color: theme.palette.courseExplorer.textPrimary,
                textDecoration: "underline",
              }
            }}
          >
            Close
          </Typography>
        </FlexBetween>
      )}

      <FlexBetween
        sx={{
          width: "100%",
          // border: "2px solid green",
          "&&": {
            alignItems: "center",
            // flexDirection: isMobileScreens ? "column" : "row"
            flexDirection: "row",

          },
        }}
      >
        <FlexBetween
          sx={{
            mb: maxWidth700 ? "0rem" : "1rem",
            height: "100%",
            // flexWrap: "wrap",
            // border: "2px solid red",

            "&&": {
              gap: "1rem",
              // alignItems: "flex-end",
            },
          }}
        >
          {!maxWidth700 && (
            <Typography
              variant={minWidth1300 ? "h2" : "h4"}
              sx={{
                maxWidth: "25ch",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: theme.palette.courseExplorer.textPrimary,
              }}
            >
              {selectedSubCategory || selectedCategory || "Courses"}
            </Typography>
          )}
          <Typography
            sx={{
              mb: maxWidth700 ? "1rem" : (minWidth1300 ? "-0.25rem" : "0rem"),
              height: "100%",
              width: "fit-content",
              color: theme.palette.courseExplorer.textSecondary,
              fontSize: "1.5rem",
            }}
          >
            ({filteredCourses?.length} / {totalDocuments})
          </Typography>
        </FlexBetween>
        <Autocomplete
          disablePortal
          value={selectedSubCategory || selectedCategory || "All"}
          onChange={(e, newValue) => {

            if (newValue && newValue.label !== "All") {
              if (newValue.label === newValue.category) {
                if (newValue.label != selectedCategory) {
                  categoryChangedRef.current = true;
                  setCategoryChanged(true);
                }
                setSelectedCategory(newValue.category);
                setSelectedSubCategory("");
              } else {
                if (newValue.label != selectedSubCategory) {
                  categoryChangedRef.current = true;
                  setCategoryChanged(true);
                }
                setSelectedCategory(newValue.category);
                setSelectedSubCategory(newValue.label);
              }
            } else {
              if (selectedCategory || selectedSubCategory) {
                categoryChangedRef.current = true;
                setCategoryChanged(true);
              }
              setSelectedCategory("");
              setSelectedSubCategory("");
            }
          }}
          id="combo-box-demo"
          options={[{ label: "All", category: "All", id: Infinity }, ...categoriesWithLabel]}
          sx={{
            minWidth: "250px",
            maxWidth: "300px",
            "& .MuiOutlinedInput-root": {
              backgroundColor: `${theme.palette.courseExplorer.sidebarBg} !important`,
              borderRadius: "8px",
              padding: "4px 8px",

              "& input": {
                color: `${theme.palette.courseExplorer.textPrimary} !important`,
              },
              "& fieldset": {
                borderColor: `${theme.palette.courseExplorer.border} !important`,
              },
              "&:hover fieldset": {
                borderColor: `${theme.palette.courseExplorer.border} !important`,
              },
              "&.Mui-focused fieldset": {
                borderColor: `${theme.palette.courseExplorer.border} !important`,
              },
            },
            "& .MuiInputLabel-root": {
              color: `${theme.palette.courseExplorer.textSecondary} !important`,
              "&.Mui-focused": {
                color: `${theme.palette.courseExplorer.textPrimary} !important`,
              },
            },
            "& .MuiSvgIcon-root": {
              color: theme.palette.courseExplorer.textSecondary,
            }
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
