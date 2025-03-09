import express from "express";
const app = express();
const port = process.env.PORT || 8000;
import connectDB from "./config/db.js";
// import cors from "cors";
// import morgan from "morgan";
// import jwt from "jsonwebtoken";
// // import userRoutes from "./routes/userRoute.ts";
// // import routineRoutes from "./routes/routineRoute.ts";
// // import apiRoutes from "./routes/api.ts";
// const userModel = require("./models/userSchema");
// const routineModel = require("./models/routineSchema");

app.get("/", (req, res) => {
  res.send({
    data: "started",
  });
});

// // middleware
// // app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(morgan("dev"));

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ success: false, message: "Unauthorized" });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json({ success: false, message: "Forbidden" });
//     }
//     req.user = user;
//     next();
//   });
// };

// export default authenticateToken;

// app.post("/api/users-login", async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     const user = await userModel.findOne({ email });
//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     } else {
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (isMatch) {
//         return res
//           .status(200)
//           .json({ success: true, message: "Login successful" });
//       } else {
//         return res
//           .status(401)
//           .json({ success: false, message: "Invalid credentials" });
//       }
//     }
//   } catch (error) {
//     console.error("Login error:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "An error occurred during login" });
//   }
// });

// app.post("/api/createRoutine", async (req, res) => {
//   const { userId, date, weekday, duration, type, exercises, level } = req.body;

//   try {
//     const newRoutine = new Routine({
//       userId,
//       date,
//       weekday,
//       duration,
//       type,
//       exercises,
//       level,
//     });

//     await newRoutine.save();

//     res
//       .status(201)
//       .json({ success: true, message: "Routine created successfully" });
//   } catch (error) {
//     console.error("Routine creation error:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to create routine" });
//   }
// });

// app.use(
//   cors({
//     origin: "http://localhost:8081",
//     credentials: true,
//   })
// );

// app.get("/api/users", async (req, res) => {
//   const allUsers = await userModel.find();
//   console.log(allUsers);
//   res.status(200).json({
//     results: allUsers.length,
//     status: "success",
//     data: {
//       allUsers,
//     },
//   });
// });

// app.get("/api/user_routines", async (req, res) => {
//   const userRoutines = await routineModel.find();
//   console.log(userRoutines);
//   res.status(200).json({
//     results: userRoutines.length,
//     status: "success",
//     data: {
//       userRoutines,
//     },
//   });
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

connectDB();
