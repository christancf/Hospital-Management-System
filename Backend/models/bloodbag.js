const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    bagId:{
        required:true,
        type:Number
    },
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
        type: Number
    },
    place:{
        required: true,
        type: String
    },
    bloodGroup:{
        required:false,
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

module.exports = mongoose.model('bloodbag', dataSchema)