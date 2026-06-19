import Category from "../models/Category.js";
import People from "../models/People.js";
import Course from "../models/Course.js";
import Notification from "../models/Notification.js";
import Payment from "../models/Payment.js";
import Enrollment from "../models/Enrollment.js";
import Stripe from "stripe";
import { processEnrollment } from "../services/enrollments/enrollment.service.js";

let stripe;
//console.log(process.env.STRIPE_PRIVATE_KEY);
// const platformFeePercent = process.env.PLATFORM_FEE_PERCENT;
export const initializeStripe = () => {
    stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
    //console.log(process.env.STRIPE_PRIVATE_KEY);
}

const getCurrencyForCountry = (countryCode) => {
    const currencyMap = {
        'US': 'usd',
        'IN': 'inr',
        'GB': 'gbp',
        'CA': 'cad',
        'AU': 'aud',
        'DE': 'eur',
        'FR': 'eur',
        'BR': 'brl',
        'MX': 'mxn',
        'SG': 'sgd',
        'JP': 'jpy',
        'AE': 'aed',
        // Add more as needed
    };
    return currencyMap[countryCode] || 'usd'; // Default to USD if known
};




const deleteAllData = async (req, res) => {
    try {
        await People.deleteMany();
        await Course.deleteMany();

        const users = await People.find();

        const courses = await Course.find();

        res.status(200).json({
            success: true,
            users,
            courses,
        });
    } catch (err) {
        ///console.log(err);
        res.status(500).json({
            success: false,
            message: "Data deletion unsuccessful",
        });
    }
};

const makePayment = async (req, res) => {
    console.log("makePayment called", req.body, req.userId);
    try {
        const courseId = req.body.courseId;
        const userId = req.userId;

        // 1. Check for existing payment
        let existingPayment = await Payment.findOne({ userId, courseId });

        if (existingPayment) {
            if (existingPayment.enrollmentStatus === "enrolled") {
                return res.status(200).json({
                    success: false,
                    reason: "already_enrolled",
                    message: "You are already enrolled in this course.",
                });
            }

            if (existingPayment.paymentStatus === "pending" && existingPayment.stripeSessionId) {
                try {
                    // Check Stripe session status
                    const session = await stripe.checkout.sessions.retrieve(existingPayment.stripeSessionId);

                    if (session.payment_status === "paid") {
                        // Webhook might have missed this, process enrollment now
                        //console.log("Stripe session is paid but DB is pending. Processing enrollment...");
                        try {
                            await processEnrollment(session.id);
                            return res.status(200).json({
                                success: false,
                                reason: "already_enrolled",
                                message: "Your payment was successful and you are enrolled.",
                            });
                        }
                        catch (err) {
                            return res.status(200).json({
                                success: false,
                                reason: "processing_payment",
                                message: "Your payment was successful but enrollment failed. Please contact support.",
                            });
                        }
                    }

                    if (session.status === "open") {
                        // Session is still valid, return the same URL
                        // console.log("Reusing existing open Stripe session:", session.id);
                        return res.status(200).json({
                            success: true,
                            url: session.url,
                        });
                    }

                    // Session is expired or complete (but not paid), delete stale payment and proceed to create new one
                    // console.log("Existing Stripe session is expired or invalid. Deleting stale payment record.");
                    await Payment.deleteOne({ _id: existingPayment._id });
                } catch (stripeError) {
                    // console.error("Error retrieving Stripe session:", stripeError);
                    if (stripeError.statusCode === 404) {
                        await Payment.deleteOne({ _id: existingPayment._id });
                    } else {
                        return res.status(500).json({
                            success: false,
                            message: "Error checking payment status.",
                        });
                    }
                }
            }
        }

        const courseInfo = await Course.findOne({ _id: courseId });
        console.log("Course found:", courseInfo?.courseTitle);

        // Get platform fee percentage from environment
        const platformFeePercent = parseFloat(process.env.PLATFORM_FEE_PERCENT) || 0.25;
        const coursePrice = parseFloat(courseInfo.coursePrice);
        const platformFee = coursePrice * platformFeePercent;
        const ownerAmount = coursePrice - platformFee;

        console.log("Payment calculation - Price:", coursePrice, "Platform fee:", platformFee, "Owner amount:", ownerAmount);

        console.log("Creating Stripe customer...");
        const customer = await stripe.customers.create({
            metadata: {
                userId: userId,
                cart: JSON.stringify([
                    {
                        courseId: courseId,
                        courseTitle: courseInfo.courseTitle,
                        coursePrice: courseInfo.coursePrice,
                        owner: courseInfo.owner,
                        platformFee: platformFee,
                        ownerAmount: ownerAmount,
                    },
                ]),
            },
        });
        console.log("Stripe customer created:", customer.id);

        console.log("Creating Stripe checkout session...");
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            customer: customer.id,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: courseInfo.courseTitle,
                            images: [`https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${courseInfo.courseThumbnail?.public_id}`],
                        },
                        unit_amount: coursePrice * 100, // price in cents
                    },
                    quantity: 1,
                },
            ],
            success_url: `${process.env.CLIENT_URL}/payment/success/${courseId}`,
            cancel_url: `${process.env.CLIENT_URL}/payment/cancel/${courseId}`,
        });

        console.log("Stripe checkout session created successfully!");
        console.log("Session ID:", session.id);
        console.log("Checkout URL:", session.url);
        const stripeSessionId = session.id;

        const payment = await Payment.create({
            userId: userId,
            courseId: courseId,
            paidAmount: coursePrice,
            currency: "usd",
            paymentStatus: "pending",
            platformFee: platformFee,
            ownerAmount: ownerAmount,
            enrollmentStatus: "not_enrolled",
            stripeSessionId: stripeSessionId,
        });

        if (payment) {
            res.status(200).json({
                success: true,
                url: session.url,
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Payment record creation failed",
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: e.message,
        });
    }
};

const getPaymentStatus = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.userId;

        if (!courseId) {
            return res.status(400).json({ success: false, message: "courseId is required" });
        }

        const payment = await Payment.findOne({ userId, courseId });

        if (!payment) {
            return res.status(200).json({ success: true, status: "none" });
        }

        if (payment.enrollmentStatus === "enrolled") {
            return res.status(200).json({ success: true, status: "enrolled" });
        }

        if (payment.paymentStatus === "pending" && payment.stripeSessionId) {
            try {
                const session = await stripe.checkout.sessions.retrieve(payment.stripeSessionId);

                if (session.payment_status === "paid") {
                    //console.log("Stripe session is paid but DB is pending. Processing enrollment in status check...");
                    try {
                        await processEnrollment(session.id);
                    } catch (err) {
                        //
                    }


                    return res.status(200).json({ success: true, status: "pending" });
                }

                if (session.status === "open") {
                    return res.status(200).json({ success: true, status: "open", url: session.url });
                }

                // Session expired
                // console.log("Existing Stripe session is expired. Deleting stale payment record.");
                await Payment.deleteOne({ _id: payment._id });
                return res.status(200).json({ success: true, status: "none" });

            } catch (stripeError) {
                // console.error("Error retrieving Stripe session for status check:", stripeError);

                // await Payment.deleteOne({ _id: payment._id });
                return res.status(200).json({ success: true, status: "none" });
            }
        }

        // Fallback
        return res.status(200).json({ success: true, status: "none" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message, status: "none" });
    }
};

// This is your Stripe CLI webhook secret for testing your endpoint locally.
// let endpointSecret;

// endpointSecret =
//     "whsec_b710aff255dc4bdcbd8d187756c2d7b45113c8753d73c4d238322ef3ae56996b";

const stripeWebHook = async (req, res) => {
    try {
        const sig = req.headers["stripe-signature"];

        let data;
        let eventType;

        // if (endpointSecret) {
        let event;
        // console.log("event triggered");

        try {
            console.log("constructing event");
            event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
            // console.log("event triggered");
        } catch (err) {
            res.status(400).send(`Webhook Error: ${err.message}`);
            console.log("Webhook Error: ", err.message);
            return;
        }

        data = event.data.object;
        eventType = event.type;
        // } else {
        //     data = req.body.data.object;
        //     eventType = req.body.type;
        // }

        //console.log("data", data);
        console.log("eventType", eventType);

        // Handle the event
        if (eventType === "payment_intent.succeeded") {
            // console.log("succeded", data);
        } else if (eventType === "checkout.session.completed") {
            let session = data;
            if (session.payment_status !== "paid") {
                console.log("Payment failed");
                return res.status(200).send("Payment failed");
            } else {
                console.log("Calling processEnrollment");
                await processEnrollment(session.id);
                return res.status(200).send("Enrollment processed");
            }

        }


        res.send().end();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


// app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {

// });

export { deleteAllData, getPaymentStatus, makePayment, stripeWebHook };
