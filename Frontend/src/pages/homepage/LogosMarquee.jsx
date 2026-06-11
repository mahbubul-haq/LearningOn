import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';


const LogosMarquee = () => {
    const theme = useTheme();
    const maxWidth400 = useMediaQuery("(max-width: 400px)");

    const logos = [
        { name: "HARVARD", fontFamily: "'Cinzel', 'Times New Roman', serif", fontWeight: 700, letterSpacing: 2 },
        { name: "OXFORD", fontFamily: "'PT Serif', 'Times New Roman', serif", fontWeight: 700, letterSpacing: 1 },
        { name: "MIT", fontFamily: "'Inter', sans-serif", fontWeight: 900, letterSpacing: -1 },
        { name: "BUET", fontFamily: "'Roboto', sans-serif", fontWeight: 800, letterSpacing: 1 },
        { name: "freeCodeCamp", fontFamily: "'Fira Code', monospace", fontWeight: 600, letterSpacing: 0 },
        { name: "Coursera", fontFamily: "'Source Sans Pro', sans-serif", fontWeight: 700, letterSpacing: 0 },
        { name: "edX", fontFamily: "'Open Sans', sans-serif", fontWeight: 800, letterSpacing: 1 },
    ];

    return (
        <Box
            sx={{
                width: '100%',
                overflow: 'hidden',
                py: { xs: 2, md: 3 },
                position: 'relative',
                background: 'transparent',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography
                variant="overline"
                sx={{
                    mb: 3,
                    color: theme.palette.text.secondary,
                    fontWeight: 600,
                    letterSpacing: 2,
                    fontSize: '0.875rem',
                    textAlign: "center"
                }}
            >
                {maxWidth400 ? "PARTNERED WITH " : "PARTNERED WITH LEADING PUBLISHERS & UNIVERSITIES"}
            </Typography>

            <Box
                sx={{
                    width: '100%',
                    overflow: 'hidden',
                    maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        width: 'max-content',
                        animation: 'scroll 30s linear infinite',
                        '&:hover': {
                            animationPlayState: 'paused',
                        },
                        '@keyframes scroll': {
                            '0%': { transform: 'translateX(0)' },
                            '100%': { transform: 'translateX(-50%)' },
                        },
                    }}
                >
                    {/* Duplicate the array to create a seamless loop */}
                    {[...logos, ...logos].map((logo, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                px: 4,
                                opacity: 0.6,
                                transition: 'opacity 0.3s ease, transform 0.3s ease',
                                '&:hover': {
                                    opacity: 1,
                                    transform: 'scale(1.05)',
                                },
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: logo.fontFamily,
                                    fontWeight: logo.fontWeight,
                                    letterSpacing: logo.letterSpacing,
                                    fontSize: '1.75rem',
                                    color: theme.palette.text.primary,
                                    userSelect: 'none',
                                }}
                            >
                                {logo.name}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default LogosMarquee;
