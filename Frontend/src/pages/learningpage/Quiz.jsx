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
import { fetchLessons } from '../../state/reduxStore/learningPageSlice';
import { colorTokens } from '../../theme';

const quizTracker = {
    attemptCount: 1,
    previousOption: null,
    currentIdx: null,

}

const Quiz = () => {
    const theme = useTheme();
    const { quizAttempt, getQuizAttempt, setQuizStatus } = useContext(LearningCourseContext);
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
    const [selectedOption, setSelectedOption] = useState(null);
    const [attemptCount, setAttemptCount] = useState(1);
    const [timer, setTimer] = useState(60);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [visible, setVisible] = useState(true);
    const [quizHistory, setQuizHistory] = useState({});
    const [previousAttempt, setPreviousAttempt] = useState(null);
    const [questionObj, setQuestionObj] = useState({
        questions: [],
        examDuration: 0,
    });


    useEffect(() => {
        console.log(courseId, token);
        setQuizStatus(prev =>
            localStorage.getItem("quizStatus") ? JSON.parse(localStorage.getItem("quizStatus")) : {
                ...prev,
                status: "active",
            })
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

    useEffect(() => {
        if (courseInfo?.lessons?.length > 0) {
            const lesson = courseInfo?.lessons?.find((lesson) => lesson._id === lessonId);
            if (lesson?.questions?.questions?.length > 0) {
                setQuestionObj(lesson.questions);
            }
        }
    }, [courseInfo]);

    useEffect(() => {
        if (token) getQuizAttempt(courseId, lessonId, token);
    }, [courseId, lessonId, token]);

    useEffect(() => {
        const interval = setInterval(() => setTimer(t => (t > 0 ? t - 1 : 0)), 1000);
        return () => clearInterval(interval);
    }, []);

    const progressValue = ((currentIdx + 1) / questionObj?.questions?.length) * 50;

    const handleSubmit = () => {
        const isCorrect = selectedOption === questionObj?.questions[currentIdx].correct;
        questionObj.questions[currentIdx].previousAnswer = selectedOption;
        if (isCorrect) {
            alert("Perfect! +10 XP earned.");
            setIsSubmitted(true);
        } else if (attemptCount < 2) {
            alert("Incorrect. Try one more time!");
            setPreviousAttempt(selectedOption); // Track the wrong answer
            setAttemptCount(2);
            setSelectedOption(null);
        } else {
            alert("Question complete. 0 XP.");
            setIsSubmitted(true);
        }
    };

    const handleNext = () => {
        // Save state for current question
        // Save state for current question
        setQuizHistory(prev => ({
            ...prev,
            [currentIdx]: { selectedOption, attemptCount, isSubmitted, previousAttempt }
        }));

        if (currentIdx < questionObj?.questions?.length - 1) {
            setVisible(false);
            setTimeout(() => {
                const nextIdx = currentIdx + 1;
                setCurrentIdx(nextIdx);

                // Load history if exists, else reset
                const nextState = quizHistory[nextIdx];
                if (nextState) {
                    setSelectedOption(nextState.selectedOption);
                    setAttemptCount(nextState.attemptCount);
                    setIsSubmitted(nextState.isSubmitted);
                    setPreviousAttempt(nextState.previousAttempt || null);
                } else {
                    setSelectedOption(null);
                    setAttemptCount(1);
                    setIsSubmitted(false);
                    setPreviousAttempt(null);
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
        setQuizHistory(prev => ({
            ...prev,
            [currentIdx]: { selectedOption, attemptCount, isSubmitted, previousAttempt }
        }));

        if (currentIdx > 0) {
            setVisible(false);
            setTimeout(() => {
                const prevIdx = currentIdx - 1;
                setCurrentIdx(prevIdx);

                // Load history for previous question
                const prevState = quizHistory[prevIdx];
                if (prevState) {
                    setSelectedOption(prevState.selectedOption);
                    setAttemptCount(prevState.attemptCount);
                    setIsSubmitted(prevState.isSubmitted);
                    setPreviousAttempt(prevState.previousAttempt || null);
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
                pt: "2rem" // Added space at the top
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
                    <Fade in={visible} timeout={300} sx={{
                        minHeight: "450px",
                        overflow: "auto"
                    }}>
                        <Box>
                            {/* Header Info */}
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', mb: 3 }}>
                                <Typography sx={{ color: (theme) => theme.palette.learningPage.textSecondary, fontSize: '0.75rem', fontWeight: 'bold' }}>
                                    {maxWidth400 ? "" : "QUESTION "}{currentIdx + 1} OF {questionObj?.questions?.length}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Replay sx={{ fontSize: '1rem', color: (theme) => attemptCount === 1 ? theme.palette.secondary.main : theme.palette.error.main }} />
                                    <Typography sx={{ color: (theme) => attemptCount === 1 ? theme.palette.secondary.main : theme.palette.error.main, fontSize: '0.75rem', fontWeight: 'bold' }}>
                                        ATTEMPT {attemptCount} / 2
                                    </Typography>
                                </Box>
                            </Box>

                            <Typography variant="h5" sx={{ color: (theme) => theme.palette.learningPage.textPrimary, mb: 4, fontWeight: "bold", lineHeight: 1.5 }}>
                                {questionObj?.questions[currentIdx]?.question}
                            </Typography>

                            <Stack spacing={2} sx={{ mb: 4 }}>
                                {questionObj?.questions[currentIdx]?.options?.map((opt, i) => {
                                    const isSelected = selectedOption === i;
                                    const isCorrectOption = i === questionObj?.questions[currentIdx]?.correct;

                                    // Determine styles based on submission state and theme mode
                                    const isDark = theme.palette.mode === 'dark';

                                    let borderColor = isSelected
                                        ? (theme) => theme.palette.secondary.main
                                        : (theme) => theme.palette.learningPage.divider;

                                    let textColor = isSelected
                                        ? (theme) => theme.palette.secondary.main
                                        : (theme) => theme.palette.learningPage.textPrimary;

                                    let bgcolor = isSelected
                                        ? (theme) => theme.palette.learningPage.lessonActive
                                        : 'transparent';

                                    if (isSubmitted) {
                                        if (isCorrectOption) {
                                            borderColor = (theme) => theme.palette.success.main;
                                            textColor = (theme) => theme.palette.success.main;
                                            bgcolor = `rgba(16, 185, 129, 0.15)`;
                                        } else if (isSelected && !isCorrectOption) {
                                            borderColor = (theme) => theme.palette.error.main;
                                            textColor = (theme) => theme.palette.error.main;
                                            bgcolor = `rgba(239, 68, 68, 0.15)`;
                                        } else {
                                            borderColor = (theme) => theme.palette.learningPage.divider;
                                            textColor = (theme) => theme.palette.learningPage.textSecondary;
                                            bgcolor = 'transparent';
                                        }
                                    }


                                    return (
                                        <Button key={i} variant="outlined" onClick={() => !isSubmitted && setSelectedOption(i)}
                                            sx={{
                                                justifyContent: 'space-between',
                                                py: 2, px: 3, borderRadius: '16px',
                                                borderColor: borderColor,
                                                bgcolor: bgcolor,
                                                color: textColor,
                                                borderWidth: isSelected ? "2px" : "1px",
                                                textTransform: 'none', transition: '0.3s',
                                                opacity: isSubmitted && !isCorrectOption && !isSelected ? 0.4 : 1,
                                                '&:hover': {
                                                    borderColor: isSubmitted ? borderColor : (theme) => theme.palette.secondary.main,
                                                    bgcolor: isSubmitted ? bgcolor : (theme) => theme.palette.learningPage.lessonHover,
                                                    borderWidth: "2px",
                                                }
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Box sx={{
                                                    mr: 2, width: 24, height: 24, borderRadius: '50%', border: '1px solid',
                                                    borderColor: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem'
                                                }}>
                                                    {String.fromCharCode(65 + i)}
                                                </Box>
                                                {opt}
                                            </Box>

                                            {/* Feedback Icon */}
                                            {(isSubmitted || attemptCount == 2) && (
                                                <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                                                    {isCorrectOption && isSubmitted && <CheckCircle sx={{ color: theme.palette.success.main }} />}
                                                    {questionObj?.questions[currentIdx].previousAnswer == i && !isCorrectOption && <Cancel sx={{ color: theme.palette.error.main }} />}
                                                </Box>
                                            )}
                                        </Button>
                                    );
                                })}
                            </Stack>
                        </Box>
                    </Fade>


                    <Divider sx={{ borderColor: (theme) => theme.palette.learningPage.divider, mb: 3 }} />

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap', // Ensures it stacks on very small mobile screens
                        gap: 2
                    }}>
                        {/* Left Side: Stats */}
                        <Box>
                            <Typography variant="caption" sx={{ color: (theme) => theme.palette.learningPage.textSecondary, display: 'block', letterSpacing: 1, fontWeight: "bold" }}>
                                AVAILABLE PTS
                            </Typography>
                            <Typography variant="h6" sx={{ color: (theme) => attemptCount === 1 ? theme.palette.secondary.main : theme.palette.error.main, fontWeight: 'bold' }}>
                                +{attemptCount === 1 ? 1 : 0.75} {attemptCount === 2 ? '/ -0.5' : ""}
                            </Typography>
                        </Box>

                        {/* Right Side: Actions */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {currentIdx > 0 && (
                                <Button
                                    startIcon={<ArrowBackIosNew sx={{ fontSize: '0.8rem' }} />}
                                    onClick={handleBack}
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        textTransform: 'none',
                                        fontSize: '0.8rem',
                                        mr: 1,
                                        '&:hover': { color: theme.palette.text.primary }
                                    }}
                                >
                                    Back
                                </Button>
                            )}

                            <Button
                                startIcon={<SkipNext />}
                                onClick={handleNext} // Always use handleNext now
                                sx={{
                                    color: theme.palette.text.secondary,
                                    textTransform: 'none',
                                    fontSize: '0.8rem',
                                    mr: 1,
                                    '&:hover': { color: theme.palette.text.primary }
                                }}
                            >
                                {isSubmitted ? "Next" : "Skip"}
                            </Button>

                            {!isSubmitted && (
                                <Button
                                    onClick={handleSubmit}
                                    disabled={selectedOption === null}
                                    variant="contained"
                                    sx={{
                                        backgroundColor: (theme) => theme.palette.homepage.buttonPrimary,
                                        "&:hover": {
                                            backgroundColor: (theme) => theme.palette.homepage.buttonPrimaryHover,
                                        },
                                        color: colorTokens.white.pure,
                                        fontWeight: 'bold',
                                        borderRadius: '30px',
                                        px: { xs: 4, sm: 6 }, py: 1.5,
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                        '&.Mui-disabled': {
                                            backgroundColor: (theme) => theme.palette.learningPage.divider,
                                            color: (theme) => theme.palette.learningPage.textSecondary,
                                            opacity: 0.5
                                        }
                                    }}
                                >
                                    Submit Answer
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Paper>

            </Container>
        </Box >
    );
};

export default Quiz;