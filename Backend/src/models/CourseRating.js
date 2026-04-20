import mongoose from "mongoose";


const courseRatingSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "People",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    review: {
        type: String,
        required: false,
    },
}, { timestamps: true });

courseRatingSchema.index({ courseId: 1, userId: 1 }, { unique: true });


const CourseRating = mongoose.model("CourseRating", courseRatingSchema);
export default CourseRating;