import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

const VideoUploadProgress = ({ uploadProgress }) => {
    return (
        <Box
            sx={{
                display: "flex",
                backgroundColor: "transparent",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                cursor: "pointer",
                padding: "2rem",
                gap: "1.2rem",
                borderRadius: "0.25rem",
                border: `2px dashed #ccc`,
                "&:hover": {
                    border: `2px dashed #aaa`,
                },
            }}
        >
            <Box
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
            </Box>
        </Box>
    );
};

export default VideoUploadProgress;
