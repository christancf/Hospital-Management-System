var express = require('express');
const transactionModel = require('../models/transaction');
const patientModel = require('../models/patient');
const itemModel = require('../models/item');
const billModel = require('../models/bill');
const roomModel = require('../models/ward');
var router = express.Router();
const auth = require("../middleware/auth");


const insertTransaction = async (req, res,next,billId) => {

  const total = req.body.count * req.body.charge;
  const type  = req.body.type;
  transactionModel.findOne({
    billId:billId,
    type:req.body.type,
    id:req.body.id
  }).then((resp) => {
    if (resp == null){

      const transaction = new transactionModel({
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
    
        transaction.save().then(async () => {
    
          if(type=="room"){
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
                    message: Error.message,
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
                  message: Error.message,
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
router.post('/add-details', auth, async (req, res, next) => {

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
          status: 'pending',
          payment_date: null
        }
      )
      newBill.save().then((response) => {

        insertTransaction(req, res, next, response._id.toString());
      }).catch((erro) => {

        res.status(400).json(
          {
            succuss: false,
            message: erro.message,
            payload: {}
          }
        );
    
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

router.get('/patient',  auth,async (req, res, next) => {
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

router.get('/transactions',  auth,async (req, res, next) => {

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
      }, {payment_date: 0}).then((responseTrans)=> {

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


router.get('/items', auth, async (req, res, next) => {
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
router.get('/rooms',  auth,async (req, res, next) => {
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

router.get('/bills', auth, async (req, res, next) => {
  try {
    const response = await billModel.findOne({
      patient_id: req.query.patient,
      status:"pending"
    }, {payment_date: 0}).then((response) => {

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

router.get('/all-bills',  auth,async (req, res, next) => {

  try {
    const response = await billModel.find({
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

router.post('/transaction/add', auth, async (req, res, next) => {



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


router.get('/paid', auth,async (req,res,next)=>{
  var date = new Date().getTime()
  billModel.findOneAndUpdate({
  patient_id: req.query.id,
  status:"pending"
  },{$set:{status:"paid", payment_date: date}}).then((response) => {
  
  
  
  res.status(200).json(
  {
  succuss: true,
  message: 'Update succussfull',
  payload: {}
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
  })

  router.post("/billingMonth", async function (req, res, next) {

    var today = new Date().setHours(24, 0, 0, 0)
    var januOne = new Date(1640975400000).setHours(0, 0, 0, 0)

    try {
      let billDetails = await billModel.aggregate([
        { $match: { $and: [{ payment_date: { $gte: januOne } }, { payment_date: { $lte: today } }] } },
        { $addFields: { convertedDate: { $toDate: "$payment_date" } } },
        { $group: { _id:  { $month: "$convertedDate" } , totalItemCharges: { $sum: "$item_charges" }, totalRoomCharges: {$sum: "$room_charges"} } },
        { $project: {totalIncome: {$sum: ["$totalItemCharges", "$totalRoomCharges"]} }}
      ]);
      res.status(200).json({
        success: true,
        message: "Successful Retrieval",
        payload: billDetails,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  });
module.exports = router;