import handleUpload from "../../services/upload/uploadHandler.js";
import { uploadFile, deleteFile } from "../../services/upload/uploadFile.js";
import People from "../../models/People.js";
import AppError from "../../errors/AppError.js";


const uploadProfilePicture = async (req, res) => {
    const oldAvatar = await People.findById(req.userId).select("avatar").lean();

    const result = await handleUpload({
        file: req.file,
        uploadFn: uploadFile,
        dbFn: async (uploadRes) => {
            const user = await People.findByIdAndUpdate(req.userId, { avatar: { public_id: uploadRes.public_id, secure_url: uploadRes.secure_url } }, { new: true })
            if (!user) {
                throw new AppError("USER_NOT_FOUND", 404);
            }
            return user;
        },
        rollbackFn: deleteFile,
        resource_type: req.body.resource_type
    });

    if (oldAvatar?.avatar?.public_id) {
        deleteFile(oldAvatar.avatar.public_id, "image").catch((err) => {
            console.log("Old avatar cleanup failed", err);
        });
    }

    res.status(200).json({
        success: true,
        message: "Profile picture uploaded successfully",
        avatar: result.avatar,
    });
}

export {
    uploadProfilePicture
}