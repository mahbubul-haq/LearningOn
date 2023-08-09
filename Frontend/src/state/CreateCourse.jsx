import React, { createContext } from "react";

export const CreateCourseContext = createContext();

export const CreateCourseState = (props) => {
    const [courseState, setCourseState] = React.useState({
        category: "",
        courseTitle: "",
        courseDescription: "",
        studentRequirements: "",    
        skillTags: [],
        courseThumbnail: "",
        introVideo: "",
        courseLanguage: "",
        coursePrice: "",
        approxTimeToComplete: "",
        courseInstructors: [],
        lessons: [],
    });

    const isCourseValid = () => {
        for (const key in courseState) {
            if (courseState[key].length === 0) {
                return false;
            }
        }
        return true;
    };


    return (
        <CreateCourseContext.Provider value={{courseState, setCourseState, isCourseValid}}>
            {props.children}
        </CreateCourseContext.Provider>
    )
}

