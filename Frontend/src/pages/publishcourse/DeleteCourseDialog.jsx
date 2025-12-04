import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import LinearProgress from "@mui/material/LinearProgress";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import { StyledButton } from "../../components/StyledButton";
import { CreateCourseContext } from "../../state/CreateCourse";
const DeleteCourseDialog = ({getUser }) => {
  const navigate = useNavigate();
  const {
    deleteCourseStatus,
    setDeleteCourseStatus,
    courseState,
    deleteCourse,
    editMode,
    setMobileDrawerOpen,
    setCourseState,
  } = useContext(CreateCourseContext);
  const theme = useTheme();

  return (
    <Dialog
      open={
        deleteCourseStatus === "initiated" ||
        deleteCourseStatus === "deleting" ||
        deleteCourseStatus === "failed" ||
        deleteCourseStatus === "deleted"
      }
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          setDeleteCourseStatus("");
        }
      }}
      aria-labelledby="responsive-dialog-title"
      disableEscapeKeyDown
    >
      <DialogTitle
        id="responsive-dialog-title"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontWeight: "600",
            fontSize: "1rem",
            display: "block",
          }}
        >
          Are you sure you want to delete?
        </span>
        <span
         
          style={{
            textAlign: "center",
            fontWeight: "500",
            display: "block",
            fontSize: "1.4rem",
            color: theme.palette.grey[700],
          }}
        >
          {courseState.courseTitle}
        </span>
      </DialogTitle>
      <DialogContent sx={{
        fontSize: "1.3rem",
      }}>
        {deleteCourseStatus === "deleting" && (
          <Box>
            <LinearProgress />
            <Typography>Deleting course content...</Typography>
          </Box>
        )}
        {deleteCourseStatus === "failed" && (
          <>There was an error deleting your course.</>
        )}
        {deleteCourseStatus === "deleted" && (
          <>Your course has been deleted successfully.</>
        )}
      </DialogContent>
      <DialogActions
        sx={{
          padding: "1rem",
        }}
      >
        <FlexBetween
        >
          <StyledButton
            disabled={!(deleteCourseStatus === "initiated")}
            sx={{
              fontSize: "1rem",
              mr: "2rem",
              "&&": {
                padding: "0.4rem 0.8rem",
                fontWeight: "600",
                height: "36px",
                background: "transparent",
                textTransform: "uppercase",
                color:
                  deleteCourseStatus === "initiated"
                    ? theme.palette.primary.dark
                    : theme.palette.grey[500],
                "&:hover": {
                  color: (theme) => theme.palette.primary.darker,
                  background: (theme) => theme.palette.background.alt,
                },
              },
            }}
            onClick={() => {
              setDeleteCourseStatus("");
            }}
          >
            Cancel
          </StyledButton>

          <StyledButton
            disabled={
              !(
                deleteCourseStatus === "initiated" ||
                deleteCourseStatus === "deleted" ||
                deleteCourseStatus === "failed"
              )
            }
            sx={{
              "&&": {
                padding: "0.4rem 0.8rem",
                fontWeight: "600",
                height: "36px",
                color: (theme) => theme.palette.common.white,
                background: (theme) => theme.palette.error.main1,
                "&:hover": {
                  background: (theme) => theme.palette.error.main,
                },
              },
            }}
            onClick={() => {
              setMobileDrawerOpen(false);
              if (deleteCourseStatus === "initiated") {
                deleteCourse(courseState._id);
              } 
              else if (deleteCourseStatus === "failed") {
                setDeleteCourseStatus("");
              }
              else if (deleteCourseStatus === "deleted") {
                setDeleteCourseStatus("");
                setCourseState({});
                
                if (editMode) {
                  navigate("/dashboard");
                  getUser();
                } else {
                  navigate("/");
                }
              }
            }}
          >
            {deleteCourseStatus === "initiated" || deleteCourseStatus === "" ? "Confirm Delete" : "Ok"}
          </StyledButton>
        </FlexBetween>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCourseDialog;
