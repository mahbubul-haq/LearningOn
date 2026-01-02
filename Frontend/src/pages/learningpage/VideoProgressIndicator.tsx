import React from 'react';

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
  const strokeWidth = 4;
  const center = size / 2;
  // RESTORED ORIGINAL RADIUS: No size changes
  const radius = (size / 2) - (strokeWidth / 2);
  const circumference = 2 * Math.PI * radius;

  const validatedPercentage = Math.min(Math.max(percentage, 0), 100);
  const offset = circumference - (validatedPercentage / 100) * circumference;

  const isComplete = validatedPercentage >= 100;
  const isStarted = validatedPercentage > 0;

  return (
    <div style={styles.container(size, opacity)}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ overflow: 'visible' }} // Crucial: allows glow to spread outside
      >
        <defs>
          {/* Custom SVG Filter: -50% bounds ensure NO rectangular clipping */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
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
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth={strokeWidth}
        />

        {/* 2. Dynamic Progress Bar */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#00e5ff"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          filter={isComplete ? "url(#glow)" : "none"} // Applying internal SVG filter
          style={{
            transition: 'stroke-dashoffset 0.5s ease',
            transform: 'rotate(-90deg)',
            transformOrigin: 'center',
          }}
        />
      </svg>

      {/* 3. Status Overlay */}
      <div style={styles.iconOverlay}>
        {isComplete ? (
          <svg
            width={size * 0.35}
            height={size * 0.35}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#00e5ff"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ overflow: 'visible', filter: 'url(#glow)' }} // Apply same filter to tick
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        ) : (
          <span style={styles.text(size)}>
            {Math.round(validatedPercentage)}%
          </span>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: (size: number, opacity: number): React.CSSProperties => ({
    position: 'relative',
    width: `${size}px`,
    height: `${size}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    opacity: opacity,
    transition: 'opacity 0.5s ease',
  }),
  iconOverlay: {
    position: 'absolute' as 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  text: (size: number): React.CSSProperties => ({
    color: '#fff',
    fontSize: `${size * 0.22}px`,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  })
};

export default VideoProgressIndicator;