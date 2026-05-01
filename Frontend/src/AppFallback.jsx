import { Box, Typography, keyframes } from "@mui/material";
import { useLocation } from "react-router-dom";
import useTheme from "@mui/material/styles/useTheme";
import { colorTokens } from "./theme";

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { 
    opacity: 0.6; 
    transform: scale(1); 
    box-shadow: 0 0 10px ${colorTokens.primary.light}; 
  }
  50% { 
    opacity: 1; 
    transform: scale(1.1); 
    box-shadow: 0 0 25px ${colorTokens.primary.light}; 
  }
`;

const AppFallback = () => {
    const location = useLocation();
    const path = location.pathname;
    const theme = useTheme();

    const getStatusText = () => {
        if (path === "/") return "INITIALIZING INTERFACE";
        if (path.includes("/quiz")) return "LOADING QUIZ DATA";
        if (path.includes("/learning")) return "LOADING COURSE MODULES";
        if (path.startsWith("/course/")) return "LOADING COURSE DATA";
        if (path === "/courses") return "LOADING COURSES";
        if (path.includes("/profile")) return "LOADING PROFILE INFO";
        if (path.includes("/dashboard")) return "LOADING DASHBOARD";
        return "SYNCING SYSTEM DATA";
    };

    return (
        <Box sx={{
            zIndex: 9999999,
            height: "100vh", width: "100vw", display: "flex", flexDirection: "column",
            justifyContent: "center", alignItems: "center",
            bgcolor: theme.palette.background.default,
            backgroundImage: theme.palette.mode === 'dark'
                ? `radial-gradient(circle at 15% 15%, rgba(138, 43, 226, 0.15), transparent 40%), radial-gradient(circle at 85% 85%, rgba(255, 0, 128, 0.1), transparent 40%)`
                : `radial-gradient(circle at 15% 15%, rgba(138, 43, 226, 0.05), transparent 40%), radial-gradient(circle at 85% 85%, rgba(255, 0, 128, 0.05), transparent 40%)`,
        }}>
            {/* Three Orbitals + Inner Circle */}
            <Box sx={{ position: "relative", width: { xs: 80, md: 110 }, height: { xs: 80, md: 110 }, mb: 5 }}>
                {[1.4, 2, 2.6].map((speed, i) => (
                    <Box key={i} sx={{
                        position: "absolute", inset: i * 10, borderRadius: "50%",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                        borderTopColor: i % 2 === 0 ? colorTokens.primary.main : colorTokens.secondary.main,
                        animation: `${rotate} ${speed}s linear infinite ${i % 2 === 0 ? "" : "reverse"}`,
                        boxShadow: `0 0 10px ${i % 2 === 0 ? 'rgba(138, 43, 226, 0.2)' : 'rgba(255, 0, 128, 0.2)'}`
                    }} />
                ))}
                {/* THE INNER CIRCLE */}
                <Box sx={{
                    position: "absolute", inset: "35%", borderRadius: "50%",
                    background: `linear-gradient(135deg, ${colorTokens.primary.main}, ${colorTokens.secondary.main})`,
                    animation: `${pulse} 2s infinite ease-in-out`,
                }} />
            </Box>

            {/* Dynamic Text */}
            <Box sx={{ textAlign: "center" }}>
                <Typography sx={{
                    color: theme.palette.text.primary,
                    letterSpacing: 4,
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    mb: 2,
                    textTransform: "uppercase",
                    opacity: 0.9
                }}>
                    {getStatusText()}
                </Typography>

                {/* Scan Bar */}
                <Box sx={{
                    width: "200px",
                    height: "2px",
                    bgcolor: theme.palette.mode === 'dark' ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                    mx: "auto",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "10px"
                }}>
                    <Box sx={{
                        width: "40%",
                        height: "100%",
                        background: `linear-gradient(90deg, transparent, ${colorTokens.primary.main}, transparent)`,
                        position: "absolute",
                        animation: "scan 1.5s infinite ease-in-out",
                        "@keyframes scan": { "0%": { left: "-40%" }, "100%": { left: "100%" } },
                    }} />
                </Box>
            </Box>
        </Box>
    );
};

export default AppFallback;