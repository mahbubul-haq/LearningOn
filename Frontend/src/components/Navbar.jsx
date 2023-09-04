import {
    Box,
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Badge,
} from "@mui/material";
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

const Navbar = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const isMobileScreens = useMediaQuery("(max-width: 600px)");
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [newNotifications, setNewNotifications] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();

    const {
        notifications,
        setNotifications,
        getNotifications,
        updateNotifications,
    } = useContext(NotificationContext);

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
        if (hours > 0) {
            time += hours + "h ";
        }
        if (minutes > -1) {
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
        getNotifications(user._id);
    }, []);

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
                    boxShadow: (theme) =>
                        `0px 4px 8px 0px ${theme.palette.nav.boxShadow}`,
                    padding: isNonMobileScreens
                        ? "0.5rem 1.5rem"
                        : "0rem 1.3rem",
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
                                    fontSize: isNonMobileScreens
                                        ? "2rem"
                                        : "1rem",
                                    cursor: "pointer",
                                }}
                                onClick={() => navigate("/")}
                            >
                                Learning
                                <Box
                                    sx={{
                                        display: "inline-block",
                                        color: (theme) =>
                                            theme.palette.primary.main,
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
                                    color: (theme) =>
                                        theme.palette.text.primary,
                                }}
                            >
                                <StyledBox1>
                                    Courses
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
                                                    color: (theme) =>
                                                        theme.palette.text
                                                            .primary,
                                                }}
                                                onClick={handleClick}
                                            >
                                                <Badge
                                                    badgeContent={
                                                        newNotifications
                                                    }
                                                    color="error"
                                                    size="small"
                                                    sx={{
                                                        color: (theme) =>
                                                            theme.palette.text
                                                                .primary,
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
                                                    "aria-labelledby":
                                                        "basic-button",
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
                                                {notifications?.map(
                                                    (n, index) => (
                                                        <MenuItem
                                                            key={index}
                                                            onClick={() => {
                                                                updateNotifications(
                                                                    n._id,
                                                                    "clicked"
                                                                );
                                                                window.location.href =
                                                                    n.link;
                                                            }}
                                                            sx={{
                                                                maxWidth:
                                                                    "500px",
                                                                whiteSpace:
                                                                    "wrap",
                                                                backgroundColor:
                                                                    n.status ===
                                                                    "new"
                                                                        ? theme
                                                                              .palette
                                                                              .background
                                                                              .imagesBg
                                                                        : n.status ===
                                                                          "opened"
                                                                        ? theme
                                                                              .palette
                                                                              .background
                                                                              .imagesBg1
                                                                        : theme
                                                                              .palette
                                                                              .grey
                                                                              .grey50,
                                                            }}
                                                        >
                                                            <Box>
                                                                <FlexBetween gap="1rem">
                                                                    <img
                                                                        src={
                                                                            n.imageLink
                                                                                ? `${
                                                                                      import.meta
                                                                                          .env
                                                                                          .VITE_REACT_APP_URL
                                                                                  }/images/${
                                                                                      n.imageLink
                                                                                  }`
                                                                                : "/images/dummyPerson.jpeg"
                                                                        }
                                                                        alt="user"
                                                                        style={{
                                                                            width: "2rem",
                                                                            height: "2rem",
                                                                            borderRadius:
                                                                                "50%",
                                                                        }}
                                                                    />
                                                                    <div
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: n.message,
                                                                        }}
                                                                    ></div>
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize:
                                                                                "0.8rem",
                                                                            textAlign:
                                                                                "right",
                                                                            whiteSpace:
                                                                                "nowrap",
                                                                            color: (
                                                                                theme
                                                                            ) =>
                                                                                theme
                                                                                    .palette
                                                                                    .text
                                                                                    .secondary,
                                                                        }}
                                                                    >
                                                                        {convertTime(
                                                                            n.createdAt
                                                                        )}
                                                                    </Typography>
                                                                </FlexBetween>
                                                            </Box>
                                                        </MenuItem>
                                                    )
                                                )}
                                            </Menu>
                                            <IconButton
                                                sx={{
                                                    color: (theme) =>
                                                        theme.palette.text
                                                            .primary,
                                                }}
                                                onClick={() => {
                                                    navigate(
                                                        `/profile/${user._id}`
                                                    );
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
                                                        backgroundColor:
                                                            "transparent",
                                                        "&:hover": {
                                                            backgroundColor: (
                                                                theme
                                                            ) =>
                                                                theme.palette
                                                                    .primary
                                                                    .main,
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
                                    color: (theme) =>
                                        theme.palette.text.primary,
                                }}
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
