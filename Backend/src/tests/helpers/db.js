import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;

export const connectTestDb = async () => {
    if (mongoose.connection.readyState === 1) {
        return;
    }

    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }

    if (!mongoServer) {
        mongoServer = await MongoMemoryServer.create({
            instance: {
                launchTimeout: 120000,
            },
        });
    }

    await mongoose.connect(mongoServer.getUri());
};

export const disconnectTestDb = async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.dropDatabase();
        await mongoose.disconnect();
    }
    if (mongoServer) {
        await mongoServer.stop();
        mongoServer = undefined;
    }
};

export const clearTestDb = async () => {
    const collections = mongoose.connection.collections;
    await Promise.all(
        Object.values(collections).map((collection) => collection.deleteMany({}))
    );
};
