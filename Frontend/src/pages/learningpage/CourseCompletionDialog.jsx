import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogContent, Typography, Box, IconButton,
    Rating, TextField, Button, Grid, Avatar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SpeedIcon from '@mui/icons-material/Speed';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTheme } from '@mui/material/styles';
import { StyledButton } from '../../components/StyledButton';
import { colorTokens } from '../../theme';
import { useNavigate } from 'react-router-dom';

// Simple Confetti Component
const Confetti = () => {
    const pieces = Array.from({ length: 40 });
    const colors = ['#FFC700', '#FF0055', '#00DFD8', '#9D00FF'];
    
    return (
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
            {pieces.map((_, i) => (
                <Box
                    key={i}
                    className="confetti-piece"
                    sx={{
                        left: `${Math.random() * 100}%`,
                        top: `${-10 - Math.random() * 20}%`,
                        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                        animation: `floatConfetti ${1.5 + Math.random() * 2}s ease-in ${Math.random() * 0.5}s forwards`,
                        width: `${5 + Math.random() * 5}px`,
                        height: `${10 + Math.random() * 10}px`,
                        transform: `rotate(${Math.random() * 360}deg)`
                    }}
                />
            ))}
        </Box>
    );
};

const CourseCompletionDialog = ({ open, onClose, courseInfo, courseProgress, user }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    
    // UI States
    const [displayScore, setDisplayScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [showReviewInput, setShowReviewInput] = useState(false);
    const [reviewSubmitted, setReviewSubmitted] = useState(false);

    // Calculate Metrics
    const totalScore = React.useMemo(() => {
        let score = 0;
        let possible = 0;
        courseInfo?.lessons?.forEach(lesson => {
            if (lesson.quiz?.metadata) {
                score += lesson.quiz.metadata.score || 0;
                possible += lesson.quiz.metadata.numberOfQuestions || 0;
            }
        });
        return possible > 0 ? Math.round((score / possible) * 100) : 100;
    }, [courseInfo]);

    const timeTaken = React.useMemo(() => {
        if (!courseProgress?.createdAt) return "Few days";
        const ms = Date.now() - new Date(courseProgress.createdAt).getTime();
        const days = Math.floor(ms / (1000 * 60 * 60 * 24));
        if (days === 0) return "1 day";
        return `${days} days`;
    }, [courseProgress]);

    const dummyCertId = `LC-CERT-${new Date().getFullYear()}-${Math.floor(Math.random()*10000).toString().padStart(4, '0')}`;

    // Score Animation
    useEffect(() => {
        if (open) {
            // Delay before starting animation
            const timer = setTimeout(() => {
                setShowScore(true);
                let current = 0;
                const interval = setInterval(() => {
                    current += 2;
                    if (current >= totalScore) {
                        setDisplayScore(totalScore);
                        clearInterval(interval);
                    } else {
                        setDisplayScore(current);
                    }
                }, 20);
                return () => clearInterval(interval);
            }, 500);
            return () => clearTimeout(timer);
        } else {
            setDisplayScore(0);
            setShowScore(false);
            setRating(0);
            setShowReviewInput(false);
        }
    }, [open, totalScore]);

    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
        if (newValue > 0 && !reviewSubmitted) {
            setShowReviewInput(true);
        }
    };

    const handleSubmitReview = () => {
        // Here you would dispatch to backend
        setReviewSubmitted(true);
        setTimeout(() => setShowReviewInput(false), 1500);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: "1.5rem",
                    background: theme.palette.mode === 'dark' 
                        ? 'linear-gradient(180deg, #2a2a3b 0%, #1e1e2d 100%)' 
                        : 'linear-gradient(180deg, #fdfbfb 0%, #ebedee 100%)',
                    overflow: 'hidden',
                    position: 'relative'
                }
            }}
        >
            {open && <Confetti />}
            
            <IconButton 
                onClick={onClose} 
                sx={{ position: 'absolute', right: 16, top: 16, zIndex: 10 }}
            >
                <CloseIcon />
            </IconButton>

            <DialogContent sx={{ p: { xs: 3, md: 5 }, position: 'relative', zIndex: 1 }}>
                
                {/* Hero Header */}
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
                        🎉 Congratulations, {user?.name?.split(' ')[0] || 'Student'}!
                    </Typography>
                    <Typography variant="h6" color="text.secondary" mt={1}>
                        Course Completed!
                    </Typography>
                </Box>

                <Grid container spacing={3} mb={4}>
                    {/* Left: Course Stats */}
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
                                        src={import.meta.env.VITE_SERVER_URL + courseInfo.courseThumbnail} 
                                        alt={courseInfo?.courseTitle} 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                    />
                                ) : (
                                    <AutoAwesomeIcon sx={{ fontSize: 60, color: '#ccc' }} />
                                )}
                            </Box>
                            
                            <Typography variant="subtitle1" fontWeight="bold" textAlign="center" mb={2}>
                                {courseInfo?.courseTitle || 'Mastering React Architecture'}
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
                                    {displayScore}%
                                </Typography>
                            </Box>
                            
                            <Typography variant="body2" color="text.secondary" mt={2} fontWeight={600}>
                                Time Taken: <span style={{ color: theme.palette.text.primary }}>{timeTaken}</span>
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Right: Certificate Preview */}
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
                                flexGrow: 1,
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <Box sx={{
                                    border: `1px solid ${theme.palette.divider}`,
                                    position: 'relative',
                                    height: '100%',
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
                </Grid>

                {/* Review Engine */}
                <Box sx={{ 
                    p: 3, 
                    borderRadius: '1rem', 
                    backgroundColor: theme.palette.background.paper,
                    mb: 4,
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 3,
                    alignItems: { xs: 'flex-start', md: reviewSubmitted ? 'center' : 'flex-start' }
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
                        {reviewSubmitted ? (
                            <Box display="flex" alignItems="center" gap={1} color="success.main" mt={1}>
                                <CheckCircleIcon />
                                <Typography fontWeight="bold">Thank you for your review!</Typography>
                            </Box>
                        ) : showReviewInput ? (
                            <Box display="flex" gap={2} alignItems="flex-start" sx={{ animation: 'popIn 0.3s forwards' }}>
                                <TextField 
                                    fullWidth 
                                    multiline 
                                    rows={2} 
                                    placeholder="Add your detailed thoughts (optional)..."
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
                                    Submit
                                </Button>
                            </Box>
                        ) : (
                            <Typography variant="body2" color="text.secondary" mt={1} sx={{ opacity: 0.7 }}>
                                Click the stars to leave a quick rating!
                            </Typography>
                        )}
                    </Box>
                </Box>

                {/* Badges and Next Steps */}
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

            </DialogContent>
        </Dialog>
    );
};

export default CourseCompletionDialog;
