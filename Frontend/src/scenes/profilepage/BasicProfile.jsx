import React from "react";
import Box from "@mui/material/Box";

const BasicProfile = ({ userInfo }) => {
    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "3rem",
            }}
        >
            {userInfo?.about && (
                <Box
                    sx={{
                        width: "100%",
                        // border: "1px solid #ccc",
                        // borderRadius: "0.5rem",
                        // padding: "1rem",
                    }}
                >
                    <h3>About Me</h3>
                    <p>{userInfo?.about?.split("\n").join("<br />")}</p>
                    
                </Box>
            )}
        </Box>
    );
};

export default BasicProfile;
