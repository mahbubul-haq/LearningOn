import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { StyledButton } from '../../components/StyledButton';
import { colorTokens } from '../../theme';

const CourseCompletionCertificate = ({ courseInfo, user, dummyCertId }) => {
    const theme = useTheme();

    return (
        <Grid item xs={12} md={7}>
            <Box sx={{
                p: 3, 
                borderRadius: '1rem',
                backgroundColor: theme.palette.background.paper,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                {/* Certificate Rendering Box */}
                <Box sx={{
                    border: `8px solid ${theme.palette.divider}`,
                    borderRadius: '8px',
                    p: 0.5,
                    width: '100%',
                    mb: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    overflowX: 'auto',
                    '&::-webkit-scrollbar': { height: '6px' },
                    '&::-webkit-scrollbar-thumb': { backgroundColor: theme.palette.divider, borderRadius: '4px' }
                }}>
                    <Box sx={{
                        border: `1px solid ${theme.palette.divider}`,
                        position: 'relative',
                        height: '100%',
                        minWidth: '400px', // Forces scrolling on very small devices
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundImage: `linear-gradient(to right bottom, ${theme.palette.background.paper}, ${theme.palette.background.default})`
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, opacity: 0.7 }}>
                            <div style={{ width: 16, height: 16, background: theme.palette.primary.main, borderRadius: '50%' }} />
                            <Typography variant="caption" fontWeight="bold">LearningOn</Typography>
                        </Box>
                        
                        <Typography variant="overline" color="text.secondary">Mini Certificate</Typography>
                        
                        <Typography variant="subtitle1" fontWeight="bold" textAlign="center" sx={{ maxWidth: '90%', lineHeight: 1.2, mb: 2 }}>
                            {courseInfo?.courseTitle || 'Mastering React Architecture'}
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'flex-end', mt: 'auto', px: 2 }}>
                            <Box textAlign="left">
                                <Typography sx={{ fontFamily: '"Great Vibes", cursive, "Times New Roman"', fontSize: '1.2rem', color: theme.palette.text.primary, borderBottom: `1px solid ${theme.palette.divider}`, paddingBottom: '2px', opacity: 0.8 }}>
                                    {user?.name || 'Instructor Signature'}
                                </Typography>
                                <Typography variant="caption" sx={{ fontSize: '0.5rem', color: 'text.secondary' }}>
                                    Verification ID:<br/>{dummyCertId}
                                </Typography>
                            </Box>
                            
                            <WorkspacePremiumIcon sx={{ fontSize: 40, color: '#FFD700' }} />
                            
                            <Box textAlign="right">
                                <Typography sx={{ fontFamily: '"Great Vibes", cursive, "Times New Roman"', fontSize: '1.2rem', color: theme.palette.text.primary, borderBottom: `1px solid ${theme.palette.divider}`, paddingBottom: '2px', opacity: 0.8 }}>
                                    LearningOn
                                </Typography>
                                <Typography variant="caption" sx={{ fontSize: '0.5rem', color: 'text.secondary' }}>
                                    Verify at: learningon.com/verify
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <StyledButton 
                    variant="contained" 
                    fullWidth
                    sx={{ 
                        py: 1.5, 
                        background: theme.palette.primary.main, 
                        color: colorTokens.white.pure,
                        borderRadius: '0.5rem',
                        textTransform: 'none',
                        fontWeight: 'bold'
                    }}
                >
                    Download Certificate (PDF)
                </StyledButton>
            </Box>
        </Grid>
    );
};

export default CourseCompletionCertificate;
