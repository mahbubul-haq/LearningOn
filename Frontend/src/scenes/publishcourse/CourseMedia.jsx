import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { GlobalContext } from "../../state/GlobalContext";
import { useContext } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import StyledTextField from "../../components/StyledInputField";
import StyledTextField1 from "../../components/StyledInputField1";
import { CreateCourseContext } from "../../state/CreateCourse";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import axios from "axios";
import { useTheme } from "@emotion/react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import { StyledButton } from "../../components/StyledButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Dropzone from "react-dropzone";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { Alert, Snackbar } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const CourseMedia = () => {
    const { categoriesWithLabel } = useContext(GlobalContext);
    const [uploading, setUploading] = React.useState(false);
    const {
        courseState,
        setCourseState,
        setIntroVideoInput,
        introVideoInput,
        setCourseThumbnailInput,
        courseThumbnailInput,
        uploadFile,
        uploadProgress,
        setUploadProgress,
    } = useContext(CreateCourseContext);
    const [addSkill, setAddSkill] = React.useState(false);
    const [skillName, setSkillName] = React.useState("");
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const theme = useTheme();

    useEffect(() => {
        console.log(courseState);
    }, [courseState]);

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "2.5rem",
                mt: "0rem",
                mb: "1rem",
            }}
        >
            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity="error"
                    sx={{
                        width: "100%",

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
            <Box>
                <Box
                    sx={{
                        mb: "0.5rem",
                    }}
                >
                    <InputLabel htmlFor="thumbnail">
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "600",

                                color: (theme) => theme.palette.grey.grey600,
                            }}
                        >
                            Course Thumbnail
                        </Typography>
                    </InputLabel>
                </Box>

                <Dropzone
                    acceptedFiles=".png,.jpg,.jpeg"
                    id = "thumbnail"
                    onDrop={(acceptedFiles) => {
                        setUploading(false);
                        console.log(acceptedFiles);
                        // setFieldValue("picture", acceptedFiles[0]);
                        // check extionsion of file
                        const types = ["image/png", "image/jpg", "image/jpeg"];
                        if (types.includes(acceptedFiles[0]?.type)) {
                            setCourseThumbnailInput(acceptedFiles[0]);
                            uploadFile(
                                "courseThumbnail",
                                acceptedFiles[0],
                                courseState.courseThumbnail
                            );
                            setCourseState({
                                ...courseState,
                                courseThumbnail: "",
                            });
                        } else {
                            setOpenSnackbar(true);
                        }
                    }}
                >
                    {({ getRootProps, getInputProps }) => (
                        <Box
                            {...getRootProps()}
                            sx={{
                                border: `2px dashed ${theme.palette.grey.grey300}`,
                                height: "20rem",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "1rem",
                                cursor: "pointer",
                            }}
                        >
                            <input {...getInputProps()} />

                            {courseState.courseThumbnail ||
                            courseThumbnailInput ? (
                                <>
                                    <img
                                        src={
                                            !courseState.courseThumbnail
                                                ? URL.createObjectURL(
                                                      courseThumbnailInput
                                                  )
                                                : `${
                                                      import.meta.env
                                                          .VITE_REACT_APP_URL
                                                  }/images/${
                                                      courseState.courseThumbnail
                                                  }`
                                        }
                                        alt="course thumbnail"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </>
                            ) : (
                                <>
                                    <Box>
                                        <CloudUploadIcon
                                            sx={{
                                                fontSize: "5rem",
                                                color: (theme) =>
                                                    theme.palette.grey.grey800,
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
                                                        theme.palette.primary
                                                            .light2,
                                                    color: (theme) =>
                                                        theme.palette.text
                                                            .primary,
                                                    "&:hover": {
                                                        background: (theme) =>
                                                            theme.palette
                                                                .primary.dark,
                                                    },
                                                },
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: "600",
                                                    pr: "0.5rem",
                                                }}
                                            >
                                                Upload Course Thumbnail
                                            </Typography>
                                        </StyledButton>
                                    </Box>
                                </>
                            )}
                        </Box>
                    )}
                </Dropzone>
            </Box>

            <Box
                sx={{
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        mb: "0.5rem",
                    }}
                >
                    <InputLabel htmlFor="title-combo-box">
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "600",
                                color: (theme) => theme.palette.grey.grey600,
                            }}
                        >
                            Course Intro Video
                        </Typography>
                    </InputLabel>
                </Box>
                <Dropzone
                    acceptedFiles=".mp4,.mkv,.avi"
                    onDrop={(acceptedFiles) => {
                        setUploading(true);
                        console.log(acceptedFiles);
                        // setFieldValue("picture", acceptedFiles[0]);
                        const types = ["video/mp4", "video/mkv", "video/avi"];
                        if (types.includes(acceptedFiles[0]?.type)) {
                            setIntroVideoInput(acceptedFiles[0]);
                            uploadFile(
                                "introVideo",
                                acceptedFiles[0],
                                courseState.introVideo
                            );
                            setCourseState({
                                ...courseState,
                                introVideo: "",
                            });
                        } else {
                            setOpenSnackbar(true);
                        }
                    }}
                >
                    {({ getRootProps, getInputProps }) => (
                        <Box
                            {...getRootProps()}
                            sx={{
                                border: `2px dashed ${theme.palette.grey.grey300}`,
                                height: "30rem",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "1rem",
                                cursor: "pointer",
                                position: "relative",
                            }}
                        >
                            {uploadProgress >= 0 && uploadProgress < 100 && uploading && (
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: "0",
                                        left: "0",
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "1rem",
                                        background: theme.palette.grey.grey100,
                                        opacity: "1",
                                        zIndex: "10",
                                    }}
                                >
                                    <CircularProgress
                                        variant="determinate"
                                        value={uploadProgress}
                                        size="3rem"
                                        sx={{
                                            color: (theme) =>
                                                theme.palette.primary.dark,
                                            fontSize: "3rem",
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            color: (theme) =>
                                                theme.palette.text.primary,
                                            fontWeight: "600",
                                            fontSize: "2rem",
                                        }}
                                    >
                                        {uploadProgress}%
                                    </Typography>
                                </Box>
                            )}
                            <input {...getInputProps()} />

                            {courseState.introVideo || introVideoInput ? (
                                <>
                                    <video
                                        src={
                                            !courseState.introVideo
                                                ? URL.createObjectURL(
                                                      introVideoInput
                                                  )
                                                : `${
                                                      import.meta.env
                                                          .VITE_REACT_APP_URL
                                                  }/images/${
                                                      courseState.introVideo
                                                  }`
                                        }
                                        controls
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain",
                                        }}
                                    />
                                </>
                            ) : (
                                <>
                                    <Box>
                                        <CloudUploadIcon
                                            sx={{
                                                fontSize: "5rem",
                                                color: (theme) =>
                                                    theme.palette.grey.grey800,
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
                                                        theme.palette.primary
                                                            .light2,
                                                    color: (theme) =>
                                                        theme.palette.text
                                                            .primary,
                                                    "&:hover": {
                                                        background: (theme) =>
                                                            theme.palette
                                                                .primary.dark,
                                                    },
                                                },
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: "600",
                                                    pr: "0.5rem",
                                                }}
                                            >
                                                Upload Intro Video
                                            </Typography>
                                        </StyledButton>
                                    </Box>
                                </>
                            )}
                        </Box>
                    )}
                </Dropzone>
            </Box>
        </Box>
    );
};

export default CourseMedia;
