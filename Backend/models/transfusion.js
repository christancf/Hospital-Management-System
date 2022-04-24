const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    bagId:{
        required:true,
        type:Number
    },
    patientId: {
        required:true,
        type:Number
    },
    patientName: {
        required:true,
        type:String
    },
    reason: {
        required: true,
        type: String
    },
    issueDate:{
        required:true,
        type:Number
    },
    bloodGroup: {
        required: true,
        type: String
    },
    pbloodGroup: {
        required: true,
        type: String
    },
})

module.exports = mongoose.model('bloodtransfusion', dataSchema)