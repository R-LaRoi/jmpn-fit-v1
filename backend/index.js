import express from "express";
import connectDB from "./config/db.js";
import { User } from "./models/userSchema.js";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

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

      res.json({
        status: "ok",
        data: token,
        userType: "user",
        username: activeUser.username,
      });
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

connectDB();
