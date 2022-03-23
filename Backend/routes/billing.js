var express = require('express');
const wardModel = require('../models/bill');
var router = express.Router();
const auth = require("../middleware/auth");

//add bill details
router.post('/add-details', (req, res, next) => {
  
    const bill = new billModel({
      patientId: req.body.PatientId,
      type: req.body.type,
      itemId: req.body.itemId,
      qty: req.body.qty
    })

    try {

      const dataToSave = bill.save();
      res.status(200).json(dataToSave);
  
    }
    catch (error) {
      res.status(400).json({ success:true,message: error.message });
    }
  
  });
  
  
  module.exports = router;
  