import mongoose, { Schema, Document, Types } from "mongoose";

interface SubLessonProgress {
    subLessonId: Types.ObjectId; // references Course.lessons[i].subLessons[j]._id
    completed: boolean;
    watchTime?: number; // in seconds
    currentTime?: number;  // in seconds
}

export interface CourseProgressDocument extends Document {
    courseId: Types.ObjectId; // references Course._id
    userId: Types.ObjectId;   // references User._id
    lessonsProgress: {
        lessonId: Types.ObjectId; // references Course.lessons[i]._id
        subLessonsProgress: SubLessonProgress[];
        completed: boolean;
    }[];
    completed: boolean;
}

const subLessonProgressSchema = new Schema<SubLessonProgress>(
    {
        subLessonId: { type: Schema.Types.ObjectId, required: true, ref: "Course" },
        completed: { type: Boolean, default: false },
        watchTime: { type: Number, default: 0 },
        currentTime: { type: Number, default: 0 },
    },
    { _id: false } // do not need separate _id for progress entries
);

const courseProgressSchema = new Schema<CourseProgressDocument>(
    {
        courseId: { type: Schema.Types.ObjectId, required: true, ref: "Course" },
        userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
        lessonsProgress: [
            {
                lessonId: { type: Schema.Types.ObjectId, required: true, ref: "Course" },
                subLessonsProgress: [subLessonProgressSchema],
                completed: { type: Boolean, default: false },
            },

        ],
        completed: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const CourseProgress = mongoose.model<CourseProgressDocument>(
    "CourseProgress",
    courseProgressSchema
);

export default CourseProgress;


