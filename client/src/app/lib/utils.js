import mongoose from "mongoose";

export const connectMongo = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            return mongoose.connection;
        }

        const db = await mongoose.connect(process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("MongoDB connected successfully");

        return db;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw new Error(error);
    }
};