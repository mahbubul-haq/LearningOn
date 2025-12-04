import { Alert, Snackbar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useContext, useEffect } from "react";
import { CreateCourseContext } from "../../state/CreateCourse";
import BasicInfo from "./BasicInfo";
import CourseContent from "./CourseContent";
import CourseMedia from "./CourseMedia";
import MoreInfo from "./MoreInfo";

const RightPanel = () => {
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
    <Box
      sx={{
        //backgroundColor: isMobileScreens ? "transparent" : "white",
        backgroundColor: "transparent",
        padding: 0,
        borderRadius: "0.25rem",
        // paddingBottom: "1000px"
        // minHeight: "100%",
        // border: "2px solid green"
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

      {inputSection === "basic info" && <BasicInfo />}
      {inputSection === "course media" && <CourseMedia />}
      {inputSection === "more info" && <MoreInfo />}
      {inputSection === "course content" && <CourseContent />}
    </Box>
  );
};

export default RightPanel;
