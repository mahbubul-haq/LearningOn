import {Router} from 'express';
import express from 'express';

import { addCategory, deleteAllData, getCategories, makePayment, stripeWebHook } from '../controllers/data.js';
import verifyToken from '../middlewares/auth.js';
import { deleteAllDraftCourses, deleteAllNotifications } from '../controllers/data.delete.js';

const router = Router();

router.post('/addcategory', addCategory);

router.get('/getcategories', getCategories);
// router.delete('/deleteall', verifyToken, deleteAllData);
router.post('/create-payment-sesson', verifyToken, makePayment);
router.post('/stripe/webhook', express.raw({type: 'application/json'}), stripeWebHook);
//router.delete('/allNotifications', deleteAllNotifications);
//router.delete('/allDraftCourses', deleteAllDraftCourses);
export default router;

