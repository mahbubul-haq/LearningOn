import { Router } from "express";

import verifyToken from "../middlewares/auth.js";
import { getAllUsers } from "../controllers/user.js";

const router = Router();

router.get("/all", verifyToken, getAllUsers);

export default router;
