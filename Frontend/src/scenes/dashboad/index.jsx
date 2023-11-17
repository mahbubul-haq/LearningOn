import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Navbar from "../../components/Navbar";
import DashboardTop from "./DashboardTop";
import DashboardLeft from "./DashboardLeft";
import DashboardMiddle from "./DashboardMiddle";
import DashboardRight from "./DashboardRight";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { DashboardContext } from "../../state/DashboardContext";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../../state/GlobalContext";
import useMediaQuery from "@mui/material/useMediaQuery";

const Dashboard = () => {
    const theme = useTheme();
    const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const isMobileScreens = useMediaQuery("(max-width: 600px)");
    const params = useParams();
    const { setOpenedItem } = useContext(GlobalContext);
    const { openedTab, setOpenedTab, selectedCourse, setSelectedCourse, recentEnrollments, setRecentEnrollments } = useContext(DashboardContext);

    useEffect(() => {
        if (!user) {
            window.location.href = "/";
        }
        setOpenedItem("dashboard");
        
    }, []);

    useEffect(() => {
        if (params.courseId) {
            setSelectedCourse(user?.courses.find((course) => course._id == params.courseId));
        } else {
            setSelectedCourse(null);
        }
    }, [params]);

    useEffect(() => {
        // console.log(selectedCourse);
        //add selectecCourse._id to url

        window.history.pushState({}, "", `/dashboard/${selectedCourse?._id}`);

        let element = document.querySelector(".dashboard");
        if (element) {
            element.scrollTop = 0;
        }
    }, [selectedCourse]);

    useEffect(() => {
        if (selectedCourse) {
            const enrollments = selectedCourse.enrolledStudents.map((enrollment) => {
                return {
                    enrolledOn: enrollment.enrolledOn,
                    userId: enrollment.userId,
                    userName: enrollment.userName,
                    paidAmount: enrollment.paidAmount,
                };
            });

            enrollments.sort((a, b) => {
                return new Date(b.enrolledOn) - new Date(a.enrolledOn);
            });

            setRecentEnrollments(enrollments);
        } else {
            const enrollments = [];
            user?.courses?.forEach((course) => {
                course.enrolledStudents.forEach((enrollment) => {
                    enrollments.push({
                        enrolledOn: enrollment.enrolledOn,
                        userId: enrollment.userId,
                        userName: enrollment.userName,
                        paidAmount: enrollment.paidAmount,
                        courseTitle: course.courseTitle,
                    });
                });
            });

            enrollments.sort((a, b) => {
                return new Date(b.enrolledOn) - new Date(a.enrolledOn);
            });
            setRecentEnrollments(enrollments);
        }
    }, [selectedCourse]);

    useEffect(() => {
        console.log(recentEnrollments);
    }, [recentEnrollments]);

    return (
        <Box
            className="dashboard"
            sx={{
                height: "100%",
                width: "100%",
                // minHeight: "600px",
                overflow: "auto",
                scrollBehavior: "smooth",
            }}
        >
            <Box
                sx={{
                    minHeight: "600px",
                    // height: "100%",
                    width: "100%",
                    //overflow: "auto",
                    
                }}
            >
                <Box>
                    <Navbar />
                </Box>
                <Box
                    className="dashboard-top"
                    sx={{
                        position: "sticky",
                        top: isNonMobileScreens ? "-1rem" : "0",
                        zIndex: "10",
                    }}
                >
                    <DashboardTop />
                </Box>
                <Box
                    sx={{
                        px: isNonMobileScreens ? "5rem": "1rem",
                        display: "flex",
                        gap: "2rem",
                        py: "3rem",
                    }}
                >
                    {isNonMobileScreens && (
                        <Box
                            sx={{
                                width: "20%",
                                backgroundColor: theme.palette.background.alt,
                                borderRadius: "0.25rem",
                                p: "1rem",
                            }}
                        >
                            <DashboardLeft />
                        </Box>
                    )}
                    <Box
                        sx={{
                            width: isNonMobileScreens ? "55%" : "100%",
                            backgroundColor: theme.palette.background.alt,
                            borderRadius: "0.25rem",
                            p: "1rem",
                            pb: "3rem",
                            // maxHeight: "1000px"
                        }}
                    >
                        <DashboardMiddle />
                    </Box>
                    {isNonMobileScreens && (
                        <Box
                            sx={{
                                width: "25%",
                                backgroundColor: theme.palette.background.alt,
                                borderRadius: "0.25rem",
                                p: "1rem",
                                maxHeight: "1500px",
                                overflow: "auto",
                                "&::-webkit-scrollbar": {
                                    width: "0.5rem",
                                },
                                "&::-webkit-scrollbar-track": {
                                    background: "white",
                                    borderRadius: "0.25rem",
                                },
                                "&::-webkit-scrollbar-thumb": {
                                    background: theme.palette.grey.grey300,

                                    borderRadius: "0.25rem",
                                    //change the length of scroll bar thumb
                                    height: "5px",
                                },

                                "&::-webkit-scrollbar-thumb:hover": {
                                    background: theme.palette.grey.grey400,
                                },

                                "&::-webkit-scrollbar-thumb:active": {
                                    background: theme.palette.grey.grey400,
                                },

                                //change the buttons of scroll bar
                                "&::-webkit-scrollbar-button": {
                                    display: "none",
                                },
                            }}
                        >
                            <DashboardRight />
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
