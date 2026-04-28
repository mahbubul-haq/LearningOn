import React from 'react';
import { Box, Typography, Rating, TextField, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CourseCompletionReview = ({
    rating,
    setRating,
    reviewText,
    setReviewText,
    handleSubmitReview,
    isSubmitDisabled,
    isSubmitting,
    title = "Rate this course",
    buttonText = "Submit Review",

}) => {
    const theme = useTheme();

    return (
        <Box sx={{
            p: 3,
            borderRadius: '1rem',
            backgroundColor: theme.palette.background.paper,
            mb: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 3,
                alignItems: 'flex-start'
            }}>
                <Box sx={{ minWidth: 200 }}>
                    <Typography variant="subtitle1" fontWeight="bold">{title}</Typography>
                    <Rating
                        value={rating}
                        onChange={(event, newValue) => setRating(newValue)}
                        size="large"
                        sx={{ mt: 1 }}
                    />
                </Box>

                <Box sx={{ flexGrow: 1, width: '100%', transition: 'all 0.3s' }}>
                    <Box sx={{ animation: 'popIn 0.3s forwards' }}>
                        <TextField
                            fullWidth
                            multiline
                            rows={2}
                            placeholder="Write a review (optional)..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            variant="outlined"
                            size="small"
                        />
                    </Box>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmitReview}
                    disabled={isSubmitDisabled || isSubmitting}
                    sx={{ borderRadius: '0.5rem', fontWeight: 'bold', px: 4, py: 1 }}
                >
                    {isSubmitting ? 'Submitting...' : buttonText}
                </Button>
            </Box>
        </Box>
    );
};

export default CourseCompletionReview;
