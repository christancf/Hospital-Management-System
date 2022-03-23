const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    Id: {
        required: true,
        type: Number
    },
    item_name: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    manufacturer: {
        required: true,
        type: String
    },
    unit_price: {
        required: true,
        type: Number
    },
    total_quantity: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('users', dataSchema)