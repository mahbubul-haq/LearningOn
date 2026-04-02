import { Router } from "express";
import { getCourses } from "../controllers/courses/course.query.controller.js";

const router = Router();

router.get("/", getCourses);


export default router;
