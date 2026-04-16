import Course from "../../models/Course.js";
import QuizAttempt from "../../models/QuizAttempt.js";
import mongoose from "mongoose";

const getQuestions = async (req, res) => {
    try {
        const { courseId, lessonId } = req.params;
        const userId = req.userId;

        if (!mongoose.Types.ObjectId.isValid(courseId) ||
            !mongoose.Types.ObjectId.isValid(lessonId)) {
            return res.status(400).json({ success: false, message: "Invalid ID" });
        }
        console.log(courseId, lessonId, userId);
        const course = await Course.findOne(
            { _id: courseId, "lessons._id": lessonId },
            {
                "lessons.$": 1,
                owner: 1,
                courseInstructors: 1,
                enrolledStudents: 1,
            }
        ).populate("enrolledStudents", "userId").lean();
        console.log(course);

        if (!course) {
            return res.status(404).json({ success: false, message: "Course or lesson not found" });
        }

        const isOwner = String(course.owner) === userId;
        const isInstructor = course.courseInstructors?.some(
            ins => String(ins) === userId
        );
        const isEnrolled = course.enrolledStudents?.some(
            e => String(e.userId) === userId
        );

        if (!(isOwner || isInstructor || isEnrolled)) {
            return res.status(403).json({
                success: false,
                message: "Not authorized",
            });
        }

        const lesson = course.lessons[0];

        if (!lesson?.questions?.questions?.length) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found",
            });
        }

        const safeQuestions = lesson.questions.questions.map(q => ({
            _id: q._id,
            question: q.question,
            options: q.options,
        }));

        return res.status(200).json({
            success: true,
            questions: safeQuestions,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export {
    getQuestions
}