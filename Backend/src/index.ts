import "dotenv/config";

import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";


// internal imports
import http from "http";
import { upload } from "./configs/multer.config.js";
import { initializeStripe, stripeWebHook } from "./controllers/data.js";
import { deleteFile, uploadFile } from "./controllers/uploads.js";
import verifyToken from "./middlewares/auth.middleware.js";
import adminRoutes from "./routes/admin.js";
import authRoutes from "./routes/auth.routes.js";
import quizRoutes from "./routes/quiz.routes.js";

// import courseRoutes from "./routes/course.js";
import courseRoutesV1 from "./routes/course.routes.js";
import courseProgressRoutes from "./routes/course-progress.routes.js";
import dataRoutes from "./routes/data.js";
import notificationRoutes from "./routes/notification.routes.js";
import { connectSocket } from "./socket.io.js";
import "./utils/cloudinary.js";
import cloudinaryRoutes from "./routes/cloudinary.js";
import certificateRoutes from "./routes/certificate.routes.js";
import enrollmentRoutes from "./routes/enrollment.routes.js";
import errorHandler from "./errors/errorHandler.js";
import userRoutesNew from "./routes/user.routes.js";
import { connectRedis } from "./configs/redisClient.js";
import categoryRoutes from "./routes/category.routes.js";
import "./jobs/courses.job.js"
import Course from "./models/Course.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("dirname", __dirname);

const app = express();

app.post('/data/stripe/webhook', express.raw({ type: 'application/json' }), stripeWebHook);



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

app.use(cookieParser());

app.use("/images", express.static(path.join(__dirname, "../assets/images")));

// routes

// LEGACY

// app.use("/course", courseRoutes);
app.use("/data", dataRoutes);


app.use("/cloudinary", cloudinaryRoutes);
app.use("/admin", adminRoutes);


// NEW (RESTful)

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/courses", courseRoutesV1);
app.use("/api/v1/quiz", quizRoutes);
app.use("/api/v1/course-progress", courseProgressRoutes);
app.use("/api/v1/certificates", certificateRoutes);
app.use("/api/v1/enrollments", enrollmentRoutes)
app.use("/api/v1/users", userRoutesNew);
app.use("/api/v1/categories", categoryRoutes);
// app.use("/learning", courseProgressRoutes);

//  will be refactored later

app.post("/fileupload", verifyToken, upload.single("picture"), uploadFile);
app.delete("/filedelete/:fileName/:isVideo", deleteFile);



app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello World")
});

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send({
        success: false,
        error: "404 Not found"
    })
})

app.use(errorHandler);


const server = http.createServer(app);

async function startServer() {
    try {
        connectSocket(server);

        await connectRedis();
        await mongoose.connect(process.env.MONGO_URI!);

        console.log("Connected to MongoDB");

        server.listen(5000, () => {
            console.log("Server is running on port 5000");
        });

    } catch (err) {
        console.log("Startup failed", err);
    }
}

startServer();

