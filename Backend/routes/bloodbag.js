var express = require('express');
const bloodbagModel = require('../models/bloodbag');
var router = express.Router();
const auth = require("../middleware/auth");
const patientModel = require('../models/patient');
const transfusionModel = require('../models/transfusion');
var router = express.Router();


//add blood bag details
router.post('/add-details', function (req, res, next) {

  function getExpiretime(timestamp) {
    var mydate = new Date(timestamp)
    return mydate.setMonth(mydate.getMonth() + 1)
  }

  const expDate = getExpiretime(req.body.donateDate)
  console.log(expDate);

  const bloodbag = new bloodbagModel({
    bagId: req.body.bagId,
    donorName: req.body.donorName,
    donorNIC: req.body.donorNIC,
    place: req.body.place,
    donationNumber: req.body.donationNumber,
    donateDate: req.body.donateDate,
    bloodGroup: req.body.bloodGroup.value,
    expireDate: expDate,
    status: 'In Stock',
    volume: '1 pint(450ml)',
  });

  try {

    bloodbag.save();
    res.status(200).json(
      {
        succuss: true,
        message: 'Insertion succussfull',
        payload: {}
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
  var today = new Date().setHours(24, 0, 0, 0)

  try {
    let bloodbagDetail = await bloodbagModel.find({ expireDate: { $gt: today }, status: 'In Stock' }).then((response) => {
      res.status(200).json({
        succuss: true,
        message: 'read succussfull',
        payload: response
      })

    }).catch((error) => {
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

//read blood bag one
router.get('/read', function (req, res, next) {
  bloodbagModel.find({ bagId: req.query.id })
    .then((bloodBag) => {
      res.status(200).json({
        success: true,
        message: 'inserted sucessful',
        payload: bloodBag[0]
      })
    }).catch((e) => {
      res.status(400).json({ success: false, message: e.message, payload: {} })
    })
});

//read blood transfusion one
router.get('/readTransfusion', function (req, res, next) {
  transfusionModel.find({ bagId: req.query.id })
    .then((bloodBag) => {
      res.status(200).json({
        success: true,
        message: 'inserted sucessful',
        payload: bloodBag[0]
      })
    }).catch((e) => {
      res.status(400).json({ success: false, message: e.message, payload: {} })
    })
});

//update blood bank details
router.put('/update-details', (req, res, next) => {
  function getExpiretime(timestamp) {
    var mydate = new Date(timestamp)
    return mydate.setMonth(mydate.getMonth() + 1)
  }
  const expDate = getExpiretime(req.body.bloodbag.donateDate)

  bloodbagModel.updateOne({ "bagId": req.body.bloodbag.bagId, },
    {
      $set: {
        "donorName": req.body.bloodbag.donorName,
        "donorNIC": req.body.bloodbag.donorNIC,
        "donationNumber": req.body.bloodbag.donationNumber,
        "donateDate": req.body.bloodbag.donateDate,
        "place": req.body.bloodbag.place,
        "bloodGroup": req.body.bloodbag.bloodGroup,
        "expireDate": expDate,
        "status": 'In Stock',
        "volume": '1 pint(450ml)',
      }
    })
    .then((result) => {
      res.json({
        success: true,
        message: 'Update sucessful',
        payload: {}
      })
    }).catch((e) => {
      res.status(400).json({ success: false, message: e.message, payload: {} })
    })
});

//update blood transfusion details
router.put('/update-transfusion', (req, res, next) => {

  transfusionModel.updateOne({ "bagId": req.body.bloodbag.bagId, },
    {
      $set: {
        "id": req.body.bloodbag.id,
        "name": req.body.bloodbag.name,
        "reason": req.body.bloodbag.reason,
        "issueDate": req.body.bloodbag.issueDate,
        "bloodGroup": req.body.bloodbag.bloodGroup,
        "pbloodGroup": req.body.bloodbag.pbloodGroup,
        "status": 'In Stock',
        "volume": '1 pint(450ml)',
      }
    })
    .then((result) => {
      res.json({
        success: true,
        message: 'Update sucessful',
        payload: {}
      })
    }).catch((e) => {
      res.status(400).json({ success: false, message: e.message, payload: {} })
    })
});

//delete blood bag
router.delete('/deleteBagList', (req, res, next) => {

  const bagId = req.query.id;

  bloodbagModel.updateOne({ bagId: bagId }, { $set: { status: 'Removed' } })
    .then((result) => {
      res.json({
        success: true,
        message: 'Deleted sucessful',
        payload: {}
      })
    }).catch((e) => {
      res.status(400).json({ success: false, message: e.message, payload: {} })
    })
})

//get bagID
router.get('/bagId', function (req, res, next) {
  bloodbagModel.find().sort({ bagId: -1 }).limit(1)
    .then((id) => {
      res.status(200).json({
        success: true,
        message: 'sucessful',
        payload: id[0].bagId + 1
      })
    }).catch((e) => {
      res.status(400).json({ success: false, message: e.message, payload: {} })
    })

});


//get patient ID
router.get('/patient?:id', async (req, res, next) => {
  try {
    patientModel.findOne({ patientId: req.query.id, designation: "patient", status: 'true' }).then((data) => {

      res.status(200).json(
        {
          succuss: true,
          message: 'Retirval succussfull',
          payload: data
        }
      );

    }).catch((e) => {
      console.log(`Error: ${e}`)
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

//add transfusion
router.post('/add-transfusion-details', function (req, res, next) {

  const transfusion = new transfusionModel({
    bagId: req.body.bagId,
    id: req.body.id,
    name: req.body.name,
    reason: req.body.reason,
    issueDate: req.body.issueDate,
    bloodGroup: req.body.bloodGroup,
    pbloodGroup: req.body.pbloodGroup,
    status: 'Out Stock',
    volume: '1 pint(450ml)'
  });

  try {

    transfusion.save();
    res.status(200).json(
      {
        succuss: true,
        message: 'Insertion succussfull',
        payload: {}
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

//read transfusion details
router.get('/details/readTransfusion', async (req, res, next) => {
  try {
    let bloodTransfusionDetail = await transfusionModel.find({}).then((response) => {
      res.status(200).json({
        succuss: true,
        message: 'read succussfull',
        payload: response
      })

    }).catch((error) => {
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

  bloodbagModel.updateOne({ bagId: bagId },
    { $set: { status: 'Out Stock' } })
    .then((result) => {
      res.json({
        success: true,
        message: 'update sucessful',
        payload: {}
      })
    }).catch((e) => {
      res.status(400).json({ success: false, message: e.message, payload: {} })
    })
});

//Find expire bags
router.get('/details/readExpireBag', async (req, res, next) => {

  var today = new Date().setHours(24, 0, 0, 0)

  try {
    let bloodbagDetail = await bloodbagModel.find(
      { expireDate: { $lt: today }, status: 'In Stock' }).then((response) => {
        res.status(200).json({
          succuss: true,
          message: 'read succussfull',
          payload: response
        })

      }).catch((error) => {
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

//Available blood bag count
router.post("/bloodBagsCount", async function (req, res, next) {

  try {
    let bagsDetails = await bloodbagModel.aggregate([
      { $match: { $and: [{ status: "In Stock" },] } },
      { $group: { _id: "$bloodGroup", count: { $sum: 1 } } },
    ]);
    res.status(200).json({
      success: true,
      message: "Successful Retrieval",
      payload: bagsDetails,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

//Blood transfusion
router.post("/transfusionCount", async function (req, res, next) {

  var today = new Date().setHours(24, 0, 0, 0)
  var januOne = new Date(1640975400000).setHours(0, 0, 0, 0)

  try {
    let bagsDetails = await transfusionModel.aggregate([
      { $match: { $and: [{ issueDate: { $gte: januOne } }, { issueDate: { $lte: today } }] } },
      { $group: { _id: "$bloodGroup", count: { $sum: 1 } } },]);
    res.status(200).json({
      success: true,
      message: "Successful Retrieval",
      payload: bagsDetails,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

//Available blood count
router.post("/availaleBloodCount", async function (req, res, next) {

  var today = new Date().setHours(24, 0, 0, 0)

  try {
    let bagsDetails = await bloodbagModel.aggregate([
      { $match: { $and: [{ status: "In Stock" }, { expireDate: { $gt: today } }] } },
      { $group: { _id: '', count: { $sum: 1 } } },]);
    res.status(200).json({
      success: true,
      message: "Successful Retrieval",
      payload: bagsDetails,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});


//Available blood count group as month
router.post("/bagCountAsMonth", async function (req, res, next) {

  var today = new Date().setHours(24, 0, 0, 0)
  var januOne = new Date(1640975400000).setHours(0, 0, 0, 0)

  try {
    let bagsDetails = await bloodbagModel.aggregate([
      { $match: { $and: [{ donateDate: { $gte: januOne } }, { donateDate: { $lte: today } }] } },
      { $addFields: { convertedDate: { $toDate: "$donateDate" } } },
      { $group: { _id: { month: { $month: "$convertedDate" } }, count: { $sum: 1 } } }]);
    res.status(200).json({
      success: true,
      message: "Successful Retrieval",
      payload: bagsDetails,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
