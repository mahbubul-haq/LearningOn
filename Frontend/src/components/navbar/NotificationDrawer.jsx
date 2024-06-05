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


    const { notifications, updateNotifications } = useContext(NotificationContext);
    const navigate = useNavigate();
    const theme = useTheme();

  return (
    <Drawer
                anchor="right"
                open={openNotificationDrawer}
                onClose={() => setOpenNotificationDrawer(false)}
                onClick={() => setOpenNotificationDrawer(false)}
                sx={{
                    "& .MuiDrawer-paper": {
                        width: "100%",
                    },
                    // padding: "3rem",
                }}
            >
                <Box
                    sx={{
                        // padding: "1rem",
                        pb: "1rem"
                    }}
                >
                    <Box
                        sx={{
                            // paddingLeft: "2rem",
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            // border: "1px solid black",
                            alignItems: "center",
                            position: "sticky",
                            top: 0,
                            backgroundColor: "white",
                            p: "1rem",
                            zIndex: 100,
                        }}
                    >
                        <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>Notifications</Typography>
                        <IconButton onClick={() => setOpenNotificationDrawer(false)}>
                            <CloseIcon
                                sx={{
                                    fontSize: "1.5rem",
                                }}
                            />
                        </IconButton>
                    </Box>
                    <Box>
                        {notifications?.length == 0 && (
                            // <MenuItem>
                            //     {" "}
                            <Typography
                                sx={{
                                    padding: "2rem 4rem",
                                    // backgroundColor: theme.palette.background.imagesBg1,
                                    fontSize: "1.2rem",
                                    textAlign: "center",
                                }}
                            >
                                You have no notifications yet!
                            </Typography>
                            // </MenuItem>
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
                                }}
                                sx={{
                                    maxWidth: "600px",
                                    mx: "auto",
                                    padding: "1rem",
                                    whiteSpace: "wrap",
                                    opacity: n.status === "opened" ? 1 : 0.9,
                                    backgroundColor: n.status === "opened" ? theme.palette.background.imagesBg1 : theme.palette.grey.grey50,
                                    "&:hover": {
                                        backgroundColor: theme.palette.background.imagesBg1,
                                    },
                                }}
                            >
                                <FlexBetween
                                    sx={{
                                        width: "100%",
                                        "&&": {
                                            alignItems: "flex-start",
                                        },
                                    }}
                                    gap="1rem"
                                >
                                    <img
                                        src={n.imageLink ? `${import.meta.env.VITE_SERVER_URL}/images/${n.imageLink}` : "/images/dummyPerson.jpeg"}
                                        alt="user"
                                        style={{
                                            width: "2.5rem",
                                            height: "2.5rem",
                                            borderRadius: "50%",
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            flexGrow: 1,
                                        }}
                                    >
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: n.message,
                                            }}
                                        ></div>
                                    </Box>
                                    <Typography
                                        sx={{
                                            fontSize: "0.8rem",
                                            textAlign: "right",
                                            whiteSpace: "nowrap",
                                            color: (theme) => theme.palette.text.secondary,
                                        }}
                                    >
                                        {convertTime(n.createdAt)}
                                    </Typography>
                                </FlexBetween>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Drawer>
  )
}

export default NotificationDrawer