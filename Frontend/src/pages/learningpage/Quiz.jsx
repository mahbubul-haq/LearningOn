import React, { useEffect, useContext, useState } from 'react';
import {
    Box, Container, Typography, Button, Stack,
    CircularProgress, IconButton, Paper, Divider, LinearProgress, Fade
} from '@mui/material';
import { useTheme } from "@mui/material/styles";
import { ArrowBackIosNew, SkipNext, WorkspacePremium, Replay, CheckCircle, Cancel } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LearningCourseContext } from '../../state/LearningCourseContex';
import QuizTop from './QuizTop';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useAppDispatch } from '../../state/reduxStore/hooks';
import { fetchLessons, updateCourseInfo } from '../../state/reduxStore/learningPageSlice';
import { colorTokens } from '../../theme';
import QuizQuestion from './QuizQuestion';
import QuizActions from './QuizActions';

const quizTracker = {
    attemptCount: 1,
    previousOption: null,
    currentIdx: null,

}

const Quiz = () => {
    const theme = useTheme();
    const { quizAttempt, getQuizAttempt, setQuizStatus, getQuestions, questions, submitAnswer, setQuizAttempt } = useContext(LearningCourseContext);
    const { token } = useSelector((state) => state.auth);
    const { courseInfo } = useSelector((state) => state.course);
    const { courseId, lessonId } = useParams();
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const isMobileScreens = useMediaQuery("(max-width:600px)");
    const maxWidth400 = useMediaQuery("(max-width:400px)");
    const dispatch = useAppDispatch();

    // UI States
    const [currentIdx, setCurrentIdx] = useState(0);
    // const [selectedOption, setSelectedOption] = useState(null);
    const [attemptCount, setAttemptCount] = useState(1);
    const [timer, setTimer] = useState({
        remainingTime: 0,
        totalTime: 0,
    });
    const [visible, setVisible] = useState(true);
    const [quizHistory, setQuizHistory] = useState({});
    const [progressValue, setProgressValue] = useState(0);
    const [curQuestionState, setCurQuestionState] = useState({
        previousAnswer: "",
        attemptNumber: 0,

    });
    const getQuestionState = () => {
        const answer = quizAttempt?.answers?.find((answer) => answer.questionId == questions[currentIdx]?._id);
        if (answer) {
            setCurQuestionState({
                previousAnswer: parseInt(answer.answer),
                attemptNumber: answer.attemptNumber,
                isCorrect: answer.isCorrect,
                correctAnswer: answer.correctAnswer ? parseInt(answer.correctAnswer) : null,
            })
        }
        else {
            setCurQuestionState({
                previousAnswer: "",
                attemptNumber: 0,
                isCorrect: false,
                correctAnswer: null,
            })
        }
    }
    useEffect(() => {
        if (questions?.length > 0 && quizAttempt?._id) getQuestionState();
    }, [currentIdx, quizAttempt]);


    useEffect(() => {
        console.log(courseId, token);
        if (!token) {
            navigate("/login", {
                state: {
                    isLogin: true,
                    redirect: `/quiz/${courseId}/${lessonId}`,
                }
            });
        }
        else if (!courseInfo?._id && courseId && token) dispatch(fetchLessons(courseId, token));
    }, [courseId, lessonId, token, courseInfo]);

    // useEffect(() => {
    //     if (courseInfo?.lessons?.length > 0) {
    //         const lesson = courseInfo?.lessons?.find((lesson) => lesson._id === lessonId);
    //         if (lesson?.questions?.questions?.length > 0) {
    //             setQuestionObj(lesson.questions);
    //         }
    //     }
    // }, [courseInfo]);

    useEffect(() => {
        if (token) getQuizAttempt(courseId, lessonId, token);
        if (courseId && lessonId && token) {
            getQuestions(courseId, lessonId, token);
        }
    }, [courseId, lessonId, token]);



    useEffect(() => {
        if (quizAttempt?.lessonId == lessonId) {

            const updatedLessons = courseInfo?.lessons?.map((lesson) => {
                if (lesson._id == lessonId) {
                    let curLesson = {
                        ...lesson,
                        quiz: {
                            ...lesson.quiz,
                            metadata: {
                                ...lesson.quiz.metadata,
                                status: quizAttempt?.status,
                                score: quizAttempt?.score,
                                progress: quizAttempt?.progress,
                                lessonId: quizAttempt?.lessonId,
                                remainingTime: Math.max(0, new Date(quizAttempt?.quizEndTime).getTime() - Date.now()) / 1000,

                            }
                        }
                    };
                    // };
                    // console.log("curlesson", curLesson);
                    setTimer({
                        remainingTime: curLesson?.quiz?.metadata?.remainingTime,
                        totalTime: (new Date(quizAttempt?.quizEndTime).getTime() - new Date(quizAttempt?.quizStartTime).getTime()) / 1000
                    });
                    setProgressValue(quizAttempt?.progress)
                    if (new Date(quizAttempt?.quizEndTime).getTime() - Date.now() <= 0) {
                        curLesson.quiz.metadata.status = "completed";
                    }

                    return curLesson;
                    // }

                }
                else return lesson;
            })

            dispatch(updateCourseInfo({ courseInfo: { ...courseInfo, lessons: updatedLessons } }))
        }
    }, [quizAttempt]);

    useEffect(() => {
        const interval = setInterval(() => setTimer(t => (t.remainingTime > 0 ? { ...t, remainingTime: t.remainingTime - 1 } : t)), 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // console.log(timer.remainingTime);
        if (timer.remainingTime <= 0) {

            const updatedLessons = courseInfo?.lessons?.map((lesson) => {
                if (lesson._id == lessonId) {
                    let curLesson = {
                        ...lesson,
                        quiz: {
                            ...lesson.quiz,
                            metadata: {
                                ...lesson.quiz.metadata,
                                status: "completed",
                            }
                        }
                    };
                    return curLesson;
                }
                else return lesson;
            })

            dispatch(updateCourseInfo({ courseInfo: { ...courseInfo, lessons: updatedLessons } }))

        }
    }, [timer]);

    // const progressValue = ((currentIdx + 1) / questionObj?.questions?.length) * 50;

    const handleSubmit = () => {

        submitAnswer(courseId, lessonId, questions[currentIdx]._id, quizHistory[currentIdx], quizAttempt._id, token);

    };

    const handleNext = () => {

        if (currentIdx < questions?.length - 1) {
            setVisible(false);
            setTimeout(() => {
                const nextIdx = currentIdx + 1;
                setCurrentIdx(nextIdx);

                // Load history if exists, else reset
                const nextState = quizHistory[nextIdx];
                if (nextState) {
                    setAttemptCount(nextState.attemptCount);
                } else {
                    setAttemptCount(1);
                }
                setVisible(true);
            }, 300);
        } else {
            // End of quiz logic here (e.g., navigate to results)
            alert("Quiz Completed!");
            navigate(-1);
        }
    };

    const handleBack = () => {
        // Save state for current question before leaving
        // setQuizHistory(prev => ({
        //     ...prev,
        //     [currentIdx]: { selectedOption }
        // }));

        if (currentIdx > 0) {
            setVisible(false);
            setTimeout(() => {
                const prevIdx = currentIdx - 1;
                setCurrentIdx(prevIdx);

                // Load history for previous question
                const prevState = quizHistory[prevIdx];
                if (prevState) {
                    setAttemptCount(prevState.attemptCount);
                }
                setVisible(true);
            }, 300);
        }
    };

    return (
        <Box sx={{
            height: '100vh',
            width: "100%",
            position: "relative",
            overflow: "hidden",
        }}>
            <Container sx={{
                width: isMobileScreens ? "100%" : `min(700px, 100%)`,
                position: 'relative',
                zIndex: 1,
                pt: "2rem", // Added space at the top,
            }}>
                <QuizTop
                    score={quizAttempt?.score || 0}
                    timer={timer}
                    progress={progressValue}
                />

                <Paper sx={{
                    p: 4,
                    backgroundColor: (theme) => theme.palette.learningPage.leftPanelBg,
                    backdropFilter: "blur(20px)",
                    boxShadow: (theme) => theme.palette.homepage.cardShadow,
                    border: (theme) => `1px solid ${theme.palette.learningPage.divider}`,
                    borderRadius: "1.5rem",
                    overflow: "hidden",
                }}>
                    <QuizQuestion
                        visible={visible}
                        currentIdx={currentIdx}
                        attemptCount={attemptCount}
                        quizHistory={quizHistory}
                        setQuizHistory={setQuizHistory}
                        curQuestionState={curQuestionState}
                        setCurQuestionState={setCurQuestionState}
                        timer={timer}
                    />


                    <Divider sx={{ borderColor: (theme) => theme.palette.learningPage.divider, mb: 3 }} />

                    <QuizActions
                        attemptCount={attemptCount}
                        handleBack={handleBack}
                        handleNext={handleNext}
                        handleSubmit={handleSubmit}
                        currentIdx={currentIdx}
                        quizHistory={quizHistory}
                        setQuizHistory={setQuizHistory}
                        curQuestionState={curQuestionState}
                        setCurQuestionState={setCurQuestionState}
                        timer={timer}
                    />
                </Paper>

            </Container>
        </Box >
    );
};

export default Quiz;