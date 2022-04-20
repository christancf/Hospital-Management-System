var express = require('express');
const bloodbagModel = require('../models/bloodbag');
var router = express.Router();
const auth = require("../middleware/auth");


//add blood bag details
router.post('/add-details', function (req, res, next) {

  const bloodbag = new bloodbagModel({
    bagId:req.body.bagId,
    donorName: req.body.donorName,
    donorNIC: req.body.donorNIC,
    place: req.body.place,
    donationNumber: req.body.donationNumber,
    donateDate: req.body.donateDate,
    bloodGroup: req.body.bloodGroup.value,
    // valume:1,
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


//read blood bank details
router.get('/details/read', async (req, res, next) => {
  try {
    let bloodbagDetail = await bloodbagModel.find({}).then((response)=> {
      res.status(200).json({
        succuss: true,
        message: 'read succussfull',
        payload: response
      })

    }).catch((errr)=> {
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


router.get('/read', function(req,res,next){
  bloodbagModel.find({bagId:req.query.id})
  .then((bloodBag) => {
      res.status(200).json({
          success:true,
          message:'inserted sucessful',
          payload:bloodBag[0]
      })
  }).catch((e) => {
      res.status(400).json({success:false,message:error.message,payload:{}})
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
      "bloodGroup":req.body.bloodbag.bloodGroup.value}})
    .then((result) => {
      res.json({
          success:true,
          message:'inserted sucessful',
          payload:{}
      })
    }).catch((e) => {
      res.status(400).json({success:false,message:e.message,payload:{}})
    })
})






// router.put('/update-details', async (req, res) => {
//   const newDonorName = req.body.newDonorName
//   const newDonorNIC = req.body.newDonorNIC
//   const newplace = req.body.place

//   try {
//     await bloodbag.findById(id, (_error, bagUpdate) => {
//       bagUpdate.donorName = newDonorName;
//       bagUpdate.donorNIC = newDonorNIC;
//       bagUpdate.place = newplace;
//       bagUpdate.save()
//     });
//   } catch (error) {
//     console.log(error)
//   }

//   res.send("Updated");
// });

//delete blood bag
router.delete('/bag-delete/:id', (req, res) => {
  try {
    bloodbagModel.findByIdAndRemove(req.params.id).exec((err, deleteBag) => {
      if (err) return res.status(400).json({
        message: "Delete unsuccesful", err
      });

      return res.json({
        massege: "succesful"
      })
    })
  } catch (error) {
    console.log(error);
  }

});

router.get('/bagId', function(req,res,next){
  bloodbagModel.find().sort({bagId : -1}).limit(1)
  .then((id) => {
    res.status(200).json({
        success:true,
        message:'sucessful',
        payload:id[0].bagId+1
    })
}).catch((e) => {
    res.status(400).json({success:false,message:error.message,payload:{}})
})

});


module.exports = router;
