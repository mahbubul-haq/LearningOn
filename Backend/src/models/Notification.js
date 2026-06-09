import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: false,
    },
    imageLink: {
        type: String,
        required: false,
    },
    userFrom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "People",
        required: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "People",
        required: true,
    },
    status: {
        type: String,
        enum: ["new", "opened", "clicked"],
        default: "new",
    },
    type: {
        type: String,
        enum: ["course_enroll", ""],
        default: ""
    },

}, {
    timestamps: true,
});

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification;