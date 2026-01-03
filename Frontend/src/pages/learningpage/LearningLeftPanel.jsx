import { Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import LeftPanelTop from "./LeftPanelTop";
import { useTheme } from "@mui/material/styles";
import "./LearningPage.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import LeftPanelLessons from "./LeftPanelLessons";

export const LearningLeftPanel = ({ courseInfo, scrollTop, courseProgress }) => {


  const theme = useTheme();

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");



  return (
    <Box className="custom-scrollbar-thin"
      sx={{
        position: "sticky",
        top: "2rem",
        height: `calc(100vh - 4rem)`,
        ...theme.palette.glassMorphismCard,
        border: "none",
        overflow: "hidden",
        display: "grid",
        gridTemplateRows: "auto auto 1fr",
        gap: "0",
      }}>
      <LeftPanelTop courseInfo={courseInfo} courseProgress={courseProgress} />
      <Divider sx={{ mt: "0.5rem" }} />

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
