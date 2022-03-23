const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    donorName: {
        required: true,
        type: String
    },
    donorNIC: {
        required: true,
        type: String
    },
    donationNumber: {
        required: true,
        type: String
    },
    donateDate: {
        required: true,
        type: int
    }
})

module.exports = mongoose.model('', dataSchema)