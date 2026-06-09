import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "People",
            required: true,
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: false,
        },
        paymentIntentId: {
            type: String,
            required: false,
            default: "",
        },
        paidAmount: {
            type: Number,
            required: true,
            default: 0,
        },
        currency: {
            type: String,
            required: true,
            default: "usd",
        },
        paymentStatus: {
            type: String,
            enum: ["paid", "failed", "pending"],
            default: "pending",
        },
        platformFee: {
            type: Number,
            required: false,
            default: 0,
        },
        ownerAmount: {
            type: Number,
            required: false,
            default: 0,
        },
        stripeSessionId: {
            type: String,
            required: false,
            unique: true,
        },
        enrollmentStatus: {
            type: String,
            enum: ["enrolled", "not_enrolled"],
            default: "not_enrolled",
        },
    },
    {
        timestamps: true,
    },
);

const Payment = mongoose.model("Payment", PaymentSchema);

export default Payment;
