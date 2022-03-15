const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instrumentSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    description: {
        type: String,
        required: true,
        min: 20
    },
    location: {
        type: String,
        required: true,
        minlength: 5
    },
    price: {
        type: Number,
        required: true,
        minlength: 5
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User'}
}, {timestamps: true})

const Instrument = mongoose.model('Instruments', instrumentSchema);

module.exports = Instrument;