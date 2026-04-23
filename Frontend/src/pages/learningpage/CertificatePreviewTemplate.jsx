import React, { forwardRef } from 'react';
import { Box, Typography, Link } from '@mui/material';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const CertificatePreviewTemplate = forwardRef(({ courseInfo, user, certificateId, theme }, ref) => {
    return (
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
            <Box
                ref={ref}
                sx={{
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
                    {courseInfo?.courseTitle || 'Course Title'}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'flex-end', mt: 'auto', px: 2 }}>
                    <Box textAlign="left">
                        <Typography sx={{ fontFamily: '"Great Vibes", cursive, "Times New Roman"', fontSize: '1.2rem', color: theme.palette.text.primary, borderBottom: `1px solid ${theme.palette.divider}`, paddingBottom: '2px', opacity: 0.8 }}>
                            {user?.name || 'UserName'}
                        </Typography>
                        <Typography variant="caption" sx={{ fontSize: '0.5rem', color: 'text.secondary' }}>
                            Verification ID:<br />{certificateId}
                        </Typography>
                    </Box>

                    <WorkspacePremiumIcon sx={{ fontSize: 40, color: '#FFD700' }} />

                    <Box textAlign="right">
                        <Typography sx={{ fontFamily: '"Great Vibes", cursive, "Times New Roman"', fontSize: '1.2rem', color: theme.palette.text.primary, borderBottom: `1px solid ${theme.palette.divider}`, paddingBottom: '2px', opacity: 0.8 }}>
                            LearningOn
                        </Typography>
                        <Typography variant="caption" sx={{ fontSize: '0.5rem', color: 'text.secondary' }}>
                            Verify at: <Link href={`https://learningon.com/verify/${certificateId}`} underline="hover" color="inherit" target="_blank" rel="noopener noreferrer">learningon.com/verify/{certificateId}</Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
});

CertificatePreviewTemplate.displayName = 'CertificatePreviewTemplate';

export default CertificatePreviewTemplate;
