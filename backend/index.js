import express from "express";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import { User } from "./models/userSchema.js";
const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send({ data: "started" });
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const activeUser = await User.findOne({ email });
  if (activeUser) {
    return res.status(400).json({ error: "User already exists" });
  }
  try {
    await User.create({ username, email, password });
    res.send("User registered successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

connectDB();
