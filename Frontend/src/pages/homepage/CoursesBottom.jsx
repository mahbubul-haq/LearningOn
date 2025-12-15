import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import { useContext } from "react";
import { CourseExplorerContext } from "../../state/CourseExplorerContext";

const CoursesBottom = ({
  categoriesWithCourse,
  selectedItem,
  setSelectedItem,
  selectedCourses,
  selectedItemRef,
  courseType,
  waitingForSelectedCoursesRef,
  loading,
}) => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();
  const { changeCategory } = useContext(CourseExplorerContext);

  const isDisabled = () => {
    return (
      courseType != "Popular Courses" ||
      selectedCourses?.length < 8
    );
  }

  return (
    <>
      {/* {!isNonMobileScreens && categoriesWithCourse.length > 0 && (
                <Box
                    sx={{
                        width: "100%",
                        my: "1rem",
                        // border: "1px solid rgba(0, 0, 0, 0.23)",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Autocomplete
                        disablePortal
                        onChange={(event, value) => {
                            if (value) setSelectedItem(value);
                        }}
                        value={selectedItem ? selectedItem : { label: "Choose a category", value: "Choose a category" }}
                        id="category"
                        options={categoriesWithCourse.length > 0 ? categoriesWithCourse : []}
                        sx={{
                            maxWidth: "300px",
                            width: "100%",
                        }}
                        renderInput={(params) => (
                            <StyledTextField1
                                placeholder={selectedItem ? selectedItem : "Choose a category"}
                                {...params}
                                size="small"
                                // change font size of input
                                sx={{
                                    p: 0,
                                    "& .MuiInputBase-input": {
                                        fontSize: "1rem",
                                        fontWeight: "600",
                                    },

                                    "&&": {
                                        "& .MuiInputBase-root": {
                                            color: (theme) => theme.palette.grey.grey600,
                                        },
                                    },
                                    //enforce color of input
                                }}
                            />
                        )}
                    />
                </Box>
            )} */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          mt: isNonMobileScreens ? "2rem" : "2rem",
          textAlign: "center",
          color: "inherit",
          position: "absolute",
          bottom: "2rem",
          // border: "1px solid green",
          left: "0",
        
        }}
      >
        <FlexBetween
          component="a"
          //href={`${import.meta.env.VITE_CLIENT_URL}/courses`}
          href={isDisabled() ? "" : `${import.meta.env.VITE_CLIENT_URL}/courses`}
          onClick={(e) => {
            e.preventDefault();
            if (isDisabled()) return;
            if (courseType === "Popular Courses") {
              changeCategory(selectedItem == "All" ? "" : selectedItem);
            }else {
              changeCategory("");
            }

            navigate("/courses");
          }}
          sx={{
            mt: "1rem",
            textDecoration: "none",
            "&&": {
              gap: "0.5rem",
            },
            cursor: isDisabled() ? "default" : "pointer",
            opacity: isDisabled() ? 0.5 : 1,
            color: (theme) => theme.palette.grey.grey500,
            "&:hover": {
              color: isDisabled() ? (theme) => theme.palette.grey.grey500 : (theme) => theme.palette.grey.grey700,
            },
          }}
        >
          <Typography
            sx={{
              fontSize: "0.9rem",

              fontWeight: "600",
            }}
          >
            Browse More
          </Typography>
          <OpenInNewIcon
            sx={{
              fontSize: "1.2rem",
            }}
          />
        </FlexBetween>
      </Box>
    </>
  );
};

export default CoursesBottom;
