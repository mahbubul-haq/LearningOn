import Course from "../../models/Course.js";
import { isValidObjectId } from "mongoose";

const getUserCourseIds = async (userId, courseId) => {
    if (courseId && isValidObjectId(courseId)) {
        const course = await Course.exists({
            _id: courseId,
            $or: [
                { owner: userId },
                { courseInstructors: userId }
            ]
        });
        if (course) {
            return [course._id];
            // return [courseId];
        }
    }

    let ids = await Course.distinct("_id", {
        $or: [
            { owner: userId },
            { courseInstructors: userId }
        ]
    });
    if (ids && ids.length > 0) {
        return [...ids];
    }
    return [];
};

const getCourseRatings = async (courseIds) => {
    if (!courseIds?.length) {
        return {
            totalRating: 0,
            numberOfRatings: 0,
            avgRating: 0
        };
    }

    const result = await Course.aggregate([
        {
            $match: {
                _id: { $in: courseIds }
            }
        },
        {
            $group: {
                _id: null,
                totalRating: { $sum: { $ifNull: ["$ratings.totalRating", 0] } },
                numberOfRatings: { $sum: { $ifNull: ["$ratings.numberOfRatings", 0] } }
            }
        },
        {
            $project: {
                _id: 0,
                totalRating: 1,
                numberOfRatings: 1,
                avgRating: {
                    $cond: [
                        { $eq: ["$numberOfRatings", 0] },
                        0,
                        {
                            $round: [
                                { $divide: ["$totalRating", "$numberOfRatings"] },
                                1
                            ]
                        }
                    ]
                }
            }
        }
    ]);

    return result[0] || {
        totalRating: 0,
        numberOfRatings: 0,
        avgRating: 0
    };
};

export {
    getUserCourseIds,
    getCourseRatings
}