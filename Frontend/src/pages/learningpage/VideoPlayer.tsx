import React, { useEffect, useRef, useContext, useState, useMemo, forwardRef } from 'react'
import { Box, CircularProgress } from '@mui/material'
import Typography from '@mui/material/Typography'
import { cloudinaryCld } from '../../configs/cloudinary.config'
import { LearningCourseContext } from '../../state/LearningCourseContex'
import { AdvancedVideo, lazyload } from '@cloudinary/react'
import useTheme from '@mui/material/styles/useTheme'
import useMediaQuery from '@mui/material/useMediaQuery'
import { syncCourseProgress, updateProgress, updateWatchTime } from '../../state/reduxStore/learningPageSlice'
import { useAppDispatch } from '../../state/reduxStore/hooks'
import { useSelector } from 'react-redux'
import VideoProgressIndicator from './VideoProgressIndicator'

type VideoPlayerProps = {
    courseInfo: {
        _id: string,
        lessons: {
            _id: string,
            subLessons: {
                videoLink?: string,
                title?: string
                _id: string
            }[]
        }[]
    },
    openedLesson: {
        lesson: number,
        subLesson: number
    }
    courseProgress: any

}

const videoStyle = {
    width: "100%",
    aspectRatio: "16 / 9",
};
const videoPlugins = [lazyload()];

const MemoizedVideo = React.memo(forwardRef((props: any, ref: any) => {
    return (
        <AdvancedVideo
            ref={ref}
            className="lecture-video"
            cldVid={props.cldVid}
            plugins={props.plugins}
            style={props.style}
            title={props.title}
            controls
        />
    )
}))

const VideoPlayer = ({ courseInfo, openedLesson, courseProgress }: VideoPlayerProps) => {
    const theme = useTheme()
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")
    const videoRef = useRef<AdvancedVideo | null>(null);
    const [lessonId, setLessonId] = useState<string>(courseInfo?.lessons[openedLesson.lesson - 1]?._id?.toString() || "")
    const [subLessonId, setSubLessonId] = useState<string>(courseInfo?.lessons[openedLesson.lesson - 1]?.subLessons[openedLesson.subLesson - 1]?._id?.toString() || "")
    const currentTimeRef = useRef<number>(0);
    const lastWatchTimeRef = useRef<number>(0);
    const isPausedRef = useRef<boolean>(true);
    const watchTimeRef = useRef<number>(0);
    const completedRef = useRef<boolean>(false);
    const dispatch = useAppDispatch();
    const token = useSelector((state: any) => state.auth.token);
    const [progress, setProgress] = useState<number>(0);
    // const initialRender = useRef<boolean>(true);
    const [progressIndicatorOpacity, setProgressIndicatorOpacity] = useState<number>(1);

    useEffect(() => {
        console.log("re - render");
        console.log("progressIndicatorOpacity", progressIndicatorOpacity);
    }, [progressIndicatorOpacity]);

    useEffect(() => {
        setLessonId(courseInfo?.lessons[openedLesson.lesson - 1]?._id?.toString() || "")
        setSubLessonId(courseInfo?.lessons[openedLesson.lesson - 1]?.subLessons[openedLesson.subLesson - 1]?._id?.toString() || "")
    }, [openedLesson]);


    function getProgress(): number {
        //console.log("getProgress", videoRef.current?.htmlVideoLayerInstance.videoElement.duration);

        if (!videoRef.current?.htmlVideoLayerInstance.videoElement.duration) return 0;
        return Math.min(100, (watchTimeRef.current / (videoRef.current?.htmlVideoLayerInstance.videoElement.duration * 0.9)) * 100);
    }

    function getCurrentTime(): number {
        let currentTime = 0;
        console.log("currentTime", lessonId, subLessonId, courseProgress)
        courseProgress?.lessonsProgress?.forEach((lessonProgress: any) => {
            if (lessonProgress.lessonId == lessonId) {
                lessonProgress.subLessonsProgress?.forEach((subLessonProgress: any) => {
                    if (subLessonProgress.subLessonId == subLessonId) {
                        currentTimeRef.current = subLessonProgress.currentTime;
                        watchTimeRef.current = subLessonProgress.watchTime;
                        lastWatchTimeRef.current = subLessonProgress.watchTime;
                        completedRef.current = subLessonProgress.completed;

                        setProgress(getProgress());
                        if (completedRef.current) {
                            setProgress(100);
                        }
                        return;
                    }
                })
            }
        })

        return currentTimeRef.current;
    }

    useEffect(() => {
        console.log("courseProgress", courseProgress)
        setProgressIndicatorOpacity(1);
        if (courseProgress?.lessonsProgress?.length > 0) {
            getCurrentTime();
            // initialRender.current = false;
        }
    }, [courseProgress, lessonId, subLessonId])


    useEffect(() => {
        //console.log("lessonId, subLessonId", lessonId, subLessonId, courseProgress);
        if (!videoRef.current) return
        const video = videoRef.current.htmlVideoLayerInstance.videoElement;
        if (!video) return
        video.currentTime = getCurrentTime();
        //currentTimeRef.current = video.currentTime
        //console.log("video currentTime", currentTimeRef.current, video.currentTime, lessonId, subLessonId);
        return () => {
            dispatch(syncCourseProgress({ lessonId, subLessonId, watchTime: watchTimeRef.current, currentTime: currentTimeRef.current }))
        }
    }, [lessonId, subLessonId])

    useEffect(() => {
        if (!videoRef.current) return
        const video = videoRef.current.htmlVideoLayerInstance.videoElement;
        if (!video) return

        let threshold = 20; //seconds
        let timeoutId: NodeJS.Timeout;

        const handleLoadMetadata = () => {
            video.currentTime = getCurrentTime();
        }
        const handlePause = () => {
            if (timeoutId) clearTimeout(timeoutId);
            setProgressIndicatorOpacity(1);
            isPausedRef.current = true;
        }
        const handlePlay = () => {
            timeoutId = setTimeout(() => setProgressIndicatorOpacity(0), 500);

            currentTimeRef.current = video.currentTime;
            isPausedRef.current = false;
        }
        const handleEnded = () => {
            //watchTimeRef.current = durationRef.current;
        }
        const handleTimeUpdate = () => {
            setProgress(prev => Math.max(getProgress(), prev));

            if (isPausedRef.current) return;

            let delta = video.currentTime - currentTimeRef.current;

            if (delta < 0 || delta > 3) return;

            currentTimeRef.current = video.currentTime;
            watchTimeRef.current += delta;



            delta = watchTimeRef.current - lastWatchTimeRef.current;
            if (delta >= threshold) {
                //console.log("Threshold reached", currentTimeRef.current, watchTimeRef.current);
                //call wathtime update
                dispatch(updateWatchTime({
                    courseId: courseInfo._id,
                    token: token,
                    lessonId: lessonId,
                    subLessonId: subLessonId,
                    watchTime: watchTimeRef.current,
                    currentTime: video.currentTime
                }));

                lastWatchTimeRef.current = watchTimeRef.current;
            }
            if (watchTimeRef.current >= video.duration * 0.9 && !completedRef.current) {
                //console.log("90% reached", watchTimeRef.current, video.duration);
                //call sublesson update
                dispatch(updateProgress({
                    courseId: courseInfo._id,
                    token: token,
                    lessonId: lessonId,
                    subLessonId: subLessonId
                }));

                completedRef.current = true;
            }

        }

        video.addEventListener('loadedmetadata', handleLoadMetadata);
        video.addEventListener('pause', handlePause);
        video.addEventListener('play', handlePlay);
        video.addEventListener('ended', handleEnded);
        video.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            video.removeEventListener('loadedmetadata', handleLoadMetadata);
            video.removeEventListener('pause', handlePause);
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('ended', handleEnded);
            video.removeEventListener('timeupdate', handleTimeUpdate);
        }
    }, [lessonId, subLessonId, courseInfo._id])

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
                        overflow: "hidden",
                        zIndex: 100000,
                    }}
                >

                    <MemoizedVideo
                        ref={videoRef}
                        cldVid={useMemo(() => cloudinaryCld.video(
                            courseInfo?.lessons[openedLesson.lesson - 1]?.subLessons[
                                openedLesson.subLesson - 1
                            ]?.videoLink
                        ), [courseInfo, openedLesson])}
                        plugins={videoPlugins}
                        style={videoStyle}
                        title={
                            courseInfo?.lessons[openedLesson.lesson - 1]?.subLessons[
                                openedLesson.subLesson - 1
                            ]?.title
                        }
                    />
                    <Box sx={{
                        position: "absolute",
                        top: isNonMobileScreens ? "1rem" : "0.5rem",
                        right: isNonMobileScreens ? "1rem" : "0.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        // ...theme.palette.glassMorphismCard,
                        // background: "rgba(255, 255, 255, 0.2)",

                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                        padding: "0rem",
                        borderRadius: "100px",
                    }}>
                        {/* <CircularProgress variant="determinate" value={progress} thickness={5} size={30} sx={{
                            color: theme.palette.primary.main,
                            filter: "drop-shadow(0 0 5px rgba(0, 242, 254, 0.4))",
                            // filter: "drop-shadow(0 0 15px rgba(0, 242, 254, 1))",

                        }} /> */}
                        <VideoProgressIndicator opacity={progressIndicatorOpacity} percentage={progress} size={isNonMobileScreens ? 40 : 25} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default React.memo(VideoPlayer)