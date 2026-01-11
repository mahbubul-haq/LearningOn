import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { StyledButton } from "../../components/StyledButton";
import useTheme from "@mui/material/styles/useTheme";
import { colorTokens } from "../../theme";

const NextPrevButtons = ({
  openedLesson,
  courseInfo,
  setOpenedLesson,
  expandedLessons,
  setExpandedLessons,
  scrollTop,
  topButtons,
}) => {
  const theme = useTheme();
  const handleNext = () => {

    if (
      openedLesson.subLesson ===
      courseInfo?.lessons[openedLesson.lesson - 1]?.subLessons?.length
    ) {
      setOpenedLesson({
        lesson: openedLesson.lesson + 1,
        subLesson: 1,
      });
      if (!expandedLessons.includes(openedLesson.lesson)) {
        setExpandedLessons((prev) => [...prev, openedLesson.lesson]);
      }
    } else {
      setOpenedLesson({
        lesson: openedLesson.lesson,
        subLesson: openedLesson.subLesson + 1,
      });
    }

    scrollTop();
  };

  const lastSubLesson = () => {
    if (openedLesson.lesson === courseInfo?.lessons?.length) {
      if (courseInfo?.lessons[openedLesson.lesson - 1]?.questions?.length > 0) {
        return (
          openedLesson.subLesson ===
          courseInfo?.lessons[openedLesson.lesson - 1]?.subLessons?.length
        );
      }
      return (
        openedLesson.subLesson ===
        courseInfo?.lessons[openedLesson.lesson - 1]?.subLessons?.length
      );
    }
    return false;
  };

  const handlePrev = () => {
    if (openedLesson.subLesson === 1) {
      if (openedLesson.lesson > 1) {
        setOpenedLesson({
          lesson: openedLesson.lesson - 1,
          subLesson:
            courseInfo?.lessons[openedLesson.lesson - 2]?.questions?.length > 0
              ? courseInfo?.lessons[openedLesson.lesson - 2]?.subLessons?.length
              : courseInfo?.lessons[openedLesson.lesson - 2]?.subLessons?.length,
        });

        if (!expandedLessons.includes(openedLesson.lesson - 2)) {
          setExpandedLessons((prev) => [...prev, openedLesson.lesson - 2]);
        }
      }
    } else {
      setOpenedLesson({
        lesson: openedLesson.lesson,
        subLesson: openedLesson.subLesson - 1,
      });
    }
    scrollTop();
  };



  return (
    <Box
      sx={{
        m: 0,
        display: "flex",
        justifyContent: "space-between",
        mt: topButtons ? "0" : "1rem",
      }}
    >

      {openedLesson.lesson == 1 && openedLesson.subLesson == 1 ? (
        <Box></Box>
      ) : (
        <StyledButton
          onClick={handlePrev}
          sx={{
            mr: "auto",
            backgroundColor: (theme) => theme.palette.learningPage.cardBg,
            color: (theme) => theme.palette.learningPage.textPrimary,
            border: (theme) => `1px solid ${theme.palette.learningPage.divider}`,
            backdropFilter: "blur(10px)",
            '&:hover': {
              backgroundColor: (theme) => theme.palette.learningPage.lessonHover,
              borderColor: (theme) => theme.palette.secondary.main,
            }
          }}
        >
          <KeyboardDoubleArrowLeftIcon sx={{ color: (theme) => theme.palette.secondary.main }} />
          <Typography
            sx={{
              fontWeight: "bold",
              pl: "0.5rem",
            }}
          >
            PREV
          </Typography>
        </StyledButton>
      )}
      {lastSubLesson() ? (
        <Box></Box>
      ) : (
        <StyledButton
          onClick={handleNext}
          sx={{
            backgroundColor: (theme) => theme.palette.homepage.buttonPrimary,
            color: colorTokens.white.pure,
            '&:hover': {
              backgroundColor: (theme) => theme.palette.homepage.buttonPrimaryHover,
            }
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              pr: "0.5rem",
            }}
          >
            NEXT
          </Typography>
          <KeyboardDoubleArrowRightIcon />
        </StyledButton>
      )}
    </Box>
  );
};

export default NextPrevButtons;
