import express from "express";
import connectDB from "./config/db";

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
