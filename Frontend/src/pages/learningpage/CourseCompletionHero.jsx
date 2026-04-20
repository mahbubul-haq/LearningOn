import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CourseCompletionHero = ({ user }) => {
    const theme = useTheme();

    return (
        <Box textAlign="center" mb={4} className="animate-pop">
            <Typography variant="h3" sx={{
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
            }}>
                🎉 Congratulations, {user?.name?.split(' ')[0] || 'Learner'}!
            </Typography>
            <Typography variant="h6" color="text.secondary" mt={1}>
                Course Completed!
            </Typography>
        </Box>
    );
};

export default CourseCompletionHero;
