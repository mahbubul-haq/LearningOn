import Course from "../../models/Course.js";
import redisClient from "../../configs/redisClient.js";
import { getGlobalRatingStats } from "./globalStats.service.js";
import { computeScore, getLast20DaysTotalEnrollments } from "./leaderboard.service.js";

export async function rebuildLeaderboard() {
    const globalStats = await getGlobalRatingStats();
    const C = globalStats.averageRating;

    const courses = await Course.find(
        { courseStatus: "published" },
        "courseTitle courseStatus owner courseThumbnail category coursePrice skillTags ratings enrolledStudentsCount enrollmentTrend trendDayKeys"
    ).populate("owner", "name").lean();

    const todayKey = Math.floor(Date.now() / 86400000);

    let ranked = courses.map(course => {
        const score = computeScore(course, C, todayKey);

        delete course.enrollmentTrend;
        delete course.trendDayKeys;

        return {
            ...course,
            score
        };
    });


    ranked.sort((a, b) => b.score - a.score);


    await redisClient.setEx(
        "leaderboard:popular",
        25 * 60 * 60,
        JSON.stringify(ranked.slice(0, 30))
    );
}

export async function rebuildTrendingCourses() {
    const todayKey = Math.floor(Date.now() / 86400000);
    const courses = await Course.find({
        courseStatus: "published"
    })
        .select(
            {
                courseTitle: 1,
                courseThumbnail: 1,
                owner: 1,
                ratings: 1,
                coursePrice: 1,
                skillTags: 1,
                courseStatus: 1,
                category: 1,
                enrolledStudentsCount: 1,
                enrollmentTrend: 1,
                trendDayKeys: 1,
            }
        )
        .populate("owner", "name")
        .lean();

    let preCalculatedCourses = courses.map((course) => {
        let last20DaysEnrollments = getLast20DaysTotalEnrollments(course, todayKey);

        delete course.enrollmentTrend;
        delete course.trendDayKeys;

        return {
            ...course,
            last20DaysEnrollments,
        }
    });


    preCalculatedCourses.sort((a, b) => {
        return b.last20DaysEnrollments - a.last20DaysEnrollments;
    })

    await redisClient.setEx(
        "leaderboard:trending",
        25 * 60 * 60,
        JSON.stringify(preCalculatedCourses.slice(0, 25))
    );
}

export async function rebuildRecentCourses() {
    const courses = await Course.find({
        courseStatus: "published"
    })
        .sort({ createdAt: -1 })
        .limit(25)
        .select(
            {
                courseTitle: 1,
                courseThumbnail: 1,
                owner: 1,
                ratings: 1,
                coursePrice: 1,
                skillTags: 1,
                courseStatus: 1,
                category: 1,
                enrolledStudentsCount: 1,
            }
        )
        .populate("owner", "name")
        .lean();

    await redisClient.setEx(
        "leaderboard:recent",
        5 * 60 * 60,
        JSON.stringify(courses)
    );
}