import { Router } from "express";
import verifyToken from "../middlewares/auth.js";
import { getEnrollmentsInMyCourses } from "../controllers/enrollment.controller.js";


const router = Router();

router.get("/", verifyToken, getEnrollmentsInMyCourses);

export default router;