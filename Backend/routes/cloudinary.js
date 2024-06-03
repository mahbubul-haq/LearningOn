import { cloudinary, uploadImage, deleteImage } from "../utils/cloudinary.js";
import { Router } from "express";

const router = Router();

router.post("/uploadimage", async (req, res) => {
    try {
        const uploadedResponse = await uploadImage(req.body.imageBase64);
        if (uploadedResponse.success) {
            res.json({
                success: true,
                uploadedImage: uploadedResponse.uploadResponse,
            });
        } else {
            res.status(500).json({
                success: false,
                err: "Something went wrong",
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            err: "Something went wrong",
        });
    }
});

router.post("/deleteimage", async (req, res) => {
    try {
        const res = await deleteImage(req.body.id);
        if (res.success) {
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false, err: "Deletion failed" });
        }
    } catch (err) {
        res.status(500).json({ success: false, err: "Deletion failed" });
    }
});

export default router;
