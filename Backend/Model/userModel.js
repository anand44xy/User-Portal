const mongoose = require('mongoose');

// user model
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email'] 
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    contact: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']  // Phone validation
    },
    statusType: {
        type: String,
        required: true,
        default: 'inactive'
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields


// user Mongoose model
const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;