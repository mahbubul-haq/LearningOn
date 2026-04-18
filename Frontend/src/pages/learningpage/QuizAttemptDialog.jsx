import React from 'react'
import { colorTokens } from '../../theme'
import { Dialog, DialogActions, DialogContent, Typography, Box, Grid, Divider } from '@mui/material'
import { useContext, useState, useEffect } from 'react'
import { LearningCourseContext } from '../../state/LearningCourseContex'
import useTheme from "@mui/material/styles/useTheme"
import { StyledButton } from '../../components/StyledButton'
import { useSelector } from 'react-redux'
import { getHourMinutes, getMinutesSeconds } from '../../utils/dateTime'
import { useNavigate } from 'react-router-dom'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import QuizIcon from '@mui/icons-material/Quiz';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const QuizAttemptDialog = ({ metadata }) => {
    const theme = useTheme();
    const { quizStatus, setQuizStatus, getQuizAttempt } = useContext(LearningCourseContext);
    const { courseInfo } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [quizDialogState, setQuizDialogState] = useState({
        lessonNo: "",
        numberOfQuestions: metadata?.numberOfQuestions || 0,
        questionType: "Multiple Choice",
        totalTime: { minutes: 0, seconds: 0 },
        instructions: "For each question, 1st attempt success: 1pt, 2nd attempt success: 0.75pt, 2nd attempt fail: -0.5pt. Once started, you cannot skip any question or leave the quiz.",
    });

    useEffect(() => {
        if (quizStatus.status === "attempting") {
            let lessonNo = quizStatus.lessonNo;
            let lesson = courseInfo?.lessons?.[lessonNo - 1];
            if (lesson) {
                setQuizDialogState(prev => ({
                    ...prev,
                    lessonNo: lessonNo,
                    numberOfQuestions: metadata?.numberOfQuestions || 0,
                    totalTime: metadata?.examDuration ? getMinutesSeconds(metadata?.examDuration) : getMinutesSeconds(Math.max(5 * 60, lesson?.questions?.questions?.length * 90)),
                }));
            }
        }
    }, [quizStatus, courseInfo]);

    const StatCard = ({ icon, label, value }) => (
        <Box sx={{
            backgroundColor: theme.palette.mode === 'dark' ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.6)", // Brighter backgrounds
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
                borderColor: theme.palette.secondary.main,
                backgroundColor: theme.palette.mode === 'dark' ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.8)",
            }
        }}>
            <Box sx={{ color: theme.palette.secondary.main, "& svg": { fontSize: "2rem" } }}>
                {icon}
            </Box>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: theme.palette.text.primary }}>
                {value}
            </Typography>
            <Typography variant="body2" sx={{
                color: theme.palette.text.primary, // Increased contrast
                opacity: 0.7, // Subtle but readable
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
            open={quizStatus.status === "attempting"}
            onClose={(event, reason) => {
                setQuizStatus((prev) => ({
                    ...prev,
                    status: "",
                }));
            }}
            maxWidth="md"
            fullWidth
            sx={{
                backdropFilter: "blur(10px) saturate(180%)",
            }}
            PaperProps={{
                sx: {
                    backgroundColor: (theme) => theme.palette.mode === 'dark'
                        ? "rgba(30, 30, 40, 0.9)" // Brighter/More Opaque Dark Mode
                        : "rgba(255, 255, 255, 0.95)", // Almost solid White for Light Mode "Light Up"
                    backdropFilter: "blur(30px) saturate(180%)",
                    borderRadius: "2rem",
                    border: (theme) => `1px solid ${theme.palette.learningPage.divider}`,
                    boxShadow: (theme) => theme.palette.homepage.cardShadow,
                    p: "1rem"
                },
            }}
        >
            <DialogContent sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2rem",
                p: "2rem",
            }}>
                {/* Hero Header */}
                <Box sx={{ textAlign: "center" }}>
                    <Typography variant="overline" sx={{
                        color: theme.palette.secondary.main,
                        fontWeight: "bold",
                        letterSpacing: "2px",
                        fontSize: "0.9rem"
                    }}>
                        LESSON {quizDialogState.lessonNo.toString().padStart(2, "0")}
                    </Typography>

                    <Typography variant="h3" sx={{
                        fontWeight: "800",
                        mt: 1,
                        background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.text.secondary} 100%)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}>
                        {courseInfo?.lessons?.[quizDialogState.lessonNo - 1]?.title}
                    </Typography>
                </Box>

                {/* Stat Grid */}
                <Box sx={{ width: "100%", display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" }, gap: "1rem" }}>
                    <StatCard
                        icon={<FormatListBulletedIcon />}
                        label="Questions"
                        value={quizDialogState.numberOfQuestions}
                    />
                    <StatCard
                        icon={<AccessTimeIcon />}
                        label="Duration"
                        value={`${quizDialogState.totalTime.minutes}m ${quizDialogState.totalTime.seconds}s`}
                    />
                    <StatCard
                        icon={<QuizIcon />}
                        label="Type"
                        value={quizDialogState.questionType}
                    />
                </Box>

                {/* Instructions */}
                <Box sx={{
                    display: "flex",
                    gap: "1rem",
                    p: "1.5rem",
                    borderRadius: "1rem",
                    backgroundColor: theme.palette.mode === 'dark' ? "rgba(69, 34, 186, 0.2)" : "rgba(69, 34, 186, 0.12)", // More visible tint
                    border: `1px dashed ${theme.palette.primary.light}`,
                    width: "100%"
                }}>
                    <InfoOutlinedIcon sx={{ color: theme.palette.primary.main }} />
                    <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: theme.palette.primary.main, mb: 0.5 }}>
                            Instructions
                        </Typography>
                        <Typography variant="body2" sx={{
                            color: theme.palette.text.primary, // Full contrast
                            fontWeight: 500, // Thicker font
                            opacity: 1, // No transparency
                            lineHeight: 1.6
                        }}>
                            {quizDialogState.instructions}
                        </Typography>
                    </Box>
                </Box>

                {/* Actions */}
                <DialogActions sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    p: 0,
                    mt: 1
                }}>
                    <StyledButton
                        sx={{
                            textTransform: "capitalize",
                            fontWeight: "600",
                            color: theme.palette.text.secondary,
                            "&:hover": {
                                color: theme.palette.text.primary,
                                backgroundColor: "transparent",
                            },
                        }}
                        onClick={() => {
                            setQuizStatus((prev) => ({
                                ...prev,
                                status: "",
                            }));
                        }}
                    >
                        Cancel
                    </StyledButton>

                    <StyledButton
                        sx={{
                            textTransform: "capitalize",
                            fontWeight: "bold",
                            padding: "0.8rem 3rem",
                            borderRadius: "2rem",
                            fontSize: "1.1rem",
                            // Gradient Background
                            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                            color: colorTokens.white.pure,
                            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                            "&:hover": {
                                background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                                transform: "scale(1.02)",
                                boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                            },
                        }}
                        onClick={() => {
                            setQuizStatus((prev) => ({
                                ...prev,
                                status: "active",
                            }));

                            navigate(`/quiz/${courseInfo?._id}/${courseInfo?.lessons?.[quizStatus.lessonNo - 1]?._id}`);
                        }}
                    >
                        {metadata?.status === "completed" ? "Review Quiz" : metadata?.status === "completed_can_improve" || metadata?.status === "active" ? "Continue Quiz" : "Start Quiz"}
                    </StyledButton>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}

export default QuizAttemptDialog