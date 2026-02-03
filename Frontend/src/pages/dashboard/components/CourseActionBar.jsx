import React from 'react';
import { Paper, Typography, Button, Stack } from '@mui/material';
import { Edit, OpenInNew } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function CourseActionBar({ selectedCourse, glassSx, theme, user }) {
    const navigate = useNavigate();
    if (!selectedCourse) return null;

    return (
        <Paper sx={{ ...glassSx, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1" fontWeight="800" sx={{ color: theme.palette.primary.lighter }}>{selectedCourse.courseTitle}</Typography>
            <Stack direction="row" spacing={1}>
                {user._id === selectedCourse.owner && (
                    <Button onClick={() => navigate(`/publishcourse/edit/${selectedCourse._id}`)} variant="outlined" startIcon={<Edit />} size="small" sx={{ textTransform: 'none', borderRadius: 2 }}>Edit</Button>
                )}
                <Button onClick={() => navigate(`/course/${selectedCourse._id}`)} variant="contained" startIcon={<OpenInNew />} size="small" sx={{ textTransform: 'none', borderRadius: 2, bgcolor: theme.palette.primary.lighter, '&:hover': { bgcolor: theme.palette.primary.main } }}>Go to Course</Button>
            </Stack>
        </Paper>
    );
}
