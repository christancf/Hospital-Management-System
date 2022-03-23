var express = require('express');
const userModel = require('../models/user');
var router = express.Router();
const auth = require("../middleware/auth");



router.post('/users', function (req, res, next) {

  const user = new userModel({
    name: req.body.name,
    age: req.body.age
  });

  try {

    const dataToSave = user.save();
    res.status(200).json(dataToSave);

  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }

});



module.exports = router;
