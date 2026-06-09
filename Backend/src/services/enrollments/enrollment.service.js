import mongoose from "mongoose";
import Stripe from "stripe";

import Course from "../../models/Course.js";
import Enrollment from "../../models/Enrollment.js";
import Notification from "../../models/Notification.js";
import Payment from "../../models/Payment.js";
import People from "../../models/People.js";

let stripe;

const getStripe = () => {
    if (!stripe) {
        stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
    }

    return stripe;
};

const SEVEN_DAYS_IN_SECONDS = 7 * 24 * 60 * 60;

const processEnrollment = async (stripeSessionId) => {
    console.log("Processing enrollment for stripeSessionId:", stripeSessionId);
    if (!stripeSessionId) {
        throw new Error("stripeSessionId is required");
    }

    const payment = await Payment.findOne({ stripeSessionId });

    if (!payment) {
        return {
            success: false,
            status: "payment_not_found",
            message: "Payment not found for stripe session",
        };
    }

    if (payment.enrollmentStatus === "enrolled") {
        return {
            success: true,
            status: "already_enrolled",
            paymentId: payment._id,
        };
    }

    const stripeCheckoutSession = await getStripe().checkout.sessions.retrieve(stripeSessionId);

    if (stripeCheckoutSession.payment_status !== "paid") {
        const sessionAgeInSeconds = Math.floor(Date.now() / 1000) - stripeCheckoutSession.created;

        if (sessionAgeInSeconds >= SEVEN_DAYS_IN_SECONDS) {
            await Payment.deleteOne({
                _id: payment._id,
                enrollmentStatus: "not_enrolled",
            });

            return {
                success: true,
                status: "deleted_unpaid_expired_payment",
                paymentId: payment._id,
            };
        }

        return {
            success: false,
            status: "payment_not_paid",
            paymentId: payment._id,
        };
    }

    const dbSession = await mongoose.startSession();
    console.log("Starting database session for enrollment processing");

    try {
        let result;

        await dbSession.withTransaction(async () => {
            const currentPayment = await Payment.findOne({
                _id: payment._id,
                enrollmentStatus: "not_enrolled",
            }).session(dbSession);

            if (!currentPayment) {
                result = {
                    success: true,
                    status: "already_enrolled",
                    paymentId: payment._id,
                };
                return;
            }

            const user = await People.findById(currentPayment.userId).session(dbSession);
            const course = await Course.findById(currentPayment.courseId).session(dbSession);

            if (!user) {
                throw new Error("Payment user not found");
            }

            if (!course) {
                throw new Error("Payment course not found");
            }

            let enrollment = await Enrollment.findOne({
                userId: currentPayment.userId,
                courseId: currentPayment.courseId,
            }).session(dbSession);
            let createdEnrollment = false;

            if (!enrollment) {
                enrollment = await Enrollment.create([{
                    userId: currentPayment.userId,
                    courseId: currentPayment.courseId,
                    enrolledOn: Date.now(),
                    status: "active",
                    paymentId: currentPayment._id,
                }], { session: dbSession });
                enrollment = enrollment[0];
                createdEnrollment = true;
            }

            const todayKey = Math.floor(Date.now() / 86400000);
            const trendDayKeys = course.trendDayKeys?.length ? [...course.trendDayKeys] : new Array(20).fill(0);
            const enrollmentTrend = course.enrollmentTrend?.length ? [...course.enrollmentTrend] : new Array(20).fill(0);

            if (createdEnrollment) {
                const idx = todayKey % 20;
                if (Number(trendDayKeys[idx]) !== todayKey) {
                    trendDayKeys[idx] = todayKey;
                    enrollmentTrend[idx] = 0;
                }
                enrollmentTrend[idx] = Number(enrollmentTrend[idx] || 0) + 1;

                await Course.updateOne(
                    { _id: course._id },
                    {
                        $addToSet: { enrolledStudents: enrollment._id },
                        $inc: { enrolledStudentsCount: 1 },
                        $set: { trendDayKeys, enrollmentTrend },
                    },
                    { session: dbSession },
                );

                await People.updateOne(
                    { _id: user._id },
                    { $addToSet: { enrolledCourses: enrollment._id } },
                    { session: dbSession },
                );

                await People.updateOne(
                    { _id: course.owner },
                    { $inc: { wallet: Number(currentPayment.ownerAmount || 0) } },
                    { session: dbSession },
                );

                const targetIds = [course.owner.toString()];
                course.courseInstructors.forEach((instructor) => {
                    const instructorId = instructor.toString();
                    if (!targetIds.includes(instructorId)) {
                        targetIds.push(instructorId);
                    }
                });

                for (const targetId of targetIds) {
                    const notifications = await Notification.find({ userId: targetId })
                        .sort({ createdAt: 1 })
                        .session(dbSession);

                    if (notifications?.length >= 50) {
                        await Notification.deleteOne({ _id: notifications[0]._id }).session(dbSession);
                    }

                    await Notification.create([{
                        userId: targetId,
                        message: `<b>${user.name}</b> enrolled in your course <b>${course.courseTitle} </b>`,
                        link: `dashboard/${course._id}`,
                        status: "new",
                        imageLink: user.avatar?.public_id,
                        userFrom: user._id,
                    }], { session: dbSession });
                }
            } else {
                await Course.updateOne(
                    { _id: course._id },
                    { $addToSet: { enrolledStudents: enrollment._id } },
                    { session: dbSession },
                );

                await People.updateOne(
                    { _id: user._id },
                    { $addToSet: { enrolledCourses: enrollment._id } },
                    { session: dbSession },
                );
            }

            currentPayment.paymentStatus = "paid";
            currentPayment.enrollmentStatus = "enrolled";
            currentPayment.paymentIntentId = stripeCheckoutSession.payment_intent || currentPayment.paymentIntentId;
            await currentPayment.save({ session: dbSession });

            result = {
                success: true,
                status: "enrolled",
                paymentId: currentPayment._id,
                enrollmentId: enrollment._id,
            };
        });

        console.log("Enrollment processing transaction completed with result:", result);

        return result;
    } finally {
        await dbSession.endSession();
    }
}

export {
    processEnrollment
}
