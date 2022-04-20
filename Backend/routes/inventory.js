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
    total_quantity: 0

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

  const categoryType = req.query.category;

  try {
    let itemDetails = await itemModel.find({
      category : categoryType
    })

    res.status(200).json({
      success: true,
      message: "Successful Retrieval",
      payload: itemDetails
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      payload: []
    })
  }

})

//incrementing item id
router.get('/id', function(req,res,next){
  itemModel.find().sort({id : -1}).limit(1)
  .then((id) => {
    res.status(200).json({
        success:true,
        message:'sucessful',
        payload:id[0].id+1
    })
}).catch((e) => {
    res.status(400).json({success:false,message:e.message,payload:{}})
})

});




module.exports = router;