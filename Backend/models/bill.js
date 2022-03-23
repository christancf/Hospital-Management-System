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
    }
})

module.exports = mongoose.model('bills', transactionData)