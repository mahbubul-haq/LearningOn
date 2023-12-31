import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import fs from "fs";

// internal imports
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import dataRoutes from "./routes/data.js";
import courseRoutes from "./routes/course.js";
import verifyToken from "./middlewares/auth.js";
import userRoutes from "./routes/user.js";
import notificationRoutes from "./routes/notification.js";
import http from "http";
import { Server } from "socket.io";
//chage in index.js

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

app.post("/fileupload", verifyToken, upload.single("picture"), (req, res) => {
    if (req.file?.filename) {
        res.status(200).json({
            success: true,
            fileName: req.file.filename,
        });
    } else {
        res.status(400).json({
            success: false,
            message: "File upload failed",
        });
    }
});

app.delete("/filedelete/:fileName", verifyToken, (req, res) => {
    const fileName = req.params.fileName;
    fs.unlink(path.join(__dirname, "assets/images", fileName), (err) => {
        if (err) {
            console.log(err);
            res.status(400).json({
                success: false,
                message: "File delete failed",
            });
        } else {
            res.status(200).json({
                success: true,
                message: "File deleted",
            });
        }
    });
});

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
app.use("/course", courseRoutes);
app.use("/data", dataRoutes);
app.use("/users", userRoutes);
app.use("/notification", notificationRoutes);

app.get("/", (req, res) => {
    res.send("Hello World");
});

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
    },
});

io.on("connection", (socket) => {
    //console.log("a user connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });

    socket.on("course-purchased", (data) => {
        //console.log(data);
        socket.broadcast.emit("my-course-purchased", data);
    });
});

server.listen(5000, () => {
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
