import mongoose, { Schema, Document, Types } from "mongoose";

interface SubLessonProgress {
    subLessonId: Types.ObjectId; // references Course.lessons[i].subLessons[j]._id
    completed: boolean;
    videoPlayDuration?: number; // in seconds
    currentVideoTime?: number;  // in seconds
}

export interface CourseProgressDocument extends Document {
    courseId: Types.ObjectId; // references Course._id
    userId: Types.ObjectId;   // references User._id
    lessonsProgress: {
        lessonId: Types.ObjectId; // references Course.lessons[i]._id
        subLessonsProgress: SubLessonProgress[];
    }[];
    completed: boolean;
    updatedAt: Date;
}

const subLessonProgressSchema = new Schema<SubLessonProgress>(
    {
        subLessonId: { type: Schema.Types.ObjectId, required: true, ref: "Course" },
        completed: { type: Boolean, default: false },
        videoPlayDuration: { type: Number, default: 0 },
        currentVideoTime: { type: Number, default: 0 },
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
            },
        ],
        completed: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const CourseProgress = mongoose.model<CourseProgressDocument>(
    "CourseProgress",
    courseProgressSchema
);
