import { Box, Typography, AppBar, Toolbar, IconButton, Badge, Divider } from "@mui/material";
import FlexBetween from "./FlexBetween.jsx";
import { StyledButton, StyledBox1 } from "./StyledButton.jsx";
import { useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { NotificationContext } from "../state/NotificationContext.jsx";
import { useEffect } from "react";
import { useState } from "react";
import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import { GlobalContext } from "../state/GlobalContext.jsx";
import Drawer from "@mui/material/Drawer";
import StarRateIcon from "@mui/icons-material/StarRate";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { setLogout } from "../state/index.js";

const Navbar = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const isMobileScreens = useMediaQuery("(max-width: 600px)");
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [newNotifications, setNewNotifications] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openNotificationDrawer, setOpenNotificationDrawer] = useState(false);
    const dispatch = useDispatch();

    const { openedItem, setOpenedItem } = useContext(GlobalContext);
    const { notifications, setNotifications, getNotifications, updateNotifications } = useContext(NotificationContext);

    // useEffect(() => {
    //     if (!user) {
    //         navigate("/");
    //         window.location.reload();
    //     }
    // }, [user]);

    const calculateNewNotifications = () => {
        let count = 0;
        notifications?.forEach((n) => {
            if (n.status === "new") {
                count++;
            }
        });
        setNewNotifications(count);
    };

    const convertTime = (timeString) => {
        const date = new Date(timeString);
        let diff = Math.abs(new Date() - date);
        let time = "";
        /// convert to days hours and minutes
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        diff -= days * (1000 * 60 * 60 * 24);
        const hours = Math.floor(diff / (1000 * 60 * 60));
        diff -= hours * (1000 * 60 * 60);
        const minutes = Math.floor(diff / (1000 * 60));
        diff -= minutes * (1000 * 60);

        if (days > 0) {
            time += days + "d ";
        }
        if (hours > 0 && time === "") {
            time += hours + "h ";
        }
        if (minutes > -1 && time === "") {
            time += minutes + "m ";
        }
        return time + "ago";
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        updateNotifications("no id", "opened");
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        calculateNewNotifications();
    }, [notifications]);

    useEffect(() => {
        if (user) getNotifications(user?._id);
    }, []);

    const drawer = () => {
        return (
            <Drawer
                anchor="right"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                sx={{
                    "& .MuiDrawer-paper": {
                        width: "100%",
                        maxWidth: "400px",
                    },
                }}
                
            >
                <Box
                    sx={{
                        padding: "0.5rem",
                        pb: "0",
                        // paddingLeft: "2rem",
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "100%",
                        // border: "1px solid black",
                        alignItems: "center",
                    }}
                >
                    <IconButton onClick={() => setOpenDrawer(false)}>
                        <CloseIcon
                            sx={{
                                fontSize: "1.5rem",
                            }}
                        />
                    </IconButton>
                </Box>

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
                            {/* <IconButton
                                sx={{
                                    color: (theme) => theme.palette.text.primary,
                                }}
                            > */}
                            {user.picturePath ? (
                                <img
                                    src={`http://localhost:5000/images/${user.picturePath}`}
                                    alt="user"
                                    style={{
                                        width: "2.5rem",
                                        height: "2.5rem",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                    }}
                                />
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
                            </Box>
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

                <>
                    <Box
                        sx={{
                            px: "1rem",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
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
                                navigate("/dashboard");
                                setOpenDrawer(false);
                            }}
                        >
                            <LocalLibraryIcon
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
                                Courses
                            </Typography>
                        </Box>
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
                                navigate("/dashboard");
                                setOpenDrawer(false);
                            }}
                        >
                            <RssFeedIcon
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
                                Blogs
                            </Typography>
                        </Box>
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
                                navigate("/dashboard");
                                setOpenDrawer(false);
                            }}
                        >
                            <GroupIcon
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
                                Tutors
                            </Typography>
                        </Box>
                    </Box>
                    <Divider
                        sx={{
                            color: theme.palette.customDivider.main,
                            my: "1rem",
                        }}
                        light
                    />
                </>
                {user && (
                    <Box
                        sx={{
                            px: "1rem",
                        }}
                    >
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
                                dispatch(setLogout());
                                setOpenDrawer(false);
                                //reload page

                                navigate("/");
                                // window.location.reload();
                            }}
                        >
                            <LogoutIcon
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
                                Log out
                            </Typography>
                        </Box>
                    </Box>
                )}
            </Drawer>
        );
    };

    const notificationDrawer = () => {
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
                                        src={n.imageLink ? `${import.meta.env.VITE_REACT_APP_URL}/images/${n.imageLink}` : "/images/dummyPerson.jpeg"}
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
        );
    };

    return (
        <Box
            sx={{
                flexGrow: 1,
                padding: 0,
                // very light gray boxShadow
                position: "sticky",
                top: 0,
                backgroundColor: "white",
                zIndex: 100,
                display: "flex",
                alignItems: "center",
                width: "100%",
            }}
        >
            {!isNonMobileScreens && drawer()}
            {!isNonMobileScreens && notificationDrawer()}
            <Box
                sx={{
                    // border: "1px solid green",
                    // position: "sticky",
                    // top: 0,
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    height: isNonMobileScreens ? "5rem" : "4rem",
                    backgroundColor: "white",
                    boxShadow: (theme) => `0px 4px 8px 0px ${theme.palette.nav.boxShadow}`,
                    padding: isNonMobileScreens ? "0.5rem 1.5rem" : "0rem 1.3rem",
                }}
            >
                <FlexBetween
                    sx={{
                        flexGrow: 1,
                    }}
                >
                    <FlexBetween gap="7rem">
                        <Box>
                            <Typography
                                variant="h2"
                                component="div"
                                sx={{
                                    fontWeight: "600",
                                    fontSize: isNonMobileScreens ? "2rem" : "1rem",
                                    cursor: "pointer",
                                }}
                                onClick={() => navigate("/")}
                            >
                                Learning
                                <Box
                                    sx={{
                                        display: "inline-block",
                                        color: (theme) => theme.palette.primary.main,
                                    }}
                                >
                                    On
                                </Box>
                            </Typography>
                        </Box>
                        {isNonMobileScreens && (
                            <FlexBetween
                                gap="2rem"
                                sx={{
                                    fontSize: "1.2rem",
                                    color: (theme) => theme.palette.text.primary,
                                }}
                            >
                                <StyledBox1>
                                    <span
                                        style={{
                                            fontWeight: openedItem == "courses" ? "600" : "400",
                                        }}
                                    >
                                        Courses
                                    </span>
                                    <ExpandMoreIcon
                                        sx={{
                                            fontSize: "1.5rem",
                                        }}
                                    />
                                </StyledBox1>
                                <StyledBox1>
                                    Blogs
                                    <ExpandMoreIcon
                                        sx={{
                                            fontSize: "1.5rem",
                                        }}
                                    />
                                </StyledBox1>
                                <StyledBox1>
                                    Tutors
                                    <ExpandMoreIcon
                                        sx={{
                                            fontSize: "1.5rem",
                                        }}
                                    />
                                </StyledBox1>
                            </FlexBetween>
                        )}
                    </FlexBetween>
                    <FlexBetween>
                        {isNonMobileScreens ? (
                            <>
                                <FlexBetween gap="0.6rem">
                                    {user ? (
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
                                                    // <MenuItem>
                                                    //     {" "}
                                                    <Typography
                                                        sx={{
                                                            padding: "2rem 4rem",
                                                            // backgroundColor: theme.palette.background.imagesBg1,
                                                            fontSize: "1.2rem",
                                                        }}
                                                    >
                                                        You have no notifications yet!
                                                    </Typography>
                                                    // </MenuItem>
                                                )}
                                                {notifications?.map((n, index) => (
                                                    <MenuItem
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
                                                                        ? `${import.meta.env.VITE_REACT_APP_URL}/images/${n.imageLink}`
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
                                            <IconButton
                                                sx={{
                                                    color: (theme) => theme.palette.text.primary,
                                                }}
                                                onClick={() => {
                                                    navigate(`/profile/${user._id}`);
                                                }}
                                            >
                                                {user.picturePath ? (
                                                    <img
                                                        src={`http://localhost:5000/images/${user.picturePath}`}
                                                        alt="user"
                                                        style={{
                                                            width: "2rem",
                                                            height: "2rem",
                                                            borderRadius: "50%",
                                                        }}
                                                    />
                                                ) : (
                                                    <AccountCircleIcon
                                                        sx={{
                                                            fontSize: "1.7rem",
                                                        }}
                                                    />
                                                )}
                                            </IconButton>
                                        </>
                                    ) : (
                                        <>
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
                                        </>
                                    )}
                                </FlexBetween>
                            </>
                        ) : (
                            <IconButton
                                sx={{
                                    color: (theme) => theme.palette.text.primary,
                                }}
                                onClick={() => setOpenDrawer(true)}
                            >
                                <MenuIcon
                                    sx={{
                                        fontSize: "1.7rem",
                                    }}
                                />
                            </IconButton>
                        )}
                    </FlexBetween>
                </FlexBetween>
            </Box>
        </Box>
    );
};

export default Navbar;
