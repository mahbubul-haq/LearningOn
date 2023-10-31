import React from "react";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Menu from "@mui/material/Menu";
import { LearningLeftPanel } from "./LearningLeftPanel";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const LearningPageTop = ({ courseInfo }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const isMobileScreens = useMediaQuery("(max-width: 600px)");
    const [anchorEl, setAnchorEl] = React.useState(null);

    return (
        <Box
            sx={{
                padding: isNonMobileScreens ? "3rem 5rem 1.5rem 5rem" : "0rem",
                backgroundColor: theme.palette.background.bottom,
                backgroundImage: `linear-gradient(to bottom, ${theme.palette.background.top}, ${theme.palette.background.bottom})`,
                color: theme.palette.text.primary,
                display: "flex",
                justifyContent: isNonMobileScreens ? "center" : "space-between",
                position: "relative",
                // gap: "2rem",
            }}
        >
            <Typography
                variant={isNonMobileScreens ? "h2" : isMobileScreens ? "h6" : "h4"}
                sx={{
                    fontWeight: "bold",
                    mb: isNonMobileScreens ? "1rem" : "0.5rem",
                    textAlign: "center",
                    textTransform: "capitalize",
                    px: isNonMobileScreens ? "2rem" : "0.5",
                    cursor: "pointer",
                    px: isNonMobileScreens ? "0" : isMobileScreens ? "0.5rem" : "1rem",
                    py: isNonMobileScreens ? "0" : isMobileScreens ? "1rem" : "1rem",
                    //height: "100%",
                    width: "80%",
                }}
                onClick={() => {
                    navigate(`/course/${courseInfo._id}`);
                }}
            >
                {courseInfo?.courseTitle}
            </Typography>
            {!isNonMobileScreens && (
                <Box
                    sx={{
                        width: "20%",
                        backgroundColor: theme.palette.background.default,
                        position: "absolute",
                        right: "0",
                        top: "0",
                        bottom: "0",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <IconButton
                        onClick={(event) => {
                            if (anchorEl) {
                                setAnchorEl(null);
                            } else {
                                setAnchorEl(event.currentTarget);
                            }
                        }}
                    >
                        <FormatListBulletedIcon
                            sx={{
                                fontSize: "2rem",
                                cursor: "pointer",
                                color: theme.palette.grey.grey600,
                                "&:hover": {
                                    color: theme.palette.grey.grey800,
                                },
                            }}
                        />
                    </IconButton>
                    <Menu
                        id="learning-top-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => {
                            setAnchorEl(null);
                        }}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        sx={
                            {
                                //position: "relative",
                            }
                        }
                    >
                        <Box
                            sx={{
                                padding: "1rem",
                                position: "relative",
                            }}
                            onClick={() => {
                                setAnchorEl(null);
                            }}
                        >
                            <CloseIcon
                                sx={{
                                    position: "absolute",
                                    top: "1rem",
                                    right: "1rem",
                                    cursor: "pointer",
                                    color: theme.palette.grey.grey600,
                                    "&:hover": {
                                        color: theme.palette.grey.grey800,
                                    },
                                }}
                                onClick={() => {
                                    setAnchorEl(null);
                                }}
                            />

                            <LearningLeftPanel courseInfo={courseInfo} />
                        </Box>
                    </Menu>
                </Box>
            )}
        </Box>
    );
};

export default LearningPageTop;
