const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    NIC: {
        required: true,
        type: String,
    },
    name: {
        required: true,
        type: String
    },
    birthday: {
        required: true,
        type: Number
    },
    contact_no: {
        required: true,
        type: String
    },
    doctor_id: {
        required: true,
        type: Number
    },
    date: {
        required: true,
        type: Number
    },
    queue_no: {
        required: true,
        type: Number
    },
    status: {
        required: true,
        type: String
    }
    
})

module.exports = mongoose.model('appointment', dataSchema)