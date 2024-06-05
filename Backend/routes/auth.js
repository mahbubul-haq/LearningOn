import { Router } from "express";
import { upload } from "../configs/multer.config.js";

import { login, register } from "../controllers/auth.js";

const router = Router();

router.post("/login", login);
// == uploading image to cloudinary
router.post("/register", register);

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
