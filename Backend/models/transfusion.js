const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    reason: {
        required: true,
        type: String
    },
    issueDate:{
        required:true,
        type:Number
    }
})

module.exports = mongoose.model('bloodtransfusion', dataSchema)