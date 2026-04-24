import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const CourseCompletionStats = ({ courseInfo, displayScore, showScore, timeTaken }) => {
    const theme = useTheme();

    return (
        <Grid item xs={12} md={5}>
            <Box sx={{
                p: 3,
                borderRadius: '1rem',
                backgroundColor: theme.palette.background.paper,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Box sx={{
                    width: '100%',
                    height: 120,
                    borderRadius: '0.5rem',
                    overflow: 'hidden',
                    mb: 2,
                    backgroundColor: '#f0f0f0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {courseInfo?.courseThumbnail ? (
                        <img
                            src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
                                }/image/upload/${courseInfo?.courseThumbnail}`}
                            alt={courseInfo?.courseTitle}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    ) : (
                        <AutoAwesomeIcon sx={{ fontSize: 60, color: '#ccc' }} />
                    )}
                </Box>

                <Typography variant="subtitle1" fontWeight="bold" textAlign="center" mb={2}>
                    {courseInfo?.courseTitle || 'Course Title'}
                </Typography>

                <Typography variant="caption" color="text.secondary" textTransform="uppercase" letterSpacing={1}>
                    Total Score
                </Typography>

                <Box sx={{
                    mt: 1,
                    p: 2,
                    px: 4,
                    borderRadius: '1rem',
                    background: `linear-gradient(135deg, ${theme.palette.primary.light}20, ${theme.palette.secondary.light}20)`,
                    border: `1px solid ${theme.palette.primary.light}40`,
                    transition: 'transform 0.5s',
                    transform: showScore ? 'scale(1)' : 'scale(0.8)',
                    opacity: showScore ? 1 : 0
                }}>
                    <Typography variant="h3" fontWeight={800} color="primary.main">
                        {displayScore == "--" ? "Ungraded" : displayScore + " %"}
                    </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" mt={2} fontWeight={600}>
                    Time Taken: <span style={{ color: theme.palette.text.primary }}>{timeTaken}</span>
                </Typography>
            </Box>
        </Grid>
    );
};

export default CourseCompletionStats;
