
const WorkoutSession = require('../models/workoutModel');

const dataAccessLayer = {
  // Create a workout session
  createWorkoutSession: (workoutData) => {
    const newWorkout = new WorkoutSession(workoutData);
    return newWorkout.save();
  },
};

module.exports = dataAccessLayer;