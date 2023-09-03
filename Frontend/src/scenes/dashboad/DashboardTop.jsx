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

const DashboardTop = () => {

    const theme = useTheme();
    const navigate = useNavigate();
    const { openedTab, setOpenedTab, selectedCourse, setSelectedCourse } =
        useContext(DashboardContext);

    // useEffect(() => {
    //     console.log(key);
    // }, [key]);

    return (
        <Box
            sx={{
                padding: "2rem 5rem 0rem 5rem",
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
                    mb: "1rem",
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
            </BreadCrumbs>
            <Box sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                position: "sticky",
                top: "0",
            }}>
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
                    gap: "0rem",
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
                    style={
                        {
                            // padding: "1rem 2rem",
                        }
                    }
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
        </Box>
    );
};

export default DashboardTop;
