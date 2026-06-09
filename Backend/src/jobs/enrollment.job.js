import cron from "node-cron";

import Payment from "../models/Payment.js";
import { processEnrollment } from "../services/enrollments/enrollment.service.js";

// runs everyday at 3:05 AM
cron.schedule("5 3 * * *", async () => {
    console.log("[CRON] Processing pending enrollments...");

    try {
        const pendingPayments = Payment.find({
            enrollmentStatus: "not_enrolled",
            stripeSessionId: { $exists: true, $ne: "" },
        }).cursor();

        for await (const payment of pendingPayments) {
            try {
                const result = await processEnrollment(payment.stripeSessionId);
                // console.log("[CRON] Enrollment processed:", {
                //     paymentId: payment._id,
                //     stripeSessionId: payment.stripeSessionId,
                //     status: result?.status,
                // });
            } catch (error) {
                // console.log("[CRON] Error processing enrollment:", {
                //     paymentId: payment._id,
                //     stripeSessionId: payment.stripeSessionId,
                //     error: error.message,
                // });
            }
        }

        console.log("[CRON] Pending enrollment processing completed");
    } catch (error) {
        console.log("[CRON] Error processing pending enrollments:", error);
    }
});
