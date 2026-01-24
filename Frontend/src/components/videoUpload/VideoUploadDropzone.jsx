import Dropzone from "react-dropzone";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { StyledButton } from "../StyledButton";
import { colorTokens } from "../../theme";
import Fade from "@mui/material/Fade";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

const VideoUploadDropzone = ({
    setPreview,
    uploadVideo,
    isImage,
    setOpenSnackbar,
    uploadText,
    setSnackbarMessage,
    setSnackbarSeverity,
    uploadStatus,
    setUploadStatus,
    uploadStatusRef,
}) => {
    const theme = useTheme();
    const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%", alignItems: "center", aspectRatio: isMobileScreen ? "auto" : "16/9" }}>
            <Dropzone
                onDrop={(acceptedFiles) => {
                    let types;
                    if (isImage) {
                        types = [
                            "image/png",
                            "image/jpeg",
                            "image/jpg",
                            "image/webp",
                        ];
                    } else {
                        types = ["video/mp4", "video/mkv", "video/avi"];
                    }

                    if (
                        types.every(
                            (type) => acceptedFiles[0].type !== type
                        )
                    ) {
                        setOpenSnackbar(true);
                        setSnackbarMessage("Invalid file type");
                        setSnackbarSeverity("error");
                    } else if (isImage && acceptedFiles[0].size > 1000000) {
                        setOpenSnackbar(true);
                        setSnackbarMessage("File size must be less than 1MB");
                        setSnackbarSeverity("error");
                    }
                    else if (!isImage && acceptedFiles[0].size > 500000000) {
                        setOpenSnackbar(true);
                        setSnackbarMessage("File size must be less than 500MB");
                        setSnackbarSeverity("error");
                    }
                    else {
                        setPreview(URL.createObjectURL(acceptedFiles[0]));
                        uploadStatusRef.current = "uploading";
                        setUploadStatus("uploading");
                        uploadVideo(acceptedFiles[0]);
                    }
                }}
                multiple={false}
            >
                {({ getRootProps, getInputProps }) => (

                    <Box
                        {...getRootProps()}
                        sx={{
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
                        <input {...getInputProps()} />
                        <Fade in={true}>
                            <Box sx={{ textAlign: 'center', width: '100%' }}>
                                {/* Glowing Icon */}
                                <CloudUploadIcon
                                    sx={{
                                        fontSize: 80,
                                        color: 'transparent',
                                        // Neon stroke effect trick
                                        stroke: colorTokens.primary.lighter,
                                        strokeWidth: 1,
                                        filter: `drop-shadow(0 0 10px ${colorTokens.primary.main})`,
                                        mb: 2
                                    }}
                                />

                                <Typography variant="h5" sx={{ color: "text.primary", fontWeight: 'bold', mb: 1 }}>
                                    Drag & Drop your video
                                </Typography>
                                <Typography variant="body2" sx={{ color: colorTokens.primary.lighter, mb: 4 }}>
                                    or browse files from your computer
                                </Typography>

                                {/* Gradient Button */}
                                <Button
                                    variant="contained"
                                    component="label"
                                    sx={{
                                        background: `linear-gradient(135deg, ${colorTokens.primary.main} 0%, ${colorTokens.secondary.main} 100%)`,
                                        borderRadius: '50px',
                                        padding: '10px 32px',
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                        boxShadow: `0 4px 15px ${colorTokens.secondary.dark}66`,
                                        '&:hover': {
                                            boxShadow: `0 6px 20px ${colorTokens.secondary.main}66`,
                                        }
                                    }}
                                >
                                    Browse Files
                                </Button>
                            </Box>
                        </Fade>
                    </Box>

                )}
            </Dropzone>
        </Box>
    )
}

export default VideoUploadDropzone