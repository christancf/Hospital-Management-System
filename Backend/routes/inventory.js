var express = require('express');
const itemModel = require('../models/item');
var router = express.Router();
const auth = require("../middleware/auth");



router.post('/item', function (req, res, next) {

  const item = new itemModel({
    Id: req.body.Id,
    item_name: req.body.Item_Name,
    description: req.body.Description,
    manufacturer:req.body.Manufacturer,
    unit_price: req.body.Unit_Price,
    total_quantity: req.body.Total_Quantity

  });

  try {

    const dataToSave = item.save();
    res.status(200).json(dataToSave);

  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }

});



module.exports = router;