import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import { colorTokens } from "../theme";
import { AdvancedImage, lazyload } from "@cloudinary/react";
import { cloudinaryCld } from "../configs/cloudinary.config";
import useTheme from "@mui/material/styles/useTheme";

const ProfileCard = ({ userInfo }) => {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Box
            onClick={() => navigate(`/profile/${userInfo?._id}`)}
            sx={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "0.75rem",
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : colorTokens.white.main,
                border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : theme.palette.grey[200]}`,
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: theme.palette.mode === 'dark' ? "0 4px 12px rgba(0,0,0,0.5)" : "0 4px 12px rgba(0,0,0,0.05)",
                    borderColor: theme.palette.primary.main,
                },
            }}
        >
            <FlexBetween sx={{ gap: "1rem", justifyContent: "flex-start" }}>
                <Box
                    sx={{
                        width: "2.5rem",
                        height: "2.5rem",
                        flexShrink: 0,
                        borderRadius: "50%",
                        overflow: "hidden",
                    }}
                >
                    {userInfo?.avatar?.secure_url ? (
                        <img
                            src={userInfo?.avatar?.secure_url}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                            alt="avatar"
                        />
                    ) : userInfo?.avatar?.public_id ? (
                        <AdvancedImage
                            plugins={[lazyload()]}
                            cldImg={cloudinaryCld.image(userInfo?.avatar?.public_id)}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    ) : (
                        <img
                            src="/images/dummyPerson.jpeg"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                            alt="dummy avatar"
                        />
                    )}
                </Box>
                <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
                    <Typography
                        sx={{
                            fontSize: "1rem",
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {userInfo?.name}
                    </Typography>
                </Box>
            </FlexBetween>
        </Box>
    );
};

export default ProfileCard;
