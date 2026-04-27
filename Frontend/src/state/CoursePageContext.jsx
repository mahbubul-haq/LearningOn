import { createContext, useState } from "react";

export const CoursePageContext = createContext();

export const CoursePageState = (props) => {
    const [relatedCourses, setRelatedCourses] = useState([]);
    const [relatedCoursesLoading, setRelatedCoursesLoading] = useState(false);

    const fetchRelatedCourses = async (category, courseId, token) => {

        setRelatedCoursesLoading(true);
        let encodedCategory = encodeURIComponent(category);

        try {
            let response = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/courses?category=${encodedCategory}&courseId=${courseId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                }
            );

            let data = await response.json();

            if (data.success) {
                setRelatedCourses([...data.courses]);
            }
            else {
                setRelatedCourses([]);
            }

        } catch (err) {
            // console.error("Failed to fetch related courses:", err);
            setRelatedCourses([]);
        } finally {
            setRelatedCoursesLoading(false);
        }
    };

    return (
        <CoursePageContext.Provider value={{
            relatedCourses,
            setRelatedCourses,
            relatedCoursesLoading,
            setRelatedCoursesLoading,
            fetchRelatedCourses
        }}>
            {props.children}
        </CoursePageContext.Provider>
    );
}

