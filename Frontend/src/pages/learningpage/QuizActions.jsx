import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew'
import SkipNext from '@mui/icons-material/SkipNext'
import { colorTokens } from '../../theme'
import useTheme from "@mui/material/styles/useTheme"
import { LearningCourseContext } from '../../state/LearningCourseContex'
import { useContext } from 'react'

const QuizActions = ({
    attemptCount,
    handleBack,
    handleNext,
    handleSubmit,
    currentIdx,
    quizHistory,
    setQuizHistory,
    curQuestionState,
    setCurQuestionState,
    timer
}) => {
    const theme = useTheme();
    const { questions, quizAttempt } = useContext(LearningCourseContext);

    const getPoints = () => {
        if (curQuestionState.attemptNumber === 0) {
            return "+1";
        }
        else if (curQuestionState.attemptNumber === 1) {
            if (curQuestionState.isCorrect) {
                return "+1";
            }
            else {
                return "+0.75";
            }
        }
        else if (curQuestionState.attemptNumber === 2) {
            if (curQuestionState.isCorrect) {
                return "+0.75";
            }
            else {
                return "-0.5";
            }
        }
        else {
            return "0";
        }
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', sm: 'center' },
            gap: { xs: 3, sm: 2 },
            width: '100%'
        }}>
            {/* Left Side: Stats */}
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'row', sm: 'column' },
                alignItems: { xs: 'center', sm: 'flex-start' },
                justifyContent: { xs: 'center', sm: 'flex-start' },
                gap: { xs: 1, sm: 0 },
                backgroundColor: { xs: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', sm: 'transparent' },
                py: { xs: 1, sm: 0 },
                borderRadius: { xs: 2, sm: 0 }
            }}>
                <Typography variant="caption" sx={{ color: (theme) => theme.palette.learningPage.textSecondary, display: 'block', letterSpacing: 1, fontWeight: "bold" }}>
                    {curQuestionState?.isCorrect || curQuestionState?.attemptNumber >= 2 ? "PTS ACHIEVED" : "AVAILABLE PTS"}{' '}{/* Space for row layout */}
                </Typography>
                <Typography variant="h6" sx={{ color: (theme) => attemptCount === 1 ? theme.palette.secondary.main : theme.palette.error.main, fontWeight: 'bold', ml: { xs: 1, sm: 0 } }}>
                    {getPoints()}
                </Typography>
            </Box>

            {/* Right Side: Actions */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'space-between', sm: 'flex-end' },
                flexWrap: { xs: 'wrap', sm: 'nowrap' },
                gap: 2,
                width: { xs: '100%', sm: 'auto' }
            }}>
                <Box sx={{ width: { xs: '100%', sm: 'auto' }, justifyContent: { xs: 'center', sm: 'flex-end' }, display: 'flex', alignItems: 'center', gap: { xs: "2rem", sm: 1 } }}>
                    {currentIdx > 0 && (
                        <Button
                            startIcon={<ArrowBackIosNew sx={{ fontSize: '0.8rem' }} />}
                            onClick={handleBack}
                            sx={{
                                color: theme.palette.text.secondary,
                                textTransform: 'none',
                                fontSize: '0.8rem',
                                mr: { xs: 0, sm: 1 },
                                '&:hover': { color: theme.palette.text.primary }
                            }}
                        >
                            Back
                        </Button>
                    )}


                    <Button
                        disabled={currentIdx === questions.length - 1}
                        startIcon={<SkipNext />}
                        onClick={handleNext} // Always use handleNext now
                        sx={{
                            color: theme.palette.text.secondary,
                            textTransform: 'none',
                            fontSize: '0.8rem',
                            mr: { xs: 0, sm: 1 },
                            '&:hover': { color: theme.palette.text.primary }
                        }}
                    >
                        {curQuestionState?.attemptNumber > 0 ? "Next" : "Skip"}
                    </Button>
                </Box>

                <Button
                    onClick={handleSubmit}
                    // disabled={selectedOption === null}
                    variant="contained"
                    disabled={curQuestionState?.attemptNumber >= 2 || curQuestionState?.isCorrect || timer?.remainingTime <= 0 || !quizHistory[currentIdx]}
                    sx={{
                        backgroundColor: (theme) => theme.palette.homepage.buttonPrimary,
                        "&:hover": {
                            backgroundColor: (theme) => theme.palette.homepage.buttonPrimaryHover,
                        },
                        color: colorTokens.white.pure,
                        fontWeight: 'bold',
                        borderRadius: '30px',
                        px: { xs: 3, sm: 6 }, py: 1.5,
                        textTransform: 'none',
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        width: { xs: '100%', sm: 'auto' },
                        '&.Mui-disabled': {
                            backgroundColor: (theme) => theme.palette.learningPage.divider,
                            color: (theme) => theme.palette.learningPage.textSecondary,
                            opacity: 0.5
                        }
                    }}
                >
                    Submit Answer
                </Button>
            </Box>
        </Box>
    )
}

export default QuizActions