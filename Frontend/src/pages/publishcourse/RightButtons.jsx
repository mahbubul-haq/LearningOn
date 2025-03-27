import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { StyledButton } from "../../components/StyledButton";
import { CreateCourseContext } from "../../state/CreateCourse";

const RightButtons = ({
  isCourseValid,
  setUploadStatus,
  setDeleteCourseStatus,
}) => {
  const theme = useTheme();
  const { courseState } = useContext(CreateCourseContext);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "0.7rem",
      }}
    >
      <Typography
        sx={{
          color: "text.secondary",

          mb: "1rem",
        }}
      >
        Please provide all the necessary information to publish your course.
      </Typography>
      <StyledButton
        disabled={!isCourseValid()}
        onClick={() => {
          setUploadStatus("publishing");
          //updateCourse("published");
        }}
        sx={{
          // cursor: isCourseValid() ? "pointer" : "not-allowed",
          // pointerEvents: isCourseValid() ? "auto" : "none",

          "&&": {
            padding: "0.2rem 1rem",
            background: isCourseValid()
              ? (theme) => theme.palette.primary.main
              : (theme) => theme.palette.grey.grey100,
            height: "40px",
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
          }}
        >
          Publish
        </Typography>
      </StyledButton>

      <StyledButton
        disabled={!courseState._id}
        onClick={() => {
          setDeleteCourseStatus("initiated");
          //updateCourse("published");
        }}
        sx={{
          "&&": {
            outline: `1px solid ${theme.palette.error.secondary}`,
            padding: "0.2rem 1rem",
            //   background:  (theme) => theme.palette.error.light1,
            background: "transparent",
            "&:hover": {
              background: (theme) => theme.palette.error.light,
              outline: `1px solid ${theme.palette.error.secondary}`,
            },
            "&:active": {
              outline: `1px solid ${theme.palette.error.secondary}`,
            },
            "&:focus": {
              outline: `1px solid ${theme.palette.error.secondary}`,
            },
            height: "40px",
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
          }}
        >
          Delete
        </Typography>
      </StyledButton>
    </Box>
  );
};

export default RightButtons;
