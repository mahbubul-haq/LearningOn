import { Router } from "express";
import verifyToken from "../middlewares/auth.js";
import { generateCertificate, getCertificateDocument } from "../controllers/certificate.controller.js";
const router = Router();

router.post("/", verifyToken, generateCertificate)
router.get("/:courseId", verifyToken, getCertificateDocument)


export default router;
