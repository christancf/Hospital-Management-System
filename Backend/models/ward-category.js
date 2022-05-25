const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    category: {
        required: true,
        type: String
    },
    abbreviation: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('wardcategory', dataSchema)