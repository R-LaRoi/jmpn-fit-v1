import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connectDB() {
    const connectionString = process.env.MONGODB_URI;

    if (!connectionString) {
        throw new Error("MongoDB connection URL is not defined in environment variables.");
    }

    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as mongoose.ConnectOptions); 
        console.log("Connected to MongoDB");
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Failed to connect to MongoDB: ${error.message}`);
        } else {
            console.error("Failed to connect to MongoDB: Unknown error");
        }
        throw error; 
    }
}

export default connectDB;
