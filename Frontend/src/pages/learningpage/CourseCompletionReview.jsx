import React from 'react';
import { Box, Typography, Rating, TextField, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CourseCompletionReview = ({ rating, handleRatingChange, reviewText, setReviewText, handleSubmitReview }) => {
    const theme = useTheme();

    return (
        <Box sx={{ 
            p: 3, 
            borderRadius: '1rem', 
            backgroundColor: theme.palette.background.paper,
            mb: 4,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
            alignItems: 'flex-start'
        }}>
            <Box sx={{ minWidth: 200 }}>
                <Typography variant="subtitle1" fontWeight="bold">Rate this course</Typography>
                <Rating 
                    value={rating} 
                    onChange={handleRatingChange} 
                    size="large" 
                    sx={{ mt: 1 }}
                />
            </Box>
            
            <Box sx={{ flexGrow: 1, width: '100%', transition: 'all 0.3s' }}>
                <Box display="flex" gap={2} alignItems="flex-start" sx={{ animation: 'popIn 0.3s forwards', flexDirection: { xs: 'column', sm: 'row' } }}>
                    <TextField 
                        fullWidth 
                        multiline 
                        rows={2} 
                        placeholder="Write a review of the course..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        variant="outlined"
                        size="small"
                    />
                    <Button 
                        variant="outlined" 
                        color="primary" 
                        onClick={handleSubmitReview}
                        sx={{ whiteSpace: 'nowrap', alignSelf: 'stretch', borderRadius: '0.5rem', fontWeight: 'bold' }}
                    >
                        Add Review
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default CourseCompletionReview;
