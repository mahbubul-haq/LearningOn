import { createContext, useEffect, useState } from "react";

export const LearningCourseContext = createContext(null);

export const LearningCourseState = ({ children }) => {
    const [openedLesson, setOpenedLesson] = useState(localStorage.getItem("openedLesson") ? {
        lesson: JSON.parse(localStorage.getItem("openedLesson")).lesson,
        subLesson: JSON.parse(localStorage.getItem("openedLesson")).subLesson,
    } : {
        lesson: 1,
        subLesson: 1,
    });
    const [expandedLessons, setExpandedLessons] = useState([]);
    const [openDrawer, setOpenDrawer] = useState(false);



    useEffect(() => {
        localStorage.setItem("openedLesson", JSON.stringify(openedLesson));

    }, [openedLesson]);

    return (
        <LearningCourseContext.Provider
            value={{
                openedLesson,
                setOpenedLesson,
                expandedLessons,
                setExpandedLessons,
                openDrawer,
                setOpenDrawer
            }}
        >
            {children}
        </LearningCourseContext.Provider>
    );
};
