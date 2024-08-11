/* eslint-disable react/prop-types */
import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CustomSlider1 from "../components/CustomSlider1";
import Rating from "../components/Rating";
import { CourseExplorerContext } from "../state/CourseExplorerContext";

const CourseWidget = ({ courseInfo }) => {
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const { setShowCourseExplorer, showCourseExplorer, setCloseBtnClicked } =
    useContext(CourseExplorerContext);

  return (
    <Card
      sx={{
        maxWidth: "100%",
        minWidth: isNonMobileScreens ? "300px" : "200px",

        width: "100%",
        borderRadius: isNonMobileScreens ? "0.5rem" : "0.2rem",
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25) inset",
        // border: "4px solid black",
        height: "auto",
        minHeight: isNonMobileScreens ? "250px" : "250px",
        padding: 0,
      }}
    >
      <CardMedia
        sx={{
          width: "100%",
          height: isNonMobileScreens ? "150px" : "130px",
          maxWidth: "100%",
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25) inset",
          objectFit: "cover",
          borderRadius: isNonMobileScreens ? "0.5rem" : "0.2rem",
        }}
        image={`https://res.cloudinary.com/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload/${courseInfo?.courseThumbnail}`}
        title={courseInfo?.courseTitle}
      />
      <CardContent
        sx={{
          height: isNonMobileScreens
            ? "calc(100% - 150px)"
            : "calc(100% - 130px)",
          display: "flex",
          flexDirection: "column",
          gap: "0",
          justifyContent: "space-between",
          // border: "2px solid black",
          paddingBottom: 0,
        }}
      >
        <Box>
          <Typography
            component="a"
            gutterBottom
            style={{
              textDecoration: "none",
              color: "inherit",
              fontSize: isNonMobileScreens ? "1.1rem" : "1rem",
              fontWeight: "600",
              cursor: "pointer",
              lineHeight: "1.2",
              overflow: "hidden",
              textOverflow: "ellipsis",
              //   mb: "0.3rem",
              display: "block",
              "&:hover": {
                textDecoration: "underline",
                color: "inherit",
              },
            }}
            href={`${import.meta.env.VITE_CLIENT_URL}/course/${courseInfo?._id}`}
            onClick={(e) => {
              e.preventDefault();
              if (showCourseExplorer) {
                setCloseBtnClicked(true);
                setShowCourseExplorer(false);
                setTimeout(() => {
                  navigate(`/course/${courseInfo?._id}`);
                }, 300);
              } else navigate(`/course/${courseInfo?._id}`);
            }}
          >
            {courseInfo?.courseTitle}
          </Typography>
          <Typography
            component="a"
            sx={{
              textDecoration: "none",
              mt: "-0.2rem",
              fontSize: "0.9rem",
              fontWeight: "400",
              color: (theme) => theme.palette.grey.grey600,
              cursor: "pointer",
              "&:hover": {
                color: (theme) => theme.palette.grey.grey700,
              },
            }}
            href={`${import.meta.env.VITE_CLIENT_URL}/profile/${
              courseInfo?.owner?._id
            }`}
            onClick={(e) => {
              e.preventDefault();
              if (showCourseExplorer) {
                setCloseBtnClicked(true);
                setShowCourseExplorer(false);
                setTimeout(() => {
                  navigate(`/profile/${courseInfo?.owner?._id}`);
                }, 300);
              } else navigate(`/profile/${courseInfo?.owner?._id}`);
            }}
          >
           
            &mdash; {courseInfo?.owner?.name}
          </Typography>
        </Box>

        <Box>
          <Box
            sx={{
              mt: "1rem",

              mb: "0rem",
            }}
          >
            <Rating
              rating={{
                rating: courseInfo?.ratings?.totalRating,
                count: courseInfo?.ratings?.numberOfRatings,
                showText: false,
              }}
            />
          </Box>
          <Typography
            variant="h4bold"
            sx={{
              color: theme.palette.grey.grey700,
            }}
          >
            ${courseInfo?.coursePrice}
          </Typography>
          <Box sx={{ mt: "1rem" }}>
            <CustomSlider1
              items={courseInfo?.skillTags}
              selectedItem=""
              setSelectedItem=""
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CourseWidget;
