import express from "express";
import connectDB from "./config/db.js";
import { User } from "./models/userSchema.js";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());

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
    if (activeUser.username === username) {
      return res.status(400).json({ error: "Username already exists" });
    } else {
      return res.status(400).json({ error: "Email already exists" });
    }
  }

  try {
    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    await User.create({ username, email, password: encryptedPassword });
    res.send("User registered successfully");
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: error.message });
  }
});
app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  try {
    const activeUser = await User.findOne({ email });
    if (!activeUser) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, activeUser.password);

    if (passwordMatch) {
      const token = jwt.sign(
        { userId: activeUser._id, email: activeUser.email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      console.log("Active user ID:", activeUser._id.toString());
      console.log(
        "Response:",
        JSON.stringify({
          status: "ok",
          data: token,
          userType: "user",
          username: activeUser.username,
          userId: activeUser._id.toString(),
        })
      );

      res.json({
        status: "ok",
        data: token,
        userType: "user",
        username: activeUser.username,
        userId: activeUser._id.toString(),
      });
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/save-routine", async (req, res) => {
  console.log("Received data:", req.body);
  const {
    userId: userIdString,
    duration,
    type,
    level,
    date,
    weekday,
    exercises,
  } = req.body;

  if (!userIdString) {
    return res.status(400).json({ error: "userId is required" });
  }

  try {
    let userId;
    try {
      userId = mongoose.Types.ObjectId(userIdString);
    } catch (castError) {
      return res.status(400).json({ error: "Invalid userId format" });
    }
    const result = await User.updateOne(
      { _id: userId },
      {
        $push: {
          routines: {
            duration,
            type,
            level,
            date,
            weekday,
            exercises,
          },
        },
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Routine saved successfully!" });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ error: "Invalid userId format" });
    }
    console.error("Error saving routine:", error);
    res.status(500).json({ error: error.message });
  }
});
// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

connectDB();
