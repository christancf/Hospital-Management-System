const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    id: {
        required: true,
        type: String
    },
    category: {
        required: true,
        type: String
    },
    capacity: {
        required: true,
        type: Number
    },
    status: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('wards', dataSchema)