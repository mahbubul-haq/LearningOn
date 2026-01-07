import QuizAttempt from "../models/QuizAttempt.js";
import Course from "../models/Course.js";

const getQuizAttempt = async (req, res) => {
    try {
        const userId = req.userId;
        const { courseId, lessonId } = req.body;
        //duration in seconds
        console.log("getQuizAttempt", courseId, lessonId);

        let quizAttempt = await QuizAttempt.findOne({
            userId: userId,
            courseId: courseId,
            lessonId: lessonId,
        });
        console.log("quizAttempt1", quizAttempt);

        if (!quizAttempt) {
            if (!lessonId) {
                quizAttempt = await QuizAttempt.findOne({
                    userId: userId,
                    courseId: courseId,
                    status: "active",
                });
            }
            else {
                console.log("lessonId", lessonId, courseId);
                const course = await Course.findById(courseId);
                let duration = course?.lessons?.find((lesson) => lesson?._id?.toString() === lessonId)?.questions?.examDuration;
                if (!duration || duration === 0) {
                    duration = 99 * 60 * 60;
                }
                duration = Math.min(duration, 99 * 60 * 60);
                console.log("duration", duration);
                quizAttempt = await QuizAttempt.create({
                    userId: userId,
                    courseId: courseId,
                    lessonId: lessonId,
                    quizEndTime: Date.now() + duration * 1000,
                });

            }
        }

        if (!quizAttempt) {
            return res.status(404).json({
                success: false,
                quizAttempt: null,
                message: "Quiz Attempt Not Found",
            });
        }

        let curTime = Date.now();
        let timeDiff = quizAttempt.quizEndTime - curTime;
        console.log("I got the atttempt");

        if (timeDiff <= 0 && quizAttempt.status === "active") {
            quizAttempt.status = "completed";
            await quizAttempt.save();
        }
        console.log("quizAttempt2", quizAttempt);

        res.status(200).json({
            success: true,
            quizAttempt: quizAttempt,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export {
    getQuizAttempt,
};