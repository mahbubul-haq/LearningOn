import { createContext } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { apiFetch } from "../api/apiFetch";

export const DashboardContext = createContext();

export const DashboardState = (props) => {

    const [openedTab, setOpenedTab] = React.useState("Courses");
    const [selectedCourse, setSelectedCourse] = React.useState(null);
    const [recentEnrollments, setRecentEnrollments] = React.useState([]);
    const token = useSelector((state) => state.auth.token);
    const [enrollmentAnalytics, setEnrollmentAnalytics] = React.useState({
        chartData: [],
        totalRevenue: 0,
        totalEnrollments: 0
    });

    const getMyCourses = async () => {
        // console.log("getMyCourses called")

        const data = await apiFetch({
            url: `/api/v1/courses/mine`,
            method: "GET",
        });
        if (!data.success) {
            throw new Error("Failed to fetch my courses");
        }

        return data.courses;

    };

    // for react query 
    const getRecentEnrollments = async ({ courseId, cursor }) => {

        let params = {
            limit: 10
        }
        if (courseId) {
            params.courseId = courseId
        }
        if (cursor) {
            params.cursor = cursor
        }

        const data = await apiFetch({
            url: `/api/v1/enrollments`,
            method: "GET",
            params: params
        });
        if (!data.success) {
            throw new Error("Failed to fetch recent enrollments");
        }

        return data;
    };

    const getEnrollmentAnalytics = async ({ courseId, startDate, endDate }) => {

        // console.log("getEnrollmentAnalytics called", courseId, startDate, endDate);

        let url = `${import.meta.env.VITE_SERVER_URL}/api/v1/enrollments/analytics?startDate=${startDate}&endDate=${endDate}`;
        if (courseId) {
            url += `&courseId=${courseId}`;
        }
        let params = {
            startDate: startDate,
            endDate: endDate
        }
        if (courseId) {
            params.courseId = courseId
        }
        const data = await apiFetch({
            url: `/api/v1/enrollments/analytics`,
            method: "GET",
            params: params
        });
        // console.log("fetched enrollment analytics", courseId, data);
        if (!data.success) {
            throw new Error("Failed to fetch enrollment analytics");
        }
        return data;
    }

    return (
        <DashboardContext.Provider value={{
            openedTab,
            setOpenedTab,
            selectedCourse,
            setSelectedCourse,
            recentEnrollments,
            setRecentEnrollments,
            getMyCourses,
            getRecentEnrollments,
            getEnrollmentAnalytics,
            enrollmentAnalytics,
            setEnrollmentAnalytics
        }}>
            {props.children}
        </DashboardContext.Provider>
    );
};
