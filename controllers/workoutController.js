
const dataAccessLayer = require('../data/dataAccessLayer');

const workoutController = {
    // Save workout session in MongoDB
    saveWorkoutSession: (req, res) => {
        const workoutSessionData = req.body
        
        dataAccessLayer.createWorkoutSession(workoutSessionData)
            .then(() => {
                res.json({ message: 'Workout session saved successfully' });
            })

            .catch((error) => {
                console.error('Error saving workout session', error)
                res.status(500).send('Internal Server Error')
            }); 
    },
};

module.exports = workoutController;