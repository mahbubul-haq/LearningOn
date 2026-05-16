import { Router } from 'express';

import { addCategory, getCategories } from '../controllers/category.controller.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = Router();

router.post('/', asyncHandler(addCategory));

router.get('/', asyncHandler(getCategories));


//router.delete('/allNotifications', deleteAllNotifications);
//router.delete('/allDraftCourses', deleteAllDraftCourses);
export default router;

