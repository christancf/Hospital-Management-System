var express = require('express');
const itemModel = require('../models/item');
var router = express.Router();
const auth = require("../middleware/auth");



router.post('/item', function (req, res, next) {

  const item = new itemModel({
    id: req.body.id,
    item_name: req.body.item_name,
    description: req.body.description,
    manufacturer:req.body.manufacturer,
    category:req.body.category,
    unit_price: req.body.unit_price,
    total_quantity: req.body.total_quantity

  });

  try {

    const dataToSave = item.save();
    res.status(200).json({
        success:true,
        Message: 'insertion successful'
    });

  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }

});



module.exports = router;