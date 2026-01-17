import { keyframes } from '@mui/material';
import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';

const wave = keyframes`
  0%, 100% {
    transform: scale(0.6);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.2); // Pulse larger
    opacity: 1;
  }
`;

const WaveLoader = () => {
    const theme = useTheme();
    const dotStyle = {
        width: '14px',
        height: '14px',
        borderRadius: '50%',
        // The dots themselves are mini gradients
        background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.light} 100%)`,
        display: 'inline-block',
        animation: `${wave} 1.5s infinite ease-in-out both`,
    };

    return (
        <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', py: 4 }}>
            <Box sx={{ ...dotStyle, animationDelay: '0s' }} />
            <Box sx={{ ...dotStyle, animationDelay: '0.2s' }} />
            <Box sx={{ ...dotStyle, animationDelay: '0.4s' }} />
        </Box>
    );
};

export default WaveLoader;