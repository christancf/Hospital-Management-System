var express = require('express');
const userModel = require('../models/user');
var router = express.Router();
const auth = require("../middleware/auth");
const patientModel = require('../models/patient');

//patient id generate function

// replace patientModel with your model, patientId with the unique id filed in your collection,'/id' with a route path you want
// it returns  one added to highest id already in the collection only works if the unique id is in number format . if it is a
// string return payload without+1 and add one in frontend  
router.get('/id', function(req,res,next){
  patientModel.find().sort({patientId : -1}).limit(1)
  .then((id) => {
    res.status(200).json({
        success:true,
        message:'sucessful',
        payload:id[0].patientId+1
    })
}).catch((e) => {
    res.status(400).json({success:false,message:e.message,payload:{}})
})

});

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
        category:req.body.patient.category.value,
        status:true
    });

    try{

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
    patientModel.find({patientId:req.query.id})
    .then((patientDetails) => {
        res.status(200).json({
            success:true,
            message:'inserted sucessful',
            payload:patientDetails[0]
        })
    }).catch((error) => {
        res.status(400).json({success:false,message:error.message,payload:{}})
    })
});

router.delete('/checkout', (req,res,next) => {
    patientModel.updateOne({patientId:req.query.id},{$set:{"status":false}})
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
        "sex":req.body.patient.sex,
        "mobile":req.body.patient.mobile,
        "address":req.body.patient.address,
        "bloodGroup":req.body.patient.bloodGroup,
        "category":req.body.patient.category,
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
      const response = await patientModel.find({status:"true"},).then((response) => {
        
        res.status(200).json(
          {
            succuss: true,
            message: 'Retrival succussfull',
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
