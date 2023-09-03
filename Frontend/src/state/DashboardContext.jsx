import { createContext } from "react";
import React from "react";


export const DashboardContext = createContext();

export const DashboardState = (props) => {

    const [openedTab, setOpenedTab] = React.useState("Courses");
    const [myCourses, setMyCourses] = React.useState([]);
    const [selectedCourse, setSelectedCourse] = React.useState(null);
    const [recentEnrollments, setRecentEnrollments] = React.useState([]);

    return (
        <DashboardContext.Provider value={{
            openedTab,
            setOpenedTab,
            myCourses,
            setMyCourses,
            selectedCourse,
            setSelectedCourse,
            recentEnrollments,
            setRecentEnrollments
        }}>
            {props.children}
        </DashboardContext.Provider>
    );
};
