import {Router} from 'express';

import verifyToken from '../middlewares/auth.js';
import { newCourse, getDraftCourses } from '../controllers/course.js';
import { updateCourse } from '../controllers/course.js';


const router = Router();

router.post('/new', verifyToken, newCourse);
router.get('/draft', verifyToken, getDraftCourses);
router.put('/update/:courseId/:status', verifyToken, updateCourse);



export default router;