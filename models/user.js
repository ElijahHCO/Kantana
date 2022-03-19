const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//User model
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 3
    },
    name: {
        type: String,
        required: true,
        min: 5
    },
    password: {type: String,
        required: true,
        minlength: 5
    },
    email:{type: String,
        required: true,
        unique: true,},
    city: {
        type: String,
        required: true,
        min: 2
    },
    state: {
        type: String,
        required: true,
        min: 2
    },
    profilePicture: {
        type: String
    },
    hobbies: [ {
        type: String
    }],
}, {timestamps: true})

const User = mongoose.model('User', userSchema);

module.exports = User;