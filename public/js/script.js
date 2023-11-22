
document.addEventListener('DOMContentLoaded', function() {
    keepSomeInputs();
    populateGroupSelect();

    const submitButton = document.getElementById('submitSessionButton');
    submitButton.addEventListener('click', submitSessionForm);

    const fetchButton = document.getElementById('fetchWorkoutSessionsButton');
    fetchButton.addEventListener('click', fetchWorkoutSessions);

    const deleteButton = document.getElementById('deleteSessionButton');
    deleteButton.addEventListener('click', deleteSession);
});

function keepSomeInputs() {
    // Get fields data
    const userNicknameField = document.getElementById('userNickname');
    const sessionDateField = document.getElementById('sessionDate');
    const nutritionPhaseField = document.getElementById('nutritionPhase');
    const sessionPhaseField = document.getElementById('sessionPhase');
    const sessionGroupField = document.getElementById('sessionGroup');
    const exerciseSetsField = document.getElementById('exerciseSets');
    const exerciseIntervalField = document.getElementById('exerciseInterval');

    // Check if is there local data 
    if (localStorage.getItem('formData')) {
        const formData = JSON.parse(localStorage.getItem('formData'));

        // Fill fields with last form values
        userNicknameField.value = formData.userNickname;
        sessionDateField.value = formData.sessionDate;
        nutritionPhaseField.value = formData.nutritionPhase;
        sessionPhaseField.value = formData.sessionPhase;
        sessionGroupField.value = formData.sessionGroup;
        exerciseSetsField.value = formData.exerciseSets;
        exerciseIntervalField.value = formData.exerciseInterval;
    }

    // Add listener 
    document.getElementById('sessionForm').addEventListener('submit', (event) => {
        const formData = {
            userNickname: userNicknameField.value,
            sessionDate: sessionDateField.value,
            nutritionPhase: nutritionPhaseField.value,
            sessionPhase: sessionPhaseField.value,
            sessionGroup: sessionGroupField.value,
            exerciseSets: exerciseSetsField.value,
            exerciseInterval: exerciseIntervalField.value,
        };

        // Save data in local storage
        localStorage.setItem('formData', JSON.stringify(formData));
    });
}

function submitSessionForm() {
    // Get form data
    const userNickname = document.getElementById('userNickname').value;
    const sessionDate = document.getElementById('sessionDate').value;
    const sessionPhase = document.getElementById('sessionPhase').value;
    const sessionGroup = document.getElementById('sessionGroup').value;
    const exercisePosition = document.getElementById('exercisePosition').value;
    const exerciseName = document.getElementById('exerciseName').value;
    const exerciseWeight = document.getElementById('exerciseWeight').value;
    const exerciseReps = document.getElementById('exerciseWeight').value;
    const exerciseSets = document.getElementById('exerciseSets').value;
    const exerciseInterval = document.getElementById('exerciseInterval').value;
    const nutritionPhase = document.getElementById('nutritionPhase').value;

    // Create JSON payload
    const data = {
        userNickname: userNickname,
        sessionDate: sessionDate,
        sessionPhase: sessionPhase,
        sessionGroup: sessionGroup,
        exercisePosition: exercisePosition,
        exerciseName: exerciseName,
        exerciseWeight: exerciseWeight,
        exerciseReps: exerciseReps,
        exerciseSets: exerciseSets,
        exerciseInterval: exerciseInterval,
        nutritionPhase: nutritionPhase
    }

    // Send JSON data to the server
    fetch('workout/save_workout_session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(data)
    })

    .then(response => response.json())

    .then(result => {
        console.log('Success:', result);
        displayMessage(result.message, 'formMessageContainer');
    })

    .catch(error => {
        console.error('Error:', error);
        displayMessage('Failed to save the workout session', 'formMessageContainer');
    });


}

async function populateGroupSelect() {
    //Fetch group names from the server
    try {
        const response = await fetch('workout/getAllGroups');

        if (response.ok) {
            const groups = await response.json();

            const select = document.getElementById('selectSessionGroup');

            // Populate select element with groups
            groups.forEach((name) => {
                const option = document.createElement('option');

                option.value = name;
                option.text = name;

                select.appendChild(option);
            });
        } else {
            console.error('Failed to get groups', response.status);
        }
    } catch (error) {
        console.error('Error while getting groups', error);
    }
} 

async function fetchWorkoutSessions() { 
    const selectedGroup = document.getElementById('selectSessionGroup').value;

    try {
        const sortCriteria = ['sessionDate', 'exercisePosition'];

        const response = await fetch(`workout/getWorkoutSessions?group=${selectedGroup}&sort=${sortCriteria.join(',')}`);

        if (response.ok) {
            const workoutSessions = await response.json();

            displayWorkoutSessions(workoutSessions);
        } else {
            console.error('Failed to fetch workout sessions:', response.status);
        }
    } catch (error) {
        console.error('Error while fetching workout sessions:', error);
    }
}

function displayWorkoutSessions(sessions) {
    const tableBody = document.getElementById('workoutSessionsTableBody');
    tableBody.innerHTML='';

    sessions.forEach(session => {
        const row = tableBody.insertRow();

        row.insertCell(0).textContent = session.userNickname;
        row.insertCell(1).textContent = session.sessionDate;
        row.insertCell(2).textContent = session.nutritionPhase;
        row.insertCell(3).textContent = session.sessionPhase;
        row.insertCell(4).textContent = session.sessionGroup;
        row.insertCell(5).textContent = session.exercisePosition;
        row.insertCell(6).textContent = session.exerciseName;
        row.insertCell(7).textContent = session.exerciseWeight;
        row.insertCell(8).textContent = session.exerciseReps;
        row.insertCell(9).textContent = session.exerciseSets;
        row.insertCell(10).textContent = session.exerciseInterval;
        row.insertCell(11).textContent = session._id;
    });
}

function deleteSession() {
    const sessionId = document.getElementById('_id').value;

    fetch(`workout/delete_workout_session/${sessionId}`, {
        method: 'DELETE',
    })

    .then(response => response.json())

    .then(result => {
        console.log('Success:', result);
        displayMessage(result.message, 'deleteMessageContainer');
    })

    .catch (error => {
        console.error('Error:', error);
        displayMessagem('Failed to delete the workout session', 'deleteMessageContainer');
    });
}

function displayMessage(message, container) {
    const messageContainer = document.getElementById(container);
    
    messageContainer.textContent = message;

    messageContainer.classList.add('show-message');

    setTimeout(() => {
        messageContainer.classList.remove('show-message');
        messageContainer.textContent = '';
    }, 5000);
}
