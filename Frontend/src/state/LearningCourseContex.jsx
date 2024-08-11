import { createContext, useState } from "react";

export const LearningCourseContext = createContext(null);

export const LearningCourseState = ({ children }) => {
    const [openedLesson, setOpenedLesson] = useState({
        lesson: 1,
        subLesson: 0,
    });
    const [expandedLessons, setExpandedLessons] = useState([]);
    const [openDrawer, setOpenDrawer] = useState(false);

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
