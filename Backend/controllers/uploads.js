import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadFile = (req, res) => { // follow up of multer upload.single("picture")
    if (req.file?.filename) {
        res.status(200).json({
            success: true,
            fileName: req.file.filename,
        });
    } else {
        res.status(400).json({
            success: false,
            message: "File upload failed",
        });
    }
};

const deleteFile =  (req, res) => {
    const fileName = req.params.fileName;
    
    fs.unlink(path.join(__dirname, "../assets/images", fileName), (err) => {
        if (err) {
            console.log(err);
            res.status(400).json({
                success: false,
                message: "File delete failed",
            });
        } else {
            res.status(200).json({
                success: true,
                message: "File deleted",
            });
        }
    });
};

export { uploadFile, deleteFile }; 