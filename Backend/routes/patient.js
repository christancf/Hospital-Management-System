var express = require('express');
const userModel = require('../models/user');
var router = express.Router();
const auth = require("../middleware/auth");
const patientModel = require('../models/patient');


//patient admittance function
router.post('/admittance' , function(req,res,next){
    const patient =new patientModel({
        patientId:req.body.patient.id,
        fullName:req.body.patient.fullName,
        nic:req.body.patient.nic,
        dateOfBirth:req.body.patient.dateOfBirth, 
        sex:req.body.patient.sex.value,
        mobile:req.body.patient.mobile,
        address:req.body.patient.address,
        bloodGroup:req.body.patient.bloodGroup.value,
        status:true
    });

    try{
        console.log("id:"+req.body.patient.id);
        console.log("patientID:"+patient.patientId)

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

router.get('/read', function(req,res,next){
    patientModel.find({id:req.query.id})
    .then((patientDetails) => {
        res.json(patientDetails)
    }).catch((e) => {
        console.log("Error:"+e)
    })
});

router.put('/update', (req, res, next) => {
    patientModel.updateOne({id: String(req.body.id)},
      {$set: {"patientId":req.body.patient.id,
        "fullName":req.body.patient.fullName,
        "nic":req.body.patient.nic,
        "dateOfBirth":req.body.patient.dateOfBirth, 
        "sex":req.body.patient.sex,
        "mobile":req.body.patient.mobile,
        "address":req.body.patient.address,
        "bloodGroup":req.body.patient.bloodGroup,
        "status":true}})
      .then((result) => {
        res.json(`Successfully Updated!`)
      }).catch((e) => {
        console.log(`Error Update: ${e}`)
      })
  })








module.exports = router;
