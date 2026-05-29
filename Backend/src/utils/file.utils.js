import fs from "fs"

const unlinkUploadFile = (file) => {
    if (!file?.path) return;

    fs.unlink(file.path, (err) => {
        if (err) console.log(err);
    });
};

export { unlinkUploadFile };