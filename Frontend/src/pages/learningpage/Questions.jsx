import { Box, Typography, useTheme } from "@mui/material";
import React, { useContext, useEffect } from "react";

import useMediaQuery from "@mui/material/useMediaQuery";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { StyledButton } from "../../components/StyledButton";
import { LearningCourseContext } from "../../state/LearningCourseContex";
import { submitQuiz } from "../../state/reduxStore/learningPageSlice";
import Option from "./Option";


const Questions = ({ courseInfo, progressData }) => {
  const { openedLesson } = useContext(LearningCourseContext);
  const isMobileScreens = useMediaQuery("(max-width: 600px)");
  const { answer } = useSelector((state) => state.course);
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
    if (progressData?.completed?.includes(q)) {
      remAttempt = 0;
    } else if (progressData.ongoing.includes(q)) {
      remAttempt = 1;
    }

    return remAttempt;
  };

  const isWrong = (lessonNo, questionIdx, optionIdx) => {
    if (!progressData) return;
    let q = "Q" + lessonNo + "_" + (questionIdx + 1);
    if (
      progressData.completed.includes(q) &&
      progressData.progressData[q].isCorrect == false &&
      progressData.progressData[q].yourAnswer == "" + (optionIdx + 1)
    ) {
      return true;
    } else if (
      progressData.ongoing.includes(q) &&
      progressData.progressData[q].yourAnswer == "" + (optionIdx + 1)
    ) {
      return true;
    }

    return false;
  };

  const isCorrect = (lessonNo, questionIdx, optionIdx) => {
      if (!progressData) return;
      let q = "Q" + lessonNo + "_" + (questionIdx + 1);
      if (
        progressData.completed.includes(q) &&
        progressData.progressData[q].isCorrect == true &&
        progressData.progressData[q].correctAnswer == "" + (optionIdx + 1)
      ) {
        return true;
      }
      return false;
    };
  const formQuestion = (lessonNo, questionIdx) => {
    return `Q${lessonNo}_${questionIdx + 1}`;
  };

  const totalAttemptCorrect = (lessonNo) => {
    let attempting = 0;
    let totalCorrect = 0;
    let completed = 0;
    progressData?.completed?.forEach((cur) => {
      let lessonNumber = parseInt(cur.split("_")[0].substring(1));
      if (lessonNumber == lessonNo) completed++;
      if (lessonNumber == lessonNo && progressData.progressData[cur].isCorrect) totalCorrect++;
    });

    progressData?.ongoing?.forEach((cur) => {
      let lessonNumber = parseInt(cur.split("_")[0].substring(1));
      if (lessonNumber == lessonNo) attempting++;
    })
    return [completed, totalCorrect, attempting];
  }

  const noAnswer = (lessonNo) => {
    let isNoAnswer = true;
    Object.keys(answer).forEach((key) => {
      let lessonNumber = parseInt(key.split("_")[0].substring(1));
      if (lessonNumber == lessonNo) {
        isNoAnswer = false;
        return;
      }
    });
    return isNoAnswer;
  }

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
                            <Option
                              key={idx2}
                              courseInfo={courseInfo}
                              openedLesson={openedLesson}
                              lessonIdx={idx}
                              questionIdx={idx1}
                              optionIdx={idx2}
                              answer={answer}
                              attemptLeft={attemptLeft}
                              progressData={progressData}
                              option={option}
                              isWrong={isWrong}
                              isCorrect={isCorrect}
                            />
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
                        {attemptLeft(openedLesson.lesson, idx1 + 1) > 0 ? (
                          <Typography
                            sx={{
                              fontSize: "0.8rem",
                              color: theme.palette.grey.grey300,
                            }}
                          >
                            Attempt left&nbsp;
                              <FaLongArrowAltRight />
                              &nbsp;
                            {attemptLeft(openedLesson.lesson, idx1 + 1)}
                          </Typography>
                        ) : progressData?.progressData[
                            formQuestion(openedLesson.lesson, idx1)
                          ]?.yourAnswer ? (
                          <Box
                            sx={{
                              display: "flex",
                              gap: "0.4rem",
                              color: theme.palette.error.main,
                              alignItems: "center"
                            }}
                          >
                            {/* <IoMdInformationCircleOutline size={16} /> */}
                            <Typography>
                              Correct Answer&nbsp;
                              <FaLongArrowAltRight />
                              &nbsp;
                              <b>
                                {
                                  progressData?.progressData[
                                    formQuestion(openedLesson.lesson, idx1)
                                  ].correctAnswer
                                }
                              </b>
                            </Typography>
                          </Box>
                        ) : (
                          <Typography sx={{
                            color: theme.palette.success.main
                          }}>
                            Correct 🎉
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  );
                })}
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column"
                  }}
                >
                  
                  <StyledButton
                    disabled={noAnswer(openedLesson.lesson)}
                    sx={{
                      "&&": {
                        borderRadius: "1000px",
                        width: "fit-content"
                      },
                    }}
                    onClick={() => {
                      if (noAnswer(openedLesson.lesson)) return;
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
                  <Box sx={{
                    display: "flex",
                    gap: "1rem",
                    mt: "3rem",
                    flexDirection: isMobileScreens ? "column" : "row",
                   
                    alignItems: "center",
                  }}>
                  <Typography sx={{
                    color: theme.palette.secondary.main,
                    fontWeight: 500,
                  }}>
                    Completed:  {totalAttemptCorrect(openedLesson.lesson)[0]}/{lesson.questions?.length}
                  </Typography>
                  <Typography sx={{
                    color: theme.palette.success.main,
                    fontWeight: 500,
                  }}>
                    Correct: {totalAttemptCorrect(openedLesson.lesson)[1]}
                  </Typography>
                  <Typography sx={{
                    color: theme.palette.error.main,
                    fontWeight: 500,
                  }}>
                    Attempting: {totalAttemptCorrect(openedLesson.lesson)[2]}
                  </Typography>
                  </Box>
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
