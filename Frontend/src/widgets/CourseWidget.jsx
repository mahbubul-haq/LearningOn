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
  const isNonMobileScreens = useMediaQuery("(min-width: 900px)");
  const theme = useTheme();
  const { setShowCourseExplorer, showCourseExplorer, setCloseBtnClicked } =
    useContext(CourseExplorerContext);

  return (
    <Card
      sx={{
        maxWidth: "100%",
        minWidth: isNonMobileScreens ? "300px" : "200px",

        width: "100%",
        borderRadius: isNonMobileScreens ? "1rem" : "0.5rem", // Updated radius
        boxShadow: theme.palette.courseWidget.shadow,
        border: `1px solid ${theme.palette.courseWidget.border}`,
        backgroundColor: theme.palette.courseWidget.bg,
        backdropFilter: "blur(12px)",
        height: "100%",
        minHeight: isNonMobileScreens ? "250px" : "250px",
        padding: 0,
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          // transform: "scale(1.02)",
          boxShadow: theme.palette.mode === 'dark'
            ? "0 12px 40px rgba(0,0,0,0.5)"
            : "0 12px 40px rgba(31, 38, 135, 0.2)",
        }
      }}
    >
      <CardMedia
        component="a"
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
        sx={{
          width: "100%",
          height: isNonMobileScreens ? "160px" : "140px", // Increased image height slightly
          maxWidth: "100%",
          objectFit: "cover",
          borderRadius: isNonMobileScreens ? "0.8rem" : "0.4rem", // Inner radius
          margin: "0.5rem", // Add margin for floating effect inside glass
          width: "calc(100% - 1rem)",
          cursor: "pointer",
        }}
        image={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
          }/image/upload/${courseInfo?.courseThumbnail}`}
        title={courseInfo?.courseTitle}
      />
      <CardContent
        sx={{
          height: isNonMobileScreens
            ? "calc(100% - 170px)"
            : "calc(100% - 150px)",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          justifyContent: "space-between",
          paddingBottom: "1rem !important",
          paddingTop: "0.5rem",
        }}
      >
        <Box>
          <Typography
            component="a"

            gutterBottom
            style={{
              textDecoration: "none",
              color: theme.palette.courseWidget.titleColor,
              fontSize: isNonMobileScreens ? "1.1rem" : "1rem",
              fontWeight: "600",
              cursor: "pointer",
              lineHeight: "1.3",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              "&:hover": {
                textDecoration: "underline",
                color: theme.palette.courseWidget.titleColor,
              },
            }}
            href={`${import.meta.env.VITE_CLIENT_URL}/course/${courseInfo?._id
              }`}
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
              mt: "0.25rem",
              fontSize: "0.9rem",
              fontWeight: "400",
              color: theme.palette.courseWidget.authorColor,
              cursor: "pointer",
              display: "block",
              "&:hover": {
                color: theme.palette.courseWidget.titleColor,
              },
            }}
            href={`${import.meta.env.VITE_CLIENT_URL}/profile/${courseInfo?.owner?._id
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
            {courseInfo?.owner?.name}
          </Typography>
        </Box>

        <Box>
          <Box
            sx={{
              mt: "0.5rem",
              mb: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Rating
              rating={{
                rating: courseInfo?.ratings?.numberOfRatings > 0 ? courseInfo?.ratings?.totalRating / courseInfo?.ratings?.numberOfRatings : 0,
                count: courseInfo?.ratings?.numberOfRatings,
                showText: false,
              }}
            />
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.courseWidget.priceColor,
                fontWeight: 700,
              }}
            >
              ${courseInfo?.coursePrice}
            </Typography>
          </Box>

          <Box sx={{ mt: "0.5rem" }}>
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
