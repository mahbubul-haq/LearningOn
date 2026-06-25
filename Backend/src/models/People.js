import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const PeopleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            minlength: [1, "Name must be at least 1 character long"],
            maxlength: [50, "Name must be at most 50 characters long"],
            index: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            maxlength: [50, "Email must be at most 50 characters long"],
            minlength: [5, "Email must be at least 5 characters long"],
            // add unique validator with custom error message
            unique: true,
            lowercase: true,
            trim: true,
        },
        emailVerified: {
            type: Boolean,
            required: false,
            default: false,
        },
        password: {
            type: String,
            required: false,
            minlength: [5, "Password must be at least 5 characters long"],
            maxlength: [100, "Password must be at most 100 characters long"],
            select: false,
        },
        avatar: {
            public_id: {
                type: String,
                required: false,
                default: "",
            },
            secure_url: {
                type: String,
                required: false,
                default: "",
            },
        },
        picturePath: {//legacy
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
        followersCount: {
            type: Number,
            required: false,
            default: 0,
        },
        followingCount: {
            type: Number,
            required: false,
            default: 0,
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
        enrolledCourses: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Enrollment",
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
            type: Number,
            required: false,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

PeopleSchema.plugin(uniqueValidator, { message: "{PATH} already exists" });

const People = mongoose.model("People", PeopleSchema);

export default People;
