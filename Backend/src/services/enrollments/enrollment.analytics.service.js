import Enrollment from "../../models/Enrollment.js";

const runEnrollmentAnalytics = async (courseIds, start, end, boundaries) => {
    const result = await Enrollment.aggregate([
        {
            $match: {
                courseId: { $in: courseIds },
                createdAt: { $gte: start, $lte: end }
            }
        },

        {
            $lookup: {
                from: "payments",
                localField: "paymentId",
                foreignField: "_id",
                as: "payment"
            }
        },

        {
            $unwind: {
                path: "$payment",
                preserveNullAndEmptyArrays: true
            }
        },

        {
            $addFields: {
                revenue: { $ifNull: ["$payment.paidAmount", 0] }
            }
        },

        {
            $facet: {
                chart: [
                    {
                        $bucket: {
                            groupBy: "$createdAt",
                            boundaries: boundaries,
                            default: "other",
                            output: {
                                enrollments: { $sum: 1 },
                                revenue: { $sum: "$revenue" }
                            }
                        }
                    }
                ],
                totals: [
                    {
                        $group: {
                            _id: null,
                            totalRevenue: { $sum: "$revenue" },
                            totalEnrollments: { $sum: 1 },
                            totalRating: { $sum: "$ratings.totalRating" },
                            numberOfRatings: { $sum: "$ratings.numberOfRatings" },
                        }
                    }
                ]
            }
        }
    ]);

    return result[0] ?? {
        chart: [],
        totals: []
    };
};


const formatAnalyticsResponse = (aggregationResult, boundaries, start, end) => {
    // 1. Normalize MongoDB bucket output into a Map (safe lookup)
    const chartMap = new Map(
        (aggregationResult.chart || [])
            .filter(b => b._id !== "other")
            .map(b => [
                new Date(b._id).getTime(),
                b
            ])
    );

    // 2. Build chart data strictly from boundaries (source of truth)

    let diff = end.getTime() - start.getTime();
    let year_ms = 365 * 86400000;
    let chartData;
    let timeLabel = (d) => {
        const date = new Date(d);
        const month = date.toLocaleString("default", { month: "short" });

        if (diff > year_ms) {
            // MMM YY → Apr 25
            return `${month} ${String(date.getFullYear()).slice(2)}`;
        }

        // DD MMM → 21 Apr
        return `${date.getDate()} ${month}`;
    };

    chartData = boundaries.slice(0, -1).map((boundary) => {
        const key = new Date(boundary).getTime();
        const bucket = chartMap.get(key);

        return {
            name: timeLabel(boundary),
            enrollments: bucket?.enrollments || 0,
            revenue: bucket?.revenue || 0
        };
    });


    // 3. Safe totals extraction
    const totals = aggregationResult.totals?.[0] || {
        totalRevenue: 0,
        totalEnrollments: 0,
        totalRating: 0,
        numberOfRatings: 0
    };

    // 4. Final normalized response
    return {
        chartData,
        totalRevenue: totals.totalRevenue,
        totalEnrollments: totals.totalEnrollments,
        totalRating: totals.totalRating,
        numberOfRatings: totals.numberOfRatings
    };
};

export { runEnrollmentAnalytics, formatAnalyticsResponse };