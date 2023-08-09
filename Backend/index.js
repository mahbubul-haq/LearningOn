import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

// internal imports
import {register} from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import dataRoutes from "./routes/data.js";

// configurations

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "assets/images")));

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

// routes

app.post(
    "/auth/register",
    upload.single("picture"),
    (req, res, next) => {
        req.body.picturePath = req.file?.filename;
        //console.log(req.body.picturePath);
        next();
    },
    register
);

app.use("/auth", authRoutes);
app.use("/data", dataRoutes);

app.get("/", (req, res) => {
    res.send("Hello World");
});



app.listen(5000, () => {
    console.log("Server is running on port 5000");
    mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true,
        })
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.log("Database connection failed"));
});
