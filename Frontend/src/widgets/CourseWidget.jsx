import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "../components/Rating";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import CustomSlider1 from "../components/CustomSlider1";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

const CourseWidget = ({ courseInfo }) => {
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");



    return (
        <Card
            sx={{
                maxWidth: isNonMobileScreens ? "340px" : "230px",
                minWidth: isNonMobileScreens ? "300px" : "230px",
                borderRadius: isNonMobileScreens ? "0.5rem" : "0.2rem",
                boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25) inset",
                // border: "4px solid black",
                height: "auto",
                minHeight: isNonMobileScreens ? "250px" : "250px",
                // show for overflow
                //do not hide for overflow
                // overflow: "visible",
            }}
        >
            <CardMedia
                sx={{
                    width: "100%",
                    height: isNonMobileScreens ? "150px" : "130px",
                    maxWidth: "100%",
                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25) inset",
                 }}
                image={`${import.meta.env.VITE_REACT_APP_URL}/images/${courseInfo.courseThumbnail}`}
                title="green iguana"
            />
            <CardContent
                sx={{
                    height: isNonMobileScreens ? "calc(100% - 150px)" : "calc(100% - 130px)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0",
                    justifyContent: "space-between",
                    // border: "2px solid black",
                }}
            >
                <Box>
                    <Typography
                        gutterBottom
                        sx={{
                            fontSize: isNonMobileScreens ? "1.1rem" : "1rem",
                            fontWeight: "600",
                            cursor: "pointer",
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
                            fontSize: "1rem",
                            fontWeight: "600",
                            color: (theme) => theme.palette.grey.grey400,
                            cursor: "pointer",
                            "&:hover": {
                                color: (theme) => theme.palette.grey.grey500,
                            },
                        }}
                        onClick={() => {
                            navigate(`/profile/${courseInfo.owner._id}`);
                        }}
                    >
                        {courseInfo.owner.name}
                    </Typography>
                </Box>

                <Box sx={{
                    mt: "1rem",
                }}>
                    <Box
                        sx={{
                            mt: "1rem",

                            mb: "0.5rem",
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
                    <Box>
                        <CustomSlider1 items={["Programming", "Python"]} selectedItem="" setSelectedItem="" />
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CourseWidget;
