import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import ListIcon from "@mui/icons-material/List";
import { Drawer, IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import { LearningCourseContext } from "../../state/LearningCourseContex";
import { LearningLeftPanel } from "./LearningLeftPanel";

const LearningPageTop = ({ courseInfo }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const isMobileScreens = useMediaQuery("(max-width: 600px)");
  const minWidth300 = useMediaQuery("(min-width:300px)");
  const minWidth250 = useMediaQuery("(min-width: 250px)");
  const { openedLesson, openDrawer, setOpenDrawer } = useContext(
    LearningCourseContext
  );

  return (
    <Box
      sx={{
        //padding: isNonMobileScreens ? "3rem 5rem 1.5rem 5rem" : "0rem",
        backgroundColor: theme.palette.background.bottom,
        backgroundImage: `linear-gradient(to bottom, ${theme.palette.background.top}, ${theme.palette.background.bottom})`,
        // background: "transparent",
        height: isNonMobileScreens ? "5rem" : "4rem",
        color: theme.palette.text.primary,
        display: "flex",
        justifyContent: isNonMobileScreens ? "center" : "space-between",
        position: "sticky",
        top: 0,
        alignItems: "center",
        // gap: "2rem",
      }}
    >
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "100%",
            maxWidth: "400px",
          },
          zIndex: 5000000,
        }}
      >
        <Box
          sx={{
            padding: "0.5rem",
            pb: "0",
            // paddingLeft: "2rem",
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            // border: "1px solid black",
            alignItems: "center",
          }}
        >
          <IconButton onClick={() => setOpenDrawer(false)}>
            <CloseIcon
              sx={{
                fontSize: "1.5rem",
              }}
            />
          </IconButton>
        </Box>
        <Box
          sx={{
            padding: "0 1rem 1rem 1rem",
          }}
        >
          <LearningLeftPanel courseInfo={courseInfo} />
        </Box>
      </Drawer>
      <FlexBetween
        sx={{
          padding: isNonMobileScreens
            ? "0 5rem"
            : isMobileScreens
              ? "0 1rem"
              : "0 2rem",
          width: "100%",
          maxWidth: "2000px",
          mx: "auto",
        }}
      >
        <FlexBetween sx={{ width: "100%" }}>
          <FlexBetween sx={{ width: isNonMobileScreens ? "100%" : "80%" }}>
            <IconButton onClick={() => navigate(`/course/${courseInfo._id}`)}>
              <ArrowBackIcon
                sx={{
                  color: theme.palette.grey.grey400,
                  fontSize: isNonMobileScreens ? "2rem" : "1.5rem",
                }}
              />
            </IconButton>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                alignItems: "center",
                justifySelf: isNonMobileScreens ? "center" : "flex-start",
                width: isNonMobileScreens ? "100%" : "85%",
              }}
            >
              {minWidth250 && (
                <Typography
                  variant={isNonMobileScreens ? "h3600" : "h5600"}
                  sx={{
                    whiteSpace: "nowrap",
                  }}
                >
                  {openedLesson.subLesson ===
                    courseInfo?.lessons[openedLesson.lesson - 1]?.subLessons.length +
                    1
                    ? `Quiz ${openedLesson?.lesson}`
                    : `Lesson ${openedLesson?.lesson}${openedLesson?.subLesson
                      ? "." + openedLesson.subLesson
                      : ""
                    }`}
                </Typography>
              )}
              {minWidth300 && (
                <Typography
                  variant={isNonMobileScreens ? "h3" : "h5"}
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {openedLesson?.subLesson === courseInfo?.lessons[
                    openedLesson?.lesson - 1]?.subLessons.length + 1 ?
                    `Lesson ${openedLesson?.lesson} Questions` :
                  openedLesson?.subLesson === 0
                    ? courseInfo?.lessons &&
                    courseInfo?.lessons[openedLesson?.lesson - 1]?.title
                    : courseInfo?.lessons &&
                    courseInfo?.lessons[openedLesson?.lesson - 1]?.subLessons[
                      openedLesson?.subLesson - 1
                    ]?.title}
                </Typography>
              )}
            </Box>
          </FlexBetween>
          {!isNonMobileScreens && (
            <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
              <ListIcon
                sx={{
                  fontSize: "2rem",
                  cursor: "pointer",
                  color: theme.palette.grey.grey600,
                  "&:hover": {
                    color: theme.palette.grey.grey800,
                  },
                }}
              />
            </IconButton>
          )}
        </FlexBetween>
      </FlexBetween>
    </Box>
  );
};

export default LearningPageTop;
