import { Router } from "express";

import { deleteCourse, getAllCourses, getCourseById, getCourseByIdWithOutPopulate, getDraftCourses, newCourse, updateCourse } from "../controllers/courses/course.controller.js";
import { getCourseLessons, getFilteredCourses, getPopularCourses } from "../controllers/courses/course.query.controller.js";
import verifyToken, { verifyTokenLight } from "../middlewares/auth.middleware.js";
import { getCourseProgress, updateProgress, updateWatchTime } from "../controllers/courses/course.progress.controller.js";


const router = Router();

// old api
router.post("/new", verifyToken, newCourse);
router.get("/get/plain/:courseId", verifyToken, getCourseByIdWithOutPopulate);
router.get("/all", getAllCourses);
router.get("/getpopular", getPopularCourses);


//Learning


// RESTful routes



export default router;
