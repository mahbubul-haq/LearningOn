import {Router} from 'express';

import { addCategory, getCategories } from '../controllers/data.js';

const router = Router();

router.post('/addcategory', addCategory);

router.get('/getcategories', getCategories);

export default router;

