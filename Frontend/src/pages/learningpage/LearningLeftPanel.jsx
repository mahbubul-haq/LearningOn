import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import FlexBetween from "../../components/FlexBetween";

// import Checkbox from "@mui/material/Checkbox";
import { useTheme } from "@emotion/react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useContext } from "react";
import { StyledCheckbox } from "../../components/StyledButton";
import { LearningCourseContext } from "../../state/LearningCourseContex";

export const LearningLeftPanel = ({ courseInfo, scrollTop }) => {
  const {
    openedLesson,
    setOpenedLesson,
    expandedLessons,
    setExpandedLessons,
    setOpenDrawer,
  } = useContext(LearningCourseContext);

  const theme = useTheme();

  return (
    <Box sx={{}}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.4rem",

          // backgroundColor: inputSection === "basic info" ? backgroundColor : "",
          // cursor: "pointer",
        }}
        // onClick={() => setInputSection("course content")}
      >
        <Typography
          sx={{
            fontWeight: "600",
            mb: "0.8rem",
            pl: "0rem",
            fontSize: "1.1rem",
            // cursor: "pointer",
            // padding: "0 0rem 0rem 2rem",
          }}
          // onClick={() => setInputSection("course content")}
        >
          Lessons
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0rem",
          // borderLeft:
          //     inputSection === "course content"
          //         ? `4px solid ${theme.palette.grey.grey400}`
          //         : "",
          // padding: "0 0rem 0rem 2rem",
          // cursor: "pointer",
        }}
        // onClick={() => setInputSection("course content")}
      >
        {courseInfo?.lessons?.length > 0 ? (
          <React.Fragment key={courseInfo.lessons?.length}>
            {courseInfo.lessons.map((lesson, index) => (
              <React.Fragment key={index}>
                <FlexBetween
                  sx={{
                    backgroundColor:
                      openedLesson.subLesson === 0 &&
                      openedLesson.lesson === index + 1
                        ? theme.palette.primary.main
                        : "transparent",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.light,
                    },
                    "&&": {
                      gap: "0.5rem",
                    },
                  }}
                >
                  <FlexBetween
                    gap="0.8rem"
                    sx={{
                      "&&": {
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        cursor: "pointer",
                        p: "1rem 0rem 1rem 1rem",
                      },
                    }}
                    onClick={() => {
                      setOpenedLesson({
                        lesson: index + 1,
                        subLesson: 0,
                      });
                      setOpenDrawer(false);
                      scrollTop();
                    }}
                  >
                    <StyledCheckbox
                      icon={
                        <RadioButtonUncheckedIcon
                          sx={{
                            fontSize: "1.1rem",
                          }}
                        />
                      }
                      checkedIcon={
                        <CheckCircleIcon
                          sx={{
                            fontSize: "1.1rem",
                          }}
                        />
                      }
                      checked={false}
                      sx={{
                        "&&": {
                          // different color if checked vs unchecked
                          color: theme.palette.grey.grey400,
                        },
                        // border: "1px solid #E0E0E0"
                      }}
                    />
                    <Box
                      sx={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        gap: "1rem",
                        display: "flex",
                        // border: "2px solid black"
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          color: (theme) => theme.palette.grey.grey600,
                          fontSize: "0.9rem",
                          fontWeight: "600",
                        }}
                      >
                        {index + 1}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: (theme) => theme.palette.grey.grey600,
                          fontSize: "0.9rem",
                        }}
                      >
                        {lesson?.title}
                      </Typography>
                    </Box>
                  </FlexBetween>
                  <Box
                    sx={{
                      p: "1rem 1rem 1rem 0",
                      
                      
                      cursor: "pointer",
                      height: "100%",
                      // border: "2px solid red"
                      // width: "2rem",
                      // display: "flex",
                      // alignItems: "center",
                      // justifyContent: "center"
                    }}
                    onClick={(e) => {
                      if (expandedLessons.includes(index + 1)) {
                        setExpandedLessons((prev) =>
                          prev.filter((item) => item !== index + 1)
                        );
                      } else {
                        setExpandedLessons((prev) => [...prev, index + 1]);
                      }
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                  >
                    <ExpandMoreIcon
                      sx={{
                        transform: expandedLessons.includes(index + 1)
                          ? "rotate(180deg)"
                          : "",
                        transition: "transform 0.3s ease-in-out",
                        color: theme.palette.grey.grey600,
                        fontSize: "1.5rem",
                      }}
                    />
                  </Box>
                </FlexBetween>
                <Box
                  sx={{
                    height: expandedLessons.includes(index + 1)
                      ? "auto"
                      : "0px",
                    maxHeight: expandedLessons.includes(index + 1)
                      ? "1000px"
                      : "0px",
                    transition: "all 0.5s ease",
                    ///add webkit transition
                    // transition not working
                    overflow: "hidden",
                  }}
                >
                  {lesson.subLessons?.map((subLesson, subIndex) => (
                    <FlexBetween
                      key={subLesson.title + subIndex}
                      gap="0.8rem"
                      sx={{
                        "&&": {
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          cursor: "pointer",
                          p: "1rem 1rem",
                          paddingLeft: "2rem",
                        },
                        backgroundColor:
                          openedLesson.subLesson === subIndex + 1 &&
                          openedLesson.lesson === index + 1
                            ? theme.palette.primary.main
                            : "transparent",
                        "&:hover": {
                          backgroundColor: theme.palette.primary.light,
                        },
                      }}
                      onClick={() => {
                        setOpenedLesson({
                          lesson: index + 1,
                          subLesson: subIndex + 1,
                        });
                        setOpenDrawer(false);
                        scrollTop();
                      }}
                    >
                      <StyledCheckbox
                        icon={
                          <RadioButtonUncheckedIcon
                            sx={{
                              fontSize: "1.1rem",
                            }}
                          />
                        }
                        checkedIcon={
                          <CheckCircleIcon
                            sx={{
                              fontSize: "1.1rem",
                            }}
                          />
                        }
                        checked={false}
                        sx={{
                          "&&": {
                            // different color if checked vs unchecked
                            color: theme.palette.grey.grey400,
                          },
                          // border: "1px solid #E0E0E0"
                        }}
                      />
                      <Box
                        sx={{
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          gap: "1rem",
                          display: "flex",
                          // border: "2px solid black"
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            color: (theme) => theme.palette.grey.grey600,
                            fontSize: "0.9rem",
                            fontWeight: "600",
                          }}
                        >
                          {index + 1}.{subIndex + 1}{" "}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            color: (theme) => theme.palette.grey.grey600,
                            fontSize: "0.9rem",
                          }}
                        >
                          {subLesson.title}
                        </Typography>
                      </Box>
                    </FlexBetween>
                  ))}
                  {lesson.questions?.length > 0 && (
                  <FlexBetween
                      key={lesson.questions[0].question + index}
                      gap="0.8rem"
                      sx={{
                        "&&": {
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          cursor: "pointer",
                          p: "1rem 1rem",
                          paddingLeft: "2rem",
                        },
                        backgroundColor:
                          openedLesson.subLesson === lesson.subLessons.length + 1 &&
                          openedLesson.lesson === index + 1
                            ? theme.palette.primary.main
                            : "transparent",
                        "&:hover": {
                          backgroundColor: theme.palette.primary.light,
                        },
                      }}
                      onClick={() => {
                        setOpenedLesson({
                          lesson: index + 1,
                          subLesson: lesson.subLessons.length + 1,
                        });
                        setOpenDrawer(false);
                        scrollTop();
                      }}
                    >
                      <StyledCheckbox
                        icon={
                          <RadioButtonUncheckedIcon
                            sx={{
                              fontSize: "1.1rem",
                            }}
                          />
                        }
                        checkedIcon={
                          <CheckCircleIcon
                            sx={{
                              fontSize: "1.1rem",
                            }}
                          />
                        }
                        checked={false}
                        sx={{
                          "&&": {
                            // different color if checked vs unchecked
                            color: theme.palette.grey.grey400,
                          },
                          // border: "1px solid #E0E0E0"
                        }}
                      />
                      <Box
                        sx={{
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          gap: "1rem",
                          display: "flex",
                          // border: "2px solid black"
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            color: (theme) => theme.palette.grey.grey600,
                            fontSize: "0.9rem",
                            fontWeight: "600",
                          }}
                        >
                          {index + 1}.{lesson.subLessons.length + 1}{" "}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            color: (theme) => theme.palette.grey.grey600,
                            fontSize: "0.9rem",
                            fontWeight: "600",
                          }}
                        >
                         Lesson {index + 1} Questions
                        </Typography>
                      </Box>
                    </FlexBetween>
                  )}
                </Box>
              </React.Fragment>
            ))}
          </React.Fragment>
        ) : (
          <Typography
            variant="body1"
            sx={{
              color: (theme) => theme.palette.grey.grey600,
              fontSize: "0.9rem",
            }}
          >
            No lessons found
          </Typography>
        )}
      </Box>
    </Box>
  );
};
