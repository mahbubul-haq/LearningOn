import  { useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import { useContext } from "react";
import Typography from "@mui/material/Typography";
import { CreateCourseContext } from "../../state/CreateCourse";
import VideoUpload from "../../components/videoUpload/VideoUpload";

const CourseMedia = () => {
    const {
        courseState,
        setCourseState,
        updateCourse,
        editMode,
    } = useContext(CreateCourseContext);

    // useEffect(() => {
    //     console.log(courseState);
    // }, [courseState]);

    useEffect(() => {
        if (editMode == "edit" && courseState.courseThumbnail != "" && courseState.introVideo != "") {
            updateCourse("published");
        } else if (editMode != "edit") {
            updateCourse("draft");
        }
    }, [courseState.courseThumbnail, courseState.introVideo]);

    useEffect(() => {
        let element = document.querySelector(".right-panel-course-media");
        //console.log("media", element);
        if (element) {
            element.style.opacity = 1;
            element.style.transform = "translateY(0)";
        }
    }, []);

    return (
        <Box className="right-panel-course-media"
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "2.5rem",
                mt: "0rem",
                mb: "1rem",
                opacity: 0,
                transform: "translateY(4rem)",
                transition: "opacity 0.5s, transform 0.5s",
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
