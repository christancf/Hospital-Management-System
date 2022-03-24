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
    sex: {
        required: true,
        type: String
    },
    address: {
        required: true,
        type: String
    },
    date_of_birth: {
        required: true,
        type: Number
    },
    date_time_of_death: {
        required: true,
        type: Number
    },
    cause_of_death: {
        required: false,
        type: String
    },
    specifics_of_death: {
        required: false,
        type: String
    },
    cabinet_number: {
        required: false,
        type: String
    },
    status: {
        required: true,
        type: Boolean
    },
    receiver_name: {
        required: false,
        type: String
    },
    receiver_type: {
        required: false,
        type: String
    }
})

module.exports = mongoose.model('corpse', dataSchema)