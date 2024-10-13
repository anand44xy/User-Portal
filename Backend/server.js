// Sets up an Express server with MongoDB using Mongoose.
// Import express, mongoose, cors, UserRouter
const express = require('express');
const mongoose = require('mongoose'); // Import mongoose
const cors = require('cors');
const UserRouter = require('./Router/userRouter'); // Import user routes

const server = express(); // Create an Express server

// Middleware to parse JSON request bodies
server.use(express.json());

// CORS middleware to allow cross-origin requests from frontend (localhost:5173)
server.use(cors({
    origin: 'http://localhost:5173', // Allowed frontend origin
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Explicit allowed methods
}));

// User routes
server.use('/user', UserRouter);

const PORT = 5000; 
mongoose.connect('mongodb://localhost:27017/', { dbName: 'AnandsDB' })
    .then(() => {
        console.log('DB connected');
        server.listen(PORT, () => {
            console.log(`Server listening at port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.log('Unable to connect with DB', err);
    });
