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
    const [quizAttempt, setQuizAttempt] = useState(null);
    const [quizStatus, setQuizStatus] = useState(
        localStorage.getItem("quizStatus") ? JSON.parse(localStorage.getItem("quizStatus")) : {
            lessonNo: 0,
            status: "",//"attempting", "active",
        }
    );

    useEffect(() => {
        localStorage.setItem("quizStatus", JSON.stringify(quizStatus));
    }, [quizStatus]);


    useEffect(() => {
        if (!expandedLessons.includes(openedLesson.lesson - 1)) {
            setExpandedLessons((prev) => [...prev, openedLesson.lesson - 1]);
        }
        localStorage.setItem("openedLesson", JSON.stringify(openedLesson));

    }, [openedLesson]);

    async function getQuizAttempt(courseId, lessonId, authToken) {
        console.log("getQuizAttempt", courseId, lessonId, authToken);
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/quiz/attempt`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'auth-token': authToken
                },
                body: JSON.stringify({
                    courseId,
                    lessonId
                }),
            });
            const data = await response.json();
            if (data.success) {
                console.log("Quiz Attempt", data.quizAttempt);
                setQuizAttempt(data.quizAttempt);
            }
            else {

            }
        } catch (error) {
            console.log("Failed to get quiz attempt", error);
        }
    }

    return (
        <LearningCourseContext.Provider
            value={{
                openedLesson,
                setOpenedLesson,
                expandedLessons,
                setExpandedLessons,
                openDrawer,
                setOpenDrawer,
                quizStatus,
                setQuizStatus,
                getQuizAttempt,
                quizAttempt,
                setQuizAttempt,
            }}
        >
            {children}
        </LearningCourseContext.Provider>
    );
};
