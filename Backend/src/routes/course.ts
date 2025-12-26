import { Router } from "express";

import { deleteCourse, getAllCourses, getCourseById, getCourseByIdWithOutPopulate, getDraftCourses, newCourse, updateCourse } from "../controllers/course.js";
import { getCourseLessons, getFilteredCourses, getPopularCourses } from "../controllers/course.search.js";
import verifyToken from "../middlewares/auth.js";
import { getCourseProgress } from "../controllers/course.learning.js";


const router = Router();


router.post("/new", verifyToken, newCourse);
router.get("/draft", verifyToken, getDraftCourses);
router.put("/update/:courseId/:status", verifyToken, updateCourse);
router.get("/get/:courseId", getCourseById);
router.get("/get/plain/:courseId", verifyToken, getCourseByIdWithOutPopulate);
router.get("/all", getAllCourses);
router.get("/getmycourses", verifyToken, getAllCourses);
router.delete("/delete/:courseId", verifyToken, deleteCourse);
router.get("/getfiltered", getFilteredCourses);
router.get("/getpopular", getPopularCourses);
router.get("/getlessons/:courseId", verifyToken, getCourseLessons);

//Learning

router.get("/learning/progress/:courseId", verifyToken, getCourseProgress);

export default router;
