const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    staffID: {
        required: true,
        type: Number
    },
    bonusAmount: {
        required: true,
        type: Number
    },
    addedDate: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('bonuses', dataSchema)