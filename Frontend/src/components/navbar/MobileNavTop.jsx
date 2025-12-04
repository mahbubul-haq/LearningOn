import { AdvancedImage, lazyload } from "@cloudinary/react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cloudinaryCld } from "../../configs/cloudinary.config";
import FlexBetween from "../FlexBetween";
import { MobileNavItem } from "../StyledBox";
import { StyledButton } from "../StyledButton";

const MobileNavTop = ({
    setOpenDrawer,
    setOpenNotificationDrawer,
    newNotifications,
    updateNotifications
}) => {

    const theme = useTheme();
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    return (
        <>
            <Box
                sx={{
                    px: "1rem",
                }}
            >
                {user ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "1.2rem",
                            cursor: "pointer",
                            "&:hover": {
                                backgroundColor: theme.palette.background.default,
                            },
                            p: "0.8rem",
                            borderRadius: "0.15rem",
                        }}
                        onClick={() => {
                            navigate("/profile/" + user._id);
                            setOpenDrawer(false);
                        }}
                    >
                        {user.picturePath ? (

                            <Box sx={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", overflow: "hidden" }}>
                                <AdvancedImage
                                    plugins={[lazyload()]}
                                    cldImg={cloudinaryCld.image(user.picturePath)} style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover"

                                    }} />
                            </Box>
                            // <img src={`http://localhost:5000/images/1693817741512-237-ip.jpg`} alt="user" style={{width: "2.5rem", height: "2.5rem", borderRadius: "50%", objectFit: "cover"}} loading="lazy" />                                // </CloudinaryContext>
                        ) : (
                            <AccountCircleIcon
                                sx={{
                                    fontSize: "2.5rem",
                                }}
                            />
                        )}
                        {/* </IconButton> */}
                        <Typography
                            sx={{
                                fontSize: "1rem",
                            }}
                        >
                            {user.name}
                        </Typography>
                    </Box>
                ) : (
                    <FlexBetween
                        sx={{
                            "&&": {
                                justifyContent: "flex-start",
                            },
                        }}
                    >
                        <StyledButton
                            // variant="contained"
                            sx={{
                                "&&": {
                                    padding: "0.3rem 1rem",
                                    fontWeight: "600",
                                },
                            }}
                            onClick={() => {
                                navigate("/login", {
                                    state: {
                                        isLogin: true,
                                    },
                                });
                            }}
                        >
                            Log In
                        </StyledButton>
                        <StyledButton
                            variant="outlined"
                            sx={{
                                marginLeft: "1rem",

                                "&&": {
                                    padding: "0.3rem 1rem",
                                    fontWeight: "600",
                                    backgroundColor: "transparent",
                                    "&:hover": {
                                        backgroundColor: (theme) => theme.palette.primary.main,
                                    },
                                },
                            }}
                            onClick={() => {
                                navigate("/signup", {
                                    state: {
                                        isLogin: false,
                                    },
                                });
                            }}
                        >
                            Sign Up
                        </StyledButton>
                    </FlexBetween>
                )}
            </Box>
            <Divider
                sx={{
                    color: theme.palette.customDivider.main,
                    my: "1rem",
                }}
                light
            />

            {user && (
                <>
                    <Box
                        sx={{
                            px: "1rem",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <FlexBetween
                            sx={{
                                display: "flex",
                                cursor: "pointer",
                                "&:hover": {
                                    backgroundColor: theme.palette.background.default,
                                },
                                p: "0.8rem",
                                borderRadius: "0.15rem",
                            }}
                            onClick={() => {
                                setOpenNotificationDrawer(true);
                                updateNotifications("no id", "opened");
                                setOpenDrawer(false);
                            }}

                        >
                            <FlexBetween
                                sx={{
                                    gap: "1.2rem",
                                }}
                            >
                                <NotificationsIcon
                                    sx={{
                                        fontSize: "1.2rem",
                                        color: (theme) => theme.palette.grey.grey400,
                                    }}
                                />
                                <Typography
                                    sx={{
                                        fontSize: "1rem",
                                    }}
                                >
                                    Notifications
                                </Typography>
                            </FlexBetween>
                            <Typography
                                sx={{
                                    fontSize: "1rem",
                                    fontWeight: "600",
                                }}
                            >
                                {newNotifications > 0 && newNotifications}
                            </Typography>
                        </FlexBetween>
                        <MobileNavItem
                            onClick={() => {
                                navigate("/dashboard");
                                setOpenDrawer(false);
                            }}
                        >
                            <DashboardIcon
                                sx={{
                                    fontSize: "1.2rem",
                                    color: (theme) => theme.palette.grey.grey400,
                                }}
                            />
                            <Typography
                                sx={{
                                    fontSize: "1rem",
                                }}
                            >
                                Dashboard
                            </Typography>
                        </MobileNavItem>
                    </Box>
                    <Divider
                        sx={{
                            color: theme.palette.customDivider.main,
                            my: "1rem",
                        }}
                        light
                    />
                </>
            )}
        </>
    )
}

export default MobileNavTop