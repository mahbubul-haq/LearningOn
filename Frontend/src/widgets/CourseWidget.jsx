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

const CourseWidget = ({ courseInfo }) => {
    const navigate = useNavigate();

    return (
        <Card
            sx={{
                maxWidth: 345,
                minWidth: 300,
                borderRadius: "0.5rem",
                boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25) inset",
                // border: "4px solid black",
            }}
        >
            <CardMedia
                sx={{ height: 200 }}
                image={`${import.meta.env.VITE_REACT_APP_URL}/images/${courseInfo.courseThumbnail}`}
                title="green iguana"
            />
            <CardContent
                sx={{
                    
                    
                }}
            >
                <Typography
                    gutterBottom
                    sx={{
                        fontSize: "1.1rem",
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
:                 
                <Box
                    sx={{
                        // position at the bottom of the CardContent
                        
                        
                    }}
                >
                    <Box
                        sx={{
                            mt: "1rem",
                            fontSize: "1rem",
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
                        <CustomSlider1
                            items={["Programming", "Python"]}
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
