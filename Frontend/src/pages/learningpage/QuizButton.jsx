import React, { useEffect, useState } from 'react'
import useTheme from "@mui/material/styles/useTheme"
import { colorTokens } from '../../theme'
import { Button, Box, Typography } from "@mui/material";
import QuizIcon from '@mui/icons-material/Quiz';
import TimerIcon from '@mui/icons-material/Timer';
import { updateCourseInfo } from '../../state/reduxStore/learningPageSlice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../state/reduxStore/hooks';

const QuizButton = ({
    metadata,
    setQuizStatus,
    getLessonProgress,
    lessonNo,
    lesson
}) => {

    const theme = useTheme();
    const [timeLeft, setTimeLeft] = useState(() => metadata?.remainingTime);
    const courseInfo = useSelector((state) => state.course);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (timeLeft <= 0 && (metadata?.status !== "completed" || metadata?.remainingTime > 0)) {
            const updatedLessons = courseInfo?.lessons?.map((lesson1) => {
                if (lesson1._id == lesson._id) {
                    let curLesson = {
                        ...lesson1,
                        quiz: {
                            ...lesson1.quiz,
                            metadata: {
                                ...lesson1.quiz.metadata,
                                status: "completed",
                                remainingTime: 0,
                            }
                        }
                    };
                    return curLesson;
                }
                else return lesson1;
            })

            dispatch(updateCourseInfo({ courseInfo: { ...courseInfo, lessons: updatedLessons } }))
        }

    }, [timeLeft])

    useEffect(() => {
        if (metadata?.remainingTime) {
            setTimeLeft(metadata.remainingTime);
        }

        let interval;
        if (metadata?.status === "active" || metadata?.status === "completed_can_improve") {
            interval = setInterval(() => {
                setTimeLeft(prev => Math.max(prev - 1, 0));
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        }
    }, [metadata])

    const formatTimer = (timeInSeconds) => {
        if (isNaN(timeInSeconds) || timeInSeconds < 0) return "00:00";
        return `${Math.floor(timeInSeconds / 60).toString().padStart(2, '0')}:${(Math.floor(timeInSeconds) % 60).toString().padStart(2, '0')}`;
    };

    const getQuizButtonText = () => {
        if (metadata?.status === "completed_can_improve") {
            return `IMPROVE SCORE (${metadata?.score}/${metadata?.numberOfQuestions})`
        }
        else if (metadata?.status === "completed") {
            return `QUIZ ${lessonNo.toString().padStart(2, "0")} COMPLETED (${metadata?.score}/${metadata?.numberOfQuestions})`
        }
        else if (metadata?.status === "active") {
            return `CONTINUE QUIZ (${metadata.progress || 0}%)`
        }
        else if (metadata?.status === "not_started") {
            return `TAKE LESSON ${lessonNo.toString().padStart(2, "0")} QUIZ`
        }
        else {
            return `TAKE LESSON ${lessonNo.toString().padStart(2, "0")} QUIZ`
        }

    }

    const showTimer = (metadata?.status === "active" || metadata?.status === "completed_can_improve") && timeLeft > 0;

    return (
        <Button
            onClick={() => {
                setQuizStatus({
                    lessonNo: lessonNo,
                    status: "attempting",
                });
            }}
            title={getLessonProgress(lesson._id?.toString()) > 99 ? "" : "Lesson not completed"}
            disabled={getLessonProgress(lesson._id?.toString()) > 99 ? false : true}
            sx={{
                mx: "auto",
                width: `calc(100% - 6.2rem)`,
                // Gradient Background
                background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                "&:hover": {
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    transform: "scale(1.02)",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.21)",

                },
                borderRadius: "0.7rem",
                p: "0.5rem 1rem",
                color: colorTokens.white.light,
                fontSize: { xs: "0.75rem", sm: "0.9rem" },
                fontWeight: "bold",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                my: "1.5rem",
                cursor: getLessonProgress(lesson._id?.toString()) > 99 ? "pointer" : "not-allowed",
                opacity: getLessonProgress(lesson._id?.toString()) > 99 ? 1 : 0.6,
            }}>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: '1 1 auto', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                <QuizIcon sx={{ color: colorTokens.white.pure, fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                <Box sx={{ textAlign: { xs: "center", sm: "left" }, whiteSpace: "normal", lineHeight: 1.2 }}>
                    {getLessonProgress(lesson._id?.toString()) > 99.95 ? getQuizButtonText() : `LESSON ${lessonNo.toString().padStart(2, "0")} QUIZ`}
                </Box>
            </Box>

            {getLessonProgress(lesson._id?.toString()) > 99.95 && showTimer && (
                <Box sx={{
                    display: 'flex', alignItems: 'center', gap: '0.3rem',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    padding: '0.2rem 0.6rem', borderRadius: '4px',
                    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)',
                    flex: { xs: '1 1 100%', sm: '0 0 auto' },
                    justifyContent: 'center'
                }}>
                    <TimerIcon sx={{ fontSize: { xs: '1rem', sm: '1.2rem' }, color: colorTokens.white.pure }} />
                    <Typography sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' }, fontFamily: 'monospace', fontWeight: 'bold', color: colorTokens.white.pure, letterSpacing: '1px' }}>
                        {formatTimer(timeLeft)}
                    </Typography>
                </Box>
            )}

        </Button>
    )
}

export default QuizButton