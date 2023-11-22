
const dataAccessLayer = require('../data/dataAccessLayer');

const workoutController = {
    // Save workout session in MongoDB
    saveWorkoutSession: (req, res) => {
        const workoutSessionData = req.body;
        
        dataAccessLayer.createWorkoutSession(workoutSessionData)
            .then(() => {
                res.json({ message: 'Workout session saved successfully' });
            })

            .catch((error) => {
                console.error('Error saving workout session', error)
                res.status(500).send('Internal Server Error')
            }); 
    },

    getAllGroups: (req, res) => {
        const { sessionGroup } = req.query;

        dataAccessLayer.getAllGroups(sessionGroup)
        
        .then((workoutSessions) => {
            res.json(workoutSessions);
        })

        .catch((error) => {
            console.error('Error getting all workout sessions', error);
        });
    },

    getWorkoutSessions: async (req, res) => {
        const { group } = req.query;

        const sortCriteria = [['sessionDate', 'asc'], ['exercisePosition', 'asc']];

        try {
            const workoutSessions = await dataAccessLayer.getWorkoutSessionsByGroup(group, sortCriteria);
            res.json(workoutSessions);
        } catch (error) {
            console.error('Error getting workout sessions:', error);
            res.status(500).send('Internal server error');
        }
    },

    deleteWorkoutSession: (req, res) => {
        const workoutSessionId = req.params.id;

        dataAccessLayer.deleteWorkoutSession(workoutSessionId)
            .then(() => {
                res.json({ message: 'Workout session deleted successfully'});
            })

            .catch((error) => {
                console.error('Error deleting workout session', error);
                res.status(500).send('Internal Server Error');
            });
    },
};

module.exports = workoutController;