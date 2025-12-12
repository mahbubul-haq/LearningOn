import Box from "@mui/material/Box";
import { StyledButton } from "../StyledButton";
import {cloudinaryCld} from "../../configs/cloudinary.config";
import { AdvancedImage, lazyload, AdvancedVideo } from "@cloudinary/react";

const VideoUploadedFile = ({
    fileName,
    isImage,
    deleteVideo,
    deleting,
    setDeleting,
    uploadStatus,
    setUploadStatus,
    uploadStatusRef,
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
                    <AdvancedImage
                    plugins={[lazyload()]}
                    cldImg={cloudinaryCld.image(fileName)}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        // borderRadius: "50%",
                        opacity: deleting ? 0.3 : 1,
                        aspectRatio: "16/9",
                    }}
                />
                    // <img
                    //     src={`${import.meta.env.VITE_SERVER_URL
                    //         }/images/${fileName}`}
                    //     style={{
                    //         width: "100%",
                    //         height: "auto",
                    //         maxHeight: maxHeight,
                    //         objectFit: "cover",
                    //         aspectRatio: "16/9",
                    //         opacity: deleting ? 0.3 : 1,
                    //     }}
                    //     alt="preview"
                    // />
                ) : (
                    // <video
                    //     src={`${import.meta.env.VITE_SERVER_URL
                    //         }/images/${fileName}`}
                    //     style={{
                    //         width: "100%",
                    //         height: "auto",
                    //         maxHeight: maxHeight,
                    //         objectFit: "contain",
                    //         aspectRatio: "16/9",
                    //     }}
                    //     controls
                    // />
                    <AdvancedVideo
                    plugins={[lazyload()]}
                    cldVid={cloudinaryCld.video(fileName)}
                    style={{
                        width: "100%",
                        height: "auto",
                        
                        objectFit: "contain",
                        aspectRatio: "16/9",
                        opacity: deleting ? 0.3 : 1,
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
                        uploadStatusRef.current = "deleting";
                        setUploadStatus("deleting");
                        deleteVideo(fileName);

                        setDeleting(true);
                    }}
                >
                    Delete {isImage ? "Photo" : "Video"}
                </StyledButton>
            </Box>
        </Box>
    )
}

export default VideoUploadedFile