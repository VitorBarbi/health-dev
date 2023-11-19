
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for model
const workoutSessionSchema = new Schema({
  userNickname: String,
  sessionDate: Date,
  sessionPhase: String,
  sessionGroup: String,
  exercisePosition: Number,
  exerciseName: String,
  exerciseWeight: Number,
  exerciseReps: Number,
  exerciseSets: Number,
  exerciseInterval: Number,
  nutritionPhase: String,
});

// Create model
const WorkoutSession = mongoose.model('WorkoutSession', workoutSessionSchema);

module.exports = WorkoutSession;