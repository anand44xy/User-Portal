const express = require('express');
const UserRouter = express.Router();
const UserModel = require('../Model/userModel');

// 1. Route to register a new user
UserRouter.post('/register', async (req, res) => {
    try {
        const userExists = await UserModel.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(400).send({ msg: 'User with this email already exists!', statusType: 0 });
        }

        const user = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            contact: req.body.contact,
            statusType: 'active' // setting user status to active by default
        });

        await user.save();
        res.status(201).send({ msg: "User registered successfully!", statusType: 1 });
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: "Unable to register the user!", statusType: 0 });
    }
});


// 2. Route to login the user
UserRouter.post('/login', async (req, res) => {
    try {
        // Find the user by email
        const user = await UserModel.findOne({ email: req.body.email });
        if (user != null) {
            // Compare the input password with the stored password
            if (user.password == req.body.password) {
                res.send({ msg: "Login Successfully.", user, statusType: 1 });
            } else {
                // Handle incorrect password
                res.send({ msg: "Password doesn't match!", statusType: 0 });
            }
        } else {
            // Handle case where email does not exist
            res.send({ msg: "Email doesn't exist", statusType: 0 });
        }
    } catch (error) {
        res.send({ msg: "Internal server Error.", statusType: 0 });
    }
});

// 3. Route to get a list of all users or a single user by ID
UserRouter.get('/:id?', async (req, res) => {
    let id = req.params.id;
    let users;
    try {
        if (id) {
            users = await UserModel.findById(id);
        } else {
            // If id not found, fetch all users from DB 
            users = await UserModel.find();
        }
        res.send({
            msg: (Array.isArray(users) ? users.length : 1) + ' Users found.',
            users,
            statusType: 1
        });
    } catch (error) {
        res.send({ msg: "Internal server Error.", statusType: 0 });
    }
});

// 4. Route to Delete user by ID
UserRouter.delete('/delete/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await UserModel.findByIdAndDelete(userId);
        if (result) {
            res.send({ msg: 'User deleted successfully!', statusType: 1 });
        } else {
            res.send({ msg: 'User not found!', statusType: 0 });
        }
    } catch (error) {
        res.send({ msg: "Internal server Error.", statusType: 0 });
    }
});

// 5. Route to update user by ID
UserRouter.patch('/update/:id', async (req, res) => {
    try {
        const update = req.body;
        const result = await UserModel.findByIdAndUpdate(req.params.id, update, {
            new: true, // Return the update doucment
            runValidators: true  // Validate updates against the schema
        });
        if (result) {
            res.send({ msg: 'User updated successfully!', user: result, statusType: 1 });
        } else {
            res.send({ msg: 'User not found!', statusType: 0 });
        } 
    } catch (error) {
        res.send({ msg: "Internal server Error.", statusType: 0 });
    }
});

module.exports = UserRouter;
