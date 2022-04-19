var express = require('express');
const itemModel = require('../models/item');
var router = express.Router();
const auth = require("../middleware/auth");


//create item in the item list
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


// REtrive data from itemlist
router.get('/itemlist', async function (req, res, next) {

  try {
    let itemDetails = await itemModel.find({}, { id: 1, item_name: 1, description: 1, manufacturer: 1, date_time_of_death: 1, date_of_release: 1, cabinet_number: 1, status: 1, _id: 0})
    // corpseDetails = JSON.stringify(corpseDetails)  //convert to json string
    // corpseDetails = JSON.parse(corpseDetails)  //convert to json
    console.log(corpseDetails)
    res.status(200).json({
      success: true,
      message: "Successful Retrieval",
      payload: corpseDetails
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }

})



module.exports = router;