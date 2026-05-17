import cron from "node-cron";
import { rebuildLeaderboard } from "../services/courses/leaderboard.job.js";

try {
    //runs every 2 hours
    cron.schedule("0 */2 * * *", async () => {
        // console.log("Rebuilding leaderboard...");
        await rebuildLeaderboard();
    });
} catch (error) {
    console.log("Error rebuilding leaderboard: ", error);
}
