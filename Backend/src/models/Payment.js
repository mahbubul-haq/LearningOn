import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
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
        required: true,
    },
    paidAmount: {
        type: Number,
        required: true,
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
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
})

const Payment = mongoose.model("Payment", PaymentSchema);

export default Payment;


