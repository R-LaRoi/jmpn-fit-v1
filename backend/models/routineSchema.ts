import mongoose from "mongoose"

const routineSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    date: { type: String, required: true }, 
    weekday: { type: String, required: true }, 
    duration: { type: Number, required: true }, 
    type: { type: String, required: true }, 
    exercises: { type: [String], required: true }, 
    level: { type: Number, required: true } 
});

const Routine = mongoose.model("routines", routineSchema);

module.exports = Routine;
