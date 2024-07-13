import { Router } from "express";
import { login } from "../controllers/admin.auth.js";
import verifyAdminToken from "../middlewares/adminAuth.js";

const router = Router();

//router.post("/register", register)
router.post("/login", login);
router.get("/verify", verifyAdminToken, (req, res) => {
    res.status(200).json({
        success: true,
    });
});

export default router;
