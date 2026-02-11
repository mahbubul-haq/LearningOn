import Category from "../models/Category.js";
import People from "../models/People.js";
import Course from "../models/Course.js";
import Notification from "../models/Notification.js";
import Payment from "../models/Payment.js";
import Enrollment from "../models/Enrollment.js";
import Stripe from "stripe";
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


const addCategory = async (req, res) => {
    try {
        let category = await Category.findOne({
            name: rleq.body.name,
        });

        if (!category) {
            category = new Category({
                name: req.body.name,
            });
            await category.save();
        }

        //copilot not working!!!

        if (req.body.subcategory.length > 0) {
            req.body.subcategory.forEach(async (subcategory) => {
                //check if subcategory inside category.subcategories

                if (!category.subcategories.includes(subcategory)) {
                    category.subcategories.push(subcategory);
                }
            });
            await category.save();
        }

        res.status(201).json({
            success: true,
            category: category,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            errors: { ...error.errors },
        });
    }
};

const getCategories = async (req, res) => {
    try {
        // sort the categories ascending order by name
        // sort the subcategories ascending order by name

        const categories = await Category.find().sort({ name: 1 }).exec();

        // sort the subcategories ascending order by name
        categories.forEach((category) => {
            category.subcategories.sort();
        });

        res.status(200).json({
            success: true,
            categories: categories,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            errors: { ...error.errors },
        });
    }
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
                            images: [`https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${courseInfo.courseThumbnail}`],
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

        res.status(200).json({
            success: true,
            url: session.url,
        });
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
            }
            console.log("Payment succeeded");
            const paymentIntentId = session.payment_intent;
            const customer = await stripe.customers.retrieve(data.customer);

            if (!customer?.metadata?.userId) {
                console.log("User not found");
                return res.status(200).send("User not found");
            }

            const user = await People.findOne({
                _id: customer.metadata.userId,
            });

            const cart = JSON.parse(customer.metadata.cart);
            for (const item of cart) {
                //console.log("item", item);

                // Check if payment already exists with this paymentIntentId
                let payment = await Payment.findOne({ paymentIntentId });

                if (!payment) {
                    // Create new payment entry
                    payment = new Payment({
                        userId: user._id,
                        courseId: item.courseId,
                        paymentIntentId: paymentIntentId,
                        paidAmount: parseFloat(item.coursePrice),
                        currency: "usd",
                        paymentStatus: "paid",
                        platformFee: parseFloat(item.platformFee || 0),
                        ownerAmount: parseFloat(item.ownerAmount || 0),
                    });
                    await payment.save();
                    console.log("Payment record created:", payment._id);
                }

                // Check if enrollment already exists with this courseId and paymentId
                let enrollment = await Enrollment.findOne({
                    courseId: item.courseId,
                    userId: user._id,
                });

                if (!enrollment) {
                    // Create new enrollment entry
                    enrollment = new Enrollment({
                        userId: user._id,
                        courseId: item.courseId,
                        enrolledOn: Date.now(),
                        status: "active",
                        paymentId: payment._id,
                    });
                    await enrollment.save();

                    // Add enrollment reference to course.enrolledStudents
                    let course = await Course.findOne({
                        _id: item.courseId,
                    });

                    if (course) {
                        // may not have enrolledStudents field
                        if (!course.enrolledStudents) {
                            course.enrolledStudents = [];
                        }
                        if (!course.enrolledStudents.includes(enrollment._id)) {
                            course.enrolledStudents.push(enrollment._id);
                            await course.save();
                        }
                    }

                    // Add enrollment reference to user.enrolledCourses
                    // may not have enrolledCourses field
                    if (!user.enrolledCourses) {
                        user.enrolledCourses = [];
                    }
                    if (!user.enrolledCourses.includes(enrollment._id)) {
                        user.enrolledCourses.push(enrollment._id);
                        await user.save();
                    }

                    // Update course owner's wallet with instructor amount (net earnings)
                    let courseOwner = await People.findOne({
                        _id: item.owner,
                    });

                    if (courseOwner) {
                        let wallet = courseOwner.wallet;
                        // Add instructor amount (course price - platform fee)
                        wallet += parseFloat(item.ownerAmount || item.coursePrice);
                        courseOwner.wallet = wallet;
                        await courseOwner.save();
                    }

                    // Everything after this is for notifications (kept as is)
                    const targetIds = [];
                    targetIds.push(item.owner.toString());

                    course.courseInstructors.forEach((instructor) => {
                        const instructorId = instructor.toString();
                        if (!targetIds.includes(instructorId)) {
                            targetIds.push(instructorId);
                        }
                    });

                    for (const targetId of targetIds) {
                        const curUser = await People.findOne({
                            _id: targetId,
                        });

                        console.log("targetId", targetId);

                        // delete the oldest notification if the number of notifications is greater than 50
                        const notifications = await Notification.find({
                            userId: curUser._id,
                        });

                        if (notifications?.length >= 50) {
                            await Notification.deleteOne({
                                _id: notifications[0]._id,
                            });
                        }

                        const notification = new Notification({
                            userId: curUser._id,
                            message: `<b>${user.name}</b> enrolled in your course <b>${course.courseTitle} </b>`,
                            link: `dashboard/${course._id}`,
                            status: "new",
                            imageLink: user.picturePath,
                            userFrom: user._id,
                        });

                        await notification.save();
                    }
                }
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

export { addCategory, getCategories, deleteAllData, makePayment, stripeWebHook };
