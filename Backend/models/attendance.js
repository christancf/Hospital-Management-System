const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    staffID: {
        required: true,
        type: String
    },
    checkIn: {
        required: false,
        type: Number
    },
    checkOut: {
        required: false,
        type: Number
    }
})

module.exports = mongoose.model('attendances', dataSchema)