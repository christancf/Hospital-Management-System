const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    fullName: {
        required:true,
        type:String
    },
    nic:{
        required:true,
        type:String
    },
    dateOfBirth:{
        required:true,
        type:Number
    },
    sex:{
        required:true,
        type:String
    },
    mobile:{
        required:true,
        type:String
    },
    address:{
        required:true,
        type:String
    },
    bloodGroup:{
        required:false,
        type:String
    }
})

module.exports = mongoose.model('patient', patientSchema)