import { Alert, Snackbar, Typography, Paper, alpha } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useContext, useEffect } from "react";
import { CreateCourseContext } from "../../state/CreateCourse";
import BasicInfo from "./BasicInfo";
import CourseContent from "./CourseContent";
import CourseMedia from "./CourseMedia";
import MoreInfo from "./MoreInfo";

const RightPanel = ({ mode, brand }) => {
  const { inputSection, updateCourse, isAnyError, updating, setUpdating } =
    useContext(CreateCourseContext);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  // console.log(inputSection);
  // useEffect(() => {
  //     console.log(inputSection);
  // }, [inputSection]);

  useEffect(() => {
    let element = document.querySelector(".publish-course-main");
    if (element) {
      element.scrollTop = 0;
    }
  }, [inputSection]);

  useEffect(() => {
    if (updating == "updated" || updating == "failed") {
      setOpenSnackbar(true);
      setUpdating("");
    }
  }, [updating]);

  // useEffect(() => {
  //     console.log("updating", updating);
  //     console.log(openSnackbar);
  // }, [updating, openSnackbar]);

  useEffect(() => {
    if (updating == "updating") {
      updateCourse("draft");
    }
  }, [updating]);

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 5 },
        borderRadius: 4,
        // Glassmorphism Styles
        background: mode === 'dark'
          ? alpha(brand.primary.darker, 0.4) // Dark Glass
          : alpha('#ffffff', 0.65),         // Light Glass
        backdropFilter: 'blur(24px)',
        border: '1px solid',
        borderColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.4)',
        boxShadow: mode === 'dark'
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          : '0 20px 40px -12px rgba(69, 34, 186, 0.15)',
        width: "100%",
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => {
          setOpenSnackbar(false);
          setUpdating("");
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={() => {
            setOpenSnackbar(false);
            setUpdating("");
          }}
          severity={!isAnyError() ? "success" : "error"}
          sx={{
            width: "100%",

            backgroundColor: (theme) =>
              !isAnyError()
                ? theme.palette.primary.light
                : theme.palette.error.light,
          }}
        >
          <Typography
            sx={{
              fontWeight: "600",
            }}
          >
            {!isAnyError()
              ? "Your course information is saved as draft."
              : "Failed to save course information."}
          </Typography>
        </Alert>
      </Snackbar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {/* */}
      </Box>

      {/* RENDER ACTIVE SECTION */}
      {inputSection === "basic info" && <BasicInfo />}
      {inputSection === "course media" && <CourseMedia />}
      {inputSection === "more info" && <MoreInfo />}
      {inputSection === "course content" && <CourseContent />}
    </Paper>
  );
};

export default RightPanel;
