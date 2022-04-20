var express = require('express');
const userModel = require('../models/user');
const appointmentModel = require('../models/appointment')
const staffModel = require('../models/staff')
var router = express.Router();
const auth = require("../middleware/auth");



router.post('/appointment/add', function (req, res, next) {

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
      {
        succuss: false,
        message: error.message
      }
    );
  }


});

router.post('/appointment/edit', function (req, res, next) {

  const id = req.query.id;

  try {

    appointmentModel.findByIdAndUpdate(id, {
      $set: {
        NIC: req.body.NIC,
        name: req.body.name,
        birthday: req.body.birthday,
        contact_no: req.body.contact_no,
        doctor_id: req.body.doctor_id,
        date: req.body.date,
        queue_no: req.body.queue_no,
        status: 'pending'
      }
    }).then((response) => {
      res.status(200).json(
        {
          succuss: true,
          message: 'Update process succussfull',
          payload: {}
        }
      );

    }).catch((err) => {
      res.status(400).json(
        {
          succuss: false,
          message: err.message,
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
        payload: {}
      }
    );
  }


});

router.post('/appointment/delete', function (req, res, next) {

  const id = req.query.id;

  try {

    appointmentModel.findByIdAndUpdate(id, {
      $set: {
        status: 'deleted'
      }
    }).then((response) => {
      res.status(200).json(
        {
          succuss: true,
          message: 'Delete process succussfull',
          payload: {}
        }
      );

    }).catch((err) => {
      res.status(400).json(
        {
          succuss: false,
          message: err.message,
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
        payload: {}
      }
    );
  }


});


router.get('/appointments', async function (req, res, next) {


  try {

    const response = await appointmentModel.find({
      status : {$ne : 'deleted'}
    }).then((response) => {
      res.status(200).json(
        {
          succuss: true,
          message: 'Retriaval succussfull',
          payload: response
        }
      );
    }).catch(() => {
      res.status(400).json(
        {
          succuss: false,
          message: error.message,
          payload: []
        }
      );

    })

  }
  catch (error) {
    res.status(400).json(
      {
        succuss: false,
        message: error.message,
        payload: []
      }
    );
  }


});

router.get('/search/appointment', async function (req, res, next) {

  const appointmentNo = req.query.id;

  try {

    const response = await appointmentModel.find({
      _id: appointmentNo
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
      {
        succuss: false,
        message: error.message,
        payload: []
      }
    );
  }


});


router.get('/doctors/', async function (req, res, next) {


  try {

    const response = await staffModel.find({
      designation: 'doctor'
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
      {
        succuss: false,
        message: error.message,
        payload: []
      }
    );
  }


});



module.exports = router;
