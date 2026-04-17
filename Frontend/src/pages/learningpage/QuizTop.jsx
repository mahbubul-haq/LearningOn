import React from 'react'
import { Box, Button, LinearProgress, Typography, CircularProgress, IconButton } from '@mui/material';
import { ArrowBackIosNew, WorkspacePremium } from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/material/styles/useTheme';
import { colorTokens } from '../../theme';
const QuizTop = ({ score, timer, progress }) => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const isMobileScreens = useMediaQuery("(max-width:600px)");
    const theme = useTheme();
    return (
        <Box sx={{ mb: 4 }}>
            {/* Global Progress Bar */}
            <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                    height: 8, borderRadius: 4, mb: 3,
                    backgroundColor: (theme) => theme.palette.learningPage.divider,
                    '& .MuiLinearProgress-bar': {
                        background: `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
                        boxShadow: `0 0 10px ${theme.palette.primary.main}40`,
                    }
                }}
            />

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: { xs: 2, sm: 0 }
            }}>
                <Box sx={{ flex: { xs: '1 1 auto', sm: '1 1 0' }, display: 'flex', justifyContent: 'flex-start' }}>
                    <Button
                        startIcon={<ArrowBackIosNew sx={{ fontSize: '0.8rem !important' }} />}
                        onClick={() => window.history.back()}
                        sx={{ color: (theme) => theme.palette.learningPage.textSecondary, textTransform: 'none', letterSpacing: 1 }}
                    >
                        EXIT
                    </Button>
                </Box>

                <Box sx={{
                    order: { xs: 3, sm: 2 },
                    flex: { xs: '1 1 100%', sm: '1 1 0' },
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Box sx={{
                        p: '8px 24px', borderRadius: '30px',
                        backgroundColor: (theme) => theme.palette.learningPage.navBg,
                        backdropFilter: "blur(20px)",
                        border: (theme) => `1px solid ${theme.palette.learningPage.divider}`,
                        boxShadow: (theme) => theme.palette.homepage.cardShadow,
                        display: 'flex', alignItems: 'center', gap: 1,
                    }}>
                        <WorkspacePremium sx={{ color: (theme) => theme.palette.primary.main, fontSize: '1.4rem' }} />
                        <Typography sx={{ color: (theme) => theme.palette.learningPage.textPrimary, fontWeight: 'bold', fontSize: '1.1rem' }}>
                            {score} <span style={{ opacity: 0.7, fontSize: '0.8rem', fontWeight: 'normal' }}>PTS</span>
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{
                    order: { xs: 2, sm: 3 },
                    flex: { xs: '0 1 auto', sm: '1 1 0' },
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                        <CircularProgress
                            variant="determinate"
                            value={100}
                            size={56}
                            thickness={3}
                            sx={{ color: (theme) => theme.palette.learningPage.divider }}
                        />

                        <CircularProgress
                            variant="determinate"
                            value={(timer.remainingTime / timer.totalTime) * 100}
                            size={56}
                            thickness={3}
                            sx={{
                                color: (theme) => theme.palette.secondary.main,
                                position: 'absolute',
                                left: 0,
                                '& .MuiCircularProgress-circle': { strokeLinecap: 'round' }
                            }}
                        />


                        <Box sx={{
                            inset: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Typography sx={{
                                color: (theme) => theme.palette.secondary.main,
                                fontSize: timer > 3600 ? '0.65rem' : '0.8rem',
                                fontWeight: 'bold',
                                fontFamily: 'monospace',
                                transition: 'font-size 0.3s ease'
                            }}>
                                {`${Math.floor(timer.remainingTime / 60)}:${(Math.floor(timer.remainingTime) % 60).toString().padStart(2, '0')}`}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default QuizTop