var express = require('express');
const userModel = require('../models/bloodbag');
var router = express.Router();
const auth = require("../middleware/auth");

//add blood bag details
router.post('/add-details', function (req, res, next) {

  const bloodbag = new bloodbagModel({
    donorName: req.body.donorName,
    donorNIC: req.body.donorNIC,
    donationNumber: req.body.donationNumber,
    donateDate: req.body.donateDate,
    bloodGroup: req.body.bloodGroup,
    valume:1,
    status: req.body.status
  });

  try {

    const dataToSave = bloodbag.save();
    res.status(200).json(dataToSave);

  }
  catch (error) {
    res.status(400).json({ message: 'Cannot add data right now!' });
  }

});



module.exports = router;
