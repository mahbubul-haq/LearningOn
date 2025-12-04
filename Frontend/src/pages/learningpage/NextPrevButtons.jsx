import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Box, Typography } from "@mui/material";
import React from "react";
import { StyledButton } from "../../components/StyledButton";

const NextPrevButtons = ({
  openedLesson,
  courseInfo,
  setOpenedLesson,
  expandedLessons,
  setExpandedLessons,
  scrollTop,
}) => {
  const handleNext = () => {
    if (openedLesson.subLesson === 0) {
      setOpenedLesson({
        lesson: openedLesson.lesson,
        subLesson: openedLesson.subLesson + 1,
      });
      if (!expandedLessons.includes(openedLesson.lesson)) {
        setExpandedLessons([...expandedLessons, openedLesson.lesson]);
      }
    } else {
      if (
        openedLesson.subLesson ===
        courseInfo.lessons[openedLesson.lesson - 1].subLessons.length
      ) {
        if (courseInfo.lessons[openedLesson.lesson - 1].questions?.length > 0) {
          setOpenedLesson({
            lesson: openedLesson.lesson,
            subLesson: openedLesson.subLesson + 1,
          });
        } else {
          setOpenedLesson({
            lesson: openedLesson.lesson + 1,
            subLesson: 0,
          });
        }
      } else if (
        openedLesson.subLesson ===
        courseInfo.lessons[openedLesson.lesson - 1].subLessons.length + 1
      ) {
        setOpenedLesson({
          lesson: openedLesson.lesson + 1,
          subLesson: 0,
        });
      } else {
        setOpenedLesson({
          lesson: openedLesson.lesson,
          subLesson: openedLesson.subLesson + 1,
        });

        if (!expandedLessons.includes(openedLesson.lesson)) {
          setExpandedLessons([...expandedLessons, openedLesson.lesson]);
        }
      }
    }

    scrollTop();
  };

  const lastSubLesson = () => {
    if (openedLesson.lesson === courseInfo?.lessons?.length) {
      if (courseInfo.lessons[openedLesson.lesson - 1].questions?.length > 0) {
        return (
          openedLesson.subLesson ===
          courseInfo.lessons[openedLesson.lesson - 1].subLessons.length + 1
        );
      }
      return (
        openedLesson.subLesson ===
        courseInfo.lessons[openedLesson.lesson - 1].subLessons.length
      );
    }
    return false;
  };

  const handlePrev = () => {
    if (openedLesson.subLesson === 0) {
      if (openedLesson.lesson > 1) {
        setOpenedLesson({
          lesson: openedLesson.lesson - 1,
          subLesson:
            courseInfo.lessons[openedLesson.lesson - 2].questions?.length > 0
              ? courseInfo.lessons[openedLesson.lesson - 2].subLessons.length +
                1
              : courseInfo.lessons[openedLesson.lesson - 2].subLessons.length,
        });

        if (!expandedLessons.includes(openedLesson.lesson - 1)) {
          setExpandedLessons([...expandedLessons, openedLesson.lesson - 1]);
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
        mb: "2rem",
        mt: "2rem",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {openedLesson.lesson == 1 && openedLesson.subLesson == 0 ? (
        <Box></Box>
      ) : (
        <StyledButton
          sx={{
            textTransform: "capitalize",
            fontWeight: "600",

            cursor: "pointer",
            "&&": {
              padding: "0.4rem 0.8rem",
              fontWeight: "600",
              background: "transparent",
              color: (theme) => theme.palette.primary.dark,
              "&:hover": {
                color: (theme) => theme.palette.primary.darker,
                background: (theme) => theme.palette.background.alt,
              },
            },
          }}
          onClick={handlePrev}
        >
          <KeyboardDoubleArrowLeftIcon />
          <Typography
            sx={{
              fontWeight: "600",
              pl: "0.5rem",
            }}
          >
            Prev
          </Typography>
        </StyledButton>
      )}
      {lastSubLesson() ? (
        <Box></Box>
      ) : (
        <StyledButton
          sx={{
            textTransform: "capitalize",
            fontWeight: "600",

            cursor: "pointer",
            "&&": {
              padding: "0.4rem 0.8rem",
              fontWeight: "600",

              background: "transparent",
              color: (theme) => theme.palette.primary.dark,
              "&:hover": {
                color: (theme) => theme.palette.primary.darker,
                background: (theme) => theme.palette.background.alt,
              },
            },
          }}
          onClick={handleNext}
        >
          <Typography
            sx={{
              fontWeight: "600",
              pr: "0.5rem",
            }}
          >
            Next
          </Typography>
          <KeyboardDoubleArrowRightIcon />
        </StyledButton>
      )}
    </Box>
  );
};

export default NextPrevButtons;
