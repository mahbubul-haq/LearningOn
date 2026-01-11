import React from 'react'
import { colorTokens } from '../../theme'
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, Box } from '@mui/material'
import { useContext, useState, useEffect } from 'react'
import { LearningCourseContext } from '../../state/LearningCourseContex'
import useTheme from "@mui/material/styles/useTheme"
import { StyledButton } from '../../components/StyledButton'
import { useSelector } from 'react-redux'
import { getHourMinutes } from '../../utils/dateTime'
import { List, ListItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const QuizAttemptDialog = () => {
    const theme = useTheme();
    const { quizStatus, setQuizStatus, getQuizAttempt } = useContext(LearningCourseContext);
    const { courseInfo } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [quizDialogState, setQuizDialogState] = useState({
        lessonNo: "",
        numberOfQuestions: "",
        questionType: "Multiple Choice Question",
        totalTime: { hours: 0, minutes: 0 },
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
                    numberOfQuestions: lesson?.questions?.questions?.length,
                    totalTime: lesson?.questions?.examDuration ? getHourMinutes(lesson?.questions?.examDuration) : { hours: 100, minutes: 0 },
                }));
            }
        }
        else if (quizStatus.status === "active") {
            //console.log("getQuizAttempt", courseInfo?._id, courseInfo?.lessons?.[quizStatus.lessonNo - 1]?._id, token);

            // getQuizAttempt(courseInfo?._id?.toString(), courseInfo?.lessons?.[quizStatus.lessonNo - 1]?._id?.toString(), token);
        }
        else if (quizStatus.status === "") {

        }

    }, [quizStatus]);

    return (
        <Dialog
            open={quizStatus.status === "attempting"}
            onClose={(event, reason) => {
                setQuizStatus((prev) => ({
                    ...prev,
                    status: "",
                }));
            }}
            aria-labelledby="responsive-dialog-title"
            disableEscapeKeyDown
            sx={{
                backdropFilter: "blur(10px) saturate(180%)",
            }}
            PaperProps={{
                sx: {
                    backgroundColor: (theme) => theme.palette.learningPage.leftPanelBg,
                    backdropFilter: "blur(30px) saturate(180%)",
                    borderRadius: "1.5rem",
                    border: (theme) => `1px solid ${theme.palette.learningPage.divider}`,
                    boxShadow: (theme) => theme.palette.homepage.cardShadow,
                },
            }}
        >
            <DialogTitle id="responsive-dialog-title" sx={{ color: (theme) => theme.palette.learningPage.textPrimary, fontWeight: "bold" }}>Quiz Attempt</DialogTitle>
            <DialogContent sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                mt: "1rem",
                color: (theme) => theme.palette.learningPage.textPrimary,
            }}>
                <Typography variant="h4bold" sx={{ color: (theme) => theme.palette.primary.main }}>
                    Lesson {quizDialogState.lessonNo.toString().padStart(2, "0")}: {courseInfo?.lessons?.[quizDialogState.lessonNo - 1]?.title}
                </Typography>

                <List disablePadding sx={{
                    gap: "0rem",
                    //remove spacing between items
                    /// add bullet points for each of the list items
                    //local octal state is not permitted in stcit mode "\2022"
                    "& .MuiListItem-root": {
                        padding: "0.2rem",

                    },
                }}>
                    <ListItem>
                        <Typography sx={{ color: (theme) => theme.palette.learningPage.textPrimary }}>
                            <strong style={{ color: theme.palette.secondary.main }}>Number of Questions:</strong> {quizDialogState.numberOfQuestions}
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography sx={{ color: (theme) => theme.palette.learningPage.textPrimary }}>
                            <strong style={{ color: theme.palette.secondary.main }}>Total Time:</strong> {Math.min(quizDialogState.totalTime.hours, 100)}h {quizDialogState.totalTime.minutes}m
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography sx={{ color: (theme) => theme.palette.learningPage.textPrimary }}>
                            <strong style={{ color: theme.palette.secondary.main }}>Question Type:</strong> {quizDialogState.questionType}
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography sx={{ color: (theme) => theme.palette.learningPage.textPrimary }}>
                            <strong style={{ color: theme.palette.secondary.main }}>Instructions:</strong> {quizDialogState.instructions}
                        </Typography>
                    </ListItem>
                </List>


            </DialogContent>
            <DialogActions sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "2rem",
            }}>
                <StyledButton
                    sx={{
                        textTransform: "capitalize",
                        fontWeight: "600",
                        cursor: "pointer",
                        "&&": {
                            border: (theme) => `1px solid ${theme.palette.secondary.main}`,
                            borderRadius: "2rem",
                            padding: "0.4rem 1.5rem",
                            backgroundColor: "transparent",
                            color: (theme) => theme.palette.secondary.main,
                            "&:hover": {
                                backgroundColor: (theme) => theme.palette.learningPage.lessonHover,
                                transform: "scale(1.02)",
                            },
                        },
                    }}
                    onClick={() => {
                        setQuizStatus((prev) => ({
                            ...prev,
                            status: "",
                        }));
                    }}
                >
                    Back to Lessons
                </StyledButton>
                <StyledButton
                    sx={{
                        textTransform: "capitalize",
                        fontWeight: "bold",
                        cursor: "pointer",
                        "&&": {
                            padding: "0.4rem 2rem",
                            borderRadius: "2rem",
                            backgroundColor: (theme) => theme.palette.homepage.buttonPrimary,
                            color: colorTokens.white.pure,
                            "&:hover": {
                                backgroundColor: (theme) => theme.palette.homepage.buttonPrimaryHover,
                                transform: "scale(1.02)",
                            },
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

                    Start Quiz

                </StyledButton>
            </DialogActions>
        </Dialog>
    )
}

export default QuizAttemptDialog