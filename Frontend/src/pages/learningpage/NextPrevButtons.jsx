import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { StyledButton } from "../../components/StyledButton";
import useTheme from "@mui/material/styles/useTheme";

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

  const subtleBtnStyle = {
    textTransform: 'none',
    fontWeight: 600,
    color: 'rgba(10, 77, 44, 0.5)', // Faded green
    fontSize: '0.85rem',
    '&:hover': {
      color: '#0a4d2c',
      background: 'transparent'
    }
  };

  // BOTTOM NEXT (The "Stunning" Jelly)
  const nextBtnStyle = {
    px: "1.7rem",
    py: "0.5rem",
    borderRadius: '1000px', // Matches card corner better than pill
    background: 'linear-gradient(135deg, #5cb983ff 0%, #7bb15bff 100%)',
    boxShadow: `0 4px 15px rgba(0, 200, 83, 0.4), 
    0 8px 32px rgba(0, 0, 0, 0.1)`,
    color: theme.palette.text.primary,
    fontWeight: 700,
    border: '1px solid rgba(255, 255, 255, 0.3)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-2px) scale(1.02)',
      boxShadow: '0 12px 25px rgba(0, 200, 83, 0.5)',
      background: 'linear-gradient(135deg, #4a9b6cff 0%, #7bb15bff 100%)',
    }
  };

  return (
    <Box
      sx={{
        m: 0,
        display: "flex",
        justifyContent: "space-between",
      }}
    >

      {openedLesson.lesson == 1 && openedLesson.subLesson == 0 ? (
        <Box></Box>
      ) : (
        <Button
          // sx={navButtonStyle}
          onClick={handlePrev}
          sx={topButtons ? subtleBtnStyle : nextBtnStyle}
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
        </Button>
      )}
      {lastSubLesson() ? (
        <Box></Box>
      ) : (
        <Button
          // sx={navButtonStyle}
          onClick={handleNext}
          sx={topButtons ? subtleBtnStyle : nextBtnStyle}
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
        </Button>
      )}
    </Box>
  );
};

export default NextPrevButtons;
