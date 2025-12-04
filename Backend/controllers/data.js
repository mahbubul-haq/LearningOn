import Category from "../models/Category.js";
import People from "../models/People.js";
import Course from "../models/Course.js";
import Notification from "../models/Notification.js";
import Stripe from "stripe";
let stripe;
//console.log(process.env.STRIPE_PRIVATE_KEY);
export const initializeStripe = () => {
    stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
    //console.log(process.env.STRIPE_PRIVATE_KEY);
}

const addCategory = async (req, res) => {
    try {
        let category = await Category.findOne({
            name: req.body.name,
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
    console.log("makePayment", req.body, req.userId);
    try {
        const courseInfo = await Course.findOne({ _id: req.body.courseId });
        // console.log(courseInfo.courseThumbnail);

        const customer = await stripe.customers.create({
            metadata: {
                userId: req.userId,
                cart: JSON.stringify([
                    {
                        courseId: req.body.courseId,
                        courseTitle: courseInfo.courseTitle,
                        coursePrice: courseInfo.coursePrice,
                        owner: courseInfo.owner,
                    },
                ]),
            },
        });

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
                            // images: [
                            //     `${process.env.SERVER_URL}/images/${courseInfo.courseThumbnail}`,
                            // ],
                        },
                        unit_amount: courseInfo.coursePrice * 100,
                    },
                    quantity: 1,
                },
            ],
            success_url: `${process.env.CLIENT_URL}/payment/success/${req.body.courseId}`,
            cancel_url: `${process.env.CLIENT_URL}/payment/cancel/${req.body.courseId}`,
        });

        //console.log("session", session.url);

        // check if payment is successful

        //event handler to check if payment success

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
let endpointSecret;

// endpointSecret =
//     "whsec_b710aff255dc4bdcbd8d187756c2d7b45113c8753d73c4d238322ef3ae56996b";

const stripeWebHook = async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let data;
    let eventType;

    if (endpointSecret) {
        let event;
        // console.log("event triggered");

        try {
            event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
            // console.log("event triggered");
        } catch (err) {
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        data = event.data.object;
        eventType = event.type;
    } else {
        data = req.body.data.object;
        eventType = req.body.type;
    }

    //console.log("data", data);
    console.log("eventType", eventType);

    // Handle the event
    if (eventType === "payment_intent.succeeded") {
        // console.log("succeded", data);
    } else if (eventType === "checkout.session.completed") {
        stripe.customers.retrieve(data.customer, async (err, customer) => {
            if (err) {
                console.log(err);
            } else {
                const user = await People.findOne({
                    _id: customer.metadata.userId,
                });

                const cart = JSON.parse(customer.metadata.cart);

                cart?.forEach(async (item) => {
                    //console.log("item", item);
                    let courseOwner = await People.findOne({
                        _id: item.owner,
                    });

                    if (courseOwner) {
                        let wallet = courseOwner.wallet === "" ? 0 : parseFloat(courseOwner.wallet);
                        wallet += parseFloat(item.coursePrice);
                        courseOwner.wallet = wallet.toString();

                        await courseOwner.save();
                    }

                    let course = await Course.findOne({
                        _id: item.courseId,
                    });

                    if (course) {
                        course.enrolledStudents.push({
                            userId: user._id,
                            enrolledOn: Date.now(),
                            status: "active",
                            paidAmount: parseFloat(item.coursePrice),
                            userName: user.name,
                        });

                        await course.save();
                    }

                    user.learning.push({
                        courseId: item.courseId,
                        enrolledOn: Date.now(),
                        status: "active",
                        completedLessons: [],
                    });

                    await user.save();

                    const targetIds = [];
                    // targetIds.push(item.owner.toString());
                    // if item.owner is an ObjectId, convert it to string
                    // if (typeof item.owner === "object") {
                    //     targetIds.push(item.owner.toString());
                    // find the string of the objectid
                    //console.log("item.owner", item.owner.toString(), item.owner);
                    targetIds.push(item.owner.toString());

                    course.courseInstructors.forEach((instructor) => {
                        const instructorId = instructor.toString();
                        if (!targetIds.includes(instructorId)) {
                            targetIds.push(instructorId);
                        }
                    });

                    targetIds.forEach(async (targetId) => {
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
                    });
                });
            }
        });
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send().end();
};
("");

// app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {

// });

export { addCategory, getCategories, deleteAllData, makePayment, stripeWebHook };
