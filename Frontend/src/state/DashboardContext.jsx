import { createContext } from "react";
import React from "react";
import { useSelector } from "react-redux";

export const DashboardContext = createContext();

export const DashboardState = (props) => {

    const [openedTab, setOpenedTab] = React.useState("Courses");
    const [selectedCourse, setSelectedCourse] = React.useState(null);
    const [recentEnrollments, setRecentEnrollments] = React.useState([]);
    const token = useSelector((state) => state.auth.token);

    const getMyCourses = async (authToken) => {
        console.log("getMyCourses called")

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

        console.log("getRecentEnrollments called", courseId, cursor);

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

    return (
        <DashboardContext.Provider value={{
            openedTab,
            setOpenedTab,
            selectedCourse,
            setSelectedCourse,
            recentEnrollments,
            setRecentEnrollments,
            getMyCourses,
            getRecentEnrollments
        }}>
            {props.children}
        </DashboardContext.Provider>
    );
};
