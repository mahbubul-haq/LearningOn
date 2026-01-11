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
            height: "100vh", width: "100vw", display: "flex", flexDirection: "column",
            justifyContent: "center", alignItems: "center",
            background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.main} 100%)`,
            backdropFilter: "blur(20px)",

        }}>
            {/* Three Orbitals + Inner Circle */}
            <Box sx={{ position: "relative", width: { xs: 80, md: 110 }, height: { xs: 80, md: 110 }, mb: 5 }}>
                {[1.4, 2, 2.6].map((speed, i) => (
                    <Box key={i} sx={{
                        position: "absolute", inset: i * 10, borderRadius: "50%",
                        border: "2px solid transparent",
                        borderTopColor: i % 2 === 0 ? colorTokens.primary.light : colorTokens.secondary.light,
                        animation: `${rotate} ${speed}s linear infinite ${i % 2 === 0 ? "" : "reverse"}`,
                    }} />
                ))}
                {/* THE INNER CIRCLE */}
                <Box sx={{
                    position: "absolute", inset: "35%", borderRadius: "50%",
                    bgcolor: colorTokens.primary.light,
                    animation: `${pulse} 2s infinite ease-in-out`
                }} />
            </Box>

            {/* Dynamic Text */}
            <Box sx={{ textAlign: "center" }}>
                <Typography sx={{
                    color: colorTokens.primary.light,
                    letterSpacing: 4,
                    fontWeight: 500,
                    fontSize: "0.85rem",
                    mb: 2
                }}>
                    {getStatusText()}
                </Typography>

                {/* Scan Bar */}
                <Box sx={{
                    width: "200px",
                    height: "1px",
                    bgcolor: `rgba(107, 79, 217, ${colorTokens.opacity[10]})`,
                    mx: "auto",
                    position: "relative",
                    overflow: "hidden"
                }}>
                    <Box sx={{
                        width: "40%",
                        height: "100%",
                        bgcolor: colorTokens.primary.light,
                        position: "absolute",
                        animation: "scan 1.5s infinite linear",
                        "@keyframes scan": { "0%": { left: "-40%" }, "100%": { left: "100%" } }
                    }} />
                </Box>
            </Box>
        </Box>
    );
};

export default AppFallback;