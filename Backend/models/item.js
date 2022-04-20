const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    id: {
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
    category: {
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
    },

    status:{
        required:true,
        type:Boolean
    }
})

module.exports = mongoose.model('items', dataSchema)