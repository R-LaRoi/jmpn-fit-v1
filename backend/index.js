import "dotenv/config";
import express from "express";
import connectDB from "./config/db.ts";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/userRoute.ts";
import routineRoutes from "./routes/routineRoute.ts";
import apiRoutes from "./routes/api.ts";

const app = express();
const port = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.use("/users", userRoutes);
app.use("/routines", routineRoutes);
app.use("/api", apiRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
