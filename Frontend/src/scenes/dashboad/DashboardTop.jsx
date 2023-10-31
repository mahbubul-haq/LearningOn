import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import BreadCrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import FlexBetween from "../../components/FlexBetween";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { DashboardContext } from "../../state/DashboardContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import GroupIcon from "@mui/icons-material/Group";
import CategoryIcon from "@mui/icons-material/Category";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import DashboardLeft from "./DashboardLeft";
import CloseIcon from "@mui/icons-material/Close";
import DashboardRight from "./DashboardRight";

const DashboardTop = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { openedTab, setOpenedTab, selectedCourse, setSelectedCourse } = useContext(DashboardContext);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const [anchorElLeft, setAnchorElLeft] = useState(null);
    const [anchorElRight, setAnchorElRight] = useState(null);
    const [anchorElOptions, setAnchorElOptions] = useState(null);

    // useEffect(() => {
    //     console.log(key);
    // }, [key]);

    return (
        <Box
            sx={{
                padding: isNonMobileScreens ? "2rem 5rem 0rem 5rem" : "1rem 1rem 0rem 1rem",
                backgroundColor: theme.palette.background.bottom,
                backgroundImage: `linear-gradient(to bottom, ${theme.palette.background.top}, ${theme.palette.background.bottom})`,
                color: theme.palette.text.primary,
            }}
        >
            <BreadCrumbs
                sx={{
                    color: theme.palette.grey.grey300,
                    "& .MuiBreadcrumbs-separator": {
                        color: theme.palette.grey.grey300,
                    },
                    mb: isNonMobileScreens ? "1rem" : "0.5rem",
                }}
                aria-label="breadcrumb"
            >
                <FlexBetween
                    sx={{
                        cursor: "pointer",

                        gap: "0.5rem",
                        "&:hover": {
                            textDecoration: "underline",
                        },
                    }}
                    onClick={() => navigate("/")}
                >
                    <HomeIcon sx={{ fontSize: "1.2rem" }} />
                    <Typography sx={{ fontSize: "1rem" }}>Home</Typography>
                </FlexBetween>
                <Typography
                    sx={{
                        fontSize: "1rem",
                        cursor: "pointer",
                        color: theme.palette.grey.grey600,
                        "&:hover": {
                            textDecoration: "underline",
                        },
                    }}
                >
                    Dashboard
                </Typography>
                <Typography
                    sx={{
                        fontSize: "1rem",
                        cursor: "pointer",
                        color: theme.palette.grey.grey600,
                        "&:hover": {
                            textDecoration: "underline",
                        },
                    }}
                >
                    {openedTab}
                </Typography>
            </BreadCrumbs>
            {isNonMobileScreens && (
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        position: "sticky",
                        top: "0",
                    }}
                >
                    <Tabs
                        defaultActiveKey="Courses"
                        id="fill-tab-example"
                        // className="mb-3"
                        className="dashboard-tabs"
                        // fill
                        onSelect={(k) => setOpenedTab(k)}
                        //change the style of tabs
                        style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            // gap: "1rem",
                            fontSize: "1.2rem",
                            // fontWeight: "bold",
                            color: theme.palette.text.primary,
                            // backgroundColor: theme.palette.background.default,
                            //change background color of active tab
                        }}
                    >
                        <Tab
                            eventKey="Courses"
                            title="Courses"
                            style={{
                                p: "1rem",
                            }}
                        >
                            {/* Tab content for Home */}
                        </Tab>
                        <Tab eventKey="Blogs" title="Blogs">
                            {/* Tab content for Profile */}
                        </Tab>
                        <Tab eventKey="Tutoring" title="Tutoring">
                            {/* Tab content for Loooonger Tab */}
                        </Tab>
                    </Tabs>
                </Box>
            )}
            {!isNonMobileScreens && (
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        gap: "1rem",
                        justifyContent: "center",
                    }}
                >
                    <IconButton
                        onClick={(event) => {
                            setAnchorElLeft(event.currentTarget);
                        }}
                        title="Select Course"
                    >
                        <ViewModuleIcon
                            sx={{
                                fontSize: "1.5rem",
                                color: theme.palette.grey.grey400,
                                "&:hover": {
                                    color: theme.palette.grey.grey800,
                                },
                            }}
                        />
                    </IconButton>
                    <Menu
                        id="dashboard-left-menu"
                        anchorEl={anchorElLeft}
                        open={Boolean(anchorElLeft)}
                        onClose={() => setAnchorElLeft(null)}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                        }}
                    >
                        <Box
                            sx={{
                                p: "2rem 1rem 1rem 1rem",
                                position: "relative",
                            }}
                        >
                            <CloseIcon
                                sx={{
                                    position: "absolute",
                                    top: "0.2rem",
                                    right: "1rem",
                                    cursor: "pointer",
                                }}
                                onClick={() => setAnchorElLeft(null)}
                            />
                            <DashboardLeft />
                        </Box>
                    </Menu>

                    <IconButton
                        onClick={(event) => {
                            setAnchorElOptions(event.currentTarget);
                        }}
                        title="Select Category"
                    >
                        <CategoryIcon
                            sx={{
                                fontSize: "1.5rem",
                                color: theme.palette.grey.grey400,
                                "&:hover": {
                                    color: theme.palette.grey.grey800,
                                },
                            }}
                        />
                    </IconButton>
                    <Menu
                        id="dashboard-options-menu"
                        anchorEl={anchorElOptions}
                        open={Boolean(anchorElOptions)}
                        onClose={() => setAnchorElOptions(null)}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                        }}
                    >
                        <Box
                            sx={{
                                p: "2rem 2rem 1rem 2rem",
                                position: "relative",
                            }}
                        >
                            <CloseIcon
                                sx={{
                                    position: "absolute",
                                    top: "0.2rem",
                                    right: "1rem",
                                    cursor: "pointer",
                                }}
                                onClick={() => setAnchorElOptions(null)}
                            />
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1rem",
                                    mt: "0.5rem",
                                    minWidth: "120px",
                                    // alignItems: "center",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "1.2rem",
                                        fontWeight: openedTab === "Courses" ? "bold" : "normal",
                                        "&:hover": {
                                            fontWeight: "bold",
                                        },
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        setOpenedTab("Courses");
                                        setAnchorElOptions(null);
                                    }}
                                >
                                    Courses
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "1.2rem",
                                        fontWeight: openedTab === "Blogs" ? "bold" : "normal",
                                        "&:hover": {
                                            fontWeight: "bold",
                                        },
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        setOpenedTab("Blogs");
                                        setAnchorElOptions(null);
                                    }}
                                >
                                    Blogs
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "1.2rem",
                                        fontWeight: openedTab === "Tutoring" ? "bold" : "normal",
                                        "&:hover": {
                                            fontWeight: "bold",
                                        },
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        setOpenedTab("Tutoring");
                                        setAnchorElOptions(null);
                                    }}
                                >
                                    Tutoring
                                </Typography>
                            </Box>
                        </Box>
                    </Menu>

                    <IconButton
                        onClick={(event) => {
                            setAnchorElRight(event.currentTarget);
                        }}
                        title="Recent Enrollments"
                    >
                        <GroupIcon
                            sx={{
                                fontSize: "1.5rem",
                                color: theme.palette.grey.grey400,
                                "&:hover": {
                                    color: theme.palette.grey.grey800,
                                },
                            }}
                        />
                    </IconButton>
                    <Menu
                        id="dashboard-right-menu"
                        anchorEl={anchorElRight}
                        open={Boolean(anchorElRight)}
                        onClose={() => setAnchorElRight(null)}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                        }}
                    >
                        <Box
                            sx={{
                                p: "2rem 1rem 1rem 1rem",
                                position: "relative",
                            }}
                        >
                            <CloseIcon
                                sx={{
                                    position: "absolute",
                                    top: "0.2rem",
                                    right: "1rem",
                                    cursor: "pointer",
                                }}
                                onClick={() => setAnchorElRight(null)}
                            />
                            <DashboardRight />
                        </Box>
                    </Menu>
                </Box>
            )}
        </Box>
    );
};

export default DashboardTop;
