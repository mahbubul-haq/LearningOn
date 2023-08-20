import React from "react";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";


const LearningPageTop = ({ courseInfo }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                padding: "3rem 5rem 1.5rem 5rem",   
                backgroundColor: theme.palette.background.bottom,
                backgroundImage: `linear-gradient(to bottom, ${theme.palette.background.top}, ${theme.palette.background.bottom})`,
                color: theme.palette.text.primary,
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
            }}
        >
            <Typography
                variant="h2"
                sx={{
                    fontWeight: "bold",
                    mb: "1rem",
                    textAlign: "center",
                    textTransform: "capitalize",
                    px: "2rem",
                }}
            >
                {courseInfo?.courseTitle}
            </Typography>
        </Box>
    );
};

export default LearningPageTop;
