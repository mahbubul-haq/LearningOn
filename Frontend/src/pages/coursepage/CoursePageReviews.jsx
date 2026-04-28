import React, { useState, useEffect } from "react";
import { Box, Typography, Rating, Button, CircularProgress, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import CourseCompletionReview from "../learningpage/CourseCompletionReview";

const CoursePageReviews = ({ courseInfo }) => {
    const theme = useTheme();
    const { token, user } = useSelector((state) => state.auth);

    const [recentReviews, setRecentReviews] = useState([]);
    const [totalReviews, setTotalReviews] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const [myRating, setMyRating] = useState(0);
    const [myReviewText, setMyReviewText] = useState("");
    const [initialRating, setInitialRating] = useState(0);
    const [initialReviewText, setInitialReviewText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasMyReview, setHasMyReview] = useState(false);

    useEffect(() => {
        if (!courseInfo?._id) return;

        const fetchReviews = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/courses/${courseInfo._id}/reviews?limit=6`);
                const data = await res.json();
                if (data?.success) {
                    setRecentReviews(data.reviews);
                    setTotalReviews(data.totalReviews);
                }

                if (token) {
                    const meRes = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/courses/${courseInfo._id}/reviews/me`, {
                        headers: { "auth-token": token }
                    });
                    const meData = await meRes.json();
                    if (meData?.success && meData?.courseRating) {
                        setMyRating(meData.courseRating.rating || 0);
                        setMyReviewText(meData.courseRating.review || "");
                        setInitialRating(meData.courseRating.rating || 0);
                        setInitialReviewText(meData.courseRating.review || "");
                        setHasMyReview(true);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch reviews", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReviews();
    }, [courseInfo?._id, token]);

    const isSubmitDisabled = myRating === 0 || (myRating === initialRating && myReviewText === initialReviewText);

    const handleSubmitReview = async () => {
        if (isSubmitDisabled) return;
        setIsSubmitting(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/courses/${courseInfo._id}/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'auth-token': token
                },
                body: JSON.stringify({ rating: myRating, review: myReviewText })
            });
            const data = await res.json();
            if (data?.success) {
                setInitialRating(myRating);
                setInitialReviewText(myReviewText);
            }
        } catch (error) {
            console.error("Failed to submit review", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}><CircularProgress /></Box>;
    }

    // Filter out user's own review, and take up to 5
    const otherReviews = recentReviews
        .filter(r => r.userId?._id !== user?._id)
        .slice(0, 5);

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
                    {totalReviews} reviews
                </Typography>
            </Box>

            {/* My Review */}
            {hasMyReview && (
                <Box sx={{ mb: 4 }}>
                    <CourseCompletionReview
                        title="Update your review"
                        buttonText="Update Review"
                        rating={myRating}
                        setRating={setMyRating}
                        reviewText={myReviewText}
                        setReviewText={setMyReviewText}
                        handleSubmitReview={handleSubmitReview}
                        isSubmitDisabled={isSubmitDisabled}
                        isSubmitting={isSubmitting}
                    />
                </Box>
            )}

            {/* Recent Reviews */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {otherReviews.length > 0 ? otherReviews.map((review, index) => (
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
                            <Rating value={review.rating} readOnly size="small" />
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
                    !hasMyReview && (
                        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                            <Typography fontSize="1.2rem" color="text.secondary">
                                No reviews yet
                            </Typography>
                        </Box>
                    )
                )}
            </Box>

            {/* View All Button */}
            {totalReviews > 5 && (
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
        </Box>
    );
};

export default CoursePageReviews;
