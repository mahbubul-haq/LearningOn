import { Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import LeftPanelTop from "./LeftPanelTop";
import { useTheme } from "@mui/material/styles";
import "./LearningPage.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import LeftPanelLessons from "./LeftPanelLessons";

export const LearningLeftPanel = ({ courseInfo, scrollTop, courseProgress, aggregatedProgress, setIsCompletionDialogOpen }) => {


  const theme = useTheme();

  const isNonMobileScreens = useMediaQuery("(min-width: 900px)");



  return (
    <Box className="custom-scrollbar-thin"
      sx={{
        position: "sticky",
        top: "2rem",
        height: `calc(100vh - 4rem)`,
        backgroundColor: (theme) => theme.palette.learningPage.leftPanelBg,
        boxShadow: (theme) => theme.palette.learningPage.glassShadow,
        backdropFilter: (theme) => theme.palette.learningPage.backdropFilter,
        border: (theme) => `1px solid ${theme.palette.learningPage.glassBorder}`,
        borderRadius: "1rem",
        overflow: "hidden",
        display: "grid",
        gridTemplateRows: "auto auto 1fr",
        gap: "0",
      }}>
      <LeftPanelTop courseInfo={courseInfo} courseProgress={courseProgress} aggregatedProgress={aggregatedProgress} setIsCompletionDialogOpen={setIsCompletionDialogOpen} />
      <Divider sx={{ backgroundColor: (theme) => theme.palette.learningPage.divider }} />


      <Box className="custom-scrollbar-thin"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0rem",
          overflow: "auto",

        }}
      >
        {courseInfo?.lessons?.length > 0 ? (
          <LeftPanelLessons scrollTop={scrollTop} courseInfo={courseInfo} courseProgress={courseProgress} />
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
