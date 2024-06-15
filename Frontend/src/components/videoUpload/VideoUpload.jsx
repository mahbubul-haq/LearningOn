import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import VideoUploadProgress from "./VideoUploadProgress";
import VideoUploadDropzone from "./VideoUploadDropzone";
import VideoUploadedFile from "./VideoUploadedFile";

const VideoUpload = ({
  updateCallBack,
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
  const token = useSelector((state) => state.token);
  const initialRender = useRef(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!updateCallBack) return;
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    async function updateResource() {
      await updateCallBack();

      setWaitingFile(fileName);

      if (fileName.length > 0) {
        setPreview(null);
        setUploadProgress(100);
        setOpenSnackbar(true);
        setSnackbarMessage("File uploaded successfully!");
        setSnackbarSeverity("success");
      } else {
        setUploadProgress(0);
        setPreview(null);
        setDeleting(false);
        setOpenSnackbar(true);
        setSnackbarMessage("File Deleted!");
        setSnackbarSeverity("error");
      }
    }
    updateResource();
  }, [fileName]);

  const uploadVideo = async (fileToUpload) => {
    const formData = new FormData();

    formData.append("picture", fileToUpload);
    formData.append("isVideo", isImage ? "false" : "true");

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        //console.log(`${loaded}kb of ${total}kb | ${percent}%`);
        if (percent <= 100) {
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
        setFileName(res.data.fileName);

        //   setUploadProgress(100);
        //   setWaitingFile(res.data.fileName);
        //   setPreview(null);
      } else {
        if (fileName === "") {
          setOpenSnackbar(true);
          setSnackbarMessage("File upload failed!");
          setSnackbarSeverity("error");
          setPreview(null);
        }
        setFileName("");
      }
    } catch (err) {
      console.log(err);
      //   setUploadProgress(0);
      if (fileName === "") {
        setOpenSnackbar(true);
        setSnackbarMessage("File upload failed!");
        setSnackbarSeverity("error");
        setPreview(null);
      }
      setFileName("");
      //   setWaitingFile("");
      //   setPreview(null);
    }
  };

  const deleteVideo = async (fileName) => {
    try {
      let modifiedFileName = fileName.replace(/\//g, "@");
      console.log(modifiedFileName);
      const res = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/filedelete/${modifiedFileName}/${isImage ? "false" : "true"}`,
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      //.log(res.data);
      if (res.data.success) {
       // console.log("deleted", res.data);
        setFileName("");
      } else {
        setFileName(""); //
      }
    } catch (err) {
      console.log(err);
      //   setUploadProgress(0);
      setFileName("");

      //   setPreview(null);
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
        }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{
            width: "100%",

            zIndex: 1000,
            backgroundColor: snackbarSeverity == "error" ? (theme) =>
              theme.palette.background.buttonBgLightPink : (theme) => theme.palette.background.bottom,
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
        />
      )}
    </>
  );
};

export default VideoUpload;
