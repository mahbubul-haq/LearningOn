import {Router} from 'express';

import { addCategory, deleteAllData, getCategories } from '../controllers/data.js';
import verifyToken from '../middlewares/auth.js';

const router = Router();

router.post('/addcategory', addCategory);

router.get('/getcategories', getCategories);
router.delete('/deleteall', verifyToken, deleteAllData);

export default router;

