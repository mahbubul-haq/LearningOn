import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { colorTokens } from '../../theme';

interface VideoProgressIndicatorProps {
  percentage: number;
  size?: number;
  opacity?: number;
}

const VideoProgressIndicator: React.FC<VideoProgressIndicatorProps> = ({
  percentage = 0,
  size = 60,
  opacity = 1
}) => {
  const theme = useTheme();
  const strokeWidth = 4;
  const center = size / 2;
  const radius = (size / 2) - (strokeWidth / 2);
  const circumference = 2 * Math.PI * radius;

  const validatedPercentage = Math.min(Math.max(percentage, 0), 100);
  const offset = circumference - (validatedPercentage / 100) * circumference;

  const isComplete = validatedPercentage >= 100;

  // Premium Gradient IDs
  const gradientId = "progressGradient";
  const glowId = "glowFilter";

  return (
    <Box
      sx={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: opacity,
        transition: 'opacity 0.5s ease',
        // Glassmorphic Background
        background: 'rgba(20, 20, 35, 0.4)', // Darker semi-transparent bg
        backdropFilter: 'blur(8px)',
        borderRadius: '50%',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ overflow: 'visible', transform: 'rotate(-90deg)' }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colorTokens.primary.main} />
            <stop offset="100%" stopColor={colorTokens.secondary.main} />
          </linearGradient>

          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Background Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
        />

        {/* 2. Dynamic Progress Bar */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          filter={isComplete ? `url(#${glowId})` : "none"}
          style={{
            transition: 'stroke-dashoffset 0.5s ease',
          }}
        />
      </svg>

      {/* 3. Center Content (Text or Icon) */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isComplete ? (
          <svg
            width={size * 0.4}
            height={size * 0.4}
            viewBox="0 0 24 24"
            fill="none"
            stroke={colorTokens.secondary.lighter}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))'
            }}
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        ) : (
          <Typography
            variant="caption"
            sx={{
              color: '#fff',
              fontSize: `${size * 0.25}px`,
              fontWeight: 700,
              fontFamily: '"Outfit", sans-serif', // Ensure we use the premium font if available
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {Math.round(validatedPercentage)}
            <span style={{ fontSize: '0.7em', marginLeft: '1px', opacity: 0.8 }}>%</span>
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default VideoProgressIndicator;