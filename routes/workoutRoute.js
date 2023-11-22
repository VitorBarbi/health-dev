
const express = require('express');
const path = require('path');
const workoutController = require('../controllers/workoutController');

const router = express.Router();

router.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../views/workout.html');
    res.sendFile(filePath);
});

// Save workout session in MongoDB
router.post('/save_workout_session', workoutController.saveWorkoutSession);

// Get all groups
router.get('/getAllGroups', workoutController.getAllGroups);

// Get workout sessions
router.get('/getWorkoutSessions', workoutController.getWorkoutSessions);

// Delete workout session
router.delete('/delete_workout_session/:id', workoutController.deleteWorkoutSession);


module.exports = router;