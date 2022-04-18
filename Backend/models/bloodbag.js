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
        type: Number
    },
    place:{
        required: true,
        type: String
    },
    bloodGroup:{
        required:true,
        type: String
    },
    // status:{
    //     required:true,
    //     type:String
    // }
})

module.exports = mongoose.model('bloodbag', dataSchema)