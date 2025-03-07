import "dotenv/config";
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

// Connect to MongoDB
connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
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

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
