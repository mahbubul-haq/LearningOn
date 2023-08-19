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
import VideoUpload from "../../components/VideoUpload";

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
        updateCourse,
    } = useContext(CreateCourseContext);
    const [addSkill, setAddSkill] = React.useState(false);
    const [skillName, setSkillName] = React.useState("");
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const theme = useTheme();

    useEffect(() => {
        console.log(courseState);
    }, [courseState]);

    useEffect(() => {
        updateCourse("draft");
    }, [courseState.courseThumbnail, courseState.introVideo]);

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

                <VideoUpload
                    setFileName={(fileName) => {
                        setCourseState({
                            ...courseState,
                            courseThumbnail: fileName,
                        });
                    }}
                    fileName={courseState.courseThumbnail}
                    isImage={true}
                    uploadText="Upload Thumbnail Image"
                />
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

                <VideoUpload
                    setFileName={(fileName) => {
                        setCourseState({
                            ...courseState,
                            introVideo: fileName,
                        });
                    }}
                    fileName={courseState.introVideo}
                    isImage={false}
                    uploadText="Upload Intro Video"
                />
            </Box>
        </Box>
    );
};

export default CourseMedia;
