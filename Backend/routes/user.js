import { Router } from "express";

import verifyToken from "../middlewares/auth.js";
import { getAllUsers, getUser } from "../controllers/user.js";

const router = Router();

router.get("/all", verifyToken, getAllUsers);
router.get("/getuser", verifyToken, getUser);

export default router;
