import { Router } from "express";

import { deleteCourse, getAllCourses, getCourseById, getCourseByIdWithOutPopulate, getDraftCourses, getMyCourses, newCourse, updateCourse } from "../controllers/courses/course.controller.js";
import { getCourseLessons, getFilteredCourses, getPopularCourses } from "../controllers/courses/course.query.controller.js";
import verifyToken, { verifyTokenLight } from "../middlewares/auth.js";
import { getCourseProgress, updateProgress, updateWatchTime } from "../controllers/courses/course.progress.controller.js";


const router = Router();

// old api
router.post("/new", verifyToken, newCourse);
router.get("/draft", verifyToken, getDraftCourses);
router.put("/update/:courseId/:status", verifyToken, updateCourse);
router.get("/get/:courseId", getCourseById);
router.get("/get/plain/:courseId", verifyToken, getCourseByIdWithOutPopulate);
router.get("/all", getAllCourses);
router.get("/getmycourses", verifyToken, getMyCourses);
router.delete("/delete/:courseId", verifyToken, deleteCourse);
router.get("/getfiltered", getFilteredCourses);
router.get("/getpopular", getPopularCourses);
router.get("/getlessons/:courseId", verifyToken, getCourseLessons);

//Learning

router.get("/learning/progress/:courseId", verifyToken, getCourseProgress);
router.put("/learning/updateprogress/:courseId", verifyToken, updateProgress);
router.put("/learning/updatetime/:courseId", verifyTokenLight, updateWatchTime);

// RESTful routes



export default router;
