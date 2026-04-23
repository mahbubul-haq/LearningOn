import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, Box, IconButton, Grid, Snackbar, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import CourseCompletionConfetti from './CourseCompletionConfetti';
import CourseCompletionHero from './CourseCompletionHero';
import CourseCompletionStats from './CourseCompletionStats';
import CourseCompletionCertificate from './CourseCompletionCertificate';
import CourseCompletionReview from './CourseCompletionReview';
import CourseCompletionNextSteps from './CourseCompletionNextSteps';
import { useSelector } from 'react-redux';

const CourseCompletionDialog = ({ open, onClose, courseInfo, courseProgress, user }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);

    // UI States
    const [displayScore, setDisplayScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [certificateId, setCertificateId] = useState("");

    // Calculate Metrics
    const totalScore = React.useMemo(() => {
        let score = 0;
        let possible = 0;
        courseInfo?.lessons?.forEach(lesson => {
            if (lesson.quiz?.metadata) {
                score += lesson.quiz.metadata.score || 0;
                possible += lesson.quiz.metadata.numberOfQuestions || 0;
            }
        });
        return possible > 0 ? Math.round((score / possible) * 100) : 100;
    }, [courseInfo]);

    const timeTaken = React.useMemo(() => {
        if (!courseProgress?.createdAt) return "Few days";
        const ms = Date.now() - new Date(courseProgress.createdAt).getTime();
        const days = Math.floor(ms / (1000 * 60 * 60 * 24));
        if (days === 0) return "1 day";
        return `${days} days`;
    }, [courseProgress]);



    const dummyCertId = `LC-CERT-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

    const getCertificateId = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/certificates/${courseInfo?._id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'auth-token': token
                    }
                }
            );
            const data = await res.json();
            if (data?.success) {
                setCertificateId(data.certificate.certificateId);
            }
        } catch (error) {
            // console.log(error);
        }
    }

    useEffect(() => {
        if (open) {
            getCertificateId();
        }
    }, [open])

    // Score Animation
    useEffect(() => {
        if (open) {
            // Delay before starting animation
            const timer = setTimeout(() => {
                setShowScore(true);
                let current = 0;
                const interval = setInterval(() => {
                    current += 2;
                    if (current >= totalScore) {
                        current = totalScore;
                        setDisplayScore(totalScore);
                        clearInterval(interval);
                    } else {
                        setDisplayScore(current);
                    }
                }, 20);
                return () => clearInterval(interval);
            }, 500);
            return () => clearTimeout(timer);
        } else {
            setDisplayScore(0);
            setShowScore(false);
            setRating(0);
            setReviewText("");
            setSnackbarOpen(false);
        }
    }, [open, totalScore]);

    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
    };

    const handleSubmitReview = () => {
        // Here you would dispatch to backend
        setSnackbarOpen(true);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: "1.5rem",
                    background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(180deg, #2a2a3b 0%, #1e1e2d 100%)'
                        : 'linear-gradient(180deg, #fdfbfb 0%, #ebedee 100%)',
                    overflow: 'hidden',
                    position: 'relative'
                }
            }}
        >
            {open && <CourseCompletionConfetti />}

            <IconButton
                onClick={onClose}
                sx={{ position: 'absolute', right: 16, top: 16, zIndex: 10 }}
            >
                <CloseIcon />
            </IconButton>

            <DialogContent sx={{ p: { xs: 3, md: 5 }, position: 'relative', zIndex: 1 }}>

                <CourseCompletionHero user={user} />

                <Grid container spacing={3} mb={4}>
                    <CourseCompletionStats
                        courseInfo={courseInfo}
                        displayScore={displayScore}
                        showScore={showScore}
                        timeTaken={timeTaken}
                    />

                    <CourseCompletionCertificate
                        courseInfo={courseInfo}
                        user={user}
                        dummyCertId={dummyCertId}
                        certificateId={certificateId}
                    />
                </Grid>

                <CourseCompletionReview
                    rating={rating}
                    handleRatingChange={handleRatingChange}
                    reviewText={reviewText}
                    setReviewText={setReviewText}
                    handleSubmitReview={handleSubmitReview}
                />

                <CourseCompletionNextSteps onClose={onClose} />

            </DialogContent>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%', borderRadius: '0.5rem', fontWeight: 'bold' }}>
                    Review added successfully!
                </Alert>
            </Snackbar>

        </Dialog>
    );
};

export default CourseCompletionDialog;
