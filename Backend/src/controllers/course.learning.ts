import CourseProgress from "../models/CourseProgress.js";

const getCourseProgress = async (req: any, res: any) => {
    try {
        const courseId = req.params.courseId;
        const userId = req.userId;

        let courseProgress = await CourseProgress.findOne({
            courseId: courseId,
            userId: userId,
        });

        if (!courseProgress) {
            courseProgress = await CourseProgress.create({
                courseId: courseId,
                userId: userId,
            });
        }

        res.status(200).json({
            success: true,
            message: "Course Progress Found",
            courseProgress,
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

const updateProgress = async (req: any, res: any) => {
    try {
        const courseId = req.params.courseId;
        const userId = req.userId;
        const { lessonId, subLessonId, hasVideo, currentTime, watchTime, duration } = req.body;

        let courseProgress = await CourseProgress.findOne({
            courseId: courseId,
            userId: userId,
        });

        if (!courseProgress) {
            courseProgress = await CourseProgress.create({
                courseId: courseId,
                userId: userId,
            });
        }
        console.log(courseProgress);
        if (subLessonId === "") {

        } else {
            if (hasVideo) {

            }
            else {

            }
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export { getCourseProgress };