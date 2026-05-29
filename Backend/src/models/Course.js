import mongoose from "mongoose";

const subLessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    videoLink: {
        type: Object,
        default: { public_id: "", secure_url: "", duration: 0 },
    },
    lectureNote: String,
}, {
    _id: true
});

const questionSchema = new mongoose.Schema({
    question: String,
    options: [String],
    answer: String,
}, {
    _id: true
});

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    subLessons: { type: [subLessonSchema], default: [] },
    questions: {
        questions: { type: [questionSchema], default: [] },
        examDuration: {
            type: Number,// minutes _> dfault infinity
            default: Number.MAX_SAFE_INTEGER,
        },
    }
}, {
    _id: true
});

const CourseSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            // required: true,
            default: "",
        },
        courseTitle: {
            type: String,
            // required: true,
            default: "",
        },
        courseDescription: {
            type: String,
            // required: true,
            default: "",
        },
        studentRequirements: {
            type: String,
            // required: true,
            default: "",
        },
        skillTags: {
            type: [String],
            // required: true,
            default: [],
        },
        courseThumbnail: {
            type: Object,
            default: { public_id: "", secure_url: "" },
        },
        introVideo: {
            type: Object,
            default: { public_id: "", secure_url: "", duration: 0 },
        },
        courseLanguage: {
            type: String,
            default: "",
        },
        coursePrice: {
            type: String,
            default: "",
        },
        approxTimeToComplete: {
            type: String,
            default: "",
        },
        courseInstructors: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "People",
            default: [],
        },
        enrolledStudents: { // can have many students 
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Enrollment",
            default: [],
        },
        enrollmentTrend: {
            type: [Number],
            default: new Array(20).fill(0),
        },
        trendDayKeys: {
            type: [String],
            default: new Array(20).fill(0),
        },
        enrolledStudentsCount: {
            type: Number,
            default: 0,
        },
        ratings: {
            totalRating: {
                type: Number,
                default: 0,
            },
            numberOfRatings: {
                type: Number,
                default: 0,
            },
            reviewCountWithText: {
                type: Number,
                default: 0,
            }

        },

        lessons: { type: [lessonSchema], default: [] },///can be big
        courseStatus: {
            type: String,
            enum: ["draft", "pending", "published", "unpublished"],
            default: "draft",
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "People",
            required: true,
        },
    },
    { timestamps: true }
);
CourseSchema.index({ owner: 1 });
CourseSchema.index({ courseInstructors: 1 });

const Course = mongoose.model("Course", CourseSchema);

export default Course;
