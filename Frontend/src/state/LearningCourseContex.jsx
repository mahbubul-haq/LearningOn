import { createContext } from "react";
import { useState } from "react";

export const LearningCourseContext = createContext(null);

export const LearningCourseState = ({ children }) => {
    const [openedLesson, setOpenedLesson] = useState({
        lesson: 1,
        subLesson: 0,
    });

    return (
        <LearningCourseContext.Provider
            value={{
                openedLesson,
                setOpenedLesson,
            }}
        >
            {children}
        </LearningCourseContext.Provider>
    );
};
