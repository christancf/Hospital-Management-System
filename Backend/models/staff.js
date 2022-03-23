const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    staffID: {
        required: true,
        type: Number
    },
    staffName: {
        required: true,
        type: String
    },
    NIC: {
        required: true,
        type: String
    },
    email: {
        required: false,
        type: String
    },
    designation: {
        required: true,
        type: String
    },
    qualification: {
        required: true,
        type: String 
    },
    dateOfBirth: {
        required: true,
        type: Date
    },
    gender: {
        required: true,
        type: String
    },
    address: {
        required: true,
        type: String 
    },
    basicSalary: {
        required: true,
        type: Number 
    },
    mobile: {
        required: true,
        type: String 
    },
    home: {
        requried: true,
        type: String
    }
})

module.exports = mongoose.model('staff', dataSchema)