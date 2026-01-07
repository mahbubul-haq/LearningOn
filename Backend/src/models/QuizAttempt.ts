import mongoose, { Types, Schema } from "mongoose";

type quizAttempt = {
    lessonId: Types.ObjectId;
    userId: Types.ObjectId;
    courseId: Types.ObjectId;
    answers: {
        questionId: Types.ObjectId;
        answer?: string;
        correctAnswer?: string;
        attemptNumber: number;
        isCorrect: boolean;
    }[];
    score: number;
    quizStartTime: Date;
    quizEndTime: Date;
    status: "active" | "completed";

}

const quizAttemptSchema = new Schema<quizAttempt>({
    lessonId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "People",
        required: true,
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    answers: [
        {
            questionId: {
                type: Schema.Types.ObjectId,
                required: true,
            },
            answer: {
                type: String,
                required: false,
            },
            correctAnswer: {
                type: String,
                required: false,
            },
            attemptNumber: {
                type: Number,
                required: true,
                default: 0,
            },
            isCorrect: {
                type: Boolean,
                required: true,
                default: false,
            },
        }
    ],
    score: {
        type: Number,
        required: true,
        default: 0,
    },
    quizStartTime: {
        type: Date,
        required: true,
        default: Date.now,
    },

    quizEndTime: {
        type: Date,
        required: true,
        //date.now + 100hours
        default: () => Date.now() + 99 * 60 * 60 * 1000,
    },

    status: {
        type: String,
        required: true,
        default: "active",
    },

});

const QuizAttempt = mongoose.model("QuizAttempt", quizAttemptSchema);

export default QuizAttempt;
