import { Router } from 'express';
import express from 'express';

import { makePayment, stripeWebHook } from '../controllers/data.js';
import verifyToken from '../middlewares/auth.middleware.js';
import { deleteAllDraftCourses, deleteAllNotifications } from '../controllers/data.delete.js';

const router = Router();

// router.delete('/deleteall', verifyToken, deleteAllData);
router.post('/create-payment-sesson', verifyToken, makePayment);


//router.delete('/allNotifications', deleteAllNotifications);
//router.delete('/allDraftCourses', deleteAllDraftCourses);
export default router;

