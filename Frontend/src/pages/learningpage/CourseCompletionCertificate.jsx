import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Grid, Snackbar, Alert, CircularProgress, Link } from '@mui/material';
import html2pdf from 'html2pdf.js';
import { useTheme } from '@mui/material/styles';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { StyledButton } from '../../components/StyledButton';
import { colorTokens } from '../../theme';
import { useSelector } from 'react-redux';
import CertificatePDFTemplate from './CertificatePDFTemplate';
import CertificatePreviewTemplate from './CertificatePreviewTemplate';

const CourseCompletionCertificate = ({ courseInfo, user, dummyCertId, certificateId }) => {
    const theme = useTheme();
    const { token } = useSelector((state) => state.auth);
    const [isDownloading, setIsDownloading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
    const certificateRef = useRef();
    const [latestCertId, setLatestCertId] = useState(certificateId || "");
    const pdfCertificateRef = useRef();
    const cooldownTimerRef = useRef(null);

    useEffect(() => {
        return () => {
            if (cooldownTimerRef.current) {
                clearTimeout(cooldownTimerRef.current);
            }
        };
    }, []);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar({ ...snackbar, open: false });
    };

    const handleDownload = async () => {
        if (isDownloading) return;
        setIsDownloading(true);
        setSnackbar({ open: true, message: 'Generating your certificate... Please wait.', severity: 'info' });

        try {
            createCertificate();

        } catch (error) {
            console.log(error);
            setIsDownloading(false);
            setSnackbar({ open: true, message: error.message || 'Failed to download certificate.', severity: 'error' });
        }
    }

    async function createCertificate() {
        try {
            const element = pdfCertificateRef.current;
            const opt = {
                margin: 0,
                filename: `certificate-${courseInfo?._id || 'course'}.pdf`,
                image: { type: 'jpeg', quality: 1.0 },
                html2canvas: { scale: 2, useCORS: true, logging: false },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
                enableLinks: true
            };

            await html2pdf().set(opt).from(element).save();
            setSnackbar({ open: true, message: 'Certificate downloaded successfully!', severity: 'success' });

        } catch (error) {
            console.log(error);
            setSnackbar({ open: true, message: error.message || 'Failed to download certificate.', severity: 'error' });
        } finally {
            // Add a 20-second cooldown timer before activating the download button again
            cooldownTimerRef.current = setTimeout(() => {
                setIsDownloading(false);
            }, 20000);
        }
    }

    return (
        <Grid item xs={12} md={7}>
            <CertificatePDFTemplate
                ref={pdfCertificateRef}
                courseInfo={courseInfo}
                user={user}
                certificateId={latestCertId || certificateId || dummyCertId}
            />

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
                <CertificatePreviewTemplate
                    ref={certificateRef}
                    courseInfo={courseInfo}
                    user={user}
                    certificateId={latestCertId || certificateId || dummyCertId}
                    theme={theme}
                />

                <StyledButton
                    variant="contained"
                    fullWidth
                    disabled={isDownloading}
                    sx={{
                        py: 1.5,
                        background: isDownloading ? theme.palette.action.disabledBackground : theme.palette.primary.main,
                        color: isDownloading ? theme.palette.text.disabled : colorTokens.white.pure,
                        borderRadius: '0.5rem',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        display: 'flex',
                        gap: 1
                    }}
                    onClick={handleDownload}
                >
                    {isDownloading && <CircularProgress size={20} color="inherit" />}
                    {isDownloading ? 'Downloading...' : 'Download Certificate (PDF)'}
                </StyledButton>
            </Box>

            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }} variant="filled">
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Grid>
    );
};

export default CourseCompletionCertificate;
