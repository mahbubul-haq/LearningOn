import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("upload dirname", __dirname);
const uploadFile = async (req, res) => {
  // follow up of multer upload.single("picture")

  // upload the image in cloudinary using uploadImage function
  //console.log(req.body);
  let isVideo = req.body.isVideo === "true";
  try {

    if (req.file?.filename) {
      //console.log("here", req.file);
      const uploadRes = await uploadImage(req.file.path, isVideo);
      //console.log('not sure what is happening here', uploadRes);

      fs.unlink(
        path.join(__dirname, "../../assets/images", req.file.filename),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );

      if (uploadRes.success) {
        console.log("uploaded to cloudinary");
        const response = {
          success: true,
          fileName: uploadRes.uploadResponse.public_id,
        };

        if (isVideo) {
          response.videoDuration = uploadRes.uploadResponse.duration;
        }

        res.status(200).json(response);
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
  }
  catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "File upload failed",
    });
  }
};

const deleteFile = async (req, res) => {
  let fileName = req.params.fileName;
  let resource_type = req.params.isVideo === "true" ? "video" : "image";
  fileName = fileName.replace(/@/g, "/");
  //console.log(resource_type, fileName)

  console.log(fileName);
  try {
    const deleteRes = await deleteImage(fileName, resource_type);
    //console.log(deleteRes, fileName);

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
  }
  catch (err) {
    console.log(err);
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
