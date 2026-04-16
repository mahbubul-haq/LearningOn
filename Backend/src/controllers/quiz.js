import QuizAttempt from "../models/QuizAttempt.js";
import Course from "../models/Course.js";
import mongoose from "mongoose";

const getQuizAttempt = async (req, res) => {
    try {
        const userId = req.userId;
        const { courseId, lessonId } = req.body;
        //duration in seconds
        // console.log("getQuizAttempt", courseId, lessonId);

        if (!mongoose.Types.ObjectId.isValid(courseId) || !mongoose.Types.ObjectId.isValid(lessonId)) {
            return res.status(400).json({
                success: false,
                quizAttempt: null,
                message: "Invalid Course ID or Lesson ID",
            });
        }

        let quizAttempt = await QuizAttempt.findOne({
            userId: userId,
            courseId: courseId,
            lessonId: lessonId,
        });
        // console.log("quizAttempt1", quizAttempt);
        let course, lesson;

        if (!quizAttempt) {

            // console.log("lessonId", lessonId, courseId);
            course = await Course.findById(courseId);
            lesson = course?.lessons?.find((lesson) => lesson?._id?.toString() === lessonId);
            let duration = lesson?.questions?.examDuration == Number.MAX_SAFE_INTEGER ? Math.max(5 * 60, lesson?.questions?.questions?.length * 90) : lesson?.questions?.examDuration;
            if (!duration || duration === 0) {
                duration = Math.max(5 * 60, lesson?.questions?.questions?.length * 90);
            }
            console.log("duration", duration);
            quizAttempt = await QuizAttempt.create({
                userId: userId,
                courseId: courseId,
                lessonId: lessonId,
                quizEndTime: Date.now() + duration * 1000,
                status: "active"
            });
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
        // console.log("I got the atttempt");

        if (timeDiff <= 0 && quizAttempt.status !== "completed") {

            quizAttempt.status = "completed";

            await quizAttempt.save();
        }
        // console.log("quizAttempt2", quizAttempt);

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