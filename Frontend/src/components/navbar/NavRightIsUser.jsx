import { AdvancedImage, lazyload } from "@cloudinary/react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cloudinaryCld } from "../../configs/cloudinary.config";
import NotificationMenu from "./NotificationMenu";

const NavRightIsUser = ({
    handleClick,
    anchorEl,
    handleClose,
    open,
    newNotifications,
    notifications,
    updateNotifications,
}) => {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    return (
        <>
            <IconButton
                sx={{
                    color: (theme) => theme.palette.text.primary,
                }}
                onClick={handleClick}
            >
                <Badge
                    badgeContent={newNotifications}
                    color="error"
                    size="small"
                    sx={{
                        color: (theme) => theme.palette.text.primary,
                    }}
                >
                    <NotificationsIcon
                        sx={{
                            fontSize: "1.7rem",
                        }}
                    />
                </Badge>
            </IconButton>
            <NotificationMenu
                anchorEl={anchorEl}
                open={open}
                handleClose={handleClose}
                notifications={notifications}
                updateNotifications={updateNotifications}
            />
            <IconButton
                component="a"
                href={`${import.meta.env.VITE_CLIENT_URL}/profile/${user._id}`}
                sx={{
                    color: (theme) => theme.palette.text.primary,
                }}
                onClick={(e) => {
                    e.preventDefault();
                    navigate(`/profile/${user._id}`);
                }}
            >
                {user.picturePath ? (
                    <Box
                        sx={{
                            width: "2rem",
                            height: "2rem",
                            borderRadius: "50%",
                        }}
                    >
                        <AdvancedImage
                            plugins={[lazyload()]}
                            cldImg={cloudinaryCld.image(user.picturePath)}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "50%",
                            }}
                        />
                    </Box>
                ) : (
                    <AccountCircleIcon
                        sx={{
                            fontSize: "1.7rem",
                        }}
                    />
                )}
            </IconButton>
        </>
    );
};

export default NavRightIsUser;
