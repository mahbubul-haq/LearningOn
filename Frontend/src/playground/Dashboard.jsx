import React from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    TextField,
    Button,
    Avatar,
    Link,
    CssBaseline
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';

// 1. Create a Custom Theme to match your Dark/Neon Home Page
const darkNeonTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#6b4cdd', // The purple from your hero buttons
        },
        background: {
            default: '#0b0914', // Match your dark background
            paper: '#161421',
        },
        text: {
            primary: '#ffffff',
            secondary: '#8c8c9e',
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        '& fieldset': { borderColor: 'rgba(138, 43, 226, 0.2)' },
                        '&:hover fieldset': { borderColor: 'rgba(138, 43, 226, 0.5)' },
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    padding: '12px 0',
                    fontWeight: 600,
                    boxShadow: '0 0 15px rgba(107, 76, 221, 0.4)',
                    '&:hover': {
                        boxShadow: '0 0 25px rgba(107, 76, 221, 0.7)',
                    },
                },
            },
        },
    },
});

export default function SignUpPage() {
    return (
        <ThemeProvider theme={darkNeonTheme}>
            <CssBaseline />
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    // Atmospheric background blurs
                    background: `radial-gradient(circle at 15% 15%, rgba(138, 43, 226, 0.12), transparent 35%), 
                       radial-gradient(circle at 85% 85%, rgba(255, 0, 128, 0.08), transparent 35%)`,
                    position: 'relative',
                }}
            >
                {/* Brand Logo Top Left */}
                <Typography
                    variant="h6"
                    sx={{
                        position: 'absolute',
                        top: 40,
                        left: 40,
                        fontWeight: 800,
                        color: '#9d7cff',
                        letterSpacing: 0.5,
                    }}
                >
                    LearningOn
                </Typography>

                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">

                        {/* LEFT: Illustration Section */}
                        <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Box
                                sx={{
                                    width: '100%',
                                    aspectRatio: '5/4',
                                    borderRadius: '24px',
                                    border: '1px solid rgba(255, 255, 255, 0.05)',
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    backdropFilter: 'blur(12px)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 0 20px rgba(138, 43, 226, 0.1)',
                                    overflow: 'hidden'
                                }}
                            >
                                {/* 
                   Replace this placeholder Typography with your 
                   actual Image Component using "watermarked_img_331615511588914761.png"
                */}
                                <Typography color="text.secondary" variant="body2">
                                    [ Illustration Content Placeholder ]
                                </Typography>
                            </Box>
                        </Grid>

                        {/* RIGHT: Signup Form Section */}
                        <Grid item xs={12} md={6}>
                            <Box sx={{ maxWidth: 400, mx: 'auto', textAlign: 'center' }}>
                                <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
                                    Sign Up
                                </Typography>

                                <Avatar
                                    sx={{
                                        width: 70,
                                        height: 70,
                                        bgcolor: 'rgba(255, 255, 255, 0.07)',
                                        mx: 'auto',
                                        mb: 5,
                                        border: '1px solid rgba(138, 43, 226, 0.3)',
                                        boxShadow: '0 0 20px rgba(138, 43, 226, 0.3)',
                                    }}
                                >
                                    <PersonIcon sx={{ fontSize: 35, color: '#ccc' }} />
                                </Avatar>

                                <Box component="form" noValidate>
                                    <TextField fullWidth margin="normal" placeholder="Name" />
                                    <TextField fullWidth margin="normal" placeholder="Email" />
                                    <TextField fullWidth margin="normal" placeholder="Password" type="password" />

                                    <Button
                                        fullWidth
                                        variant="contained"
                                        size="large"
                                        sx={{ mt: 3, mb: 3 }}
                                    >
                                        Sign Up
                                    </Button>

                                    <Typography variant="body2" color="text.secondary">
                                        Already have an account?{' '}
                                        <Link href="#" sx={{ color: '#ff6b6b', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                                            Log In
                                        </Link>
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
}