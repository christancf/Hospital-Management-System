var express = require('express');
const corpseModel = require('../models/mortuary');
var router = express.Router();
const auth = require("../middleware/auth");


//add corpse initially
router.post('/add', function (req, res, next) {

  const corpse = new corpseModel({
    NIC: req.body.NIC,
    name: req.body.name,
    sex: req.body.sex,
    address: req.body.address,
    date_of_birth: req.body.date_of_birth,
    date_time_of_death: req.body.date_time_of_death,
    cause_of_death: req.body.cause_of_death,
    specifics_of_death: req.body.specifics_of_death,
    // cabinet_number: req.body.cabinet_number,
    cabinet_number: 'A1',
    status: false,
    receiver_name: null,
    receiver_type: null

  });

  try {

    corpse.save();
    res.status(200).json(
      {
        success: true,
        message: 'Insertion Successful'
      }
    );

  }
  catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }

});

// READ to info page
router.get('/info', async function (req, res, next) {

  try {
    let corpseDetails = await corpseModel.find({})
    // corpseDetails = JSON.stringify(corpseDetails)  convert to json string
    // corpseDetails = JSON.parse(corpseDetails)  convert to json
    res.status(200).json({details: corpseDetails})
  } catch (error) {
    res.status(400).json({message: error.message})
  }

})

module.exports = router;
