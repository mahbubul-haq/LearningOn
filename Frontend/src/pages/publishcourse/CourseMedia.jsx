import { useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import { useContext } from "react";
import Typography from "@mui/material/Typography";
import { CreateCourseContext } from "../../state/CreateCourse";
import VideoUpload from "../../components/videoUpload/VideoUpload";
import StyledTextField1 from "../../components/StyledTextField1";
import useMediaQuery from "@mui/material/useMediaQuery";
import { theme } from "@cloudinary/url-gen/actions/effect";

const CourseMedia = () => {

    const isMobileScreens = useMediaQuery("(max-width: 600px)");
    const {
        courseState,
        setCourseState,
        updateCourse,
        editMode,
        introVideoUrl,
        setIntroVideoUrl,
    } = useContext(CreateCourseContext);

    // useEffect(() => {
    //     console.log(courseState);
    // }, [courseState]);

    // useEffect(() => {
    //     if (
    //         editMode == "edit" &&
    //         courseState.courseThumbnail != "" &&
    //         courseState.introVideo != ""
    //     ) {
    //         updateCourse("published");
    //     } else if (editMode != "edit") {
    //         updateCourse("draft");
    //     }
    // }, [courseState.courseThumbnail, courseState.introVideo]);

    useEffect(() => {
        let element = document.querySelector(".right-panel-course-media");
        //console.log("media", element);
        if (element) {
            element.style.opacity = 1;
            element.style.transform = "translateY(0)";
        }
    }, []);

    return (
        <Box
            className="right-panel-course-media"
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
                    <InputLabel htmlFor="youtube-link">
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "600",
                                color: (theme) => theme.palette.grey.grey600,
                            }}
                        >
                            Course Intro Video (Youtube Link)
                        </Typography>
                    </InputLabel>
                </Box>

                <Box
                    sx={{
                        marginLeft: isMobileScreens ? "0rem" : "2rem",
                        mb: "1rem",
                        color: (theme) => theme.palette.grey.grey400,
                        
                    }}
                >
                    <Typography sx={{
                        color: (theme) => theme.palette.grey.grey600,
                        my: "1rem",
                    }}>
                        Upload your course intro video on Youtube and paste video url here.
                        Keep the video unlisted.
                    </Typography>

                    <details>
                        <summary style={{  color: (theme) => theme.palette.grey.grey600 }}>Click to see URL formats</summary>
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: "400",
                                color: (theme) => theme.palette.grey.grey400,
                                ml: '1rem',
                            }}
                        >
                            Any of the following url formats are accepted:
                        </Typography>
                        <ul
                            style={{
                                color: theme => theme.palette.grey.grey400,
                            }}
                        >
                            <li>https://www.youtube.com/watch?v=randomvideoID</li>
                            <li>https://youtu.be/randomvideoID</li>
                            <li>https://www.youtube.com/embed/randomvideoID</li>
                            <li>https://www.youtube.com/watch?v=randomvideoID&query=value</li>
                            <li>https://m.youtube.com/watch?v=randomvideoID</li>
                        </ul>
                    </details>


                </Box>

                <StyledTextField1
                    placeholder="Paste Youtube video link here"
                    id="youtube-link"
                    inputProps={{
                        maxLength: 200,
                    }}
                    // change font size of input
                    onChange={(event) => {
                        setIntroVideoUrl(event.target.value);
                    }}
                    value={
                        introVideoUrl
                    }
                    sx={{
                        p: 0,
                        "& .MuiInputBase-input": {
                            fontSize: "0.9rem",
                            letterSpacing: "0.01rem",
                            lineHeight: "1.5rem",
                            fontWeight: "400",

                            color: (theme) => theme.palette.grey.grey600,
                        },
                        width: "100%",
                    }}
                />

                <iframe
                    width="100%"
                    src={
                        "https://www.youtube.com/embed/" +
                        courseState.introVideo
                    }
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    style={{
                        marginTop: "1rem",
                        aspectRatio: "16/9",
                    }}
                />

                {/* <VideoUpload
                    setFileName={(fileName) => {
                        setCourseState({
                            ...courseState,
                            introVideo: fileName,
                        });
                    }}
                    fileName={courseState.introVideo}
                    isImage={false}
                    uploadText="Upload Intro Video"
                /> */}
            </Box>
        </Box>
    );
};

export default CourseMedia;
