const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserRouter = require('./Router/userRouter');

const server = express(); // Create an Express server

// Middleware to parse JSON request bodies
server.use(express.json());

// CORS middleware to allow cross-origin requests from frontend (localhost:5173)
server.use(cors({
  origin: ['http://localhost:5173', ''], // Allowed frontend origin
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}));

// User routes
server.use('/user', UserRouter);

const PORT = 5000;
// mongoose.connect('mongodb://localhost:27017/', {dbName: 'UsersDB'})
mongoose.connect('mongodb+srv://anand44xy:kO3K5O9O6p6PabFZ@cluster0.cuttr.mongodb.net/', {
  dbName: 'usersDB',
  // useNewUrlParser: true,  // Use the modern MongoDB URI format parser
  // useUnifiedTopology: true // Use the new connection management engine
})
  .then(() => {
    console.log('DB connected');
    server.listen(PORT, () => {
      console.log(`Server listening at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Unable to connect with DB', err);
  });
