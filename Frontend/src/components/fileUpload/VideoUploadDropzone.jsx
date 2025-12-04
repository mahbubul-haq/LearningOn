import Dropzone from "react-dropzone";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { StyledButton } from "../StyledButton";


const VideoUploadDropzone = ({
    setPreview,
    uploadVideo,
    isImage,
    setOpenSnackbar,
    uploadText
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
                } else {
                    setPreview(URL.createObjectURL(acceptedFiles[0]));

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
                        cursor: "pointer",
                        padding: "2rem",
                        gap: "1.5rem",
                        borderRadius: "0.25rem",
                        border: `2px dashed #ccc`,
                        "&:hover": {
                            border: `2px dashed #aaa`,
                        },
                    }}
                >
                    <input {...getInputProps()} />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            backgroundColor: (theme) =>
                                theme.palette.grey.grey100,
                            color: (theme) =>
                                theme.palette.grey.grey500,
                            "&:hover": {
                                color: (theme) =>
                                    theme.palette.grey.grey800,
                            },
                            padding: "1rem",
                            borderRadius: "50%",
                        }}
                    >
                        <FileUploadIcon
                            sx={{
                                fontSize: "4rem",
                            }}
                        />
                    </Box>
                    <Box>
                        <StyledButton
                            sx={{
                                textTransform: "capitalize",
                                fontWeight: "600",

                                cursor: "pointer",
                                "&&": {
                                    borderRadius: "0",
                                    padding: "0.4rem 0.8rem",
                                    fontWeight: "600",
                                    background: (theme) =>
                                        theme.palette.primary.light2,
                                    color: (theme) =>
                                        theme.palette.text.primary,
                                    "&:hover": {
                                        background: (theme) =>
                                            theme.palette.primary.dark,
                                    },
                                },
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: "600",
                                }}
                            >
                                {uploadText}
                            </Typography>
                        </StyledButton>
                    </Box>
                </Box>
            )}
        </Dropzone>
    )
}

export default VideoUploadDropzone