import { Router } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import verifyToken from "../middlewares/auth.js";
import { uploadProfilePicture } from "../controllers/users/user.files.controller.js";
import { upload } from "../configs/multer.config.js";
const router = Router();

router.patch("/profile-picture", verifyToken, upload.single("picture"), asyncHandler(uploadProfilePicture));


export default router;