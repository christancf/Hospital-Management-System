var express = require('express');
const bloodbagModel = require('../models/bloodbag');
var router = express.Router();
const auth = require("../middleware/auth");
const patientModel = require('../models/patient');
const transfusionModel = require('../models/transfusion');
var router = express.Router();


//add blood bag details
router.post('/add-details', function (req, res, next) {

  function getExpiretime(timestamp){
    var mydate = new Date(timestamp)
    return mydate.setMonth( mydate.getMonth() + 1 )
    }

    const expDate=getExpiretime(req.body.donateDate)
    console.log(expDate);

  const bloodbag = new bloodbagModel({
    bagId:req.body.bagId,
    donorName: req.body.donorName,
    donorNIC: req.body.donorNIC,
    place: req.body.place,
    donationNumber: req.body.donationNumber,
    donateDate: req.body.donateDate,
    bloodGroup: req.body.bloodGroup.value,
    expireDate:expDate,
    status:'In Stock',
    volume:'1 pint(450ml)',
    // status: req.body.status
  });

  try {

    bloodbag.save();
    res.status(200).json(
      {
        succuss: true,
        message: 'Insertion succussfull',
        payload:{}
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


//read blood bag details
router.get('/details/read', async (req, res, next) => {
  try {
    let bloodbagDetail = await bloodbagModel.find({}).then((response)=> {
      res.status(200).json({
        succuss: true,
        message: 'read succussfull',
        payload: response
      })

    }).catch((error)=> {
      res.status(400).json({
        succuss: true,
        message: error.message
      });
    })

  } catch (error) {
    res.status(400).json({
      succuss: true,
      message: error.message
    });
  }
});

//read one
router.get('/read', function(req,res,next){
  bloodbagModel.find({bagId:req.query.id})
  .then((bloodBag) => {
      res.status(200).json({
          success:true,
          message:'inserted sucessful',
          payload:bloodBag[0]
      })
  }).catch((e) => {
      res.status(400).json({success:false,message:e.message,payload:{}})
  })
});

//update blood bank details
router.put('/update-details', (req, res, next) => {

  bloodbagModel.updateOne({"bagId":req.body.bloodbag.bagId,},
    {$set: {"donorName":req.body.bloodbag.donorName,
      "donorNIC":req.body.bloodbag.donorNIC,
      "donationNumber":req.body.bloodbag.donationNumber, 
      "donateDate":req.body.bloodbag.donateDate,
      "place":req.body.bloodbag.place,
      "bloodGroup":req.body.bloodbag.bloodGroup}})
    .then((result) => {
      res.json({
          success:true,
          message:'inserted sucessful',
          payload:{}
      })
    }).catch((e) => {
      res.status(400).json({success:false,message:e.message,payload:{}})
    })
});

//delete blood bag
router.delete('/deleteBagList', (req,res,next) => {

  const bagId = req.query.id;

  bloodbagModel.updateOne({bagId:bagId},{$set: {status: 'Expired'}})
  .then((result) => {
      res.json({
          success:true,
          message:'Deleted sucessful',
          payload:{}
      })
    }).catch((e) => {
      res.status(400).json({success:false,message:e.message,payload:{}})
    })
})
// router.delete('/deleteBagList', function (req, res, next) {

//   const id = req.query.bagId;

//   try {
//     bloodbagModel.updateOne(id, {
//       $set: {
//         status: 'deleted'
//       }
//     }).then((response) => {
//       res.status(200).json(
//         {
//           succuss: true,
//           message: 'Delete process succussfull',
//           payload: {}
//         }
//       );
//     }).catch((err) => {
//       res.status(400).json(
//         {
//           succuss: false,
//           message: err.message,
//           payload: {}
//         }
//       );
//     });
//   }
//   catch (error) {
//     res.status(400).json(
//       {
//         succuss: false,
//         message: error.message,
//         payload: {}
//       }
//     );
//   }
// });

//get bagID
router.get('/bagId', function(req,res,next){
  bloodbagModel.find().sort({bagId : -1}).limit(1)
  .then((id) => {
    res.status(200).json({
        success:true,
        message:'sucessful',
        payload:id[0].bagId+1
    })
}).catch((e) => {
    res.status(400).json({success:false,message:e.message,payload:{}})
})

});


//get patient ID
router.get('/patient?:id', async (req, res, next) => {
  // patientModel.findOne({patientId: req.query.patientId, designation: "patient"})
  // .then((data) => res.json(data))
  // .catch((e) => console.log(`Error: ${ e }`))

  try {
    patientModel.findOne({patientId: req.query.id, designation: "patient",status:'true'}).then((data) => {

      res.status(200).json(
        {
          succuss: true,
          message: 'Retirval succussfull',
          payload: data
        }
      );

    }).catch((e) => {console.log(`Error: ${ e }`)
      // res.status(400).json(
      //   {
      //     succuss: false,
      //     message: error.message,
      //     payload: {}
      //   }
      // );

    });


  }
  catch (e) {
    res.status(400).json(
      {
        succuss: false,
        message: error.message,
        payload: {}
      }
    );
  }

});

//add fransfusion
router.post('/add-transfusion-details', function (req, res, next) {

  const transfusion = new transfusionModel({
    bagId:req.body.bagId,
    id: req.body.id,
   name: req.body.name,
    reason: req.body.reason,
    issueDate: req.body.issueDate,
    bloodGroup: req.body.bloodGroup,
    pbloodGroup: req.body.pbloodGroup,
    // valume:1,
    // status: req.body.status
  });

  try {

    transfusion.save();
    res.status(200).json(
      {
        succuss: true,
        message: 'Insertion succussfull',
        payload:{}
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

router.get('/details/readTransfusion', async (req, res, next) => {
  try {
    let bloodTransfusionDetail = await transfusionModel.find({}).then((response)=> {
      res.status(200).json({
        succuss: true,
        message: 'read succussfull',
        payload: response
      })

    }).catch((error)=> {
      res.status(400).json({
        succuss: true,
        message: error.message
      });
    })

  } catch (error) {
    res.status(400).json({
      succuss: true,
      message: error.message
    });
  }
});

//update status
router.put('/update-status', (req, res, next) => {

  const bagId = req.query.id;

  bloodbagModel.updateOne({bagId:bagId},
    {$set: {status: 'Out Stock'}})
    .then((result) => {
      res.json({
          success:true,
          message:'update sucessful',
          payload:{}
      })
    }).catch((e) => {
      res.status(400).json({success:false,message:e.message,payload:{}})
    })
});

//Find expire bags
router.get('/details/readExpireBag', async (req, res, next) => {

  var today = new Date().setHours(24, 0, 0, 0)
  // exDate = new Date(req.query.expireDate).toLocaleDateString()
  // console.log(exDate);


  try {
    let bloodbagDetail = await bloodbagModel.find(
      {expireDate:{$lt:today}}).then((response)=> {
      res.status(200).json({
        succuss: true,
        message: 'read succussfull',
        payload: response
      })

    }).catch((error)=> {
      res.status(400).json({
        succuss: true,
        message: error.message
      });
    })

  } catch (error) {
    res.status(400).json({
      succuss: true,
      message: error.message
    });
  }
});

module.exports = router;
