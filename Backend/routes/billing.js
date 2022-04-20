var express = require('express');
const transactionModel = require('../models/transaction');
const patientModel = require('../models/patient');
const itemModel = require('../models/item');
const billModel = require('../models/bill');
var router = express.Router();
const auth = require("../middleware/auth");


const insertTransaction = async (req, res, next, billId) => {

  const bill = new transactionModel({
    patientId: req.body.patientId,
    type: req.body.type,
    itemId: req.body.itemId,
    qty: req.body.qty,
    billId: billId,
    patientName: req.body.patientName,
    roomCharges: req.body.roomCharges,
    itemCharges: req.body.itemCharges,
    doctorCharges: req.body.doctorCharges,
    tax: req.body.tax,
    total: req.body.total
  })

  try {

    bill.save().then(async () => {

      const decrementCount = -1 * req.body.qty;
      const response = await itemModel.findOneAndUpdate({
        id: req.body.itemId
      },
        {
          $inc: {
            total_quantity: decrementCount
          }
        }).then((response) => {

          billModel.findOneAndUpdate(
            {
              _id: billId
            },
            {
              $inc: {
                room_charges: req.body.roomCharges,
                item_charges: req.body.itemCharges,
                doctor_charges: req.body.doctorCharges,
                total: req.body.total,
                tax: req.body.tax
              }
            }
          ).then(() => {

            res.status(200).json(
              {
                succuss: true,
                message: 'Transaction Insertion and inventory update succussfull',
                payload: {}
              }
            );
          }).catch((billError) => {

            res.status(400).json(
              {
                succuss: false,
                message: billError.message,
                payload: {}
              }
            );

          })



        }).catch((err) => {
          res.status(400).json(
            {
              succuss: false,
              message: err.message,
              payload: {}
            }
          );

        });


    }).catch((error) => {
      res.status(400).json(
        {
          succuss: false,
          message: error.message,
          payload: {}
        }
      );
    });
  } catch (error) {
    res.status(400).json(
      {
        succuss: false,
        message: error.message,
        payload: {}
      }
    );
  }

}
//add bill details
router.post('/add-details', async (req, res, next) => {

  const currentBillId = await billModel.find({
    patient_id: req.body.patientId,
    status: 'pending'
  }).then((resp) => {

    if (resp.length == 0) {

      const newBill = new billModel(
        {
          patient_name: req.body.patientName,
          patient_id: req.body.patientId,
          room_charges: 0,
          item_charges: 0,
          doctor_charges: 0,
          tax: 0,
          total: 0,
          status: 'pending'
        }
      )
      newBill.save().then((response) => {

        insertTransaction(req, res, next, response._id.toString());
      });

    }
    else {
      insertTransaction(req, res, next, resp[0]._id.toString());
    }

  }).catch((erro) => {

    res.status(400).json(
      {
        succuss: false,
        message: erro.message,
        payload: {}
      }
    );

  })


});

router.get('/patient', async (req, res, next) => {



  try {
    const response = await patientModel.find({}).then((response) => {

      res.status(200).json(
        {
          succuss: true,
          message: 'Retirval succussfull',
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
        payload: {}
      }
    );
  }

});

router.get('/transactions', async (req, res, next) => {

  const currentBillId = await billModel.find({
    patient_id: req.query.patientId,
    status: 'pending'
  }).then((resp) => {

    if (resp.length == 0) {

      res.status(400).json(
        {
          succuss: false,
          message: "No Bill created yet",
          payload: []
        }
      );

    }
    else {
      transactionModel.find({
        billId : resp[0]._id
      }).then((responseTrans)=> {

        res.status(200).json(
          {
            succuss: true,
            message:'Retirval succussfull',
            payload: responseTrans
          }
        );

      }).catch((transError)=> {

        res.status(400).json(
          {
            succuss: false,
            message: transError.message,
            payload: []
          }
        );

      });
    }

  }).catch((erro) => {

    res.status(400).json(
      {
        succuss: false,
        message: erro.message,
        payload: {}
      }
    );

  })

});


router.get('/items', async (req, res, next) => {



  try {
    const response = await itemModel.find({}).then((response) => {

      res.status(200).json(
        {
          succuss: true,
          message: 'Retirval succussfull',
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
        payload: {}
      }
    );
  }

});

router.get('/bills', async (req, res, next) => {



  try {
    const response = await billModel.find({
      patient_id: req.query.patient
    }).then((response) => {

      res.status(200).json(
        {
          succuss: true,
          message: 'Retirval succussfull',
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
        payload: {}
      }
    );
  }

});

router.post('/transaction/add', async (req, res, next) => {



  try {
    const response = await itemModel.find({}).then((response) => {

      res.status(200).json(
        {
          succuss: true,
          message: 'Retirval succussfull',
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
        payload: {}
      }
    );
  }

});


module.exports = router;
