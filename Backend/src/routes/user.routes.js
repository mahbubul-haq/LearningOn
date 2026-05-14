import { Router } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import verifyToken from "../middlewares/auth.middleware.js";
import { uploadProfilePicture } from "../controllers/users/user.files.controller.js";
import { upload } from "../configs/multer.config.js";
import { updateUser, follow, getUser, getAllUsers, getUserById } from "../controllers/users/user.controller.js";
const router = Router();

router.patch("/profile-picture", verifyToken, upload.single("picture"), asyncHandler(uploadProfilePicture));
router.patch("/profile", verifyToken, updateUser);
router.post("/:userId/follow", verifyToken, follow);
router.get("/", getAllUsers)
router.get("/me", verifyToken, getUser);
router.get("/:userId", getUserById)


export default router;