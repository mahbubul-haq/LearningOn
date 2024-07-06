import { Box, Typography } from "@mui/material";
import FlexBetween from "../FlexBetween.jsx";
import { StyledBox1 } from "../StyledButton.jsx";
import { useMediaQuery } from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { NotificationContext } from "../../state/NotificationContext.jsx";
import { useEffect } from "react";
import { useState } from "react";
import { GlobalContext } from "../../state/GlobalContext.jsx";
import MobileNav from "./MobileNav.jsx";
import NotificationDrawer from "./NotificationDrawer.jsx";
import NavRight from "./NavRight.jsx";
import useTheme from "@mui/material/styles/useTheme";
import { CourseExplorerContext } from "../../state/CourseExplorerContext.jsx";

const Navbar = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [newNotifications, setNewNotifications] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openNotificationDrawer, setOpenNotificationDrawer] = useState(false);
  const theme = useTheme();

  const { openedItem } = useContext(GlobalContext);
  const { notifications, getNotifications, updateNotifications } =
    useContext(NotificationContext);

  const { setShowCourseExplorer, setCloseBtnClicked } = useContext(CourseExplorerContext);

  const calculateNewNotifications = () => {
    let count = 0;
    notifications?.forEach((n) => {
      if (n.status === "new") {
        count++;
      }
    });
    setNewNotifications(count);
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

  const mobileNav = () => {
    return (
      <MobileNav
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        setOpenNotificationDrawer={setOpenNotificationDrawer}
        newNotifications={newNotifications}
      />
    );
  };

  const notificationDrawer = () => {
    return (
      <NotificationDrawer
        openNotificationDrawer={openNotificationDrawer}
        setOpenNotificationDrawer={setOpenNotificationDrawer}
        handleClose={handleClose}
      />
    );
  };

  const navRight = () => {
    return (
      <NavRight
        handleClick={handleClick}
        anchorEl={anchorEl}
        handleClose={handleClose}
        open={open}
        newNotifications={newNotifications}
        notifications={notifications}
        updateNotifications={updateNotifications}
        setOpenDrawer={setOpenDrawer}
      />
    );
  };

  return (
    <Box
      sx={{
        // very light gray boxShadow
        position: "sticky",
        top: 0,
        backgroundColor: "white",
        zIndex: 100,
        borderBottom: `1px solid ${theme.palette.grey.grey100}`,
        width: "100%",
      }}
    >
      <Box
        sx={{
          maxWidth: "2000px",
          mx: "auto",
          display: "flex",
          alignItems: "center",
          flexGrow: 1,
          padding: 0,
        }}
      >
        {!isNonMobileScreens && mobileNav()}
        {!isNonMobileScreens && notificationDrawer()}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            height: isNonMobileScreens ? "5rem" : "4rem",
            backgroundColor: "white",

            padding: isNonMobileScreens ? "0rem 64px" : "0rem 24px",
          }}
        >
          <FlexBetween
            sx={{
              flexGrow: 1,
              height: "100%",
            }}
          >
            <FlexBetween
              sx={{
                height: "100%",
                "&&": {
                  gap: "7rem",
                },
              }}
            >
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
                    height: "100%",
                    //border: "2px solid green",
                    fontSize: "1.2rem",
                    color: (theme) => theme.palette.text.primary,
                  }}
                >
                  <StyledBox1
                    className="nav-course"
                    onMouseOver={() => {
                      setCloseBtnClicked(false);
                      setShowCourseExplorer(true);
                    }}
                    onMouseOut={() => setShowCourseExplorer(false)}
                    sx={{
                      // height: "100%",
                      // border: "2px solid red",
                      position: "relative",
                    }}
                  >
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

                  <StyledBox1
                    sx={{
                      "&&": {
                        cursor: "auto",
                        opacity: "0.4",
                      },
                    }}
                  >
                    Blogs
                    <ExpandMoreIcon
                      sx={{
                        fontSize: "1.5rem",
                      }}
                    />
                  </StyledBox1>
                  <StyledBox1
                    sx={{
                      "&&": {
                        cursor: "auto",
                        opacity: "0.4",
                      },
                    }}
                  >
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
            {navRight()}
          </FlexBetween>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
