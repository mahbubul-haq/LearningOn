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
            }}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
        >
            {notifications?.length == 0 && (
                <Typography
                    sx={{
                        padding: "2rem 4rem",
                        fontSize: "1.2rem",
                    }}
                >
                    You have no notifications yet!
                </Typography>
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
                                //console.log("link", n.link);

                                window.location.href =
                                    import.meta.env.VITE_CLIENT_URL +
                                    "/" +
                                    n.link;
                            }
                        }
                        handleClose();
                    }}
                    sx={{
                        maxWidth: "500px",
                        padding: "1rem",
                        whiteSpace: "wrap",
                        opacity: n.status === "opened" ? 1 : 0.9,
                        backgroundColor:
                            n.status === "opened"
                                ? theme.palette.background.imagesBg1
                                : theme.palette.grey.grey50,
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
                            src={
                                n.imageLink
                                    ? `${
                                          import.meta.env.VITE_SERVER_URL
                                      }/images/${n.imageLink}`
                                    : "/images/dummyPerson.jpeg"
                            }
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
                </MenuItem>
            ))}
        </Menu>
    );
};

export default NotificationMenu;
