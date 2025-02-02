import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";

const AddQuestions = ({ prefix, courseState, lesson, subLesson }) => {
  return (
    <Box>
      <Fab
        variant="extended"
        size="medium"
        sx={{
          mt: "1rem",
          backgroundColor: (theme) => theme.palette.grey.grey100,
          boxShadow: "none",
          "&:hover": {
            backgroundColor: (theme) => theme.palette.grey.grey200,
          },
        }}
        onClick={() => {}}
      >
        <AddIcon sx={{ mr: "0.5rem" }} />
        <Typography
          sx={{
            fontWeight: "600",
            color: (theme) => theme.palette.text.secondary,
            textTransform: "capitalize",
          }}
        >
          Add Question {prefix}{(courseState?.lessons && courseState.lessons[lesson].questions) ?  courseState.lessons[lesson].questions.length : 1}
        </Typography>
      </Fab>
    </Box>
  );
};

export default AddQuestions;
