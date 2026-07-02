import { Router } from "express";
import { verifyTokenLight } from "../middlewares/auth.middleware.js";
import { loginRateLimiter, registerRateLimiter, googleAuthRateLimiter } from "../middlewares/rateLimit.middleware.js";

import { login, register, logout, refreshToken, googleLogin } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", loginRateLimiter, login);
router.post("/google", googleAuthRateLimiter, googleLogin);
// == uploading image to cloudinary
router.post("/register", registerRateLimiter, register);
router.post("/logout", verifyTokenLight, logout);
router.post("/refresh", refreshToken);

// == uploading image to file system using multer - discarded & register changed accordingly
// router.post(
//     "/register",
//     upload.single("picture"),
//     (req, res, next) => {
//         req.body.picturePath = req.file?.filename;
//         next();
//     },
//     register
// );

export default router;
