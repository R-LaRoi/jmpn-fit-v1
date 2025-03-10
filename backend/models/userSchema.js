import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  routines: [{ type: mongoose.Schema.Types.ObjectId, ref: "Routine" }],
});

export const User = mongoose.model("User", userSchema);
