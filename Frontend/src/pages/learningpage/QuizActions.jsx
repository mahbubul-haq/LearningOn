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
    isSubmitted,
    handleSubmit,
    currentIdx,
    quizHistory,
    setQuizHistory,
    curQuestionState,
    setCurQuestionState
}) => {
    const theme = useTheme();
    const { questions } = useContext(LearningCourseContext);
    return (
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
                    disabled={currentIdx === questions.length - 1}
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
                        // disabled={selectedOption === null}
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
    )
}

export default QuizActions