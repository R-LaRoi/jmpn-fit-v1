import express from "express";
import connectDB from "./config/db.ts";
import cors from "cors";
import morgan from "morgan";
// import userRoutes from "./routes/userRoute.ts";
// import routineRoutes from "./routes/routineRoute.ts";
// import apiRoutes from "./routes/api.ts";

const app = express();
const port = process.env.PORT || 8000;
const userModel = require("./models/userSchema");
const routineModel = require("./models/routineSchema");

// middleware
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.post("/backend/createRoutine", async (req, res) => {
  const { userId, date, weekday, duration, type, exercises, level } = req.body;

  try {
    const newRoutine = new Routine({
      userId,
      date,
      weekday,
      duration,
      type,
      exercises,
      level,
    });

    await newRoutine.save();

    res
      .status(201)
      .json({ success: true, message: "Routine created successfully" });
  } catch (error) {
    console.error("Routine creation error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create routine" });
  }
});

app.use(
  cors({
    origin: "http://localhost:8081",
    credentials: true,
  })
);

app.get("/api/users", async (req, res) => {
  const allUsers = await userModel.find();
  console.log(allUsers);
  res.status(200).json({
    results: allUsers.length,
    status: "success",
    data: {
      allUsers,
    },
  });
});

app.get("/api/user_routines", async (req, res) => {
  const userRoutines = await routineModel.find();
  console.log(userRoutines);
  res.status(200).json({
    results: userRoutines.length,
    status: "success",
    data: {
      userRoutines,
    },
  });
});

app.post("/backend/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login request:", email, password); // Log request data
  try {
    const user = await userModel.findOne({ email: email });
    console.log("User found:", user); // Log user data
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    //compare passwords here using bcrypt.
    if (password === user.password) {
      return res.status(200).json({ success: true, userId: user._id });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

connectDB();
