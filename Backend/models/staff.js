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
        type: Number
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
    },
    status: {
        required: true,
        type: String
    },
    bonus: {
        required: false,
        type: Number
    },
    totalSalary: {
        required: false,
        type: Number
    }
})

module.exports = mongoose.model('staffs', dataSchema)