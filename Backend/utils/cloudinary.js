import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: "dvmqygstw",
    api_key: "753691897229578",
    api_secret: "2JpHydroVevWte0AFRmgZa6w7GU",
});

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

export { cloudinary, uploadImage, deleteImage };
