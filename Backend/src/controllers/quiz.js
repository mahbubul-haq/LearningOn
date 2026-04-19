import QuizAttempt from "../models/QuizAttempt.js";
import Course from "../models/Course.js";
import mongoose from "mongoose";

const getQuizAttempt = async (req, res) => {
    try {
        const userId = req.userId;
        const { courseId, lessonId } = req.params;
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
            let duration = lesson?.questions?.examDuration == Number.MAX_SAFE_INTEGER ? Math.max(1 * 60, lesson?.questions?.questions?.length * 90) : lesson?.questions?.examDuration;
            if (!duration || duration === 0) {
                duration = Math.max(1 * 60, lesson?.questions?.questions?.length * 90);
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


        if (new Date(quizAttempt.quizEndTime).getTime() < Date.now() && quizAttempt.status !== "completed") {

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

const processAnswer = async (req, res) => {
    try {
        const userId = req.userId;
        const { courseId, lessonId, attemptId } = req.params;
        const { questionId, answer } = req.body;

        const quizAttempt = await QuizAttempt.findById(attemptId);
        if (!quizAttempt) {
            return res.status(404).json({
                success: false,
                quizAttempt: null,
                message: "Quiz Attempt Not Found",
            });
        }

        if (Date.now() > new Date(quizAttempt.quizEndTime).getTime() || quizAttempt.status === "completed") {
            quizAttempt.status = "completed";
            await quizAttempt.save();
            return res.status(200).json({
                success: true,
                quizAttempt: quizAttempt,
                message: "Quiz Attempt Time Expired",
            });
        }

        //find course lesson having courseId: courseId and lessons[lessondId]in one query, only find the spceficint lesson
        const course = await Course.findOne({
            _id: courseId,
            "lessons._id": lessonId
        }, {
            "lessons.$": 1
        }).lean();
        const lesson = course?.lessons[0];
        // console.log("course, lesson", course, lesson);
        const question = lesson?.questions?.questions?.find((question) => question?._id?.toString() == questionId);
        if (!question) {
            return res.status(404).json({
                success: false,
                quizAttempt: null,
                message: "Question Not Found",
            });
        }

        let prevAnswer = quizAttempt.answers.find((answer) => answer?.questionId?.toString() == questionId);


        if (prevAnswer?.attemptNumber >= 2 || prevAnswer?.isCorrect) {
            return res.status(400).json({
                success: false,
                quizAttempt: quizAttempt,
                message: "Quiz Attempt Already Completed",
            });
        }

        if (prevAnswer) {
            prevAnswer.attemptNumber = 2;
            prevAnswer.answer = String(answer);
            prevAnswer.isCorrect = parseInt(question.answer) == answer;
            prevAnswer.correctAnswer = question.answer;
            if (parseInt(question.answer) == answer) {
                quizAttempt.score += 0.75;
            } else {
                quizAttempt.score -= 0.5;
            }

        } else {
            quizAttempt.answers.push({
                questionId: questionId,
                answer: String(answer),
                isCorrect: parseInt(question.answer) == answer,
                attemptNumber: 1,
            });

            if (parseInt(question.answer) == answer) {
                quizAttempt.score += 1;
            }

            quizAttempt.progress = (quizAttempt.answers.length / lesson?.questions?.questions?.length) * 100;
        }

        // if (prevAnswer?.isCorrect) {
        //     quizAttempt.score += 1;
        // }

        if (quizAttempt.progress === 100) {
            quizAttempt.status = "completed_can_improve";
        }

        let finishedAnswerCount = quizAttempt.answers.filter((answer) => answer?.attemptNumber >= 2 || answer?.isCorrect).length;

        if (quizAttempt.progress === 100 && finishedAnswerCount == lesson?.questions?.questions?.length) {
            quizAttempt.status = "completed";
        }

        await quizAttempt.save();

        res.status(200).json({
            success: true,
            quizAttempt: quizAttempt,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

export {
    getQuizAttempt,
    processAnswer
};