import React from 'react';
import { Dialog, DialogContent, DialogActions, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useTheme from '@mui/material/styles/useTheme';
import { StyledButton } from '../../components/StyledButton';
import { colorTokens } from '../../theme';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TimerOffIcon from '@mui/icons-material/TimerOff';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { LearningCourseContext } from '../../state/LearningCourseContex';
import { useContext } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

const QuizCompletionDialog = ({
    open,
    onClose,
    isTimeUp,
    answeredQuestionsCount,
    totalQuestionsCount,
    score
}) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { setBackFromQuiz, quizAttempt } = useContext(LearningCourseContext);
    const isMobileScreens = useMediaQuery(theme.breakpoints.down("sm"));

    const StatCard = ({ icon, label, value, color }) => (
        <Box sx={{
            backgroundColor: theme.palette.mode === 'dark' ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.6)",
            borderRadius: "1rem",
            p: "1.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            width: "100%",
            border: `1px solid ${theme.palette.divider}`,
            transition: "transform 0.2s",
            "&:hover": {
                transform: "translateY(-5px)",
                borderColor: color,
                backgroundColor: theme.palette.mode === 'dark' ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.8)",
            }
        }}>
            <Box sx={{ color: color, "& svg": { fontSize: "2rem" } }}>
                {icon}
            </Box>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: theme.palette.text.primary }}>
                {value}
            </Typography>
            <Typography variant="body2" sx={{
                color: theme.palette.text.primary,
                opacity: 0.7,
                textTransform: "uppercase",
                fontSize: "0.75rem",
                letterSpacing: "1px",
                fontWeight: "600"
            }}>
                {label}
            </Typography>
        </Box>
    );

    return (
        <Dialog
            open={open}
            onClose={() => { }} // Disable closing by clicking outside if needed, or allow it
            maxWidth="sm"
            fullWidth
            sx={{
                backdropFilter: "blur(10px) saturate(180%)",
            }}
            PaperProps={{
                sx: {
                    backgroundColor: (theme) => theme.palette.mode === 'dark'
                        ? "rgba(30, 30, 40, 0.9)"
                        : "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(30px) saturate(180%)",
                    borderRadius: "2rem",
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                    p: isMobileScreens ? "0.5rem" : "1rem"
                },
            }}
        >
            <DialogContent sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2rem",
                p: isMobileScreens ? "1rem" : "2rem",
                textAlign: "center",
                // border: "1px solid red"
            }}>
                {/* Header Section */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    {isTimeUp ? (
                        <TimerOffIcon sx={{ fontSize: '4rem', color: theme.palette.error.main }} />
                    ) : (
                        <CheckCircleOutlineIcon sx={{ fontSize: '4rem', color: theme.palette.success.main }} />
                    )}

                    <Typography variant="h3" sx={{
                        fontWeight: "800",
                        background: isTimeUp
                            ? `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${theme.palette.error.dark} 100%)`
                            : `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}>
                        {isTimeUp ? "Time's Up!" : "Quiz Completed!"}
                    </Typography>

                    <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary, px: 2 }}>
                        {isTimeUp
                            ? "Your time for this quiz has expired."
                            : "You have answered all questions in this quiz."}
                    </Typography>
                </Box>

                {/* Statistics Grid */}
                <Box sx={{ width: "100%", display: "grid", gridTemplateColumns: isMobileScreens ? "1fr" : "1fr 1fr", gap: "1rem" }}>
                    <StatCard
                        icon={<TaskAltIcon />}
                        label="Answered"
                        value={`${answeredQuestionsCount} / ${totalQuestionsCount}`}
                        color={theme.palette.primary.main}
                    />
                    <StatCard
                        icon={<WorkspacePremiumIcon />}
                        label="Score"
                        value={score}
                        color={theme.palette.secondary.main}
                    />
                </Box>

                {/* Action Buttons */}
                <DialogActions sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: isMobileScreens ? "center" : "space-between",
                    alignItems: "center",
                    flexDirection: isMobileScreens ? "column" : "row",
                    gap: isMobileScreens ? "1rem" : "0",
                    p: 0,
                    // mt: 2,


                }}>
                    <StyledButton
                        sx={{
                            textTransform: "capitalize",
                            fontWeight: "600",
                            color: theme.palette.text.secondary,

                            "&:hover": {
                                color: theme.palette.text.primary,
                                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                            },
                            px: 3
                        }}
                        onClick={() => {
                            // Close dialog to review quiz manually
                            onClose();
                        }}
                    >
                        {quizAttempt?.status == "completed_can_improve" && !isTimeUp ? "Improve Score" : "Review Quiz"}
                    </StyledButton>

                    <StyledButton
                        sx={{
                            textTransform: "capitalize",
                            fontWeight: "bold",
                            padding: "0.8rem 2.5rem",
                            borderRadius: "2rem",
                            fontSize: "1rem",
                            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                            color: colorTokens.white.pure,
                            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                            boxSizing: "border-box",
                            "&&": {
                                m: 0
                            },

                            "&:hover": {
                                background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                                transform: "scale(1.02)",
                                boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                            },
                            // border: "2px solid green"
                        }}
                        onClick={() => {
                            // Navigate back to course page
                            setBackFromQuiz(true);
                            navigate(-1);
                        }}
                    >
                        Go to Course
                    </StyledButton>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

export default QuizCompletionDialog;
