
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Set up MongoDB connection
const mongoURL = 'mongodb://127.0.0.1:27017/health_dev';

// Connect to MongoDB
mongoose.connect(mongoURL)
    .then(() => {
        console.log(`Connected to ${mongoURL} successfully!'`);
    })

    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Parse incoming JSON requests
app.use(bodyParser.json());

// Routes
const homeRouter = require('./routes/homeRoute');
const workoutRouter = require('./routes/workoutRoute');

app.use('/', homeRouter);
app.use('/workout', workoutRouter);

// Set up server
const port = 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});