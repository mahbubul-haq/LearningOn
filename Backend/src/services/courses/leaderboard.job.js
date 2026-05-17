import Course from "../../models/Course.js";
import redisClient from "../../configs/redisClient.js";
import { getGlobalRatingStats } from "./globalStats.service.js";
import { computeScore } from "./leaderboard.service.js";

export async function rebuildLeaderboard() {
    const globalStats = await getGlobalRatingStats();
    const C = globalStats.averageRating;

    const courses = await Course.find(
        { courseStatus: "published" },
        "courseTitle courseStatus owner courseThumbnail category coursePrice skillTags ratings enrolledStudentsCount"
    ).populate("owner", "name").lean();

    const todayKey = Math.floor(Date.now() / 86400000);

    const ranked = courses.map(course => {
        const score = computeScore(course, C, todayKey);

        return {
            ...course,
            score
        };
    });

    ranked.sort((a, b) => b.score - a.score);


    await redisClient.setEx(
        "leaderboard:popular",
        5 * 60 * 60,
        JSON.stringify(ranked.slice(0, 30))
    );
}