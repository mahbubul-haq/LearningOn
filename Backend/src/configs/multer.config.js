import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null, path.join(__dirname, "../../assets/images"));
    },
    filename: (req, file, cb) => {
        cb(
            null,
            //date now milliseconds + random number 3 digit random number + original file name
            new Date().getTime() +
            "-" +
            Math.round(Math.random() * 1000) +
            "-" +
            file.originalname
        );
    },
});

const upload = multer({ storage: storage });

export { upload };