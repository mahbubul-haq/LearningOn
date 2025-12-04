import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "assets/images");
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

export { upload};