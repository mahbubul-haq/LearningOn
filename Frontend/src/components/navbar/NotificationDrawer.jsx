import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FlexBetween from "../FlexBetween";
import { convertTime } from "../../utils/dateTime";
import { useContext } from "react";
import { NotificationContext } from "../../state/NotificationContext";
import { useNavigate } from "react-router-dom";
import useTheme from "@mui/material/styles/useTheme";

const NotificationDrawer = ({
  openNotificationDrawer,
  setOpenNotificationDrawer,
  handleClose,
}) => {
  const { notifications, updateNotifications } =
    useContext(NotificationContext);
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Drawer
      anchor="right"
      open={openNotificationDrawer}
      onClose={() => setOpenNotificationDrawer(false)}
      sx={{
        "& .MuiDrawer-paper": {
          width: "100%",
          backgroundColor: theme.palette.notificationMenu.bg,
          backdropFilter: theme.palette.notificationMenu.backdropFilter,
        },
        zIndex: 5000001, // Higher than MobileNav
      }}
    >
      <Box sx={{ pb: "1rem" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            position: "sticky",
            top: 0,
            backgroundColor: theme.palette.notificationMenu.bg,
            backdropFilter: theme.palette.notificationMenu.backdropFilter,
            borderBottom: `1px solid ${theme.palette.notificationMenu.border}`,
            p: "1rem",
            zIndex: 100,
          }}
        >
          <Typography sx={{
            fontSize: "1.2rem",
            fontWeight: "600",
            color: theme.palette.notificationMenu.textPrimary
          }}>
            Notifications
          </Typography>
          <IconButton onClick={() => setOpenNotificationDrawer(false)}>
            <CloseIcon
              sx={{
                fontSize: "1.5rem",
                color: theme.palette.notificationMenu.textPrimary
              }}
            />
          </IconButton>
        </Box>
        <Box>
          {notifications?.length == 0 && (
            <Box sx={{ padding: "3rem 1rem", textAlign: "center" }}>
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  color: theme.palette.notificationMenu.textSecondary,
                  fontWeight: 500,
                }}
              >
                You have no notifications yet!
              </Typography>
            </Box>
          )}
          {notifications?.map((n, index) => (
            <Box
              key={index}
              onClick={() => {
                updateNotifications(n._id, "clicked");
                if (n.link.includes("dashboard")) {
                  if (window.location.pathname.includes("dashboard")) {
                    let courseId = n.link.split("/");
                    courseId = courseId[courseId.length - 1];
                    navigate("/dashboard/" + courseId);
                  } else {
                    window.location.href = n.link;
                  }
                }
                handleClose();
                setOpenNotificationDrawer(false);
              }}
              sx={{
                width: "100%",
                padding: "1rem",
                backgroundColor:
                  n.status === "opened"
                    ? theme.palette.notificationMenu.itemBgRead
                    : theme.palette.notificationMenu.itemBgUnread,
                borderBottom: `1px solid ${theme.palette.notificationMenu.divider}`,
                cursor: "pointer",
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
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    flexShrink: 0,
                    border: `1px solid ${theme.palette.notificationMenu.border}`,
                  }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      fontSize: "0.95rem",
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
                      fontSize: "0.8rem",
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
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: theme.palette.primary.main,
                      mt: 1,
                      flexShrink: 0,
                    }}
                  />
                )}
              </FlexBetween>
            </Box>
          ))}
        </Box>
      </Box>
    </Drawer>
  );
};

export default NotificationDrawer;
