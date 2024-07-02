/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "../components/Rating";
import Box from "@mui/material/Box";
import CustomSlider1 from "../components/CustomSlider1";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import useTheme from '@mui/material/styles/useTheme';

const CourseWidget = ({ courseInfo }) => {
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const theme = useTheme();

    return (
        <Card
            sx={{
                maxWidth: isNonMobileScreens ? "400px" : "320px",
                minWidth: isNonMobileScreens ? "300px" : "220px",

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
                    borderRadius: isNonMobileScreens ? "0.5rem" : '0.2rem',
                 }}
                image={
                `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/${courseInfo.courseThumbnail}`
                }
                title={courseInfo?.courseTitle}
            />
            <CardContent
                sx={{
                    height: isNonMobileScreens ? "calc(100% - 150px)" : "calc(100% - 130px)",
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
                        gutterBottom
                        sx={{
                            fontSize: isNonMobileScreens ? "1.1rem" : "1rem",
                            fontWeight: "600",
                            cursor: "pointer",
                            lineHeight: "1.2",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            "&:hover": {
                                textDecoration: "underline",
                            },
                        }}
                        onClick={() => {
                            navigate(`/course/${courseInfo._id}`);
                        }}
                    >
                        {courseInfo.courseTitle}
                    </Typography>
                    <Typography
                        sx={{
                            mt: "-0.2rem",
                            fontSize: "0.9rem",
                            fontWeight: "400",
                            color: (theme) => theme.palette.grey.grey600,
                            cursor: "pointer",
                            "&:hover": {
                                color: (theme) => theme.palette.grey.grey700,
                            },
                        }}
                        onClick={() => {
                            navigate(`/profile/${courseInfo.owner._id}`);
                        }}
                    >
                     &mdash; {courseInfo.owner.name}
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
                                rating: courseInfo.ratings.totalRating,
                                count: courseInfo.ratings.numberOfRatings,
                                showText: false,
                            }}
                        />
                    </Box>
                    <Typography variant="h4bold" sx={{
                        color: theme.palette.grey.grey700,
                    }}>
                        ${courseInfo.coursePrice}
                    </Typography>
                    <Box sx={{mt: "1rem"}}>
                        <CustomSlider1 items={courseInfo.skillTags} selectedItem="" setSelectedItem="" />
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CourseWidget;
