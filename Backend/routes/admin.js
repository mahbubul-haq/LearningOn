import { Router } from "express";
import { login } from "../controllers/admin.auth.js";

const router = Router();

//router.post("/register", register)
router.post("/login", login);

export default router;
