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

const Dashboard = () => {
    const theme = useTheme();
    const user = useSelector((state) => state.user);
    const {
        openedTab,
        setOpenedTab,
        selectedCourse,
        setSelectedCourse,
        recentEnrollments,
        setRecentEnrollments,
    } = useContext(DashboardContext);

    useEffect(() => {
        console.log(user?.courses);
    }, [user?.courses]);

    useEffect(() => {
        console.log(selectedCourse);
        let element = document.querySelector(".dashboard");
        if (element) {
            element.scrollTop = 0;
        }
    }, [selectedCourse]);

    useEffect(() => {
        if (selectedCourse) {
            const enrollments = selectedCourse.enrolledStudents.map(
                (enrollment) => {
                    return {
                        enrolledOn: enrollment.enrolledOn,
                        userId: enrollment.userId,
                        userName: enrollment.userName,
                        paidAmount: enrollment.paidAmount,
                    };
                }
            );

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
                    sx={{
                        position: "sticky",
                        top: "-4.5rem",
                        zIndex: "10",
                    }}
                >
                    <DashboardTop />
                </Box>
                <Box
                    sx={{
                        px: "5rem",
                        display: "flex",
                        gap: "2rem",
                        py: "3rem",
                    }}
                >
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
                    <Box
                        sx={{
                            width: "55%",
                            backgroundColor: theme.palette.background.alt,
                            borderRadius: "0.25rem",
                            p: "1rem",
                            // maxHeight: "1000px"
                        }}
                    >
                        <DashboardMiddle />
                    </Box>
                    <Box
                        sx={{
                            width: "25%",
                            backgroundColor: theme.palette.background.alt,
                            borderRadius: "0.25rem",
                            p: "1rem",
                            maxHeight: "1500px",
                            overflow: "auto",
                        }}
                    >
                        <DashboardRight />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
