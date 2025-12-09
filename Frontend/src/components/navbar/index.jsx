import { Box, Typography, useMediaQuery } from "@mui/material";
import FlexBetween from "../FlexBetween.jsx";
import { StyledBox1 } from "../StyledButton.jsx";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useTheme from "@mui/material/styles/useTheme";
import { useContext, useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CourseExplorerContext } from "../../state/CourseExplorerContext.jsx";
import { GlobalContext } from "../../state/GlobalContext.jsx";
import { NotificationContext } from "../../state/NotificationContext.jsx";
import MobileNav from "./MobileNav.jsx";
import NavRight from "./NavRight.jsx";
import NotificationDrawer from "./NotificationDrawer.jsx";

const Navbar = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [newNotifications, setNewNotifications] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openNotificationDrawer, setOpenNotificationDrawer] = useState(false);
  const theme = useTheme();
  const coursesHoverRef = useRef(null);

  const { openedItem } = useContext(GlobalContext);
  const { notifications, getNotifications, updateNotifications } =
    useContext(NotificationContext);

  const { setShowCourseExplorer, setCloseBtnClicked, openCourseExplorer, closeCourseExplorer } = useContext(
    CourseExplorerContext
  );

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
                  component="a"
                  href={`${import.meta.env.VITE_CLIENT_URL}`}
                  sx={{
                    textDecoration: "none",
                    fontWeight: "600",
                    fontSize: isNonMobileScreens ? "2rem" : "1rem",
                    cursor: "pointer",
                    color: "inherit",
                    "&:hover": {
                      color: "inherit",
                    }
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                  }}
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
                    onMouseOver={openCourseExplorer}
                    onMouseOut={closeCourseExplorer}
                    
                    sx={{
                      // height: "100%",
                      // border: "2px solid red",
                      position: "relative",
                    }}
                  >
                    <Box
                      component="a"
                      href={`${import.meta.env.VITE_CLIENT_URL}/courses`}
                      sx={{
                        fontWeight: openedItem == "courses" ? "600" : "400",
                        textDecoration: "none",
                        color: "inherit",
                        "&:hover": {
                          color: "inherit"
                        }
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        setCloseBtnClicked(true);
                        navigate("/courses");
                      }}
                    >
                      Courses
                    </Box>
                    <ExpandMoreIcon
                      sx={{
                        fontSize: "1.5rem",
                      }}
                    />
                  </StyledBox1>

                  {/* <StyledBox1
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
                  </StyledBox1> */}
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
