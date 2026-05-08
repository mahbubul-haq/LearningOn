import cloudinary from "../../utils/cloudinary.js";
import AppError from "../../errors/AppError.js";

const uploadFile = async (filePath, resource_type = "image") => {
    // console.log("uploadImage", file, isVideo);
    const upload = async () => {
        const uploadResponse = await cloudinary.uploader.upload(filePath, {
            upload_preset: "learningon",
            folder: "learningon",
            resource_type: resource_type,
        });
        return {
            public_id: uploadResponse.public_id,
            secure_url: uploadResponse.secure_url
        };
    }

    try {
        return await upload();

    } catch (err) {
        console.log("cloudinary upload error, retrying...", err);
        try {
            await cloudinary.api.ping();
            return await upload();
        } catch (retryErr) {
            throw new AppError("UPLOAD_FAILED", 500);
        }
    }
};

const deleteFile = async (publicId, resource_type = "image") => {

    if (!publicId) {
        throw new AppError("MISSING_PUBLIC_ID", 500);
    }

    const del = async () => {

        const response = await cloudinary.uploader.destroy(
            publicId,
            { resource_type }
        );

        if (response.result !== "ok") {
            throw new AppError("DELETE_FAILED", 500);
        }

        return response;
    };

    try {
        return await del();

    } catch (err) {
        console.log("Cloudinary delete error, retrying...", err);

        try {
            return await del();

        } catch (retryErr) {
            console.log("Retry delete failed:", retryErr);
            throw new AppError("DELETE_FAILED", 500);
        }
    }
};

export { uploadFile, deleteFile };