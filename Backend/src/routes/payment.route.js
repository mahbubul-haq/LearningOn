import { Router } from 'express';
import express from 'express';

import { getPaymentStatus, makePayment, stripeWebHook } from '../controllers/payment.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';
import { deleteAllDraftCourses, deleteAllNotifications } from '../controllers/data.delete.js';

const router = Router();

// router.delete('/deleteall', verifyToken, deleteAllData);
router.post('/create-payment-sesson', verifyToken, makePayment);
router.get('/payment-status/:courseId', verifyToken, getPaymentStatus);


//router.delete('/allNotifications', deleteAllNotifications);
//router.delete('/allDraftCourses', deleteAllDraftCourses);
export default router;

