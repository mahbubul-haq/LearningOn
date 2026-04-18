import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import CheckCircle from '@mui/icons-material/CheckCircle'
import Cancel from '@mui/icons-material/Cancel'
import Replay from '@mui/icons-material/Replay'
import useTheme from '@mui/material/styles/useTheme'
import useMediaQuery from '@mui/material/useMediaQuery'
import { LearningCourseContext } from '../../state/LearningCourseContex'
import { useContext, useState, useEffect } from 'react'


const QuizQuestion = ({
    visible,
    currentIdx,
    attemptCount,
    quizHistory,
    setQuizHistory,
    curQuestionState,
    setCurQuestionState,
    timer
}) => {
    const theme = useTheme();
    const maxWidth400 = useMediaQuery("(max-width:400px)");
    const { questions, quizAttempt } = useContext(LearningCourseContext);

    return (
        <Fade in={visible} timeout={300} sx={{
            minHeight: "450px",
            overflow: "auto"
        }}>
            <Box sx={{

            }}>
                {/* Header Info */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', mb: 3 }}>
                    <Typography sx={{ color: (theme) => theme.palette.learningPage.textSecondary, fontSize: '0.75rem', fontWeight: 'bold' }}>
                        {maxWidth400 ? "" : "QUESTION "}{currentIdx + 1} OF {questions?.length}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

                        {curQuestionState?.isCorrect ? (
                            <Typography sx={{ color: (theme) => theme.palette.success.main, fontSize: '0.75rem', fontWeight: 'bold' }}>
                                🎉 Correct!
                            </Typography>
                        ) : <>
                            {curQuestionState.attemptNumber == 2 || (curQuestionState.attemptNumber > 0 && timer.remainingTime <= 0) ? (
                                <Typography sx={{ color: (theme) => theme.palette.error.main, fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <Cancel sx={{ fontSize: '1rem' }} /> Incorrect!
                                </Typography>
                            ) : (
                                <> {timer.remainingTime <= 0 ? <Typography sx={{ color: (theme) => theme.palette.error.main, fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    ⏰ Time’s up</Typography> : <>
                                    <Replay sx={{ fontSize: '1rem', color: (theme) => curQuestionState.attemptNumber === 0 ? theme.palette.secondary.main : theme.palette.error.main }} />
                                    <Typography sx={{ color: (theme) => curQuestionState.attemptNumber === 0 ? theme.palette.secondary.main : theme.palette.error.main, fontSize: '0.75rem', fontWeight: 'bold' }}>

                                        {curQuestionState.attemptNumber == 0 ? "Attempts left: 2" : `Attempts left: 1`}
                                    </Typography>
                                </>
                                }
                                </>
                            )}
                        </>
                        }
                    </Box>
                </Box>

                <Typography variant="h5" sx={{ color: (theme) => theme.palette.learningPage.textPrimary, mb: 4, fontWeight: "bold", lineHeight: 1.5 }}>
                    {questions[currentIdx]?.question}
                </Typography>

                <Stack spacing={2} sx={{ mb: 4 }}>
                    {questions[currentIdx]?.options?.map((opt, i) => {
                        // const isSelected = selectedOption === i;
                        const isSelected = quizHistory[currentIdx] === i + 1;
                        const isPreviousAnswer = i + 1 == curQuestionState.previousAnswer;
                        const isCorrectOption = curQuestionState.isCorrect && (i + 1 == curQuestionState.previousAnswer);

                        // Determine styles based on submission state and theme mode
                        const isDark = theme.palette.mode === 'dark';

                        let borderColor = isCorrectOption ?
                            theme.palette.success.main :
                            isPreviousAnswer ?
                                theme.palette.error.main :
                                isSelected ?
                                    theme.palette.secondary.main :
                                    theme.palette.learningPage.divider;

                        let textColor = isCorrectOption ?
                            theme.palette.success.main :
                            isPreviousAnswer ?
                                theme.palette.error.main :
                                isSelected ?
                                    theme.palette.secondary.main :
                                    theme.palette.learningPage.textPrimary;

                        let bgcolor = isCorrectOption ?
                            `   rgba(16, 185, 129, 0.15)` :
                            isPreviousAnswer ?
                                `rgba(239, 68, 68, 0.15)` :
                                isSelected ?
                                    theme.palette.learningPage.lessonActive
                                    : 'transparent';


                        return (
                            <Button key={i} variant="outlined" onClick={() => {
                                if (curQuestionState.attemptNumber < 2 && timer.remainingTime > 0 && !isPreviousAnswer) {
                                    setQuizHistory(prev => ({
                                        ...prev,
                                        [currentIdx]: i + 1
                                    }))
                                }
                            }}
                                sx={{
                                    justifyContent: 'space-between',
                                    py: 2, px: 3, borderRadius: '16px',
                                    borderColor: borderColor,
                                    bgcolor: bgcolor,
                                    color: textColor,
                                    borderWidth: "1px",
                                    textTransform: 'none', transition: '0.3s',
                                    // opacity: !isCorrectOption && !isSelected ? 0.4 : 1,
                                    '&:hover': {
                                        borderColor: theme.palette.secondary.main,
                                        bgcolor: theme.palette.learningPage.lessonHover,
                                        // borderWidth: "2px",
                                        // outline: `4px solid ${theme.palette.secondary.main} inset`
                                    }
                                }}
                                disabled={curQuestionState.attemptNumber >= 2 || timer.remainingTime <= 0 || isPreviousAnswer || curQuestionState.isCorrect}
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
                                {(attemptCount == 2) && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                                        {isCorrectOption && <CheckCircle sx={{ color: theme.palette.success.main }} />}
                                        {questions[currentIdx].previousAnswer == i && !isCorrectOption && <Cancel sx={{ color: theme.palette.error.main }} />}
                                    </Box>
                                )}
                            </Button>
                        );
                    })}
                </Stack>
            </Box>
        </Fade>
    )
}

export default QuizQuestion