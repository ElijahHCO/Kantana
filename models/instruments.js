const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Instrument model
const instrumentSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    description: {
        type: String,
        required: true,
        min: 3
    },
    location: {
        type: String,
        required: true,
        minlength: 3
    },
    image: {
        type: Buffer,
        required: true
      },
    imageType: {
        type: String,
        required: true
      },
    price: {
        type: Number,
        required: true,
        minlength: 3
    },
    username: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'}
}, {timestamps: true})



instrumentSchema.virtual('imagePath').get(function() {
    if (this.image != null && this.imageType != null) {
      return `data:${this.imageType};charset=utf-8;base64,${this.image.toString('base64')}`
    }
  })

const Instrument = mongoose.model('Instruments', instrumentSchema);

module.exports = Instrument;