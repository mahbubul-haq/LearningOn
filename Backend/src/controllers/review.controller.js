import CourseRating from "../models/CourseRating.js";
import Course from "../models/Course.js";

const createOrUpdateReview = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const userId = req.userId;
        const { rating, review } = req.body;

        if (!rating || rating > 5 || rating < 1 || !Number.isInteger(rating)) {
            return res.status(400).json({
                success: false,
                message: "Rating must be an integer between 1 and 5",
            });
        }

        const previousRating = await CourseRating.findOne({
            courseId,
            userId,
        });

        let deltaRating = 0, deltaRatingCount = 0;
        if (previousRating) {
            deltaRating = rating - previousRating.rating;
        } else {
            deltaRatingCount = 1;
            deltaRating = rating;
        }

        const courseRating = await CourseRating.findOneAndUpdate({
            courseId,
            userId,
        }, {
            rating,
            review,
        }, {
            upsert: true,
            new: true,
        });

        const updatedCourse = await Course.findByIdAndUpdate(courseId, {
            $inc: {
                'ratings.totalRating': deltaRating,
                'ratings.numberOfRatings': deltaRatingCount,
            }
        }, {
            new: true,
        });

        return res.status(200).json({
            success: true,
            message: "Review created successfully",
            courseRating,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

const getUserCourseReview = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const userId = req.userId;

        const courseRating = await CourseRating.findOne({
            courseId,
            userId,
        });

        return res.status(200).json({
            success: true,
            courseRating,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

const getCourseReviews = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const skip = (page - 1) * limit;

        const reviews = await CourseRating.find({ courseId, review: { $exists: true, $ne: "" } })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("userId", "name picturePath");

        const totalReviews = await CourseRating.countDocuments({ courseId, review: { $exists: true, $ne: "" } });

        return res.status(200).json({
            success: true,
            reviews,
            totalReviews,
            currentPage: page,
            totalPages: Math.ceil(totalReviews / limit),
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export { createOrUpdateReview, getUserCourseReview, getCourseReviews };