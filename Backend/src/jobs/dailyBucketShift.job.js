// import cron from "node-cron";
// import Course from "../models/Course.js";

// // runs every day at 00:05 AM
// cron.schedule("36 21 * * *", async () => {
//     console.log("[CRON] Shifting last20Days buckets...");

//     try {
//         const courses = await Course.find({
//             courseStatus: { $in: ["published", "unpublished"] }
//         }, "enrollmentTrend trendDayIndex");

//         for (const course of courses) {
//             // move pointer
//             course.trendDayIndex = (course.trendDayIndex + 1) % 20;

//             // reset new day bucket
//             course.enrollmentTrend[course.trendDayIndex] = 0;

//             await course.save();
//         }

//         console.log("[CRON] Bucket shift completed");
//     } catch (err) {
//         console.error("[CRON] Error:", err);
//     }
// });