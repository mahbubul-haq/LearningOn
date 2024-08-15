import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import VideoUploadDropzone from "./VideoUploadDropzone";
import VideoUploadedFile from "./VideoUploadedFile";
import VideoUploadProgress from "./VideoUploadProgress";

const VideoUpload = ({
    setFileName,
    fileName,
    isImage,
    uploadText = "Upload Video",
    maxHeight = "400px"
}) => {
    const [preview, setPreview] = React.useState(null);
    const [uploadProgress, setUploadProgress] = React.useState(0);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const token = useSelector((state) => state.auth.token);

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
                <VideoUploadedFile
                    fileName={fileName}
                    isImage={isImage}
                    deleteVideo={deleteVideo}
                    maxHeight={maxHeight}
                />
            ) : preview && uploadProgress < 100 ? (
                <VideoUploadProgress uploadProgress={uploadProgress} />
            ) : (
                <VideoUploadDropzone
                    setPreview={setPreview}
                    uploadVideo={uploadVideo}
                    isImage={isImage}
                    setOpenSnackbar={setOpenSnackbar}
                    uploadText={uploadText}
                />
            )}
        </>
    );
};

export default VideoUpload;
