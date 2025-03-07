import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, 
    email: { type: String, required: true, unique: true }, 
    routines: [{ type: mongoose.Schema.Types.ObjectId, ref: "Routine" }] });
const User = mongoose.model("users", userSchema);

module.exports = User;