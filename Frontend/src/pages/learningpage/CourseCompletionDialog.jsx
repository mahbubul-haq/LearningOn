import React, { useState, useEffect, useContext } from 'react';
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
import { CoursePageContext } from '../../state/CoursePageContext';
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
    const [initialRating, setInitialRating] = useState(0);
    const [initialReviewText, setInitialReviewText] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [certificate, setCertificate] = useState(null);
    const [reviewSubmitted, setReviewSubmitted] = useState(false);
    // const [totalScore, setTotalScore] = useState(0);

    const { myReview, isReviewSubmitting, fetchMyReview, handleSubmitReview } = useContext(CoursePageContext);

    // Calculate Metrics


    const timeTaken = React.useMemo(() => {
        if (!courseProgress?.createdAt) return "Few days";
        let lastDate = courseProgress?.completionDate ? courseProgress.completionDate : courseProgress.updatedAt ? courseProgress.updatedAt : "";
        if (!lastDate) return "Few days";
        lastDate = new Date(lastDate).getTime();
        const ms = lastDate - new Date(courseProgress?.createdAt).getTime();
        if (ms < (1000 * 60 * 60 * 24)) return "1 day";
        if (ms < (2 * 1000 * 60 * 60 * 24)) return "2 days";
        const days = Math.floor(ms / (1000 * 60 * 60 * 24));
        return `${days} days`;
    }, [courseProgress]);



    const dummyCertId = `LC-CERT-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

    const getCertificate = async (attempt) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/certificates/${courseInfo?._id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'auth-token': token
                    },

                }
            );
            const data = await res.json();
            if (data?.success) {
                setCertificate(data.certificate);
            }
            else if (attempt < 2) {
                setTimeout(() => {
                    getCertificate(attempt + 1);
                }, 2000);
            }
        } catch (error) {
            // console.log(error);
            if (attempt < 2) {
                setTimeout(() => {
                    getCertificate(attempt + 1);
                }, 2000);
            }
        }
    }


    useEffect(() => {
        if (open && courseProgress?.completionDate && !certificate) {
            getCertificate(1);
        }
    }, [open, courseProgress?.completionDate, certificate])

    useEffect(() => {
        fetchMyReview(courseInfo?._id, token);
    }, [open, courseInfo?._id, token]);

    useEffect(() => {
        if (myReview) {
            setRating(myReview.rating);
            setReviewText(myReview.review);
            setInitialRating(myReview.rating);
            setInitialReviewText(myReview.review);
        }
        if (myReview && reviewSubmitted) {
            setSnackbarOpen(true);
            setTimeout(() => {
                setSnackbarOpen(false);
            }, 2000);
            setReviewSubmitted(false);
        }
    }, [myReview]);

    useEffect(() => {
        if (isReviewSubmitting) {
            setReviewSubmitted(true);
        }
    }, [isReviewSubmitting]);


    const isSubmitDisabled = rating === 0 || (rating === initialRating && reviewText === initialReviewText);

    useEffect(() => {
        let intervalId;
        if (open && certificate) {
            setDisplayScore(0);
            if (certificate?.isGraded) {
                setShowScore(true);

                intervalId = setInterval(() => {
                    setDisplayScore(prev => {
                        if (prev >= certificate?.scorePercentage) {
                            clearInterval(intervalId);
                            return certificate?.scorePercentage;
                        } else {
                            return Math.min(prev + 5, certificate?.scorePercentage);
                        }
                    });
                }, 25);

            } else {
                setShowScore(false);
            }

        }
        return () => clearInterval(intervalId);
    }, [certificate, open]);

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
                        certificate={certificate}
                    />

                    <CourseCompletionCertificate
                        courseInfo={courseInfo}
                        user={user}
                        dummyCertId={dummyCertId}
                        certificate={certificate}
                    />
                </Grid>

                <CourseCompletionReview
                    rating={rating}
                    setRating={setRating}
                    reviewText={reviewText}
                    setReviewText={setReviewText}
                    handleSubmitReview={() => handleSubmitReview(courseInfo?._id, rating, reviewText, token)}
                    isSubmitDisabled={isSubmitDisabled}
                    isSubmitting={isReviewSubmitting}
                    buttonText={initialRating ? "Update Review" : "Submit Review"}
                    title={initialRating ? "Update your review" : "Rate this course"}
                    isCertificatePage={true}
                />

                <CourseCompletionNextSteps onClose={onClose} courseInfo={courseInfo} token={token} />

            </DialogContent>



        </Dialog>
    );
};

export default CourseCompletionDialog;
