import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadFile = async (req, res) => {
  // follow up of multer upload.single("picture")

  // upload the image in cloudinary using uploadImage function

  if (req.file?.filename) {
    const uploadRes = await uploadImage(req.file.path);

    if (uploadRes.success) {
      res.status(200).json({
        success: true,
        fileName: uploadRes.uploadResponse.public_id,
      });
      fs.unlink(
        path.join(__dirname, "../assets/images", req.file.filename),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    } else {
      res.status(400).json({
        success: false,
        message: "File upload failed",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "File upload failed",
    });
  }
};

const deleteFile = async (req, res) => {
  let fileName = req.params.fileName;
  fileName = fileName.replace(/@/g, "/");

  const deleteRes = await deleteImage(fileName);
  console.log(fileName);

  if (deleteRes.success) {
    res.status(200).json({
      success: true,
      message: "File deleted",
    });
  } else {
    res.status(400).json({
      success: false,
      message: "File delete failed",
    });
  }

  //   fs.unlink(path.join(__dirname, "../assets/images", fileName), (err) => {
  //     if (err) {
  //       console.log(err);
  //       res.status(400).json({
  //         success: false,
  //         message: "File delete failed",
  //       });
  //     } else {
  //       res.status(200).json({
  //         success: true,
  //         message: "File deleted",
  //       });
  //     }
  //   });
};

export { uploadFile, deleteFile };
