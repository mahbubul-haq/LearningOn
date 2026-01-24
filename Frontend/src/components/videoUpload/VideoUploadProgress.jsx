import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { colorTokens } from "../../theme";
import Fade from "@mui/material/Fade";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

const VideoUploadProgress = ({ uploadProgress }) => {
    const theme = useTheme();
    const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", aspectRatio: isMobileScreen ? "auto" : "16/9" }}>
            <Box
                sx={{
                    mx: "auto",
                    width: "100%",
                    maxWidth: '500px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: "2rem 1rem",
                    // Glassmorphism Styles

                    transition: 'all 0.5s ease',
                    ...theme.palette.glassCard,
                    cursor: 'pointer',
                }}
            >

                <Fade in={true}>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
                            <CloudUploadIcon sx={{ fontSize: 80, color: colorTokens.secondary.light, mr: 2 }} />
                            <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
                                Uploading...
                            </Typography>
                        </Box>

                        {/* Custom Liquid Progress Bar */}
                        <Box sx={{ position: 'relative', height: 24, borderRadius: 12, bgcolor: 'rgba(0,0,0,0.3)', overflow: 'hidden', mb: 2 }}>
                            <Box
                                sx={{
                                    width: `${Math.min(99, Math.round(uploadProgress))}%`,
                                    height: '100%',
                                    background: `linear-gradient(90deg, ${colorTokens.secondary.dark} 0%, ${colorTokens.secondary.lighter} 100%)`,
                                    transition: 'width 0.4s ease',
                                    boxShadow: `0 0 15px ${colorTokens.secondary.main}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    pr: 1
                                }}
                            />
                        </Box>

                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="h4" sx={{
                                background: `linear-gradient(to right, ${colorTokens.primary.lighter}, ${colorTokens.secondary.lighter})`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                fontWeight: 'bold'
                            }}>
                                {Math.min(99, Math.round(uploadProgress))}%
                            </Typography>

                            {/* Cancel Button */}
                            <IconButton size="small" onClick={() => console.log("cancel")} sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary', bgcolor: theme.palette.mode == 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' } }}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Fade >
                {/* <Box
                sx={{
                    position: "relative",
                }}
            >
                <CircularProgress
                    variant="determinate"
                    value={uploadProgress}
                    size={100}
                    sx={{
                        color: (theme) => theme.palette.grey.grey400,
                        // background: (theme) => theme.palette.grey.grey100,
                        borderRadius: "50%",
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "1.3rem",
                            color: (theme) => theme.palette.grey.grey400,
                        }}
                    >
                        {uploadProgress}%
                    </Typography>
                </Box>
            </Box>

            <Box>
                <Typography
                    sx={{
                        fontWeight: "600",
                        fontSize: "1.2rem",
                        color: (theme) => theme.palette.grey.grey400,
                    }}
                >
                    Uploading...
                </Typography>
            </Box> */}
            </Box >
        </Box>
    );
};

export default VideoUploadProgress;
