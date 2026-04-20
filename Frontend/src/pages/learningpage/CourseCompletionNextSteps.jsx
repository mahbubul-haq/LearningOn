import React from 'react';
import { Box, Typography, Grid, Avatar, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SpeedIcon from '@mui/icons-material/Speed';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CourseCompletionNextSteps = ({ onClose }) => {
    const theme = useTheme();

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" fontWeight="bold" mb={2}>Achievements Badges</Typography>
                <Box display="flex" gap={2}>
                    <Box textAlign="center">
                        <Avatar sx={{ bgcolor: theme.palette.secondary.main, width: 56, height: 56, mb: 1, mx: 'auto' }}>
                            <SpeedIcon />
                        </Avatar>
                        <Typography variant="caption" fontWeight="bold">Speed Demon</Typography>
                    </Box>
                    <Box textAlign="center">
                        <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 56, height: 56, mb: 1, mx: 'auto' }}>
                            <CheckCircleIcon />
                        </Avatar>
                        <Typography variant="caption" fontWeight="bold">Completed</Typography>
                    </Box>
                </Box>
            </Grid>
            
            <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" fontWeight="bold" mb={2}>Next Steps</Typography>
                <Box sx={{ 
                    p: 2, 
                    borderRadius: '0.5rem', 
                    border: `1px solid ${theme.palette.divider}`,
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: theme.palette.action.hover },
                    mb: 2
                }}>
                    <Box sx={{ width: 40, height: 40, borderRadius: '4px', backgroundColor: '#e0e0e0', mr: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <AutoAwesomeIcon sx={{ fontSize: 20, color: '#888' }} />
                    </Box>
                    <Box flexGrow={1}>
                        <Typography variant="caption" color="text.secondary">Recommended Next Course</Typography>
                        <Typography variant="body2" fontWeight="bold">Advanced Course Materials</Typography>
                    </Box>
                </Box>
                
                <Button 
                    fullWidth 
                    variant="text" 
                    color="inherit" 
                    onClick={onClose}
                    sx={{ justifyContent: 'flex-start', color: 'text.secondary' }}
                >
                    → Back to Course Page
                </Button>
            </Grid>
        </Grid>
    );
};

export default CourseCompletionNextSteps;
