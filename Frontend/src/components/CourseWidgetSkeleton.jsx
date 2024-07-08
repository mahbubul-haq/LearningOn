import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import useMediaQuery from "@mui/material/useMediaQuery";
import FlexBetween from "./FlexBetween";

const CourseWidgetSkeleton = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box
      sx={{
        width: "100%",
        minWidth: "300px",
        borderRadius: isNonMobileScreens ? "0.5rem" : "0.2rem",
        background: "white",
      }}
    >
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{
          width: "100%",
          borderRadius: isNonMobileScreens ? "0.5rem" : "0.2rem",
          height: isNonMobileScreens ? "150px" : "130px",
          aspectRatio: "16/9",
        }}
      />
      <Box
        sx={{
          width: "100%",
          padding: "1rem",
          height: isNonMobileScreens
            ? "calc(100% - 150px)"
            : "calc(100% - 130px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "4rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.2rem",
          }}
        >
          <Skeleton
            variant="text"
            animation="wave"
            sx={{
              height: "2rem",
            }}
          />
          <Skeleton
            variant="text"
            animation="wave"
            sx={{
              width: "130px",
              height: "1.4rem",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <FlexBetween
            sx={{
              width: "fit-content",
            }}
          >
            <Skeleton
              variant="rounded"
              animation="wave"
              sx={{
                width: "120px",
                borderRadius: "1000px",
                height: "1.7rem",
              }}
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              sx={{
                width: "120px",
                height: "1.7rem",
                borderRadius: "1000px",
              }}
            />
          </FlexBetween>
        </Box>
      </Box>
    </Box>
  );
};

export default CourseWidgetSkeleton;
