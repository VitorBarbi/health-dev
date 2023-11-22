
const WorkoutSession = require('../models/workoutModel');

const dataAccessLayer = {
  // Create a workout session
  createWorkoutSession: (workoutData) => {
    const newWorkout = new WorkoutSession(workoutData);
    return newWorkout.save();
  },
  
  // Get all session groups
  getAllGroups: () => {
    return WorkoutSession.find().distinct('sessionGroup').sort();
  },

  // Get workout session by group
  getWorkoutSessionsByGroup: (group, sortCriteria) => {
    return WorkoutSession.find({ sessionGroup: group }).sort(sortCriteria);
  },

  // Delete workout session
  deleteWorkoutSession: (workoutSessionId) => {
    return WorkoutSession.findByIdAndDelete(workoutSessionId);
  },

};

module.exports = dataAccessLayer;