var express = require('express');
const userModel = require('../models/user');
var router = express.Router();
const auth = require("../middleware/auth");
const patientModel = require('../models/patient');


//patient admittance function
router.post('/patient/admittance' , function(req,res,next){
    const patient =new patientModel({
        fullname:req.body.patient.fullname,
        nic:req.body.patient.nic,
        dateOfBirth:req.body.patient.dateOfBirth, 
        sex:req.body.patient.sex,
        mobile:req.body.patient.mobile,
        address:req.body.patient.address,
        bloodGroup:req.body.patient.bloodGroup
    });

    try{
        const dataToSave = patient.save();
        res.status(200).json(dataToSave);
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
});  







module.exports = router;
