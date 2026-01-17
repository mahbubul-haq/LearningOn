import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector } from "react-redux";
import FlexBetween from "../../components/FlexBetween";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const CoursesTop = ({ courseType, setCourseType, handleChange, setChangingCourseType, changingCourseTypeRef }) => {
  const isNonMobileScreens = useMediaQuery("(min-width: 900px)");
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
                backgroundColor: (theme) => theme.palette.homepage.tabIndicator,
              },
            }}
          >
            <Tab
              sx={{
                fontSize: "0.9rem",
                fontWeight: "600",
                textTransform: "capitalize",
                color: (theme) => theme.palette.homepage.tabInactive,
                "&.Mui-selected": {
                  color: (theme) => theme.palette.homepage.tabActive,
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
                color: (theme) => theme.palette.homepage.tabInactive,
                "&.Mui-selected": {
                  color: (theme) => theme.palette.homepage.tabActive,
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
                color: (theme) => theme.palette.homepage.tabInactive,
                "&.Mui-selected": {
                  color: (theme) => theme.palette.homepage.tabActive,
                },
              }}
              label="Popular Courses"
              value="Popular Courses"
            />
          </Tabs>
        </Box>
      )}
      {user && isMobileScreens && (
        <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
          <Select
            labelId="courseType"
            value={courseType}
            sx={{
              borderRadius: "50px",
            }}

            onChange={(e) => {
              changingCourseTypeRef.current = true;
              setChangingCourseType(true);
              setCourseType(e.target.value);
            }}
          >
            <MenuItem value="Popular Courses">Popular Courses</MenuItem>
            <MenuItem value="My Courses">My Courses</MenuItem>
            <MenuItem value="I am Learning">I am Learning</MenuItem>
          </Select>
        </FormControl>

        // <Box
        //   sx={{
        //     my: "1rem",
        //   }}
        // >
        //   <Box
        //     sx={{
        //       position: "relative",
        //     }}
        //   >
        //     <select
        //       style={{
        //         appearance: "none",
        //         WebkitAppearance: "none",
        //         MozAppearance: "none",
        //         background: "transparent",
        //         padding: "0.5rem 3rem 0.5rem 1rem",
        //         borderRadius: "1000px",
        //         color: theme.palette.text.primary,
        //         border: `1px solid ${theme.palette.primary.main}`,
        //       }}
        //       onChange={(e) => {
        //         console.log(e.target.value);
        //         changingCourseTypeRef.current = true;
        //         setChangingCourseType(true);
        //         setCourseType(e.target.value);
        //       }}
        //     >
        //       <option value="Popular Courses">Popular Courses</option>
        //       <option value="My Courses">My Courses</option>
        //       <option value="I am Learning">I am Learning</option>
        //     </select>
        //     <Box sx={{
        //       position: "absolute",

        //       backgroundImage: "url(/images/down_arrow.svg)",
        //       backgroundRepeat: "no-repeat",
        //       backgroundPositionX: "center",
        //       backgroundSize: "12px 12px",
        //       backgroundPositionY: "center",
        //       right: "0.8rem",
        //       top: "50%",
        //       transform: "translateY(-50%)",
        //       height: "12px",
        //       width: "12px",
        //       zIndex: 2,
        //     }}></Box>
        //   </Box>
        // </Box>
      )}

    </FlexBetween>
  );
};

export default CoursesTop;
