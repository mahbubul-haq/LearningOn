import React, { useEffect } from 'react'
import useTheme from "@mui/material/styles/useTheme"
import { colorTokens } from '../../theme'
import { Button } from "@mui/material";
import QuizIcon from '@mui/icons-material/Quiz';

const QuizButton = ({
    metadata,
    setQuizStatus,
    getLessonProgress,
    lessonNo,
    lesson
}) => {

    const theme = useTheme();
    useEffect(() => {
        console.log(metadata);
    }, [metadata])

    const getQuizButtonText = () => {
        if (metadata?.status === "completed_can_improve") {
            return `IMPROVE SCORE (${metadata?.score}/${metadata?.numberOfQuestions})`
        }
        else if (metadata?.status === "completed") {
            return `QUIZ COMPLETED (${metadata?.score}/${metadata?.numberOfQuestions})`
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
                fontSize: "0.9rem",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                my: "2rem",
                cursor: getLessonProgress(lesson._id?.toString()) > 99 ? "pointer" : "not-allowed",
                opacity: getLessonProgress(lesson._id?.toString()) > 99 ? 1 : 0.6,
            }}>
            <QuizIcon sx={{ color: colorTokens.white.pure }} />
            {getLessonProgress(lesson._id?.toString()) > 99 ? getQuizButtonText() : `LESSON ${lessonNo.toString().padStart(2, "0")} QUIZ`}
            {/* {`TAKE MODULE ${(lessonNo).toString().padStart(2, "0")} QUIZ`} */}

        </Button>
    )
}

export default QuizButton