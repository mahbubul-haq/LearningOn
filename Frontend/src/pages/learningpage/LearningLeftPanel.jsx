import { CircularProgress, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import FlexBetween from "../../components/FlexBetween";

// import Checkbox from "@mui/material/Checkbox";
import { useTheme } from "@emotion/react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useContext } from "react";
import { StyledCheckbox } from "../../components/StyledButton";
import { LearningCourseContext } from "../../state/LearningCourseContex";
import "./LearningPage.css";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { CiPlay1 } from "react-icons/ci";
import { FiPlay } from "react-icons/fi";
import { PiPlayBold } from "react-icons/pi";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { BsCheckCircleFill } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckIcon from '@mui/icons-material/Check';

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
            pl: "1rem",
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
                    background:
                      openedLesson.subLesson === 0 &&
                        openedLesson.lesson === index + 1
                        ? `linear-gradient(to right, #ffffff1a, #ffffff86)`
                        : "transparent",

                    boxShadow: openedLesson.subLesson === 0 && openedLesson.lesson === index + 1 ? `inset 4px 0 0 0 ${theme.palette.secondary.main},0 4px 12px rgba(0,0,0,0.03)` : "",
                    "&:hover": {
                      background: `linear-gradient(to right, #ffffff1a, #ffffff3f)`,
                    },
                    "&&": {
                      gap: "0.5rem",
                    },
                  }}
                >
                  <FlexBetween

                    sx={{
                      "&&": {
                        justifyContent: "flex-start",
                        alignItems: "center",
                        cursor: "pointer",
                        p: "0.9rem 0rem 0.9rem 1rem",
                        gap: "0.5rem"
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
                    <Box sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "500px",
                      backgroundColor: openedLesson.subLesson === 0 && openedLesson.lesson === index + 1 ? theme.palette.secondary.main : "rgba(255, 255, 255, 0.1)",
                      boxShadow: openedLesson.subLesson === 0 && openedLesson.lesson === index + 1 ? `inset 4px 0 0 0 ${theme.palette.secondary.main},0 4px 12px rgba(0,0,0,0.03)` : "",
                    }}>
                      {/* <CircularProgress variant="determinate" value={75} thickness={7} size={20} sx={{
                        color: "#31a3e6ff",
                      }} /> */}
                      {/* <PlayCircleIcon sx={{
                        color: "#5cb983ff",
                        //background: "#5cb983ff",
                        fontSize: "2rem",
                        height: "2rem",
                        width: "2rem",
                        borderRadius: "500px",
                        padding: "0",
                        boxShadow: "0 0 10px 0 #5cb983ff",
                      }} /> */}
                      {openedLesson.subLesson == 0 && openedLesson.lesson == index + 1 ?
                        <PiPlayBold style={{
                          color: "#1febfaff",

                          height: "1rem",
                          width: "1rem",

                        }} />
                        : <PiPlayBold style={{
                          color: "#1febfaff",
                          // fontSize: "2rem",
                          height: "1rem",
                          width: "1rem",
                          // background: "rgba(255, 255, 255, 0.9)",
                          // borderRadius: "500px",
                          // padding: "0",
                          // boxShadow: "0 0 10px 0 #5cb983ff",
                        }} />
                      }
                    </Box>


                    <Box
                      sx={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        gap: "0.7rem",
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

                      sx={{
                        "&&": {
                          justifyContent: "flex-start",
                          alignItems: "center",
                          cursor: "pointer",
                          p: "0.9rem 1rem",
                          gap: "0.5rem"
                        },
                        background:
                          openedLesson.subLesson === subIndex + 1 &&
                            openedLesson.lesson === index + 1 ?
                            "linear-gradient(to right, #ffffff1a, #ffffff86)" : "transparent",
                        boxShadow: openedLesson.subLesson === subIndex + 1 && openedLesson.lesson === index + 1 ? `inset 4px 0 0 0 ${theme.palette.secondary.main},0 4px 12px rgba(0,0,0,0.03)` : "",

                        "&:hover": {
                          background: "linear-gradient(to right, #ffffff1a, #ffffff3f)",
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
                      <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "2rem",
                        height: "2rem",
                        borderRadius: "500px",
                        backgroundColor: openedLesson.subLesson === subIndex + 1 && openedLesson.lesson === index + 1 ? theme.palette.secondary.main : "rgba(255, 255, 255, 0.5)",
                        boxShadow: openedLesson.subLesson === subIndex + 1 && openedLesson.lesson === index + 1 ? `0 0 10px 0 ${theme.palette.secondary.main}` : "",
                        overflow: "hidden",
                        alignSelf: "center",
                        flexShrink: 0,
                        transition: "all 0.3s ease-in-out",
                      }}>
                        {/* <CircularProgress variant="determinate" value={75} thickness={7} size={20} sx={{
                        color: "#31a3e6ff",
                      }} /> */}
                        {/* <PlayCircleIcon sx={{
                        color: "#5cb983ff",
                        //background: "#5cb983ff",
                        fontSize: "2rem",
                        height: "2rem",
                        width: "2rem",
                        borderRadius: "500px",
                        padding: "0",
                        boxShadow: "0 0 10px 0 #5cb983ff",
                      }} /> */}
                        {openedLesson.subLesson === subIndex + 1 && openedLesson.lesson === index + 1 ?

                          <PiPlayBold
                            style={{
                              color: "#1febfaff",
                              height: "1rem",
                              width: "1rem",
                            }}
                          /> : Math.random() > 0.5 ?

                            <CheckIcon

                              style={{
                                // background: "rgba(255,255,255, 0.9)",
                                fontSize: "1rem",
                                color: "#1febfaff",
                                padding: 0,

                              }}
                            />

                            :
                            <RadioButtonUncheckedIcon
                              size={20}
                              style={{
                                // background: "rgba(255,255,255, 0.9)",
                                color: "#707070ff",
                                padding: 0,
                              }}
                            />

                        }
                      </Box>
                      <Box
                        sx={{
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          gap: "0.7rem",
                          display: "flex",

                          // border: "2px solid black"
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            color: (theme) => theme.palette.grey.grey600,
                            color: theme.palette.text.primary,
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
                            color: theme.palette.text.primary,
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

                      sx={{
                        "&&": {
                          justifyContent: "flex-start",
                          alignItems: "center",
                          cursor: "pointer",
                          p: "0.9rem 1rem",
                          gap: "0.5rem",
                        },
                        backgroundColor:
                          openedLesson.subLesson === lesson.subLessons.length + 1 &&
                            openedLesson.lesson === index + 1
                            ? `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`
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
                      <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "2rem",
                        height: "2rem",
                        borderRadius: "500px",
                        backgroundColor: 1 == 0 ? "#02b68fff" : "rgba(255, 255, 255, 0.7)",
                        boxShadow: 1 == 0 ? "0 0 10px 0 #02b68fff" : "",
                      }}>
                        <CircularProgress variant="determinate" value={75} thickness={5} size={16} sx={{
                          color: "#35a0dfff",
                        }} />


                      </Box>
                      <Box
                        sx={{
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          gap: "0.7rem",
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
    </Box >
  );
};
