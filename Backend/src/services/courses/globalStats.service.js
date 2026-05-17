import redisClient from "../../configs/redisClient.js";
import Course from "../../models/Course.js";

export async function getGlobalRatingStats() {
    const cached = await redisClient.get("global:rating:stats");
    if (cached) return JSON.parse(cached);

    const result = await Course.aggregate([
        {
            $group: {
                _id: null,
                totalRating: { $sum: "$ratings.totalRating" },
                numberOfRatings: { $sum: "$ratings.numberOfRatings" }
            }
        }
    ]);

    const stats = result[0] || {
        totalRating: 0,
        numberOfRatings: 0
    };

    const averageRating =
        stats.numberOfRatings === 0
            ? 0
            : stats.totalRating / stats.numberOfRatings;

    const finalStats = {
        ...stats,
        averageRating
    };

    await redisClient.set(
        "global:rating:stats",
        JSON.stringify(finalStats),
        {
            EX: 60 * 60 * 24,
        }
    );

    return finalStats;
}