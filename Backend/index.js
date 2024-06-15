import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { fileURLToPath } from "url";

// internal imports
import authRoutes from "./routes/auth.js";
import dataRoutes from "./routes/data.js";
import courseRoutes from "./routes/course.js";
import verifyToken from "./middlewares/auth.js";
import userRoutes from "./routes/user.js";
import notificationRoutes from "./routes/notification.js";
import cloudinaryRoutes from "./routes/cloudinary.js";
import http from "http";
import { uploadFile, deleteFile } from "./controllers/uploads.js";
import { upload } from "./configs/multer.config.js";
import { cloudinaryConfig } from "./utils/cloudinary.js";
import {connectSocket} from "./socket.io.js";
// configurations


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

cloudinaryConfig();

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
        origin: ["https://learning-on.vercel.app", "http://localhost:5173", process.env.CLIENT_URL],
        credentials: true,
    }
));

app.use("/images", express.static(path.join(__dirname, "assets/images")));

// routes

app.use("/auth", authRoutes);
app.use("/course", courseRoutes);
app.use("/data", dataRoutes);
app.use("/users", userRoutes);
app.use("/notification", notificationRoutes);
app.use("/cloudinary", cloudinaryRoutes);

app.post("/fileupload", verifyToken, upload.single("picture"), uploadFile);
app.delete("/filedelete/:fileName/:isVideo", deleteFile);

app.get("/", (req, res) => {
    res.send("Hello World2");
});

const server = http.createServer(app);

connectSocket(server);

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
