import { v2 as cloudinary } from "cloudinary";

const cloudinaryConfig = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
};

const uploadImage = async (file) => {
    try {
        const uploadResponse = await cloudinary.uploader.upload(file, {
            upload_preset: "learningon",
            folder: "learningon",
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

const deleteImage = async (id) => {
    try {
        await cloudinary.uploader.destroy(id);
        //console.log("Image deleted successfully");
        return {
            success: true,
        };
    } catch (err) {
        //console.error(err);
        return {
            success: false,
        };
    }
};

export { cloudinary, uploadImage, deleteImage, cloudinaryConfig};
