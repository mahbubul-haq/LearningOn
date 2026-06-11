import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import VideoUploadDropzone from "./VideoUploadDropzone";
import VideoUploadedFile from "./VideoUploadedFile";
import VideoUploadProgress from "./VideoUploadProgress";
import { apiFetch } from "../../api/apiFetch";

const VideoUpload = ({
  updateCallBack,
  uploadHandler,
  deleteHandler,
  setFileName,
  fileName,
  isImage,
  uploadText = "Upload Video",
  maxHeight = "400px",
}) => {
  const [preview, setPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [waitingFile, setWaitingFile] = useState(fileName);
  const token = useSelector((state) => state.auth.token);
  const initialRender = useRef(true);
  const [deleting, setDeleting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const uploadStatusRef = useRef(uploadStatus);
  const usesPersistedUpload = Boolean(uploadHandler);

  useEffect(() => {
    uploadStatusRef.current = uploadStatus;
  }, [uploadStatus]);

  useEffect(() => {
    setWaitingFile(fileName);
  }, [fileName]);

  useEffect(() => {
    if (usesPersistedUpload || !updateCallBack) return;
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    async function updateResource() {
      let res;

      if (uploadStatusRef.current !== "") res = await updateCallBack();

      if (!res?.success) return;

      setWaitingFile(fileName);

      if (fileName.length > 0 && uploadStatusRef.current !== "") {
        setPreview(null);
        setUploadProgress(100);
        setOpenSnackbar(true);
        setSnackbarMessage("File uploaded successfully!");
        setSnackbarSeverity("success");
        uploadStatusRef.current = "";
        setUploadStatus("");
      } else if (uploadStatusRef.current !== "") {
        setUploadProgress(0);
        setPreview(null);
        setDeleting(false);
        setOpenSnackbar(true);
        setSnackbarMessage("File Deleted!");
        setSnackbarSeverity("error");
        uploadStatusRef.current = "";
        setUploadStatus("");
      }
    }
    updateResource();
  }, [fileName, updateCallBack, usesPersistedUpload]);

  const showUploadSuccess = () => {
    setPreview(null);
    setUploadProgress(100);
    setOpenSnackbar(true);
    setSnackbarMessage("File uploaded successfully!");
    setSnackbarSeverity("success");
    uploadStatusRef.current = "";
    setUploadStatus("");
  };

  const showUploadFailure = () => {
    setOpenSnackbar(true);
    setSnackbarMessage("File upload failed!");
    setSnackbarSeverity("error");
    setPreview(null);
  };

  const showDeleteSuccess = () => {
    setUploadProgress(0);
    setPreview(null);
    setDeleting(false);
    setOpenSnackbar(true);
    setSnackbarMessage("File Deleted!");
    setSnackbarSeverity("error");
    uploadStatusRef.current = "";
    setUploadStatus("");
  };

  const showDeleteFailure = () => {
    setUploadProgress(0);
    setPreview(null);
    setDeleting(false);
    setOpenSnackbar(true);
    setSnackbarMessage("File Deletion Failed!");
    setSnackbarSeverity("error");
    uploadStatusRef.current = "";
    setUploadStatus("");
  };

  const uploadVideo = async (fileToUpload) => {
    const progressOptions = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percent = Math.floor((loaded * 100) / total);
        if (percent <= 100) {
          setUploadProgress(percent);
        }
      },
    };

    try {
      let data;

      data = await uploadHandler(fileToUpload, progressOptions);
      console.log("upload video response", data);

      if (data?.success) {
        setFileName(data.fileName);
        setWaitingFile(data.fileName ?? "");
        showUploadSuccess();
      } else {
        if (fileName === "") {
          showUploadFailure();
        }
        setFileName("");
      }
    } catch (err) {
      console.log(err);
      if (fileName === "") {
        showUploadFailure();
      }
      setFileName("");
    }
  };

  const deleteVideo = async (currentFileName) => {
    try {
      const data = await deleteHandler(currentFileName);
      if (data?.success) {
        setFileName("");
        setWaitingFile("");
        if (usesPersistedUpload) {
          showDeleteSuccess();
        }
      } else {
        showDeleteFailure();
      }
    } catch (err) {
      console.log(err);
      showDeleteFailure();
    }
  };

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          zIndex: 10000,
          position: "fixed",
        }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{
            width: "100%",
            zIndex: 1000,
            backgroundColor:
              snackbarSeverity == "error"
                ? (theme) => theme.palette.background.buttonBgLightPink
                : (theme) => theme.palette.background.bottom,
          }}
        >
          <Typography
            sx={{
              fontWeight: "600",
            }}
          >
            {snackbarMessage}
          </Typography>
        </Alert>
      </Snackbar>
      {waitingFile && waitingFile.length > 0 ? (
        <VideoUploadedFile
          fileName={isImage ? waitingFile : fileName}
          isImage={isImage}
          deleteVideo={deleteVideo}
          maxHeight={maxHeight}
          deleting={deleting}
          setDeleting={setDeleting}
          uploadStatus={uploadStatus}
          setUploadStatus={setUploadStatus}
          uploadStatusRef={uploadStatusRef}
        />
      ) : preview ? (
        <VideoUploadProgress uploadProgress={uploadProgress} />
      ) : (
        <VideoUploadDropzone
          setPreview={setPreview}
          uploadVideo={uploadVideo}
          isImage={isImage}
          setOpenSnackbar={setOpenSnackbar}
          uploadText={uploadText}
          setSnackbarMessage={setSnackbarMessage}
          setSnackbarSeverity={setSnackbarSeverity}
          uploadStatus={uploadStatus}
          setUploadStatus={setUploadStatus}
          uploadStatusRef={uploadStatusRef}
        />
      )}
    </>
  );
};

export default React.memo(VideoUpload);
