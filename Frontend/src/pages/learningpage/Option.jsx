import { Box, Typography } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import React from "react";
import { FaCheckSquare } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setAnswer } from "../../state/reduxStore/learningPageSlice";

const Option = ({
  courseInfo,
  openedLesson,
  lessonIdx,
  questionIdx,
  optionIdx,
  courseProgress,
  answer,
  attemptLeft,
  option,
  isWrong,
  isCorrect
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const getOptionBackground = (lessonNo, questionIdx, optionIdx, theme) => {
    if (!courseProgress) return "transparent";
    let q = "Q" + lessonNo + "_" + (questionIdx + 1);

    if (answer[q] == `${optionIdx + 1}`) {
      return (theme) => theme.palette.learningPage.lessonActive;
    } else if (
      (courseProgress.ongoing.includes(q) || courseProgress.completed.includes(q)) &&
      courseProgress.courseProgress[q].yourAnswer == "" + (optionIdx + 1)
    ) {
      return courseProgress.courseProgress[q].isCorrect ?
        `rgba(16, 185, 129, 0.15)` : // success with low opacity
        `rgba(239, 68, 68, 0.15)`;   // error with low opacity
    } else if (
      courseProgress.completed.includes(q) &&
      courseProgress.courseProgress[q].isCorrect == true &&
      courseProgress.courseProgress[q].correctAnswer == "" + (optionIdx + 1)
    ) {
      return `rgba(16, 185, 129, 0.15)`;
    } else {
      return (theme) => theme.palette.learningPage.cardBg;
    }
  };







  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.5rem",
        backgroundColor: getOptionBackground(
          openedLesson.lesson,
          questionIdx,
          optionIdx,
          theme
        ),
        padding: "0.8rem 1rem",
        borderRadius: "0.5rem",
        border: (theme) => `1px solid ${theme.palette.learningPage.divider}`,
        cursor:
          attemptLeft(openedLesson.lesson, questionIdx + 1) > 0
            ? "pointer"
            : "auto",
        transition: "all 0.2s ease",
        "&:hover": {
          backgroundColor: (theme) => theme.palette.learningPage.lessonHover,
          border: (theme) => `1px solid ${theme.palette.secondary.main}`,
        },
      }}
      onClick={() => {
        if (attemptLeft(openedLesson.lesson, questionIdx + 1) > 0) {
          if (
            answer[`Q${openedLesson.lesson}_${questionIdx + 1}`] ==
            `${optionIdx + 1}`
          ) {
            let key = `Q${openedLesson.lesson}_${questionIdx + 1}`
            const { [key]: removed, ...rest } = answer;
            dispatch(
              setAnswer(
                rest
              )
            );
          } else {

            dispatch(
              setAnswer({
                ...answer,
                [`Q${openedLesson.lesson}_${questionIdx + 1}`]: `${optionIdx + 1}`,
              })
            );
          }
        }
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Box
          sx={{
            border: (theme) => `1px solid ${theme.palette.learningPage.divider}`,
            backgroundColor: (theme) => theme.palette.learningPage.cardBg,
            padding: "0.2rem",
            borderRadius: "50%",
            width: "28px",
            height: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "0.9rem",
            color: (theme) => theme.palette.learningPage.textPrimary,
          }}
        >
          {optionIdx + 1}
        </Box>
        <Typography
          sx={{
            fontSize: "1rem",
            color: (theme) => theme.palette.learningPage.textPrimary,
          }}
        >
          {" "}
          {option}
        </Typography>

      </Box>
      {isCorrect(openedLesson.lesson, questionIdx, optionIdx) && (
        <Box
          sx={{
            color: theme.palette.success.main,
          }}
        >
          <FaCheckSquare
            size={18}
            sx={{
              color: theme.palette.background.questionSelected,
            }}
          />
        </Box>
      )}

      {isWrong(openedLesson.lesson, questionIdx, optionIdx) && (
        <Box
          sx={{
            color: theme.palette.error.main,
          }}
        >
          <IoMdCloseCircle
            size={20}
            sx={{
              color: theme.palette.error.light1,
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Option;
