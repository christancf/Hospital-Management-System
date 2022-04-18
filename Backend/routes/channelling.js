var express = require('express');
const userModel = require('../models/user');
const appointmentModel = require('../models/appointment')
const staffModel = require('../models/staff')
var router = express.Router();
const auth = require("../middleware/auth");



router.post('/apppointment/add', function (req, res, next) {

const appointment = new appointmentModel({
NIC: req.body.NIC,
name: req.body.name,
birthday: req.body.birthday,
contact_no: req.body.contact_no,
doctor_id: req.body.doctor_id,
date: req.body.date,
queue_no: req.body.queue_no,
status: 'pending'

});

try {

  appointment.save();
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



router.get('/doctors/', async function (req, res, next) {

  
  try {
  
    const response = await staffModel.find({
      designation : 'doctor'
      },
      {
        _id: 1,
        staffID: 1,
        staffName: 1
      });
    res.status(200).json(
      {
        succuss: true,
        message: 'Retriaval succussfull',
        payload: response
      }
    );
  
  }
  catch (error) {
    res.status(400).json(
      { succuss: false, 
        message: error.message,
        payload: []
      }
      );
  }
  
  
  });



module.exports = router;
