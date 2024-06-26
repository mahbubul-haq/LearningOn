import { Router } from "express";

import verifyToken from "../middlewares/auth.js";
import { getAllUsers, getUser, getUserById, follow, updateUser } from "../controllers/user.js";

const router = Router();

router.get("/all", getAllUsers);
router.get("/getuser", verifyToken, getUser);
router.get("/getuser/:userId", getUserById);
router.put("/follow/:userId", verifyToken, follow);
router.put("/update", verifyToken, updateUser);

export default router;
