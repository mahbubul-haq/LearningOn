import Box from "@mui/material/Box";
import FlexBetween from "../FlexBetween";
import Typography from "@mui/material/Typography";
import { convertTime } from "../../utils/dateTime";
import { useNavigate } from "react-router-dom";
import useTheme from "@mui/material/styles/useTheme";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const NotificationMenu = ({
    anchorEl,
    open,
    handleClose,
    notifications,
    updateNotifications,
}) => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                "aria-labelledby": "basic-button",
                sx: { padding: "0.5rem 0" }
            }}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            PaperProps={{
                sx: {
                    mt: 1.5,
                    backgroundColor: theme.palette.notificationMenu.bg,
                    backdropFilter: theme.palette.notificationMenu.backdropFilter,
                    border: `1px solid ${theme.palette.notificationMenu.border}`,
                    boxShadow: theme.palette.notificationMenu.shadow,
                    borderRadius: "16px",
                    overflow: "hidden",
                    maxHeight: "80vh",
                    minWidth: "350px",
                }
            }}
        >
            {notifications?.length == 0 && (
                <Box sx={{ padding: "2rem", textAlign: "center" }}>
                    <Typography
                        sx={{
                            fontSize: "1rem",
                            color: theme.palette.notificationMenu.textSecondary,
                            fontWeight: 500,
                        }}
                    >
                        You have no notifications yet!
                    </Typography>
                </Box>
            )}
            {notifications?.map((n, index) => (
                <MenuItem
                    key={index}
                    onClick={() => {
                        updateNotifications(n._id, "clicked");
                        if (n.link.includes("dashboard")) {
                            if (
                                window.location.pathname.includes("dashboard")
                            ) {
                                let courseId = n.link.split("/");
                                courseId = courseId[courseId.length - 1];
                                navigate("/dashboard/" + courseId);
                            } else {
                                navigate("/" + n.link);
                            }
                        }
                        handleClose();
                    }}
                    sx={{
                        maxWidth: "400px",
                        padding: "1rem 1.2rem",
                        whiteSpace: "normal", // allow wrapping
                        backgroundColor:
                            n.status === "opened"
                                ? theme.palette.notificationMenu.itemBgRead
                                : theme.palette.notificationMenu.itemBgUnread,
                        borderBottom: index !== notifications.length - 1
                            ? `1px solid ${theme.palette.notificationMenu.divider}`
                            : "none",
                        transition: "all 0.2s ease",
                        "&:hover": {
                            backgroundColor: theme.palette.notificationMenu.itemHover,
                        },
                    }}
                >
                    <FlexBetween
                        sx={{
                            width: "100%",
                            alignItems: "flex-start",
                            gap: "1rem",
                        }}
                    >
                        <img
                            src={
                                n.imageLink
                                    ? `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
                                    }/image/upload/${n.imageLink}`
                                    : "/images/dummyPerson.jpeg"
                            }
                            alt="user"
                            style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                flexShrink: 0,
                                alignSelf: "center",
                                border: `1px solid ${theme.palette.notificationMenu.border}`,
                            }}
                        />
                        <Box sx={{ flexGrow: 1 }}>
                            <Box
                                sx={{
                                    fontSize: "0.9rem",
                                    color: theme.palette.notificationMenu.textPrimary,
                                    lineHeight: "1.4",
                                    "& strong": {
                                        fontWeight: 600,
                                        color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
                                    }
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: n.message,
                                }}
                            />
                            <Typography
                                sx={{
                                    fontSize: "0.75rem",
                                    color: theme.palette.notificationMenu.textSecondary,
                                    mt: 0.5,
                                }}
                            >
                                {convertTime(n.createdAt)}
                            </Typography>
                        </Box>
                        {n.status !== "opened" && (
                            <Box
                                sx={{
                                    width: "8px",
                                    height: "8px",
                                    borderRadius: "50%",
                                    backgroundColor: theme.palette.primary.main,
                                    mt: 1,
                                    flexShrink: 0,
                                }}
                            />
                        )}
                    </FlexBetween>
                </MenuItem>
            ))}
        </Menu>
    );
};

export default NotificationMenu;
