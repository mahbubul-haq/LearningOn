import Course from "../models/Course.js";
import CourseProgress from "../models/CourseProgress.js";

const getCourseProgress = async (req, res) => {
    try {
        let courseProgress = await CourseProgress.findOne({
            userId: req.userId,
            courseId: req.params.courseId,
        });
        if (!courseProgress) {
            let course = await Course.exists(
                {
                    _id: req.params.courseId,
                },
            );
            //console.log(req.params.courseId, course);
            if (course) {
                //console.log(...courseProgress.quizProgress);
                //console.log(...courseProgress.lessonProgress);
                courseProgress = new CourseProgress({
                    userId: req.userId,
                    courseId: req.params.courseId,
                });
                await courseProgress.save();
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Course progress not found",
                });
            }
        }
        return res.status(200).json({
            success: true,
            courseProgress: courseProgress,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

export { getCourseProgress };

