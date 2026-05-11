import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware.js";
import { getEnrollmentAnalytics, getEnrollmentsInMyCourses } from "../controllers/enrollments/enrollment.controller.js";


const router = Router();

router.get("/", verifyToken, getEnrollmentsInMyCourses);
router.get("/analytics", verifyToken, getEnrollmentAnalytics);

export default router;