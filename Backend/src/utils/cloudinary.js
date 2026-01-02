import { v2 as cloudinary } from "cloudinary";

const getConfig = () => ({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

cloudinary.config(getConfig());

(async () => {
    try {
        const config = getConfig();

        await cloudinary.api.ping();
        console.log(" Cloudinary connected");
    } catch (err) {
        console.error("Cloudinary connection failed", err);
        // process.exit(1); 
    }
})();

const cloudinaryConfig = () => {
    cloudinary.config(getConfig());
};

const uploadImage = async (file, isVideo) => {
    cloudinary.config(getConfig());
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
        console.log("cloudinary upload error, retrying...", err);
        try {
            await cloudinary.api.ping();
            const uploadResponse = await cloudinary.uploader.upload(file, {
                upload_preset: "learningon",
                folder: "learningon",
                resource_type: isVideo ? "video" : "image",
            });
            return {
                success: true,
                uploadResponse: uploadResponse,
            };
        } catch (retryErr) {
            console.log("cloudinary retry error", retryErr);
            return {
                success: false,
                errors: retryErr
            };
        }
    }
};

const deleteImage = async (id, resource_type) => {
    cloudinary.config(getConfig());
    console.log("deleteImage", id, resource_type);

    try {

        const deleteRes = await cloudinary.uploader.destroy(id, {
            resource_type: resource_type,
        });
        return {
            success: true,
            deleteRes: deleteRes,
        };
    } catch (err) {
        console.log("cloudinary delete error, retrying...", err);
        try {
            await cloudinary.api.ping();
            const deleteRes = await cloudinary.uploader.destroy(id, {
                resource_type: resource_type,
            });
            return {
                success: true,
                deleteRes: deleteRes,
            };
        } catch (retryErr) {
            console.log("cloudinary delete retry error", retryErr);
            return {
                success: false,
                errors: retryErr,
            };
        }
    }
};



export { uploadImage, deleteImage, cloudinaryConfig };
