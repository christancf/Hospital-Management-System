var express = require('express');
const appointmentModel = require('../models/appointment')
const staffModel = require('../models/staff')
var router = express.Router();
const auth = require("../middleware/auth");




router.post('/appointment/add', auth, function (req, res, next) {



  try {
    const lowerDate = parseInt(new Date(req.body.date*1000).setHours(0,0,0,0)/1000);
    const upperDate = parseInt(new Date(req.body.date*1000).setHours(23,59,59,59)/1000);
    appointmentModel.find(
      {
        doctor_id: req.body.doctor_id,
        date : { $gt : lowerDate , $lt: upperDate}
      }
    ).sort({queue_no:-1}).limit(1).exec().then((dbResp)=> {

      console.log(dbResp);
      const appointment = new appointmentModel({
        NIC: req.body.NIC,
        name: req.body.name,
        birthday: req.body.birthday,
        contact_no: req.body.contact_no,
        doctor_id: req.body.doctor_id,
        date: req.body.date,
        queue_no: dbResp.length > 0 ? dbResp[0].queue_no + 1 : 1,
        status: 'pending'
    
      });
  
      appointment.save();
      res.status(200).json(
        {
          succuss: true,
          message: 'Insertion succussfull'
        }
      );
  


    });

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

router.post('/appointment/edit', auth, function (req, res, next) {

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


router.post('/doctor/appointment/editstatus', auth, function (req, res, next) {

  const id = req.query.id;

  try {

    appointmentModel.findByIdAndUpdate(id, {
      $set: {
        status: req.body.status
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

router.post('/appointment/delete', auth, function (req, res, next) {

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


router.get('/appointments', auth, async function (req, res, next) {


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


router.get('/search/appointment', auth, async function (req, res, next) {

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


router.get('/doctors/', auth, async function (req, res, next) {


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


router.get('/doctor/appointments', auth, async function (req, res, next) {


  try {

    const doc = await staffModel.find({
      designation: 'doctor',
      email: req.query.email
    });
    if(doc.length == 0 || doc != null){
      console.log(doc)

      let queryOb = {
        status : {$ne : 'deleted'},
        doctor_id : doc[0].staffID
      }
      
    if(req.query.date != "undefined" && req.query.date != "NaN"){

      const lowerDate = parseInt(new Date(parseInt(req.query.date)*1000).setHours(0,0,0,0)/1000);
      const upperDate = parseInt(new Date(parseInt(req.query.date)*1000).setHours(23,59,59,59)/1000);
      queryOb.date = { $gt : lowerDate , $lt: upperDate}
    }
      const response = await appointmentModel.find(queryOb).then((response) => {
        res.status(200).json(
          {
            succuss: true,
            message: 'Retriaval succussfull',
            payload: response
          }
        );
      }).catch((er) => {
        res.status(400).json(
          {
            succuss: false,
            message: er.message,
            payload: []
          }
        );
  
      })

    }
    else{

      res.status(400).json(
        {
          succuss: false,
          message: "Cannot find doctor !",
          payload: []
        }
      );
    }



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
