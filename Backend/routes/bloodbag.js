var express = require('express');
const bloodbagModel = require('../models/bloodbag');
var router = express.Router();
const auth = require("../middleware/auth");

//add blood bag details
router.post('/add-details', function (req, res, next) {

  const bloodbag = new bloodbagModel({
    donorName: req.body.donorName,
    donorNIC: req.body.donorNIC,
    place: req.body.place,
    donationNumber: req.body.donationNumber,
    donateDate: req.body.donateDate,
    bloodGroup: req.body.bloodGroup,
    // valume:1,
    // status: req.body.status
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

});


//read blood bank details
router.get('/details/read?:id', async (req, res, next) => {
  try {
    let bloodbagDetail = await bloodbagModel.find({id: req.query.id})
    res.status(200).json({details: bloodbagDetail})
  } catch (error) {
    res.status(400).json({message: error.message})
  }
});

//update blood bank details


module.exports = router;
