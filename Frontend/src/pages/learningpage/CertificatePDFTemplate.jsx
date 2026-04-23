import React, { forwardRef } from 'react';
import { Box, Typography } from '@mui/material';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const CertificatePDFTemplate = forwardRef(({ courseInfo, user, certificateId }, ref) => {
    return (
        <Box
            sx={{
                position: 'absolute',
                top: '-9999px',
                left: '-9999px',
                width: '1122px',
                height: '793px',
                zIndex: -1,
                pointerEvents: 'none'
            }}
        >
            <Box
                ref={ref}
                sx={{
                    width: '1122px',
                    height: '793px',
                    backgroundColor: '#fdfbf7', // Ivory certificate background
                    padding: '40px',
                    boxSizing: 'border-box',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        border: '12px solid #1a237e', // Navy blue outer border
                        outline: '3px solid #1a237e',
                        outlineOffset: '-20px',
                        boxSizing: 'border-box',
                        padding: '50px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fdfbf7',
                        backgroundImage: 'radial-gradient(circle, #ffffff 0%, #fdfbf7 100%)',
                        position: 'relative'
                    }}
                >
                    {/* Decorative corners */}
                    <Box sx={{ position: 'absolute', top: 25, left: 25, width: 60, height: 60, borderTop: '6px solid #b8860b', borderLeft: '6px solid #b8860b' }} />
                    <Box sx={{ position: 'absolute', top: 25, right: 25, width: 60, height: 60, borderTop: '6px solid #b8860b', borderRight: '6px solid #b8860b' }} />
                    <Box sx={{ position: 'absolute', bottom: 25, left: 25, width: 60, height: 60, borderBottom: '6px solid #b8860b', borderLeft: '6px solid #b8860b' }} />
                    <Box sx={{ position: 'absolute', bottom: 25, right: 25, width: 60, height: 60, borderBottom: '6px solid #b8860b', borderRight: '6px solid #b8860b' }} />

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                        <div style={{ width: 50, height: 50, background: '#1a237e', borderRadius: '50%' }} />
                        <Typography variant="h3" fontWeight="bold" sx={{ color: '#1a237e', letterSpacing: '2px' }}>LearningOn</Typography>
                    </Box>

                    <Typography variant="h1" sx={{ fontFamily: '"Georgia", serif', color: '#1a237e', mb: 3, fontWeight: 'normal', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '3rem', whiteSpace: 'nowrap' }}>
                        Certificate of Completion
                    </Typography>

                    <Typography variant="h5" sx={{ color: '#555', mb: 5, fontStyle: 'italic' }}>
                        This is to certify that
                    </Typography>

                    <Typography variant="h2" sx={{ fontFamily: '"Great Vibes", cursive, "Times New Roman", serif', color: '#b8860b', mb: 5, fontWeight: 'bold', borderBottom: '3px solid #ddd', paddingBottom: '10px', minWidth: '600px', textAlign: 'center', fontSize: '4rem' }}>
                        {user?.name || 'UserName'}
                    </Typography>

                    <Typography variant="h5" sx={{ color: '#555', mb: 5, maxWidth: '80%', textAlign: 'center', lineHeight: 1.6 }}>
                        has successfully completed the course<br />
                        <strong style={{ color: '#222', fontSize: '1.4em', display: 'block', marginTop: '15px' }}>{courseInfo?.courseTitle || 'Course Title'}</strong>
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 'auto', px: 10, alignItems: 'center' }}>
                        <Box textAlign="center" sx={{ width: '250px' }}>
                            <Typography sx={{ fontSize: '1.2rem', color: '#333', mb: 1 }}>
                                {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ color: '#777', textTransform: 'uppercase', letterSpacing: '2px' }}>
                                Date
                            </Typography>
                        </Box>

                        <WorkspacePremiumIcon sx={{ fontSize: 120, color: '#b8860b' }} />

                        <Box textAlign="center" sx={{ width: '250px' }}>
                            <Typography sx={{ fontFamily: '"Great Vibes", cursive, "Times New Roman", serif', fontSize: '2.5rem', color: '#1a237e', mb: 1 }}>
                                LearningOn
                            </Typography>
                            <Typography variant="subtitle1" sx={{ color: '#777', textTransform: 'uppercase', letterSpacing: '2px' }}>
                                Verified Issuer
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ width: '100%', textAlign: 'center', mt: 3 }}>
                        <Typography variant="caption" sx={{ color: '#888', fontSize: '0.9rem', letterSpacing: '1px' }}>
                            Verification ID: {certificateId} &nbsp;|&nbsp; Verify at: <a href={`https://learningon.com/verify/${certificateId}`} style={{ color: '#888', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">learningon.com/verify/{certificateId}</a>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
});

CertificatePDFTemplate.displayName = 'CertificatePDFTemplate';

export default CertificatePDFTemplate;
