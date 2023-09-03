import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


const DashboardCard = ({ title, value }) => {
    return (
        <Box
            sx={{
                padding: "1rem",
                backgroundColor: "#f5f5f5",

                borderRadius: "0.5rem",
            }}
        >
            <Typography
                sx={{
                    fontSize: "1.1rem",
                }}
            >
                {title}
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2rem 4rem",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "3rem",
                        fontWeight: "bold",
                    }}
                >
                    {value}
                </Typography>
            </Box>
        </Box>
    );
};

export default DashboardCard;
