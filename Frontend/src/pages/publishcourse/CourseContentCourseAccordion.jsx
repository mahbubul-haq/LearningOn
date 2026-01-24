import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Divider } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import InputLabel from "@mui/material/InputLabel";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { StyledButton } from "../../components/StyledButton";
import AddQuestions from "./AddQuestions";
import CourseContentSublesson from "./CourseContentSublesson";
import QuestionForm from "./QuestionForm";
import { useContext, useState, useEffect } from "react";
import { CreateCourseContext } from "../../state/CreateCourse";
import { colorTokens } from "../../theme";
import { alpha } from "@mui/material/styles";

const CourseContentCourseAccordion = ({
  lesson,
  index,
  expanded,
  handleExpand,
  handleInput,
  deleteLesson,
  deleteSubLesson,
  courseState,
  setCourseState,
  subExpanded,
  videoLinks,
  setVideoLinks,
}) => {
  const theme = useTheme();
  const isMobileScreens = useMediaQuery("(max-width:600px)");
  const { courseStateRef } = useContext(CreateCourseContext);
  const [lessonTitle, setLessonTitle] = useState(lesson.title);
  const [lessonDescription, setLessonDescription] = useState(lesson.description);

  useEffect(() => {
    setLessonTitle(lesson.title);
    setLessonDescription(lesson.description);
  }, [lesson]);

  return (
    <Accordion
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.05)"
            : "#FFFFFF",
        color: (theme) => theme.palette.text.primary,
        backgroundImage: "none",
        boxShadow: (theme) => theme.palette.mode === "light" ? "0 2px 8px rgba(0,0,0,0.05)" : "none",
        border: (theme) => theme.palette.mode === "light"
          ? `1px solid ${alpha(theme.palette.divider, 0.5)}`
          : `1px solid rgba(255, 255, 255, 0.1)`,
        borderRadius: "12px",
        overflow: "hidden", // Ensure child content respects curvature
        "&:before": {
          display: "none",
        },
        mb: "1.5rem",
        // p: isMobileScreens ? "1rem" : "2rem",
      }}
      expanded={expanded === `panel${index}`}
    >
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon
            sx={{
              color: (theme) => theme.palette.text.secondary,
              fontSize: "2rem",
              p: 0,
              m: 0,
            }}
            onClick={(event) => {
              handleExpand(event, index);
            }}
          />
        }
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          backgroundColor: "transparent",
          borderRadius: "12px",
          "&.Mui-expanded": {
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          }
        }}
        onClick={(event) => {
          handleExpand(event, index);
        }}
      >
        <Typography
          sx={{
            fontSize: "1.2rem",
            color: (theme) => theme.palette.text.primary,
          }}
        >
          <span
            style={{
              fontWeight: "600",
              color: "inherit",
            }}
          >
            Lesson {index + 1}
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          {lessonTitle}
        </Typography>
        <StyledButton
          variant="outlined"
          sx={{
            ml: "auto",
            mr: "1rem",
            flexShrink: 0,

            alignSelf: "center",
            color: (theme) => theme.palette.text.secondary,
            borderColor: "transparent",
            "&&": {
              padding: "0.3rem 1rem",
            },
            "&:hover": {
              borderColor: (theme) => theme.palette.text.primary,
              backgroundColor: "transparent",
              color: (theme) => theme.palette.text.primary,
            }
          }}
          onClick={async (event) => {
            event.stopPropagation();

            await deleteLesson(index);
          }}
        >
          Delete
        </StyledButton>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          padding: isMobileScreens ? "1rem" : "2rem",
        }}
      >
        <InputLabel htmlFor="title">
          <Typography
            variant="h6"
            sx={{
              mb: "0.5rem",
              fontWeight: "600",
              color: (theme) => theme.palette.grey.grey600,
            }}
          >
            Title{" "}
            <span
              style={{
                color: colorTokens.utility.red,
                fontSize: "1.1rem",
              }}
            >
              *
            </span>
          </Typography>
        </InputLabel>

        <TextField
          placeholder="Title of the lesson"
          multiline
          minRows={1}
          maxRows={Infinity}
          id="title"
          name="title"
          inputProps={{
            maxLength: 100,
          }}
          onChange={(event) => {
            setLessonTitle(event.target.value);
            courseStateRef.current.lessons[index].title = event.target.value;
          }}
          value={lessonTitle}
          onBlur={(event) => {
            setCourseState({
              ...courseStateRef.current
            });
          }}
          fullWidth
          variant="outlined"
          sx={{
            width: "100%",
          }}
        />

        <InputLabel htmlFor="description">
          <Typography
            variant="h6"
            sx={{
              mb: "0.5rem",
              fontWeight: "600",
              color: (theme) => theme.palette.grey.grey600,
            }}
          >
            Description
          </Typography>
        </InputLabel>

        <TextField
          placeholder="Description of the lesson"
          minRows={5}
          maxRows={Infinity}
          multiline
          id="description"
          name="description"
          inputProps={{
            maxLength: 2000,
          }}
          onChange={(event) => {
            setLessonDescription(event.target.value);
            courseStateRef.current.lessons[index].description = event.target.value;
          }}
          value={lessonDescription}
          onBlur={(event) => {
            setCourseState({
              ...courseStateRef.current
            });
          }}
          fullWidth
          variant="outlined"
          sx={{
            width: "100%",
            mb: "1.5rem",
          }}
        />

        <CourseContentSublesson
          lesson={lesson}
          index={index}
          subExpanded={subExpanded}
          handleExpand={handleExpand}
          handleInput={handleInput}
          deleteSubLesson={deleteSubLesson}
          videoLinks={videoLinks}
          setVideoLinks={setVideoLinks}
        />

        <Fab
          variant="extended"
          size="medium"
          sx={{
            mt: "1rem",
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
            color: (theme) => theme.palette.primary.main,
            border: "1px solid",
            borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
            boxShadow: "none",
            "&:hover": {
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.2),
              borderColor: (theme) => theme.palette.primary.main,
            },
          }}
          onClick={() => {
            setCourseState((prevState) => ({
              ...prevState,
              lessons: [
                ...prevState.lessons.map((curLesson, curIndex) => {
                  if (curIndex === index) {
                    return {
                      ...curLesson,
                      subLessons: [
                        ...curLesson.subLessons,
                        {
                          title: "",
                          lectureNote: "",
                          videoLink: "",
                        },
                      ],
                    };
                  }
                  return curLesson;
                }),
              ],
            }));
          }}
        >
          <AddIcon sx={{ mr: "0.5rem" }} />
          <Typography
            sx={{
              fontWeight: "600",
              color: (theme) => theme.palette.text.primary,
              textTransform: "capitalize",
            }}
          >
            Add Lesson {index + 1}.{lesson.subLessons.length + 1}
          </Typography>
        </Fab>
        <Divider
          sx={{
            my: "3rem",
            mb: "0.2rem",
          }}
        >
          Questions for <b>Lesson {index + 1}</b>
        </Divider>

        <Box
          sx={{
            //backgroundColor: isMobileScreens ? "transparent" : theme.palette.grey.grey10,
            //padding: isMobileScreens ? 0 : "1rem",
            mt: "2rem",
            borderRadius: "0.2rem",
          }}
        >
          {courseState?.lessons[index]?.questions?.questions?.map((question, index1) => {
            return (
              <QuestionForm
                key={index1}
                question={question}
                questionNo={index1}
                courseState={courseState}
                setCourseState={setCourseState}
                lessonIdx={index}
              />
            );
          })}
          <Box sx={{
            mt: "1rem",
          }}>

            <AddQuestions
              prefix={index + 1 + "."}
              courseState={courseState}
              setCourseState={setCourseState}
              lesson={index}
            />
          </Box>
        </Box>
      </AccordionDetails>
      <AccordionActions></AccordionActions>
    </Accordion >
  );
};

export default CourseContentCourseAccordion;
