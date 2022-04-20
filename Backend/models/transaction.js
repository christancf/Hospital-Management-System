const mongoose = require('mongoose');

const transactionData = new mongoose.Schema({
    patientId: {
        required: true,
        type: Number
    },
    type: {
        required: true,
        type: String
    },
    itemId: {
        required: true,
        type: Number
    },
    qty: {
        required: true,
        type: Number
    },
    billId: {
        required: true,
        type: String
    },
    patientName: {
        required: true,
        type: String
    },
    roomCharges: {
        required: false,
        type: Number
    },
    itemCharges: {
        required: false,
        type: Number
    },
    doctorCharges: {
        required: false,
        type: Number
    },
    tax: {
        required: true,
        type: Number
    },
    total: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('transaction', transactionData)