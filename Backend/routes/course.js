import {Router} from 'express';

import verifyToken from '../middlewares/auth.js';
import { newCourse, getDraftCourses } from '../controllers/course.js';
import { updateCourse, getCourseById, getAllCourses } from '../controllers/course.js';



const router = Router();

router.post('/new', verifyToken, newCourse);
router.get('/draft', verifyToken, getDraftCourses);
router.put('/update/:courseId/:status', verifyToken, updateCourse);
router.get('/get/:courseId', verifyToken, getCourseById);
router.get('/all', verifyToken, getAllCourses);

export default router;