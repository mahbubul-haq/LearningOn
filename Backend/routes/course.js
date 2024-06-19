import { Router } from "express";

import verifyToken from "../middlewares/auth.js";
import { newCourse, getDraftCourses } from "../controllers/course.js";
import { updateCourse, deleteCourse, getCourseById, getAllCourses, getCourseByIdWithOutPopulate } from "../controllers/course.js";

const router = Router();

router.post("/new", verifyToken, newCourse);
router.get("/draft", verifyToken, getDraftCourses);
router.put("/update/:courseId/:status", verifyToken, updateCourse);
router.get("/get/:courseId", getCourseById);
router.get("/get/plain/:courseId", verifyToken, getCourseByIdWithOutPopulate);
router.get("/all", getAllCourses);
router.get("/getmycourses", verifyToken, getAllCourses);
router.delete("/delete/:courseId", verifyToken, deleteCourse);

export default router;
