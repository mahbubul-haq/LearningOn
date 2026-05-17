import cron from "node-cron";
import { rebuildLeaderboard, rebuildRecentCourses, rebuildTrendingCourses } from "../services/courses/course.leaderboard.service.js";


//runs everyday at 5:05 AM
cron.schedule("5 5 * * *", async () => {
    // console.log("Rebuilding leaderboard...");
    try {
        await rebuildLeaderboard();
    } catch (error) {
        console.log("Error rebuilding leaderboard: ", error);
    }
});


//runs everyday at 4:05 AM
cron.schedule("5 4 * * *", async () => {
    //console.log("Rebuilding trending courses...");
    try {
        await rebuildTrendingCourses();
    } catch (err) {
        console.log("Error rebuilding trending courses: ", err);
    }
});


//runs every 3 hours at 45 minutes past the hour
cron.schedule("45 */3 * * *", async () => {
    // console.log("Rebuilding recent courses...");
    try {
        await rebuildRecentCourses();
    } catch (err) {
        console.log("Error rebuilding recent courses: ", err);
    }
});