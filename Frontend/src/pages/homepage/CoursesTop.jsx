import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector } from "react-redux";
import FlexBetween from "../../components/FlexBetween";

const CoursesTop = ({ courseType, setCourseType, handleChange }) => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const isMobileScreens = useMediaQuery("(max-width: 600px)");
  const user = useSelector((state) => state.auth.user);
  const theme = useTheme();

  return (
    <FlexBetween
      sx={{
        mb: "1rem",
        width: "100%",
        "&&": {
          flexDirection: isNonMobileScreens ? "row" : "column",
        },
      }}
    >
      <Box
        sx={{
          mb: "1rem",
          flexGrow: "1",
          textAlign: isNonMobileScreens ? "left" : "center",
        }}
      >
        <Typography variant="h3">{courseType}</Typography>
      </Box>
      {/* <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        position: "relative",
                        flexGrow: "1",
                    }}
                ></Box> */}

      {user && !isMobileScreens && (
        <Box sx={{ borderBottom: 1, borderColor: "divider", overflow: "auto" }}>
          <Tabs
            orientation="horizontal"
            onChange={handleChange}
            aria-label="lab API tabs example"
            value={courseType}
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: (theme) => theme.palette.text.primary,
              },
            }}
          >
            <Tab
              sx={{
                fontSize: "0.9rem",
                fontWeight: "600",
                textTransform: "capitalize",
                color: (theme) => theme.palette.grey.grey400,
                "&.Mui-selected": {
                  color: (theme) => theme.palette.text.primary,
                },
              }}
              label="My Courses"
              value="My Courses"
            />
            <Tab
              sx={{
                fontSize: "0.9rem",
                fontWeight: "600",
                textTransform: "capitalize",
                color: (theme) => theme.palette.grey.grey400,
                "&.Mui-selected": {
                  color: (theme) => theme.palette.text.primary,
                },
              }}
              label="I am Learning"
              value="I am Learning"
            />
            <Tab
              sx={{
                fontSize: "0.9rem",
                fontWeight: "600",
                textTransform: "capitalize",
                color: (theme) => theme.palette.grey.grey400,
                "&.Mui-selected": {
                  color: (theme) => theme.palette.text.primary,
                },
              }}
              label="Popular Courses"
              value="Popular Courses"
            />
          </Tabs>
        </Box>
      )}
      {user && isMobileScreens && (
        <Box
          sx={{
            my: "1rem",
          }}
        >
          <Box
            sx={{
              position: "relative",
            }}
          >
            <select
              style={{
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
                background: "transparent",
                padding: "0.5rem 3rem 0.5rem 1rem",
                borderRadius: "1000px",
                color: theme.palette.grey.grey700,
                border: `1px solid ${theme.palette.grey.grey200}`,
              }}
              onChange={(e) => {
                console.log(e.target.value);
                setCourseType(e.target.value);
              }}
            >
              <option value="Popular Courses">Popular Courses</option>
              <option value="My Courses">My Courses</option>
              <option value="I am Learning">I am Learning</option>
            </select>
            <Box className="home-coursetype-select-arrow"></Box>
          </Box>
        </Box>
      )}
      {/* {!user && isMobileScreens && (
                <Box
                    sx={{
                        width: "100%",
                        my: "1rem",
                        mb: "0",
                        // border: "1px solid rgba(0, 0, 0, 0.23)",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Autocomplete
                        disablePortal
                        onChange={(event, value) => {
                            if (value) {
                                setCourseType(value.value);
                            }
                        }}
                        value={courseType}
                        id="category"
                        options={[{ label: "My Courses", value: "My Courses" }, { label: "I am Learning", value: "I am Learning" }, { label: "Popular Courses", value: "Popular Courses" }]}
                        sx={{
                            maxWidth: "300px",
                            width: "100%",
                        }}
                        renderInput={(params) => (
                            <StyledTextField1
                                placeholder={courseType}
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
    </FlexBetween>
  );
};

export default CoursesTop;
