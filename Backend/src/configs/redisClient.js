import { createClient } from "redis";

const client = createClient({
    url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
});

client.on("error", (err) => {
    console.error("Redis Error:", err);
});

client.on("connect", () => {
    console.log("Redis Connected");
});

client.on("reconnecting", () => {
    console.log("Redis Reconnecting...");
});

let isConnected = false;

export const connectRedis = async () => {
    if (isConnected) return;

    await client.connect();
    isConnected = true;
};

export default client;