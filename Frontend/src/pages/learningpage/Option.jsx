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
  progressData,
  answer,
  attemptLeft,
  option,
  isWrong,
  isCorrect
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const getOptionBackground = (lessonNo, questionIdx, optionIdx) => {
    if (!progressData) return;
    let q = "Q" + lessonNo + "_" + (questionIdx + 1);

    if (answer[q] == `${optionIdx + 1}`) {
      return theme.palette.background.questionSelected;
    } else if (
      progressData.ongoing.includes(q) &&
      progressData.progressData[q].yourAnswer == "" + (optionIdx + 1)
    ) {
      return theme.palette.error.light1;
    } else if (
      progressData.completed.includes(q) &&
      progressData.progressData[q].isCorrect == false &&
      progressData.progressData[q].yourAnswer == "" + (optionIdx + 1)
    ) {
      return theme.palette.error.light1;
    } else if (
      progressData.completed.includes(q) &&
      progressData.progressData[q].isCorrect == true &&
      progressData.progressData[q].correctAnswer == "" + (optionIdx + 1)
    ) {
      return theme.palette.background.questionCorrect;
    } else {
      return theme.palette.grey.grey150;
    }
  };

  

  

  
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.5rem",
        background: getOptionBackground(
          openedLesson.lesson,
          questionIdx,
          optionIdx
        ),
        padding: "0.6rem 0.6rem",
        borderRadius: "0.1rem",
        cursor:
          attemptLeft(openedLesson.lesson, questionIdx + 1) > 0
            ? "pointer"
            : "auto",
        "&:hover": {
          outline:
            attemptLeft(openedLesson.lesson, questionIdx + 1) > 0
              ? `2px solid ${theme.palette.primary.main}`
              : "none",
        },
      }}
      onClick={() => {
        if (attemptLeft(openedLesson.lesson, questionIdx + 1) > 0) {
          if (
            answer[`Q${openedLesson.lesson}_${questionIdx + 1}`] ==
            `${optionIdx + 1}`
          ) { 
            let key = `Q${openedLesson.lesson}_${questionIdx + 1}`
            const {[key]: removed, ...rest} = answer;
            dispatch(
              setAnswer(
                rest
              )
            );
            // setAnswer({
            //   ...answer,
            //   [`Q${openedLesson.lesson}_${questionIdx + 1}`]: "",
            // });
          } else {
            
            dispatch(
              setAnswer({
                ...answer,
                [`Q${openedLesson.lesson}_${questionIdx + 1}`] : `${optionIdx + 1}`,
              })
            );

            // setAnswer({
            //   ...answer,
            //   [`Q${openedLesson.lesson}_${questionIdx + 1}`]: `${
            //     optionIdx + 1
            //   }`,
            // });
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
          {optionIdx + 1}
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
