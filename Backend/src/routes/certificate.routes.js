import { Router } from "express";
import verifyToken from "../middlewares/auth.js";
import { generateCertificate, getCertificateDocument, verifyCertificatePublic } from "../controllers/certificate/certificate.controller.js";
const router = Router();

// Public route to verify certificate via HTML response
router.get("/verify/:certificateId", verifyCertificatePublic);

// Protected routes
router.post("/", verifyToken, generateCertificate)
router.get("/:courseId", verifyToken, getCertificateDocument)


export default router;
