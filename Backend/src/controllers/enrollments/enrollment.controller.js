import Enrollment from "../../models/Enrollment.js";
import Course from "../../models/Course.js";
import { isValidObjectId } from "mongoose";
import { getCourseRatings, getUserCourseIds } from "../../services/enrollments/enrollment.query.service.js";
import { buildTimeBoundaries } from "../../utils/time.utils.js";
import { formatAnalyticsResponse, runEnrollmentAnalytics } from "../../services/enrollments/enrollment.analytics.service.js";

const getEnrollmentsInMyCourses = async (req, res) => {
    try {
        const userId = req.userId;
        const { cursor, courseId } = req.query;
        const limit = Math.min(20, Math.max(10, parseInt(req.query.limit) || 10));

        const cursorQuery = {}
        if (cursor?.date && cursor?._id) {
            const date = new Date(cursor.date);
            if (isNaN(date.getTime()) || !isValidObjectId(cursor._id)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid cursor date or id",
                });
            }
            const id = cursor?._id;

            cursorQuery.$or = [
                { createdAt: { $lt: date } },
                { createdAt: date, _id: { $lt: id } }
            ]
        }
        let courseIds = [];
        if (courseId && isValidObjectId(courseId)) {
            const course = await Course.exists({
                _id: courseId,
                $or: [
                    { owner: userId },
                    { courseInstructors: userId }
                ]
            });
            if (!course) {
                return res.status(403).json({
                    success: false,
                    message: "You are not authorized to view this course",
                });
            }
            courseIds = [courseId];
        } else {
            courseIds = await Course.distinct("_id", {
                $or: [
                    { owner: userId },
                    { courseInstructors: userId }
                ]
            });
        }

        if (courseIds.length === 0) {
            return res.status(200).json({
                success: true,
                enrollments: [],
                nextCursor: null,
            })
        }

        let enrollments = await Enrollment.find({
            courseId: { $in: courseIds },
            ...cursorQuery
        }).sort({ createdAt: -1, _id: -1 }).limit(limit + 1)
            .populate("userId", "name picturePath")
            .populate("paymentId", "paidAmount").lean();

        let nextCursor = null;
        if (enrollments.length > limit) {
            enrollments.pop();
            nextCursor = {
                date: enrollments[enrollments.length - 1].createdAt.toISOString(),
                _id: enrollments[enrollments.length - 1]._id
            }
        }

        res.status(200).json({
            success: true,
            enrollments,
            nextCursor,
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}


const getEnrollmentAnalytics = async (req, res) => {
    try {
        const userId = req.userId;
        const { courseId, startDate, endDate } = req.query;

        // console.log("getEnrollmentAnalytics called", courseId, startDate, endDate);

        const parsedStartDate = new Date(startDate);
        const parsedEndDate = new Date(endDate);

        if (!parsedStartDate || !parsedEndDate) {
            return res.status(400).json({
                success: false,
                message: "Invalid date",
            });
        }

        if (parsedStartDate > parsedEndDate) {
            return res.status(200).json({
                success: true,
                chartData: [],
                totalRevenue: 0,
                totalEnrollments: 0,
                courseRatings: {
                    totalRating: 0,
                    numberOfRatings: 0,
                    avgRating: 0
                }
            });
        }

        const courseIds = await getUserCourseIds(userId, courseId);
        // console.log("courseIds", courseIds);

        if (!courseIds.length) {
            return res.status(200).json({
                success: true,
                chartData: [],
                totalRevenue: 0,
                totalEnrollments: 0,
                courseRatings: {
                    totalRating: 0,
                    numberOfRatings: 0,
                    avgRating: 0
                }
            })
        }

        const courseRatings = await getCourseRatings(courseIds);
        // console.log("courseRatings", courseRatings);

        const { boundaries, start, end } =
            buildTimeBoundaries(startDate, endDate);

        // console.log(boundaries, "boundaries")

        if (!start || !end || !boundaries.length) {
            return res.status(400).json({
                success: false,
                message: "Invalid years",
            })
        }

        const aggregationResult = await runEnrollmentAnalytics(
            courseIds,
            start,
            end,
            boundaries
        );

        // console.log(aggregationResult, "aggregationResult", boundaries, "boundaries");

        const { chartData, totalRevenue, totalEnrollments, totalRating, numberOfRatings } = formatAnalyticsResponse(aggregationResult, boundaries, start, end);
        // console.log(chartData, totalRevenue, totalEnrollments, "chartData, totalRevenue, totalEnrollments")

        return res.status(200).json({
            success: true,
            chartData,
            totalRevenue,
            totalEnrollments,
            courseRatings
        })

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export {
    getEnrollmentsInMyCourses,
    getEnrollmentAnalytics
}