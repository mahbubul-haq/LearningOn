import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";

const CoursesBottom = ({
  categoriesWithCourse,
  selectedItem,
  setSelectedItem,
  selectedCourses,
}) => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();

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
        component="a"
        href={`${import.meta.env.VITE_CLIENT_URL}/courses`}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          mt: isNonMobileScreens ? "2rem" : "2rem",
          textAlign: "center",
          textDecoration: "none",
          color: "inherit",
        }}
        onClick={(e) => {
          e.preventDefault();
          navigate("/courses");
        }}
      >
        <FlexBetween
          sx={{
            mt: "1rem",
            "&&" : {
              gap: "0.5rem"
            },
            cursor: "pointer",
            color: (theme) => theme.palette.grey.grey500,
            "&:hover": {
              color: (theme) => theme.palette.grey.grey700,
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
