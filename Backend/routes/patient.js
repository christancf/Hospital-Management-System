var express = require('express');
const userModel = require('../models/user');
var router = express.Router();
const auth = require("../middleware/auth");
const patientModel = require('../models/patient');


//patient admittance function
router.post('/admittance' , function(req,res,next){
    const patient =new patientModel({
        fullName:req.body.patient.fullName,
        nic:req.body.patient.nic,
        dateOfBirth:req.body.patient.dateOfBirth, 
        sex:req.body.patient.sex,
        mobile:req.body.patient.mobile,
        address:req.body.patient.address,
        bloodGroup:req.body.patient.bloodGroup,
        status:true
    });

    try{
        const dataToSave = patient.save();
        res.status(200).json({
            success:true,
            message:'inserted sucessful'
        });
    }
    catch(error){
        res.status(400).json({success:true,message:error.message})
    }
});  







module.exports = router;
