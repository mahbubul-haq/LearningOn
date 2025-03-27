import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const PeopleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            minlength: [1, "Name must be at least 1 character long"],
            maxlength: [50, "Name must be at most 50 characters long"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            maxlength: [50, "Email must be at most 50 characters long"],
            minlength: [5, "Email must be at least 5 characters long"],
            // add unique validator with custom error message
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [5, "Password must be at least 5 characters long"],
            maxlength: [100, "Password must be at most 100 characters long"],
        },
        picturePath: {
            type: String,
            required: false,
            default: "",
        },
        qualifications: {
            type: [String],
            required: false,
            default: ["Student"],
        },
        followers: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "People",
            required: false,
            default: [],
        },
        following: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "People",
            required: false,
            default: [],
        },
        externalProfiles: {
            type: [
                {
                    link: String,
                    platform: String,
                },
            ],
            required: false,
            default: [],
        },
        courses: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Course",
            required: false,
            default: [],
        },
        blogs: {
            type: [String],
            required: false,
            default: [],
        },
        tutoring: {
            type: [String],
            required: false,
            default: [],
        },
        rating: {
            type: Object,
            default: {
                rating: 0,
                count: 0,
            },
        },
        about: {
            type: String,
            required: false,
            default: "",
        },
        learning: {
            type: [
                {
                    courseId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Course",
                    },
                    completedLessons: {//array of sublessons that are completed
                        type: [String],
                        default: [],
                    },
                    answers: {
                        type: [{
                            question: String,//2.4 -> Lesson 2, 4 number question
                            response: String// a, b, c, d, e etc
                        }],
                        default: [],
                    },
                    
                    status: {
                        type: String,
                        enum: ["active", "postponed", "completed"],
                        default: "active",
                    },
                    enrolledOn: Date,
                },
            ],
            required: false,
            default: [],
        },
        likes: {
            type: [String],
            required: false,
            default: [],
        },
        interests: {
            type: [String],
            required: false,
            default: [],
        },
        wallet: {
            type: String,
            required: false,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

PeopleSchema.plugin(uniqueValidator, { message: "{PATH} already exists" });

const People = mongoose.model("People", PeopleSchema);

export default People;
