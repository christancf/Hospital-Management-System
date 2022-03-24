var express = require('express');
const bloodbagModel = require('../models/bloodbag');
const patientModel = require('../models/patient');
const transfusionModel = require('../models/transfusion');
var router = express.Router();
const auth = require("../middleware/auth");

//add blood transfusion details
router.post('/transfusion-details', function (req, res, next) {
    const bloodbag = new bloodbagModel({
        bloodBGroup:req.body.bloodBGroup
    });
    try {

        bloodbag.save();
        res.status(200).json(
          {
            succuss: true,
            message: 'Insertion succussfull'
          }
        );
    
      }
      catch (error) {
        res.status(400).json(
          { 
            message: 'Cannot add data right now!' 
          }
        );
      }

    const recipient = new patientModel({
        patientID:req.body.patientID,
        patientName:req.body.patientName,
        patientBGroup:req.body.patientBGroup
    });
    try {

        recipient.save();
        res.status(200).json(
          {
            succuss: true,
            message: 'Insertion succussfull'
          }
        );
    
      }
      catch (error) {
        res.status(400).json(
          { 
            message: 'Cannot add data right now!' 
          }
        );
      }

    const transfusion = new transfusionModel({
        reason:req.body.reason,
        issueDate:req.body.issueDate
    });
    try {

        transfusion.save();
        res.status(200).json(
          {
            succuss: true,
            message: 'Insertion succussfull'
          }
        );
    
      }
      catch (error) {
        res.status(400).json(
          { 
            message: 'Cannot add data right now!' 
          }
        );
      }
    
});

module.exports = router;