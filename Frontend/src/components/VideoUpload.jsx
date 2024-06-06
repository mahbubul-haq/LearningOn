import React from "react";
import Box from "@mui/material/Box";
import Dropzone from "react-dropzone";
import axios from "axios";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { StyledButton } from "./StyledButton";

const VideoUpload = ({
    setFileName,
    fileName,
    isImage,
    uploadText = "Upload Video",
    maxHeight="400px" 
}) => {
    const [preview, setPreview] = React.useState(null);
    const [uploadProgress, setUploadProgress] = React.useState(0);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const token = useSelector((state) => state.token);

    const uploadVideo = async (fileToUpload) => {
        const formData = new FormData();

        formData.append("picture", fileToUpload);

        const options = {
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                let percent = Math.floor((loaded * 100) / total);
                //console.log(`${loaded}kb of ${total}kb | ${percent}%`);
                if (percent < 100) {
                    setUploadProgress(percent);
                }
            },
        };

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/fileupload`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "auth-token": token,
                    },
                    ...options,
                }
            );

            // console.log(res.data);

            if (res.data.success) {
                setUploadProgress(100);
                setFileName(res.data.fileName);

                setPreview(null);
            }
        } catch (err) {
            console.log(err);
            setUploadProgress(0);
            setFileName("");

            setPreview(null);
        }
    };

    const deleteVideo = async (fileName) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_SERVER_URL}/filedelete/${fileName}`,
                {
                    headers: {
                        "auth-token": token,
                    },
                }
            );

            //.log(res.data);

            setUploadProgress(0);
            setFileName("");

            setPreview(null);
        } catch (err) {
            console.log(err);
            setUploadProgress(0);
            setFileName("");

            setPreview(null);
        }
    };

    return (
        <>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                sx={{
                    zIndex: 1000,
                }}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity="error"
                    sx={{
                        width: "100%",

                        zIndex: 1000,
                        backgroundColor: (theme) =>
                            theme.palette.background.buttonBgLightPink,
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: "600",
                        }}
                    >
                        File type not supported!
                    </Typography>
                </Alert>
            </Snackbar>
            {fileName && fileName.length > 0 ? (
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
                                src={`${
                                    import.meta.env.VITE_SERVER_URL
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
                                src={`${
                                    import.meta.env.VITE_SERVER_URL
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
            ) : preview && uploadProgress < 100 ? (
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
                                    color: (theme) =>
                                        theme.palette.grey.grey400,
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
            ) : (
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
            )}
        </>
    );
};

export default VideoUpload;
