import { createContext } from "react";
import React from "react";
import { useSelector } from "react-redux";

export const DashboardContext = createContext();

export const DashboardState = (props) => {

    const [openedTab, setOpenedTab] = React.useState("Courses");
    const [myCourses, setMyCourses] = React.useState([]);
    const [selectedCourse, setSelectedCourse] = React.useState(null);
    const [recentEnrollments, setRecentEnrollments] = React.useState([]);
    const token = useSelector((state) => state.auth.token);

    const getMyCourses = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/course/getmycourses`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token
                }
            });
            const data = await response.json();
            if (data.success) {
                setMyCourses(data.courseInfo);
                console.log("my courses", data.courseInfo);
            }
        } catch (error) {
            console.log("my courses error", error);
        }
    };

    return (
        <DashboardContext.Provider value={{
            openedTab,
            setOpenedTab,
            myCourses,
            setMyCourses,
            selectedCourse,
            setSelectedCourse,
            recentEnrollments,
            setRecentEnrollments,
            getMyCourses
        }}>
            {props.children}
        </DashboardContext.Provider>
    );
};
