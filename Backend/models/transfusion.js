const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    bagId:{
        required:true,
        type:Number
    },
    id: {
        required:true,
        type:Number
    },
    name: {
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
    status:{
        required:true,
        type:String
    },
    volume:{
        required:true,
        type:String
    },
})

module.exports = mongoose.model('bloodtransfusion', dataSchema)