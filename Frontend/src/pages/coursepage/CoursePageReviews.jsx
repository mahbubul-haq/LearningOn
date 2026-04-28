import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, Rating, Button, CircularProgress, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import CourseCompletionReview from "../learningpage/CourseCompletionReview";
import { colorTokens } from "../../theme";
import { CoursePageContext } from "../../state/CoursePageContext";
import { Snackbar, Alert } from "@mui/material";

const CoursePageReviews = ({ courseInfo }) => {
    const theme = useTheme();
    const { token, user } = useSelector((state) => state.auth);
    const { myReview, myReviewLoading, allReviews, allReviewsLoading, fetchAllReviews, isReviewSubmitting, handleSubmitReview } = useContext(CoursePageContext);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
    const [myRating, setMyRating] = useState(0);
    const [myReviewText, setMyReviewText] = useState("");

    useEffect(() => {
        if (!courseInfo?._id) return;

        fetchAllReviews(courseInfo?._id, token);

    }, [courseInfo?._id, token]);

    useEffect(() => {
        if (myReview) {
            setMyRating(myReview.rating);
            setMyReviewText(myReview.review);

            if (isReviewSubmitted) {
                setSnackbarOpen(true);
                setTimeout(() => {
                    setSnackbarOpen(false);
                }, 2000);
                setIsReviewSubmitted(false);
            }
        }


    }, [myReview]);

    useEffect(() => {
        if (isReviewSubmitting) {
            setIsReviewSubmitted(true);
        }
    }, [isReviewSubmitting]);

    const isSubmitDisabled = myRating === 0 || (myRating === myReview?.rating && myReviewText === myReview?.review);

    if (allReviewsLoading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}><CircularProgress /></Box>;
    }


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Use theme colors for backgrounds
    const reviewBg = theme.palette.mode === 'dark'
        ? 'rgba(107, 79, 217, 0.1)'
        : 'rgba(69, 34, 186, 0.05)';
    const reviewBorder = theme.palette.mode === 'dark'
        ? 'rgba(107, 79, 217, 0.2)'
        : 'rgba(69, 34, 186, 0.1)';



    return (
        <Box sx={{ mt: 2 }}>
            {/* Header info */}
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                justifyContent: 'space-between',
                mb: 4,
                gap: 2
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <Typography variant="h3" fontWeight="bold">Reviews</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Rating
                            value={courseInfo?.ratings?.numberOfRatings > 0 ? (courseInfo.ratings.totalRating / courseInfo.ratings.numberOfRatings) : 0}
                            precision={0.1}
                            readOnly
                            size="medium"
                            sx={{ color: colorTokens.secondary.lighter }}
                        />
                        <Typography variant="h6" fontWeight="bold">
                            {courseInfo?.ratings?.numberOfRatings > 0
                                ? (courseInfo.ratings.totalRating / courseInfo.ratings.numberOfRatings).toFixed(1)
                                : "0.0"
                            }
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            ({courseInfo?.ratings?.numberOfRatings || 0} ratings)
                        </Typography>
                    </Box>
                </Box>
                <Typography variant="body1" color="text.secondary">
                    {courseInfo?.ratings?.reviewCountWithText || 0} reviews
                </Typography>
            </Box>

            {/* My Review */}
            {myReview && (
                <Box sx={{ mb: 4 }}>
                    <CourseCompletionReview
                        title={myReview ? "Update your review" : "Rate this course"}
                        buttonText={myReview ? "Update Review" : "Submit Review"}
                        rating={myRating}
                        setRating={setMyRating}
                        reviewText={myReviewText}
                        setReviewText={setMyReviewText}
                        handleSubmitReview={() => handleSubmitReview(courseInfo?._id, myRating, myReviewText, token)}
                        isSubmitDisabled={isSubmitDisabled}
                        isSubmitting={isReviewSubmitting}
                        isCertificatePage={false}
                    />
                </Box>
            )}

            {/* Recent Reviews */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {allReviews?.length > 0 ? allReviews?.map((review, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            gap: { xs: 2, md: 4 },
                            p: 3,
                            borderRadius: '12px',
                            backgroundColor: reviewBg,
                            border: `1px solid ${reviewBorder}`,
                        }}
                    >
                        <Box sx={{ minWidth: { md: '200px' }, flexShrink: 0 }}>
                            <Rating sx={{
                                color: colorTokens.secondary.lighter
                            }} value={review.rating} readOnly size="small" />
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                by <Box component="span" sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>{review.userId?.name || 'Anonymous'}</Box>
                            </Typography>
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                {formatDate(review.createdAt)}
                            </Typography>
                            <Typography variant="body1">
                                {review.review}
                            </Typography>
                        </Box>
                    </Box>
                )) : (
                    <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                        <Typography fontSize="1.2rem" color="text.secondary">
                            {myReview ? "No more reviews" : "No reviews yet"}
                        </Typography>
                    </Box>
                )}
            </Box>

            {/* View All Button */}
            {((myReview && courseInfo?.reviewCountWithText > 6) || (!myReview && courseInfo?.reviewCountWithText > 5)) && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: theme.palette.secondary.light,
                            color: theme.palette.white.pure,
                            '&:hover': {
                                backgroundColor: theme.palette.secondary.main,
                            },
                            textTransform: 'none',
                            px: 4,
                            py: 1,
                            borderRadius: '8px',
                            fontWeight: 'bold',
                        }}
                    >
                        View All
                    </Button>
                </Box>
            )}

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
        </Box>
    );
};

export default CoursePageReviews;
