import mongoose from "mongoose";

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
            type: String,
            default: "",
        },
        introVideo: {
            type: String,
            default: "",
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
        enrolledStudents: {
            type: [
                {
                    userId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "People",
                    },
                    userName: String,
                    enrolledOn: Date,
                    status: {
                        type: String,
                        enum: ["active", "postponed", "completed"],
                        default: "active",
                    },
                    paidAmount: Number,
                },
            ],
            required: false,
            default: [],
        },
        ratings: {
            type: {
                totalRating: Number,
                numberOfRatings: Number,
                ratings: [
                    {
                        userId: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "People",
                        },

                        rating: Number,
                    },
                ],
            },
            ref: "People",

            default: {
                totalRating: 0,
                numberOfRatings: 0,
                ratings: [],
            },
        },
        reviews: {
            type: [Object],
            default: [],
        },

        lessons: {
            type: [Object],
            default: [],
        },
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

const Course = mongoose.model("Course", CourseSchema);

export default Course;
