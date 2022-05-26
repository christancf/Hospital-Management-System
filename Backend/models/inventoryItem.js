const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    
    item_id: {
        required: true,
        type: Number
    },
    item_name: {
        required: true,
        type: String
    },
    quantity: {
        required: true,
        type: Number
    },
    manufacture_date: {
        required: true,
        type: Number
    },
    expire_date: {
        required: true,
        type: Number
    },
    status: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('inventoryItems', dataSchema)