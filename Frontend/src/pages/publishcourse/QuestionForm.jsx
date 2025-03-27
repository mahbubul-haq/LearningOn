import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import { StyledButton } from "../../components/StyledButton";
import StyledTextField1 from "../../components/StyledTextField1";
import QuestionFormDetails from "./QuestionFormDetails";

const QuestionForm = ({
  question,
  courseState,
  setCourseState,
  questionNo,
  lessonIdx,
}) => {
  const theme = useTheme();
  const isMobileScreens = useMediaQuery("(max-width:600px)");
  const [isExpanded, setIsExpanded] = useState(false);

  const setQuestion = (event) => {
    setCourseState((prevState) => ({
      ...prevState,
      lessons: [
        ...prevState.lessons.map((curLesson, idx) => {
          if (idx == lessonIdx) {
            return {
              ...curLesson,
              questions: curLesson.questions.map((curQuestion, idx1) => {
                if (idx1 == questionNo) {
                  return {
                    ...curQuestion,
                    question: event.target.value,
                  };
                } else {
                  return curQuestion;
                }
              }),
            };
          } else {
            return curLesson;
          }
        }),
      ],
    }));
  };

  const deleteQuestion = () => {
    setCourseState((prevState) => ({
      ...prevState,
      lessons: [
        ...prevState.lessons.map((curLesson, idx) => {
          if (idx == lessonIdx) {
            return {
              ...curLesson,
              questions: curLesson.questions.filter(
                (curQuestion, idx1) => idx1 !== questionNo
              ),
            };
          } else {
            return curLesson;
          }
        }),
      ],
    }));
  };

  return (
    <Accordion
      sx={{
        backgroundColor: "white",
      }}
      expanded={isExpanded}
      //onChange={() => setIsExpanded(!isExpanded)}
    >
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon
            sx={{
              color: theme.palette.grey.grey500,
              fontSize: "1.5rem",
              // p: 0,
              // m: 0,
              //marginTop: "2rem",
              margin: "1rem 0.2rem 1rem 0.2rem",
            }}
            onClick={(event) => {
              setIsExpanded(!isExpanded);
            }}
          />
        }
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          // backgroundColor: (theme) => theme.palette.grey.grey50,
          padding: "0rem 0.5rem 0 1rem",
          margin: 0,
          backgroundColor: "transparent",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          "&:hover": {
            backgroundColor: "transparent",
          },
          "&:focus": {
            backgroundColor: "transparent",
          },
          "&:active": {
            backgroundColor: "transparent",
          },
          /// no background for focused and not hovered -> when it happens simultaneously
          
          "&:not(:hover):not(:focus):not(:active)": {
            backgroundColor: "transparent",
          },
          '& .MuiAccordionSummary-content': {
            margin: '1rem 0.3rem', // Adjust margins as needed
          },
          '& .MuiAccordionSummary-content.Mui-expanded': {
            margin: '1rem 0.3rem', // Ensure consistent margin when expanded
          },

          // add styl
        }}
        onClick={(event) => {}}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.2rem",
              justifyContent: "flex-start",
              width: "fit-content",
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
                  fontWeight: "500",
                }}
              >
                Question {lessonIdx + 1}.{questionNo + 1}
                {/* Lesson 
            {question.question}
            {question.options}
            {question.answer} */}
              </span>
              &nbsp;&nbsp;&nbsp;&nbsp;
            </Typography>
            <StyledButton
              variant="outlined"
              sx={{
                ml: "auto",
                //mr: "1rem",
                color: (theme) => theme.palette.grey.grey600,
                
                borderColor: (theme) => theme.palette.grey.grey600,
                border: "none",
                "&&": {
                  padding: "0.1rem 0.5rem",
                  borderRadius: "1000px",
                  color: theme.palette.grey.grey700,
                  // backgroundColor: theme.palette.error.light,
                  fontSize: "0.9rem",
                  fontWeight: "400",
                },
                "&:hover": {
                  border: "none",
                },
                
              }}
              onClick={async (event) => {
                event.stopPropagation();

                deleteQuestion();
              }}
            >
            
              Delete
            </StyledButton>
          </Box>
          <Box>
            <StyledTextField1
              placeholder="Write question here"
              multiline
              maxRows={isMobileScreens ? 4 : 2}
              id="question"
              inputProps={{
                maxLength: 500,
              }}
              // change font size of input
              onChange={setQuestion}
              value={question.question}
              sx={{
                p: 0,
                "& .MuiInputBase-input": {
                  fontSize: "1rem",
                  fontWeight: "400",

                  color: (theme) => theme.palette.grey.grey600,
                },
                width: "100%",
              }}
            />
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <QuestionFormDetails 
          question={question}
          courseState={courseState}
          setCourseState={setCourseState}
          questionNo={questionNo}
          lessonIdx={lessonIdx}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default QuestionForm;
