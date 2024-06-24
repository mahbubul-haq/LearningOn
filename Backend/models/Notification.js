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
        type: String,
        required: false,
        default: "",
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
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification;