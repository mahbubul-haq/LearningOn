import React, { useEffect, useRef } from 'react'
import { Box, CircularProgress } from '@mui/material'
import Typography from '@mui/material/Typography'
import { cloudinaryCld } from '../../configs/cloudinary.config'
import { LearningCourseContext } from '../../state/LearningCourseContex'
import { AdvancedVideo, lazyload } from '@cloudinary/react'
import useTheme from '@mui/material/styles/useTheme'
import useMediaQuery from '@mui/material/useMediaQuery'

type VideoPlayerProps = {
    courseInfo: {
        lessons: {
            subLessons: {
                videoLink?: string,
                title?: string
            }[]
        }[]
    },
    openedLesson: {
        lesson: number,
        subLesson: number
    }
}

const VideoPlayer = ({ courseInfo, openedLesson }: VideoPlayerProps) => {
    const theme = useTheme()
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")
    const videoRef = useRef<AdvancedVideo | null>(null)
    const courseInfoRef = useRef<typeof courseInfo>(courseInfo)
    const openedLessonRef = useRef<typeof openedLesson>(openedLesson)

    useEffect(() => {
        console.log("video player re-rendered")
        if (courseInfoRef.current !== courseInfo) {
            console.log("course info changed")
        }
        if (openedLessonRef.current !== openedLesson) {
            console.log("opened lesson changed")
        }
    });



    useEffect(() => {
        if (!videoRef.current) return
        const video = videoRef.current.htmlVideoLayerInstance.videoElement;
        console.log(videoRef);
        const handleLoadMetadata = () => {
            console.log("Metadata loaded");
        }
        const handlePause = () => {
            console.log("Video paused");
        }
        const handlePlay = () => {
            console.log("Video played");
        }
        const handleEnded = () => {
            console.log("Video ended");
        }
        const handleTimeUpdate = () => {
            console.log("Video time updated");
        }

        video.addEventListener('loadmetadata', handleLoadMetadata);
        video.addEventListener('pause', handlePause);
        video.addEventListener('play', handlePlay);
        video.addEventListener('ended', handleEnded);
        video.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            video.removeEventListener('loadmetadata', handleLoadMetadata);
            video.removeEventListener('pause', handlePause);
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('ended', handleEnded);
            video.removeEventListener('timeupdate', handleTimeUpdate);
        }
    }, [])

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
            }}
        >

            <Box
                sx={{
                    width: "100%",
                    // maxHeight: "500px",
                    padding: "0.7rem 0.7rem 0.4rem 0.7rem",
                    ...theme.palette.glassMorphismCard,

                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontSize: isNonMobileScreens ? "1.3rem" : "1.1rem",
                        mb: "1rem",
                    }}
                >
                    <span
                        style={{
                            fontWeight: "bold",
                        }}
                    >
                        Lecture Video {openedLesson.lesson}.
                        {openedLesson.subLesson}
                    </span>
                    &nbsp;&nbsp;
                    {
                        courseInfo?.lessons[openedLesson.lesson - 1]?.subLessons[
                            openedLesson.subLesson - 1
                        ]?.title
                    }
                </Typography>
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "16 / 9",
                        padding: "0",
                        margin: "0",
                        borderRadius: "1rem",
                        overflow: "hidden"
                    }}
                >
                    <AdvancedVideo
                        ref={videoRef}
                        className="lecture-video"
                        cldVid={cloudinaryCld.video(
                            courseInfo?.lessons[openedLesson.lesson - 1]?.subLessons[
                                openedLesson.subLesson - 1
                            ]?.videoLink
                        )}
                        plugins={[lazyload()]}
                        style={{
                            width: "100%",
                            aspectRatio: "16 / 9",


                        }}
                        //add title and caption
                        title={
                            courseInfo?.lessons[openedLesson.lesson - 1]?.subLessons[
                                openedLesson.subLesson - 1
                            ]?.title
                        }
                        // add alt alternative for typscript


                        controls
                    >

                    </AdvancedVideo>
                    <Box sx={{
                        position: "absolute",
                        top: "1rem",
                        right: "1rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        ...theme.palette.glassMorphismCard,
                        background: "rgba(255, 255, 255, 0.3)",
                        padding: "0.5rem",
                        borderRadius: "100px",
                    }}>
                        <CircularProgress variant="determinate" value={75} thickness={5} sx={{
                            color: theme.palette.primary.main,
                            height: "5rem",
                            width: "5rem",
                            filter: "drop-shadow(0 0 5px rgba(0, 242, 254, 0.4))",
                            // filter: "drop-shadow(0 0 15px rgba(0, 242, 254, 1))",

                        }} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default React.memo(VideoPlayer)