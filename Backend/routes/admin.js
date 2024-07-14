import { Router } from "express";
import { login } from "../controllers/admin.auth.js";
import { getUnpublishedCourses } from "../controllers/course.search.js";
import { updateStatus } from "../controllers/course.update.js";
import verifyAdminToken from "../middlewares/adminAuth.js";

const router = Router();

//router.post("/register", register)
router.post("/login", login);
router.get("/verify", verifyAdminToken, (req, res) => {
    res.status(200).json({
        success: true,
    });
});
router.get("/unpublished", verifyAdminToken, getUnpublishedCourses);
router.put("/updateCourseStatus", verifyAdminToken, updateStatus);

export default router;
