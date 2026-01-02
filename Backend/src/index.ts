import "dotenv/config";

import cors from "cors";

import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";


// internal imports
import http from "http";
import { upload } from "./configs/multer.config.js";
import { initializeStripe } from "./controllers/data.js";
import { deleteFile, uploadFile } from "./controllers/uploads.js";
import verifyToken from "./middlewares/auth.js";
import adminRoutes from "./routes/admin.js";
import authRoutes from "./routes/auth.js";

import courseRoutes from "./routes/course.js";
// import courseProgressRoutes from "./routes/courseProgress.js";
import dataRoutes from "./routes/data.js";
import notificationRoutes from "./routes/notification.js";
import userRoutes from "./routes/user.js";
import { connectSocket } from "./socket.io.js";
import "./utils/cloudinary.js";
import cloudinaryRoutes from "./routes/cloudinary.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("dirname", __dirname);

const app = express();





initializeStripe();

// middlewares
app.use(express.json({
    limit: "500mb",
}));
app.use(express.urlencoded({
    limit: "500mb",
    extended: true,
}));

app.use(cors(
    {
        origin: ["https://learning-on.vercel.app", "http://localhost:5173", process.env.CLIENT_URL!],
        credentials: true,
    }
));

app.use("/images", express.static(path.join(__dirname, "../assets/images")));

// routes

app.use("/auth", authRoutes);
app.use("/course", courseRoutes);
app.use("/data", dataRoutes);
app.use("/users", userRoutes);
app.use("/notification", notificationRoutes);
app.use("/cloudinary", cloudinaryRoutes);
app.use("/admin", adminRoutes);
// app.use("/learning", courseProgressRoutes);

app.post("/fileupload", verifyToken, upload.single("picture"), uploadFile);
app.delete("/filedelete/:fileName/:isVideo", deleteFile);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use((req, res, next) => {
    res.status(404).send({
        success: false,
        error: "404 Not found"
    })
})

const server = http.createServer(app);

connectSocket(server);

server.listen(5000, () => {
    console.log("Server is running on port 5000");
    mongoose
        .connect(process.env.MONGO_URI!)
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.log("Database connection failed"));
});
