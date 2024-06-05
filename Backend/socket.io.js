import { server } from "./index.js";
import {Server} from "socket.io";

const io = new Server(server, {
    cors: {
        // add multiple domains
        origin: ["https://learning-on.vercel.app", "http://localhost:5173"],
        
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