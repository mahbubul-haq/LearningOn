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
        const courseInfo = await Course.findOne({ _id: req.body.courseId });
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
                userId: req.userId,
                cart: JSON.stringify([
                    {
                        courseId: req.body.courseId,
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
            success_url: `${process.env.CLIENT_URL}/payment/success/${req.body.courseId}`,
            cancel_url: `${process.env.CLIENT_URL}/payment/cancel/${req.body.courseId}`,
        });

        console.log("Stripe checkout session created successfully!");
        console.log("Session ID:", session.id);
        console.log("Checkout URL:", session.url);
        const stripeSessionId = session.id;

        const payment = await Payment.create({
            userId: req.userId,
            courseId: req.body.courseId,
            // paymentIntentId: session.payment_intent,
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

export { deleteAllData, makePayment, stripeWebHook };
