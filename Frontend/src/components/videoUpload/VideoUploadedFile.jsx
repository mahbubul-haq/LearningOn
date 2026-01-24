import React, { useState } from 'react';
import Box from "@mui/material/Box";
import { colorTokens } from "../../theme";
import { cloudinaryCld } from "../../configs/cloudinary.config";
import { AdvancedImage, lazyload, AdvancedVideo } from "@cloudinary/react";

// MUI Components for the Menu
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

// Icons
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTheme } from "@mui/material";


const VideoUploadedFile = ({
    fileName,
    isImage,
    deleteVideo,
    deleting,
    setDeleting,
    uploadStatus,
    setUploadStatus,
    uploadStatusRef,
}) => {
    // --- Menu State ---
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        // Trigger the delete logic
        uploadStatusRef.current = "deleting";
        setUploadStatus("deleting");
        deleteVideo(fileName);
        setDeleting(true);

        // Close menu
        handleMenuClose();
    };

    return (
        <Box
            sx={{
                width: '100%',
                position: 'relative',
                aspectRatio: "16/9",
                borderRadius: "16px",
                overflow: "hidden",
                // Glassmorphic Style container
                bgcolor: "rgba(0,0,0,0.5)",
                border: "1px solid rgba(145, 120, 230, 0.3)",
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
            }}
        >
            {/* --- 1. OVERLAY MENU BUTTON (Top Right) --- */}
            <Box
                sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 10, // Ensure it sits on top of video/image
                }}
            >
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleMenuClick}
                    disabled={deleting} // Disable if already deleting
                    sx={{
                        color: "white",
                        bgcolor: "rgba(0, 0, 0, 0.5)", // Semi-transparent dark background
                        backdropFilter: "blur(4px)",
                        transition: "all 0.2s ease",
                        "&:hover": {
                            bgcolor: "rgba(0, 0, 0, 0.8)",
                        }
                    }}
                >
                    <MoreVertIcon />
                </IconButton>

                {/* --- The Dropdown Menu --- */}
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    slotProps={{
                        paper: {
                            sx: {
                                width: '20ch',
                                mt: 1
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handleDelete} sx={{ color: theme.palette.secondary.light }}>
                        <ListItemIcon>
                            <DeleteIcon fontSize="small" sx={{ color: theme.palette.secondary.light }} />
                        </ListItemIcon>
                        <ListItemText>Delete {isImage ? "Photo" : "Video"}</ListItemText>
                    </MenuItem>
                </Menu>
            </Box>

            {/* --- 2. MEDIA CONTENT --- */}
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {isImage ? (
                    <AdvancedImage
                        plugins={[lazyload()]}
                        cldImg={cloudinaryCld.image(fileName)}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            opacity: deleting ? 0.3 : 1, // Dim when deleting
                            transition: "opacity 0.3s ease"
                        }}
                    />
                ) : (
                    <AdvancedVideo
                        plugins={[lazyload()]}
                        cldVid={cloudinaryCld.video(fileName)}
                        controls // Native controls active
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            opacity: deleting ? 0.3 : 1, // Dim when deleting
                            transition: "opacity 0.3s ease"
                        }}
                    />
                )}
            </Box>
        </Box>
    )
}

export default VideoUploadedFile