import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";

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
        component='a'
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
          navigate('/courses');
        }}
      >
        <Typography
          sx={{
            borderRadius: "0.25rem",
            border: "1px solid rgba(0, 0, 0, 0.23)",
            fontSize: "1rem",
            px: "0.5rem",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: (theme) => theme.palette.grey.grey100,
            },
          }}
        >
          Browse more in courses page
        </Typography>
      </Box>
    </>
  );
};

export default CoursesBottom;
