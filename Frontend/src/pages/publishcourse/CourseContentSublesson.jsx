import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useTheme from "@mui/material/styles/useTheme";
import { StyledButton } from "../../components/StyledButton";
import TextField from "@mui/material/TextField";
import VideoUpload from "../../components/videoUpload/VideoUpload";
import InputLabel from "@mui/material/InputLabel";
import { CreateCourseContext } from "../../state/CreateCourse";
import { colorTokens } from "../../theme";
import { useContext, useState, useEffect, useCallback } from "react";
import SubLessonVideoUploader from "./SubLessonVideoUploader";
import { alpha } from "@mui/material/styles";


const CourseContentSublesson = ({
  lesson,
  index,
  subExpanded,
  handleExpand,
  handleInput,
  setVideoLinks,
  deleteSubLesson,
  videoLinks,
}) => {
  const theme = useTheme();
  const { updateCallback, courseStateRef, setCourseState } =
    useContext(CreateCourseContext);
  const [subLessonTitle, setSubLessonTitle] = useState(lesson?.subLessons.map((subLesson) => subLesson.title));
  const [subLessonLectureNote, setSubLessonLectureNote] = useState(lesson?.subLessons.map((subLesson) => subLesson.lectureNote));

  useEffect(() => {
    setSubLessonTitle(lesson?.subLessons.map((subLesson) => subLesson.title));
    setSubLessonLectureNote(lesson?.subLessons.map((subLesson) => subLesson.lectureNote));
  }, [lesson]);

  return (
    <>
      {lesson.subLessons.map((subLesson, subIndex) => (
        <Accordion
          key={index + " " + subIndex}
          expanded={subExpanded === `subPanel${index}${subIndex}`}
          sx={{
            backgroundColor: "transparent",
            backgroundImage: "none",
            color: (theme) => theme.palette.text.primary,
            boxShadow: "none",
            "&:before": {
              display: "none",
            },
            mb: "1rem",
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                sx={{
                  color: (theme) => theme.palette.text.secondary,
                  fontSize: "1.5rem",
                }}
                onClick={(event) => {
                  handleExpand(event, index, subIndex);
                }}
              />
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.05)"
                  : "#FFFFFF",
              border: (theme) => theme.palette.mode === "light" ? `1px solid ${alpha(theme.palette.divider, 0.5)}` : "none",
              boxShadow: (theme) => theme.palette.mode === "light" ? "0 2px 6px rgba(0,0,0,0.04)" : "none",
              borderRadius: "12px",
            }}
            onClick={(event) => {
              handleExpand(event, index, subIndex);
            }}
          >
            <Typography
              sx={{
                fontSize: "1rem",
                color: (theme) => theme.palette.text.primary,
              }}
            >
              <span
                style={{
                  color: "inherit",
                  fontWeight: "600",
                }}
              >
                Lesson {index + 1}.{subIndex + 1}
              </span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              {subLesson.title}
            </Typography>
            <StyledButton
              variant="outlined"
              disabled={lesson.subLessons.length === 1}
              sx={{
                ml: "auto",
                mr: "1rem",

                color: (theme) => theme.palette.text.secondary,
                borderColor: "transparent",
                "&&": {
                  padding: "0.3rem 1rem",
                },
                "&:hover": {
                  borderColor: (theme) => theme.palette.text.primary,
                  backgroundColor: "transparent",
                  color: (theme) => theme.palette.text.primary,
                },
                "&.Mui-disabled": {
                  borderColor: "transparent",
                  color: (theme) => theme.palette.text.disabled,
                }
              }}
              onClick={async (event) => {
                event.stopPropagation();

                await deleteSubLesson(index, subIndex);
              }}
            >
              Delete {index + 1}.{subIndex + 1}
            </StyledButton>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: "1.5rem",
            }}
          >
            <InputLabel htmlFor="sublesson-title">
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
              id="sublesson-title"
              name="title"
              inputProps={{
                maxLength: 100,
              }}
              onChange={(event) => {
                const newTitles = [...subLessonTitle];
                newTitles[subIndex] = event.target.value;
                setSubLessonTitle(newTitles);
                courseStateRef.current.lessons[index].subLessons[subIndex].title = event.target.value;
              }}
              onBlur={(event) => {
                setCourseState({
                  ...courseStateRef.current
                });
              }}
              value={subLessonTitle[subIndex]}
              fullWidth
              variant="outlined"

              sx={{
                width: "100%",
              }}
            />

            <InputLabel htmlFor="sublesson-video">
              <Typography
                variant="h6"
                sx={{
                  mb: "0.5rem",
                  fontWeight: "600",
                  color: (theme) => theme.palette.grey.grey600,
                }}
              >
                Add Video
              </Typography>
            </InputLabel>

            <SubLessonVideoUploader
              updateCallback={updateCallback}
              subLessonVideoLink={subLesson.videoLink}
              index={index}
              subIndex={subIndex}
              handleInput={handleInput}
              setVideoLinks={setVideoLinks}
            />

            <InputLabel htmlFor="sublesson-note">
              <Typography
                variant="h6"
                sx={{
                  mb: "0.5rem",
                  mt: "1rem",
                  fontWeight: "600",
                  color: (theme) => theme.palette.grey.grey600,
                }}
              >
                Add Lecture Note
              </Typography>
            </InputLabel>

            <TextField
              placeholder="Add lecture note"
              multiline
              minRows={20}
              maxRows={Infinity}
              id="sublesson-note"
              name="lectureNote"
              inputProps={{
                maxLength: 10000,
              }}
              onChange={(event) => {
                const newLectureNotes = [...subLessonLectureNote];
                newLectureNotes[subIndex] = event.target.value;
                setSubLessonLectureNote(newLectureNotes);
                courseStateRef.current.lessons[index].subLessons[subIndex].lectureNote = event.target.value;
              }}
              value={subLessonLectureNote[subIndex]}
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
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default CourseContentSublesson;
