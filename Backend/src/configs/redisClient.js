import { createClient } from "redis";

const redisClient = createClient({
    url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
});

redisClient.on("error", (err) => {
    console.error("Redis Error:", err);
});

redisClient.on("connect", () => {
    console.log("Redis Connected");
});

redisClient.on("reconnecting", () => {
    console.log("Redis Reconnecting...");
});

let isConnected = false;

export const connectRedis = async () => {
    if (isConnected) return;

    await redisClient.connect();
    isConnected = true;
};

export default redisClient;