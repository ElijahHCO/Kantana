const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 3
    },
    password: {type: String,
        required: true,
        minlength: 5
    },
    email:{type: String,
        required: true,
        unique: true,},
    dob: {type: Date,
        required: true
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