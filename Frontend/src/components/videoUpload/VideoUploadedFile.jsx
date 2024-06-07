import Box from "@mui/material/Box";
import { StyledButton } from "../StyledButton";


const VideoUploadedFile = ({
    fileName,
    isImage,
    deleteVideo,
    maxHeight,

}) => {
    return (
        <Box
            sx={{
                position: "relative",
                height: "100%",
                width: "100%",

            }}
        >
            <Box
                sx={{
                    width: "100%",
                    mb: "0.5rem",
                    boxShadow: `0 0 0 1px #ccc inset`,
                }}
            >
                {isImage ? (
                    <img
                        src={`${import.meta.env.VITE_SERVER_URL
                            }/images/${fileName}`}
                        style={{
                            width: "100%",
                            height: "auto",
                            maxHeight: maxHeight,
                            objectFit: "cover",
                        }}
                        alt="preview"
                    />
                ) : (
                    <video
                        src={`${import.meta.env.VITE_SERVER_URL
                            }/images/${fileName}`}
                        style={{
                            width: "100%",
                            height: "auto",
                            maxHeight: maxHeight,
                            objectFit: "contain",
                        }}
                        controls
                    />
                )}
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                }}
            >
                <StyledButton
                    sx={{
                        "&&": {
                            background: (theme) =>
                                theme.palette.primary.light2,
                            "&:hover": {
                                background: (theme) =>
                                    theme.palette.primary.dark,
                            },
                        },
                    }}
                    onClick={() => {
                        deleteVideo(fileName);
                    }}
                >
                    Delete {isImage ? "Photo" : "Video"}
                </StyledButton>
            </Box>
        </Box>
    )
}

export default VideoUploadedFile