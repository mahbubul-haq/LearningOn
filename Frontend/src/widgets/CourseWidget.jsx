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

const CourseWidget = ({ courseInfo }) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 200 }}
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiTHouB53d2smKXcdqRKRCww-DiaRyVr-iKZMHCLIp&s"
                title="green iguana"
            />
            <CardContent>
                <Typography
                    gutterBottom
                    sx={{
                        fontSize: "1.1rem",
                        fontWeight: "600",
                    }}
                >
                    {courseInfo.title}
                </Typography>
                <Typography
                    sx={{
                        fontSize: "1rem",
                        fontWeight: "600",
                        color: (theme) => theme.palette.grey.grey400,
                    }}
                >
                    {courseInfo.instructor}
                </Typography>
                <Box sx={{
                    mt: '2rem',
                    fontSize: '1rem',
                    mb: "0.5rem"
                }}>
                    <Rating
                        rating={{
                            rating: courseInfo.rating.rating,
                            count: courseInfo.rating.count,
                            showText: false,
                        }}
                    />
                </Box>
                <Box sx={{
                display: "flex",
                gap: "0.5rem"
            }}>
                <Chip label="Programming" size="small" />
                <Chip label="Python"  size="small"/>

            </Box>
            </CardContent>
            
        </Card>
    );
};

export default CourseWidget;
