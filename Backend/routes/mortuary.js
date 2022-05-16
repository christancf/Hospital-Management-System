var express = require("express");
const corpseModel = require("../models/mortuary");
var router = express.Router();
const auth = require("../middleware/auth");

//generate auto incremented id
router.get("/id", function (req, res, next) {
  corpseModel
    .find()
    .sort({ id: -1 })
    .limit(1)
    .then((response) => {
      res.status(200).json({
        success: true,
        message: "sucessful",
        payload: response[0].id + 1,
      });
    })
    .catch((e) => {
      res.status(400).json({
        success: false,
        message: e.message,
        payload: {},
      });
    });
});

//add corpse initially
router.post("/add", function (req, res, next) {
  const corpse = new corpseModel({
    id: req.body.id,
    NIC: req.body.NIC,
    name: req.body.name,
    sex: req.body.sex,
    address: req.body.address,
    date_of_birth: req.body.date_of_birth,
    date_time_of_death: req.body.date_time_of_death,
    cause_of_death: req.body.cause_of_death,
    specifics_of_death: req.body.specifics_of_death,
    cabinet_number: req.body.cabinet_number,
    status: true,
    receiver_name: null,
    receiver_type: null,
    receiver_description: null,
    date_of_release: null,
  });

  try {
    corpse.save();
    res.status(200).json({
      success: true,
      message: "Insertion Successful",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// READ to info page
router.get("/info", async function (req, res, next) {
  try {
    let corpseDetails = await corpseModel.find(
      {},
      {
        id: 1,
        NIC: 1,
        name: 1,
        cause_of_death: 1,
        date_time_of_death: 1,
        date_of_release: 1,
        cabinet_number: 1,
        status: 1,
        _id: 0,
      }
    );
    // corpseDetails = JSON.stringify(corpseDetails)  //convert to json string
    // corpseDetails = JSON.parse(corpseDetails)  //convert to json
    console.log(corpseDetails);
    res.status(200).json({
      success: true,
      message: "Successful Retrieval",
      payload: corpseDetails,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

//read for homepage
router.get("/home", async function (req, res, next) {
  try {
    let corpseDetails = await corpseModel.find({ status: true }, { _id: 0 });
    console.log(corpseDetails);
    res.status(200).json({
      success: true,
      message: "Successful Retrieval",
      payload: corpseDetails,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// READ for update page
router.post("/update/read", async function (req, res, next) {
  // console.log(req.query.id)
  try {
    let corpseDetails = await corpseModel
      .find(
        { id: req.body.id },
        {
          NIC: 1,
          name: 1,
          sex: 1,
          address: 1,
          date_of_birth: 1,
          date_time_of_death: 1,
          cause_of_death: 1,
          date_time_of_death: 1,
          cabinet_number: 1,
          specifics_of_death: 1,
          _id: 0,
        }
      )
      .then((response) => {
        console.log(response);
        res.status(200).json({
          success: true,
          message: "Successful Retrieval",
          payload: response,
        });
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      });
    // corpseDetails = JSON.stringify(corpseDetails)  //convert to json string
    // corpseDetails = JSON.parse(corpseDetails)  //convert to json
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});
//update corpse
router.post("/update/corpse", function (req, res, next) {
  const id = req.query.id;

  try {
    corpseModel
      .findOneAndUpdate(
        { id: id },
        {
          $set: {
            NIC: req.body.NIC,
            name: req.body.name,
            sex: req.body.sex,
            address: req.body.address,
            date_of_birth: req.body.date_of_birth,
            date_time_of_death: req.body.date_time_of_death,
            cause_of_death: req.body.cause_of_death,
            specifics_of_death: req.body.specifics_of_death,
          },
        }
      )
      .then((response) => {
        res.status(200).json({
          succuss: true,
          message: "Update process successful",
          payload: {},
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          succuss: false,
          message: err.message,
          payload: {},
        });
      });
  } catch (error) {
    res.status(400).json({
      succuss: false,
      message: error.message,
      payload: {},
    });
  }
});
// READ for occupied corpse page
router.post("/home/read", async function (req, res, next) {
  try {
    let response = await corpseModel
      .find(
        { id: req.query.id },
        {
          NIC: 1,
          name: 1,
          sex: 1,
          address: 1,
          date_of_birth: 1,
          date_time_of_death: 1,
          cause_of_death: 1,
          date_time_of_death: 1,
          cabinet_number: 1,
          specifics_of_death: 1,
          _id: 0,
        }
      )
      .then((response) => {
        console.log(response);
        res.status(200).json({
          success: true,
          message: "Successful Retrieval",
          payload: response,
        });
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

//Release corpse (update)
router.post("/release", function (req, res, next) {
  const id = req.query.id;
  try {
    corpseModel
      .findOneAndUpdate(
        { id: id },
        {
          $set: {
            receiver_name: req.body.receiver_name,
            receiver_type: req.body.receiver_type,
            date_of_release: req.body.date_of_release,
            receiver_description: req.body.receiver_description,
            status: false,
            cabinet_number: null,
          },
        }
      )
      .then((response) => {
        res.status(200).json({
          succuss: true,
          message: "Release process successful",
          payload: {},
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          succuss: false,
          message: err.message,
          payload: {},
        });
      });
  } catch (error) {
    res.status(400).json({
      succuss: false,
      message: error.message,
      payload: {},
    });
  }
});

//search
router.post("/search", async function (req, res, next) {
  corpseName = req.body.name;
  try {
    let corpseDetails = await corpseModel.find(
      { $text: {$search: corpseName}}
    );
    console.log(corpseDetails);
    res.status(200).json({
      success: true,
      message: "Successful Retrieval",
      payload: corpseDetails,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

//read data according to age
router.post("/filter", async function (req, res, next) {
  const lowerYear = req.body.low;
  const  upperYear = req.body.high;
  const cod = req.body.cod;

  let query = {}
  if(lowerYear != undefined && upperYear != undefined){
    query.date_of_birth = {$lt: upperYear, $gt: lowerYear}
  }
  if(cod != undefined){
    query.cause_of_death = cod;
  }
  try {
    let corpseDetails = await corpseModel.find(
     // {date_of_birth: {$lt: upperYear, $gt: lowerYear}}
     query
    );
    res.status(200).json({
      success: true,
      message: "Successful Retrieval",
      payload: corpseDetails,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;
