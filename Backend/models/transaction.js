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
        type: Number
    },
    patientName: {
        required: true,
        type: String
    },
    roomCharges: {
        required: true,
        type: Number
    },
    itemCharges: {
        required: true,
        type: Number
    },
    doctorCharges: {
        required: true,
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