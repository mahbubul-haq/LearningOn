import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useTheme from "@mui/material/styles/useTheme";
import { StyledButton } from "../../components/StyledButton";
import StyledTextField1 from "../../components/StyledTextField1";
import VideoUpload from "../../components/videoUpload/VideoUpload";
import InputLabel from "@mui/material/InputLabel";
import { CreateCourseContext } from "../../state/CreateCourse";
import { useContext, useState } from "react";


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
  const {updateCallback, courseStateRef, setCourseState} =
    useContext(CreateCourseContext);
    const [subLessonTitle, setSubLessonTitle] = useState(lesson?.subLessons.map((subLesson) => subLesson.title));
    const [subLessonLectureNote, setSubLessonLectureNote] = useState(lesson?.subLessons.map((subLesson) => subLesson.lectureNote));

    useState(() => {
      setSubLessonTitle(lesson?.subLessons.map((subLesson) => subLesson.title));
      setSubLessonLectureNote(lesson?.subLessons.map((subLesson) => subLesson.lectureNote));
    }, [lesson]);

  return (
    <>
      {lesson.subLessons.map((subLesson, subIndex) => (
        <Accordion
          key={index + " " + subIndex}
          expanded={subExpanded === `subPanel${index}${subIndex}`}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                sx={{
                  color: theme.palette.grey.grey800,
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
              backgroundColor: theme.palette.grey.grey10,
            }}
            onClick={(event) => {
              handleExpand(event, index, subIndex);
            }}
          >
            <Typography
              sx={{
                fontSize: "1rem",
                color: theme.palette.grey.grey800,
              }}
            >
              <span
                style={{
                  color: theme.palette.grey.grey800,
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

                color: (theme) => theme.palette.grey.grey600,
                borderColor: (theme) => theme.palette.grey.grey600,
                "&&": {
                  padding: "0.3rem 1rem",
                },
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
                    color: "red",
                    fontSize: "1.1rem",
                  }}
                >
                  *
                </span>
              </Typography>
            </InputLabel>

            <StyledTextField1
              placeholder="Title of the lesson"
              multiline
              minRows={1}
              maxRows={Infinity}
              id="sublesson-title"
              name="title"
              inputProps={{
                maxLength: 100,
              }}
              // change font size of input
              // onChange={(event) => handleInput(event, index, subIndex)}
              onChange ={(event) => {
                const newTitles = [...subLessonTitle];
                newTitles[subIndex] = event.target.value;
                setSubLessonTitle(newTitles);
                courseStateRef.current.lessons[index].subLessons[subIndex].title = event.target.value;
              }}
              onBlur ={(event) => {
                setCourseState({
                  ...courseStateRef.current 
                });
              }}  
              value={subLessonTitle[subIndex]}
            
              sx={{
                p: 0,
                "& .MuiInputBase-input": {
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: (theme) => theme.palette.grey.grey600,
                },
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

            <VideoUpload
              id="sublesson-video"
              name="videoLink"
              updateCallBack={updateCallback}
              fileName={subLesson.videoLink}
              setFileName={(fileName) => {
                const e = {
                  target: {
                    name: "videoLink",
                    value: fileName,
                  },
                };

                handleInput(e, index, subIndex);

                if (fileName) {
                  setVideoLinks([...videoLinks, fileName]);
                } else {
                  setVideoLinks([
                    ...videoLinks.filter(
                      (link) => link !== subLesson.videoLink
                    ),
                  ]);
                }
              }}
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

            <StyledTextField1
              placeholder="Add lecture note"
              multiline
              minRows={20}
              maxRows={Infinity}
              id="sublesson-note"
              name="lectureNote"
              inputProps={{
                maxLength: 10000,
              }}
              // change font size of input
              // onChange={(event) => handleInput(event, index, subIndex)}
              onChange ={(event) => {
                const newLectureNotes = [...subLessonLectureNote];
                newLectureNotes[subIndex] = event.target.value;
                setSubLessonLectureNote(newLectureNotes);
                courseStateRef.current.lessons[index].subLessons[subIndex].lectureNote = event.target.value;
              }}
              value = {subLessonLectureNote[subIndex]}
              onBlur ={(event) => {
                setCourseState({
                  ...courseStateRef.current 
                });
              }}
              sx={{
                fontSize: "0.9rem",
                letterSpacing: "0.01rem",
                lineHeight: "1.5rem",
                fontWeight: "400",
                width: "100%",

                color: (theme) => theme.palette.grey.grey600,
              }}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default CourseContentSublesson;
