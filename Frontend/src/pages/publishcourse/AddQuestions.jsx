import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";

const newQuestion = {
  question: "",
  options: ["", "", "", ""],
  answer: "",
};

const AddQuestions = ({
  prefix,
  courseState,
  setCourseState,
  lesson,
  subLesson,
}) => {
  const addQuestion = () => {
    setCourseState((prevState) => ({
      ...prevState,
      lessons: [
        ...prevState.lessons.map((curLesson, idx) => {
          if (idx == lesson) {
            return {
              ...curLesson,
              questions: curLesson.questions
                ? [...curLesson.questions, { ...newQuestion }]
                : [{ ...newQuestion }],
            };
          } else {
            return curLesson;
          }
        }),
      ],
    }));
  };

  return (
    <Box>
      <Fab
        variant="extended"
        size="medium"
        sx={{
          mt: "0rem",
          backgroundColor: (theme) => theme.palette.grey.grey200,
          boxShadow: "none",
          "&:hover": {
            backgroundColor: (theme) => theme.palette.grey.grey300,
          },
        }}
        onClick={() => {
          addQuestion();
        }}
      >
        <AddIcon sx={{ mr: "0.5rem" }} />
        <Typography
          sx={{
            fontWeight: "600",
            color: (theme) => theme.palette.text.secondary,
            textTransform: "capitalize",
          }}
        >
          Add Question {prefix}
          {courseState?.lessons && courseState.lessons[lesson].questions
            ? courseState.lessons[lesson].questions.length + 1
            : 1}
        </Typography>
      </Fab>
    </Box>
  );
};

export default AddQuestions;
