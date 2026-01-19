import Dropzone from "react-dropzone";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { StyledButton } from "../StyledButton";
import { colorTokens } from "../../theme";
import Fade from "@mui/material/Fade";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";

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
    return (
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
                        display: "flex",
                        backgroundColor: "transparent",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                        aspectRatio: "16/9",
                        cursor: "pointer",
                        padding: "2rem",
                        gap: "1.5rem",
                        borderRadius: "0.25rem",
                        border: `2px dashed ${colorTokens.grey.ccc}`,
                        "&:hover": {
                            border: `2px dashed ${colorTokens.grey.aaa}`,
                        },
                    }}
                >
                    <input {...getInputProps()} />
                    {/* <Box
                        sx={{
                            width: '100%',
                            minHeight: '600px', // Adjust as needed
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                            // The Dark Void Background
                            backgroundColor: colorTokens.primary.darker,
                            // The Floating Mesh Orbs
                            backgroundImage: `
          radial-gradient(at 10% 10%, ${colorTokens.primary.main} 0px, transparent 50%),
          radial-gradient(at 90% 10%, ${colorTokens.secondary.main} 0px, transparent 40%),
          radial-gradient(at 90% 90%, ${colorTokens.primary.dark} 0px, transparent 50%)
        `,
                        }}
                    > */}

                    {/* --- 4. The Glass Card --- */}
                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: '500px',
                            minHeight: '320px',
                            p: 4,
                            borderRadius: '24px',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            // Glassmorphism Styles
                            background: 'rgba(31, 15, 85, 0.4)', // Semi-transparent dark
                            backdropFilter: 'blur(16px)',
                            border: `1px solid rgba(145, 120, 230, 0.3)`, // Subtle border
                            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                            transition: 'all 0.5s ease',
                        }}
                    >
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

                                <Typography variant="h5" sx={{ color: '#fff', fontWeight: 'bold', mb: 1 }}>
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
                </Box>
                // </Box>
            )}
        </Dropzone>
    )
}

export default VideoUploadDropzone