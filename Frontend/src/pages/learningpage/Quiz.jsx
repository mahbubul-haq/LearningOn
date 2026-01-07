import React, { useEffect, useContext } from 'react'
import { LearningCourseContext } from '../../state/LearningCourseContex'
import { useSelector } from 'react-redux';
import { fetchLessons } from '../../state/reduxStore/learningPageSlice';
import { useAppDispatch } from '../../state/reduxStore/hooks';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {

    const { quizAttempt, getQuizAttempt, quizStatus, setQuizStatus } = useContext(LearningCourseContext);
    const { courseInfo } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const courseId = useParams().courseId;
    const lessonId = useParams().lessonId;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setQuizStatus(prev =>
            localStorage.getItem("quizStatus") ? JSON.parse(localStorage.getItem("quizStatus")) : {
                ...prev,
                status: "active",
            }
        )
        if (!token) {
            navigate("/login", {
                state: {
                    isLogin: true,
                    redirect: `/quiz/${courseId}/${lessonId}`,
                }
            });

        }
        else if (!courseInfo?._id) dispatch(fetchLessons(courseId, token));

    }, []);


    useEffect(() => {
        console.log("quizStatus", quizStatus);

        getQuizAttempt(courseId, lessonId, token);

    }, [quizStatus, courseId, lessonId])

    return (
        <div>Quiz</div>
    )
}

export default Quiz