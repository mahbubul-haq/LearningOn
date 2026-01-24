import { Autocomplete, Box, Typography, useMediaQuery, TextField } from "@mui/material";
import React, { useEffect } from "react";
import GlassTextField from "../../components/GlassTextField";
import { useContext, useRef } from "react";
import { CreateCourseContext } from "../../state/CreateCourse";

const QuestionFormDetails = ({
  question,
  courseState,
  setCourseState,
  questionNo,
  lessonIdx,
}) => {
  const isMobileScreens = useMediaQuery("(max-width:600px)");
  const { courseStateRef } = useContext(CreateCourseContext);
  const [options, setOptions] = React.useState(question?.options || ["", "", "", ""]);
  useEffect(() => {
  }, [question]);
  const changeOption = (e, index) => {
    setCourseState((prevState) => ({
      ...prevState,
      lessons: [
        ...prevState.lessons.map((curLesson, idx) => {
          if (idx == lessonIdx) {
            return {
              ...curLesson,
              questions: {
                ...curLesson.questions,
                questions: curLesson.questions?.questions?.map((curQuestion, idx1) => {
                  if (idx1 == questionNo) {
                    return {
                      ...curQuestion,
                      options: curQuestion.options.map((curOption, idx2) => {
                        if (idx2 == index) {
                          return e.target.value;
                        } else {
                          return curOption;
                        }
                      }),
                    };
                  } else {
                    return curQuestion;
                  }
                })
              }
            };
          } else {
            return curLesson;
          }
        }),
      ],
    }));
  };
  return (
    <Box
      sx={{
        padding: "0.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {question?.options?.map((option, index) => {
        return (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: isMobileScreens ? "column" : "row",
              justifyContent: "space-between",
              width: "100%",
              gap: isMobileScreens ? "0.5rem" : "1.5rem",
              alignItems: isMobileScreens ? "flex-start" : "center",
            }}
          >
            <Typography
              sx={{
                //no wrap
                whiteSpace: "nowrap",
              }}
            >
              Option {index + 1}
            </Typography>

            <TextField
              placeholder={"Option " + (index + 1)}
              multiline
              minRows={1}
              maxRows={Infinity}
              value={options[index]}
              onChange={(e) => {
                let newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
                if (courseStateRef.current.lessons[lessonIdx].questions?.questions[questionNo]) {
                  courseStateRef.current.lessons[lessonIdx].questions.questions[questionNo].options = newOptions;
                }
              }}
              onBlur={(e) => changeOption(e, index)}
              fullWidth
              variant="outlined"
              sx={{
                width: "100%",
                "&&": {
                  marginBottom: "0",
                },
                "& .MuiOutlinedInput-root": {
                  minHeight: "3rem",
                }
              }}
            ></TextField>
          </Box>
        );
      })}
      <Box sx={{
        mt: "1rem",
        width: "100%",
        display: "flex",
        flexDirection: isMobileScreens ? "column" : "row",
        justifyContent: "space-between",
        gap: isMobileScreens ? "0.5rem" : "1.5rem",
        alignItems: isMobileScreens ? "flex-start" : "center",
      }}>
        <Typography sx={{
          whiteSpace: "nowrap",
          // fontSize: "1rem",
          fontWeight: "500",
        }}>Correct Option</Typography>
        <Autocomplete
          disablePortal
          onChange={(event, value) => {
            setCourseState((prevState) => ({
              ...prevState,
              lessons: prevState.lessons.map((curLesson, idx) => {
                if (idx == lessonIdx) {
                  return {
                    ...curLesson,
                    questions: {
                      ...curLesson.questions,
                      questions: curLesson.questions?.questions?.map((curQuestion, idx1) => {
                        if (idx1 == questionNo) {
                          return {
                            ...curQuestion,
                            answer: value ? value.label : "",
                          };
                        } else {
                          return curQuestion;
                        }
                      }),
                    }
                  }
                } else {
                  return curLesson;
                }
              }),
            }));
          }}
          value={question.answer ? {
            label: question.answer,
            value: question.answer,
          } : null}
          id="category"
          options={[
            { label: "1", value: "1" },
            { label: "2", value: "2" },
            { label: "3", value: "3" },
            { label: "4", value: "4" },
          ]}
          sx={{
            width: "100%",
            maxWidth: "100%",
          }}
          renderInput={(params) => (
            <TextField
              placeholder="Choose correct option"
              {...params}
              size="small"
              fullWidth
              variant="outlined"
              sx={{
                width: "100%",
                "&&": {
                  marginBottom: "0",
                },
                "& .MuiOutlinedInput-root": {
                  minHeight: "3rem",
                }
              }}
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default QuestionFormDetails;
