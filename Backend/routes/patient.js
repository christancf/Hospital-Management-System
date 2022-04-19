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
            message:'inserted sucessful',
            payload:{}
        });
    }
    catch(error){
        res.status(400).json({success:false,message:error.message,payload:{}})
    }
});

router.get('/read', function(req,res,next){
    patientModel.find({id:req.query.id})
    .then((patientDetails) => {
        res.status(200).json({
            success:true,
            message:'inserted sucessful',
            payload:patientDetails[0]
        })
    }).catch((e) => {
        res.status(400).json({success:false,message:error.message,payload:{}})
    })
});

router.delete('/checkout', (req,res,next) => {
    patientModel.updateOne({id:req.query.id},{$set:{"status":false}})
    .then((result) => {
        res.json({
            success:true,
            message:'inserted sucessful',
            payload:{}
        })
      }).catch((e) => {
        res.status(400).json({success:false,message:e.message,payload:{}})
      })
})
router.put('/update', (req, res, next) => {

    patientModel.updateOne({"patientId":req.body.patient.id,},
      {$set: {"fullName":req.body.patient.fullName,
        "nic":req.body.patient.nic,
        "dateOfBirth":req.body.patient.dateOfBirth, 
        "sex":req.body.patient.sex.value,
        "mobile":req.body.patient.mobile,
        "address":req.body.patient.address,
        "bloodGroup":req.body.patient.bloodGroup.value,
        "status":true}})
      .then((result) => {
        res.json({
            success:true,
            message:'inserted sucessful',
            payload:{}
        })
      }).catch((e) => {
        res.status(400).json({success:false,message:e.message,payload:{}})
      })
  })



  router.get('/patientlist', async (req, res, next) => {



    try {
      const response = await patientModel.find({}).then((response) => {
  
        res.status(200).json(
          {
            succuss: true,
            message: 'Retirval succussfull',
            payload: response
          }
        );
  
      }).catch((error) => {
        res.status(400).json(
          {
            succuss: false,
            message: error.message,
            payload: {}
          }
        );
  
      });
  
  
    }
    catch (error) {
      res.status(400).json(
        {
          succuss: false,
          message: error.message,
          payload : {}
        }
      );
    }
  
  });




module.exports = router;
