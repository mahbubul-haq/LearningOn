import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
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
    certificateId: {
        type: String,
        required: true,
    },
    issueDate: {
        type: Date,
        default: Date.now,
    },
    isGraded: {
        type: Boolean,
        default: false,
    },
    scorePercentage: {
        type: Number,
        default: 0,
    },
});

certificateSchema.index({ courseId: 1, userId: 1 }, { unique: true });

const Certificate = mongoose.model("Certificate", certificateSchema);

export default Certificate;