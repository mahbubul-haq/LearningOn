import { createContext } from "react";
import React from "react";
import { useSelector } from "react-redux";

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

    const getMyCourses = async (authToken) => {
        // console.log("getMyCourses called")

        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/courses/mine`, {
            method: "GET",
            headers: {
                "auth-token": authToken
            }
        });
        const data = await response.json();
        if (!data.success) {
            throw new Error("Failed to fetch my courses");
        }

        return data.courses;

    };

    // for react query 
    const getRecentEnrollments = async ({ courseId, authToken, cursor }) => {

        // console.log("getRecentEnrollments called", courseId, cursor);

        let url = `${import.meta.env.VITE_SERVER_URL}/api/v1/enrollments?limit=20`;
        if (courseId) {
            url += `&courseId=${courseId}`;
        }

        if (cursor) {
            url += `&cursor=${encodeURIComponent(JSON.stringify(cursor))}`;
        }

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "auth-token": authToken
            }
        });
        const data = await response.json();
        if (!data.success) {
            throw new Error("Failed to fetch recent enrollments");
        }

        return data;
    };

    const getEnrollmentAnalytics = async ({ courseId, authToken, startDate, endDate }) => {

        // console.log("getEnrollmentAnalytics called", courseId, startDate, endDate);

        let url = `${import.meta.env.VITE_SERVER_URL}/api/v1/enrollments/analytics?startDate=${startDate}&endDate=${endDate}`;
        if (courseId) {
            url += `&courseId=${courseId}`;
        }
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "auth-token": authToken
            }
        });
        const data = await response.json();
        console.log("fetched enrollment analytics", courseId, data);
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
