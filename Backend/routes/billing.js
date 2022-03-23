var express = require('express');
const transactionModel = require('../models/transaction');
var router = express.Router();
const auth = require("../middleware/auth");

//add bill details
router.post('/add-details', (req, res, next) => {
  
    const bill = new transactionModel({
      patientId: req.body.patientId,
      type: req.body.type,
      itemId: req.body.itemId,
      qty: req.body.qty
    })

    try {

      bill.save();
      res.status(200).json(
        {
          succuss: true,
          message: 'Insertion succussfull'
        }
      );
    
    }
    catch (error) {
      res.status(400).json(
        { succuss: false, 
          message: error.message 
        }
        );
    }
  
  });
  
  
  module.exports = router;
  