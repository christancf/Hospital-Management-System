var express = require('express');
const transactionModel = require('../models/transaction');
const patientModel = require('../models/patient');
const itemModel = require('../models/item');
const billModel = require('../models/bill');
const roomModel = require('../models/ward');
var router = express.Router();
const auth = require("../middleware/auth");


const insertTransaction = async (req, res,next,billId) => {

  total = req.body.count * req.body.charge
  type  = req.body.type
  transactionModel.findOne({
    billId:billId,
    type:req.body.type,
    id:req.body.id
  }).then((resp) => {
    if (resp == null){

      const bill = new transactionModel({
        patientId: req.body.patientId,
        type: req.body.type,
        id: req.body.id,
        count: req.body.count,
        billId: billId,
        patientName: req.body.patientName,
        charge: req.body.charge,
        total: total
      })
    
      try {
    
        bill.save().then(async () => {
    
          if(req.body.type=="room"){
            billModel.findOneAndUpdate(
              {
                _id: billId
              },
              {
                $inc: {
                  room_charges: total,
                }
              }
              ).then(() => {
    
                res.status(200).json(
                  {
                    succuss: true,
                    message: 'Transaction Insertion and bill update succussfull',
                    payload: {}
                  }
                );
              }).catch((Error) => {
    
                res.status(400).json(
                  {
                    succuss: false,
                    message: "62"+Error.message,
                    payload: {}
                  }
                );
    
              })
          }
    
          if(type == "item")
          {
            const decrementCount = -1 * req.body.count;
            itemModel.findOneAndUpdate({
              id: req.body.id
            },
              {
                $inc: {
                  total_quantity: decrementCount
                }
            })
            .then((response) => {
              billModel.findOneAndUpdate(
                {
                  _id: billId
                },
                {
                  $inc: {
                    item_charges: total,
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
                    message: "105"+billError.message,
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
    
            });}
          
          
      
    
    
        }).catch((error) => {
          res.status(400).json(
            {
              succuss: false,
              message: "133"+error.message,
              payload: {}
            }
          );
        });
      } catch (error) {
        res.status(400).json(
          {
            succuss: false,
            message: "142"+error.message,
            payload: {}
          }
        );
      }

    }
    else{
      // implement what to do if the item is already in transaction
      transactionModel.findOneAndUpdate({
        _id:resp._id
      },{
        $inc:{
          count:req.body.count,
          total:total
        }
      }).then(async () => {
    
        if(req.body.type=="room"){
          billModel.findOneAndUpdate(
            {
              _id: billId
            },
            {
              $inc: {
                room_charges: total,
              }
            }
            ).then(() => {
  
              res.status(200).json(
                {
                  succuss: true,
                  message: 'Transaction Insertion and bill update succussfull',
                  payload: {}
                }
              );
            }).catch((Error) => {
  
              res.status(400).json(
                {
                  succuss: false,
                  message: "184"+Error.message,
                  payload: {}
                }
              );
  
            })
        }
  
        if(type == "item")
        {
          const decrementCount = -1 * req.body.count;
          itemModel.findOneAndUpdate({
            id: req.body.id
          },
            {
              $inc: {
                total_quantity: decrementCount
              }
          })
          .then((response) => {
            billModel.findOneAndUpdate(
              {
                _id: billId
              },
              {
                $inc: {
                  item_charges: total,
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
  
          });}
        
        
    
  
  
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
    const response = await patientModel.find({status:"true"}).then((response) => {

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

      res.status(200).json(
        {
          succuss: true,
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
    const response = await itemModel.find({total_quantity:{$gt:0}}).then((response) => {

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
router.get('/rooms', async (req, res, next) => {
  try {
    const response = await roomModel.find({}).then((response) => {

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

router.get('/all-bills', async (req, res, next) => {

  try {
    const response = await billModel.find({
      status: 'pending'
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
