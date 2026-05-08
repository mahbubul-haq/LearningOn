import fs from "fs";
import AppError from "../../errors/AppError.js";

const handleUpload = async ({ file, uploadFn, dbFn, rollbackFn, resource_type = "image" }) => {
    let uploadRes;

    if (!file || !file.path) {
        throw new AppError("FILE_MISSING", 400);
    }

    try {
        uploadRes = await uploadFn(file.path, resource_type);
        // console.log(uploadRes);
        const dbResult = await dbFn(uploadRes);

        return dbResult;

    } catch (err) {
        if (uploadRes?.public_id) {
            try {
                await rollbackFn(uploadRes.public_id, resource_type);
            } catch (rollbackErr) {
                console.log("Rollback failed", rollbackErr);
            }
        }
        throw err;

    } finally {
        await fs.promises.unlink(file.path).catch(() => { });
    }
};

export default handleUpload;