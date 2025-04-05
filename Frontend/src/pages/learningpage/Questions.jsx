import { Box, Typography, useTheme } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyledButton } from "../../components/StyledButton";
import { LearningCourseContext } from "../../state/LearningCourseContex";
import { submitQuiz } from "../../state/reduxStore/learningPageSlice";

const Questions = ({ courseInfo, progressData }) => {
  const { openedLesson } = useContext(LearningCourseContext);
  const [answer, setAnswer] = React.useState({});
  const theme = useTheme();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    console.log("questions", courseInfo);
    console.log("progressData", progressData);
  });
  useEffect(() => {
    console.log("answer", answer);
  }, [answer]);

  const attemptLeft = (lessonNo, questionNo) => {
    let q = "Q" + lessonNo + "_" + questionNo;
    let remAttempt = 2;
    if (progressData.completed.includes(q)) {
      remAttempt = 0;
    } else if (progressData.ongoing.includes(q)) {
      remAttempt = 1;
    }

    return remAttempt;
  };

  return (
    <>
      {courseInfo.lessons?.map((lesson, idx) => {
        if (idx == openedLesson.lesson - 1) {
          return (
            <React.Fragment key={idx}>
              <Box>
                {lesson.questions?.map((question, idx1) => {
                  return (
                    <Box
                      key={idx1}
                      sx={{
                        mb: "2rem",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "0.7rem",
                          color: theme.palette.grey.grey200,
                        }}
                      >
                        Question {idx1 + 1} of {lesson.questions?.length}
                      </Typography>
                      <Typography variant="h5600">
                        {question.question}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "1rem",
                          m: "1rem 0 1rem 0",
                        }}
                      >
                        {question.options?.map((option, idx2) => {
                          return (
                            <Box
                              key={idx2}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                                background:
                                  answer[
                                    `Q${openedLesson.lesson}_${idx1 + 1}`
                                  ] == `${idx2 + 1}`
                                    ? theme.palette.background.questionSelected
                                    : theme.palette.grey.grey150,
                                padding: "0.6rem 0.6rem",
                                borderRadius: "0.1rem",
                                cursor:
                                  attemptLeft(openedLesson.lesson, idx1 + 1) > 0
                                    ? "pointer"
                                    : "auto",
                                "&:hover": {
                                  outline:
                                    attemptLeft(openedLesson.lesson, idx1 + 1) >
                                    0
                                      ? `2px solid ${theme.palette.primary.main}`
                                      : "none",
                                  // background:
                                  //   attemptLeft(openedLesson.lesson, idx1 + 1) >
                                  //   0
                                  //     ? theme.palette.background.questionHover
                                  //     : theme.palette.grey.grey150,
                                },
                              }}
                              onClick={() => {
                                if (
                                  attemptLeft(openedLesson.lesson, idx1 + 1) > 0
                                ) {
                                  setAnswer({
                                    ...answer,
                                    [`Q${openedLesson.lesson}_${idx1 + 1}`]: `${
                                      idx2 + 1
                                    }`,
                                  });
                                }
                              }}
                            >
                              <Box
                                sx={{
                                  border: `1px solid ${theme.palette.grey.grey400}`,
                                  padding: "0.2rem",
                                  borderRadius: "50%",
                                  width: "24px",
                                  height: "24px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontWeight: 500,
                                  fontSize: "0.8rem",
                                }}
                              >
                                {idx2 + 1}
                              </Box>
                              <Typography
                                sx={{
                                  fontSize: "0.9rem",
                                }}
                              >
                                {" "}
                                {option}
                              </Typography>
                            </Box>
                          );
                        })}
                      </Box>
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "0.8rem",
                            color: theme.palette.grey.grey300,
                          }}
                        >
                          Attempt left:{" "}
                          {attemptLeft(openedLesson.lesson, idx1 + 1)}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <StyledButton
                    sx={{
                      "&&": {
                        borderRadius: "1000px",
                      },
                    }}
                    onClick={() => {
                      dispatch(
                        submitQuiz({
                          courseId: courseInfo._id,
                          token: token,
                          lessonNo: openedLesson.lesson,
                          answer,
                        })
                      );
                    }}
                  >
                    Submit
                  </StyledButton>
                </Box>
              </Box>
            </React.Fragment>
          );
        } else return null;
      })}
    </>
  );
};

export default Questions;
