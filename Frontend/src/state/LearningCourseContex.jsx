import { createContext, useEffect, useState, React } from "react";

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
    const [backFromQuiz, setBackFromQuiz] = useState(false);
    const [quizStatus, setQuizStatus] = useState(
        localStorage.getItem("quizStatus") ? JSON.parse(localStorage.getItem("quizStatus")) : {
            lessonNo: 0,
            status: "",//"attempting", "active",
        }
    );
    const [questions, setQuestions] = useState([]);

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
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/quiz/${courseId}/${lessonId}/attempt`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'auth-token': authToken
                },

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

    async function getQuestions(courseId, lessonId, authToken) {
        console.log("getQuestions", courseId, lessonId, authToken);
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/courses/${courseId}/lessons/${lessonId}/quiz`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'auth-token': authToken
                },
            });
            const data = await response.json();
            if (data.success) {
                console.log("Questions", data.questions);
                setQuestions(data.questions);
            }
            else {
                setQuestions([]);
            }
        } catch (error) {
            console.log("Failed to get questions", error);
            setQuestions([]);
        }
    }

    async function submitAnswer(courseId, lessonId, questionId, answer, quizAttemptId, authToken) {
        // console.log("submitAnswer", courseId, lessonId, questionId, answer, authToken);
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/quiz/${courseId}/${lessonId}/attempt/${quizAttemptId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    'auth-token': authToken
                },
                body: JSON.stringify({
                    questionId,
                    answer
                }),
            });
            const data = await response.json();
            if (data.success) {
                console.log("Answer Submitted", data.quizAttempt);
                // setQuizAttempt(data.quizAttempt);
                setQuizAttempt(data.quizAttempt);
            }
            else {

            }
        } catch (error) {
            console.log("Failed to submit answer", error);
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
                questions,
                setQuestions,
                getQuestions,
                submitAnswer,
                backFromQuiz,
                setBackFromQuiz
            }}
        >
            {children}
        </LearningCourseContext.Provider>
    );
};
