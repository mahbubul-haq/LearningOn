import { v2 as cloudinary } from "cloudinary";

const cloudinaryConfig = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
};

const uploadImage = async (file, isVideo) => {
    console.log("uploadImage", file, isVideo);
    try {
        const uploadResponse = await cloudinary.uploader.upload(file, {
            upload_preset: "learningon",
            folder: "learningon",
            resource_type: isVideo ? "video" : "image",
        });
        return {
            success: true,
            uploadResponse: uploadResponse,
        };
    } catch (err) {
        return {
            success: false,
            errors: err
        };
    }
};

const deleteImage = async (id, resource_type) => {
    try {
        const deleteRes = await cloudinary.uploader.destroy(id, {
            resource_type: resource_type,
        });
        //console.log("Image deleted successfully");
        return {
            success: true,
            deleteRes: deleteRes,
        };
    } catch (err) {
        //console.error(err);
        return {
            success: false,
            errors: err,
        };
    }
};

export { cloudinary, uploadImage, deleteImage, cloudinaryConfig};
