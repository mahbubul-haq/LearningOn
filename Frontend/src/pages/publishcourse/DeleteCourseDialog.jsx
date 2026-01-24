import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";
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
const DeleteCourseDialog = ({ getUser }) => {
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
      PaperProps={{
        style: {
          backgroundColor: theme.palette.mode === 'dark' ? "rgba(30, 30, 35, 0.8)" : "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(20px)",
          borderRadius: "16px",
          border: theme.palette.mode === 'dark' ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(255, 255, 255, 0.5)",
          boxShadow: theme.palette.mode === 'dark' ? "0 8px 32px rgba(0, 0, 0, 0.4)" : "0 8px 32px rgba(31, 38, 135, 0.15)",
        },
      }}
      aria-labelledby="responsive-dialog-title"
      disableEscapeKeyDown
    >
      <DialogTitle
        id="responsive-dialog-title"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          alignItems: "center",
          pt: "2rem",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
          Delete Course?
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          This action cannot be undone.
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            fontWeight: "600",
            mt: "1rem",
            color: theme.palette.error.main,
          }}
        >
          {courseState.courseTitle}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{
        textAlign: "center",
        pb: "2rem",
      }}>
        {deleteCourseStatus === "deleting" && (
          <Box sx={{ width: '100%', mt: 2 }}>
            <LinearProgress color="error" />
            <Typography sx={{ mt: 2, color: theme.palette.text.secondary }}>Deleting...</Typography>
          </Box>
        )}
        {deleteCourseStatus === "failed" && (
          <Typography color="error">There was an error deleting your course.</Typography>
        )}
        {deleteCourseStatus === "deleted" && (
          <Typography color="success.main">Your course has been deleted successfully.</Typography>
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
              mr: "1rem",
              "&&": {
                fontWeight: "600",
                color: theme.palette.text.primary,
                borderColor: theme.palette.divider,
                borderRadius: "8px",
                padding: "0.5rem 1.2rem",
                "&:hover": {
                  borderColor: theme.palette.text.primary,
                  backgroundColor: (theme) => alpha(theme.palette.text.primary, 0.05),
                  color: theme.palette.text.primary,
                  boxShadow: "none",
                },
              },
            }}
            variant="outlined"
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
                fontWeight: "600",
                color: "#fff",
                background: (theme) => theme.palette.error.main,
                boxShadow: "0 4px 14px 0 rgba(239, 68, 68, 0.4)",
                borderRadius: "8px",
                padding: "0.5rem 1.2rem",
                "&:hover": {
                  background: (theme) => theme.palette.error.dark,
                  boxShadow: "0 6px 20px rgba(239, 68, 68, 0.6)",
                },
              },
            }}
            variant="contained"
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
