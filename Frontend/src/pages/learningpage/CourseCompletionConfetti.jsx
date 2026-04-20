import React from 'react';
import { Box } from '@mui/material';

const CourseCompletionConfetti = () => {
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

export default CourseCompletionConfetti;
