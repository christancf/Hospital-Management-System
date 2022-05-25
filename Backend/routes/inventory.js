var express = require("express");
const itemModel = require("../models/item");
const inventoryItemModel = require("../models/inventoryItem");
var router = express.Router();
const auth = require("../middleware/auth");

//create item in the item list
router.post("/item", function (req, res, next) {
  const item = new itemModel({
    id: req.body.id,
    item_name: req.body.item_name,
    description: req.body.description,
    manufacturer: req.body.manufacturer,
    category: req.body.category,
    unit_price: req.body.unit_price,
    total_quantity: 0,
    status: true,
  });

  try {
    const dataToSave = item.save();
    res.status(200).json({
      success: true,
      Message: "insertion successful",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//create inventoryitem in the inventorylist
router.post("/inventoryItem", function (req, res, next) {
  const inventoryItem = new inventoryItemModel({
    item_id: req.body.item_id,
    item_name: req.body.item_name,
    quantity: req.body.quantity,
    manufacture_date: req.body.manufacture_date,
    expire_date: req.body.expire_date,
    status: "Available",
  });

  try {
    const dataToSave = inventoryItem.save().then(() => {

      itemModel.findOneAndUpdate(
        {
          id: req.body.item_id
        },
        {
          $inc: {
            total_quantity: req.body.quantity
          }
        }
      ).then(() => {


        res.status(200).json({
          success: true,
          Message: "insertion successful",
        });


      }).catch((er) => {

        res.status(400).json({
          success: false,
          message: er.message,
          payload: [],
        });

      })


    }).catch((err) => {


      res.status(400).json({
        success: false,
        message: err.message,
        payload: [],
      });

    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      payload: [],
    });
  }
});

// REtrive data from itemlist
router.get("/itemlist", async function (req, res, next) {
  const categoryType = req.query.category;

  try {
    let itemDetails = await itemModel.find({
      category: categoryType,
      status: true,
    });

    res.status(200).json({
      success: true,
      message: "Successful Retrieval",
      payload: itemDetails,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      payload: [],
    });
  }
});

// REtrive data from inverntorylist
router.get("/inventorylist", async function (req, res, next) {
  

  try {
    let inventoryItemDetails = await inventoryItemModel.find();

    res.status(200).json({
      success: true,
      message: "Successful Retrieval",
      payload: inventoryItemDetails,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      payload: [],
    });
  }
});


// REtrive data from 
router.get("/getallitems", async function (req, res, next) {


  try {
    let itemDetails = await itemModel.find({status:true});

    res.status(200).json({
      success: true,
      message: "Successful Retrieval",
      payload: itemDetails,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      payload: [],
    });
  }
});

//update item details
router.post("/update-details", (req, res, next) => {
  itemModel
    .findOneAndUpdate(
      {
        id: req.body.id,
      },
      {
        $set: {
          item_name: req.body.item_name,
          description: req.body.description,
          manufacturer: req.body.manufacturer,
          category: req.body.category,
          unit_price: req.body.unit_price,
        },
      }
    )
    .then((result) => {
      res.json({
        success: true,
        message: "inserted sucessful",
        payload: {},
      });
    })
    .catch((e) => {
      res.status(400).json({ success: false, message: e.message, payload: {} });
    });
});

router.get("/read", function (req, res, next) {
  itemModel
    .find({ id: req.query.id })
    .then((itemDetails) => {
      res.status(200).json({
        success: true,
        message: "inserted sucessful",
        payload: itemDetails[0],
      });
    })
    .catch((error) => {
      res
        .status(400)
        .json({ success: false, message: error.message, payload: {} });
    });
});

//incrementing item id
router.get("/id", function (req, res, next) {
  itemModel
    .find()
    .sort({ id: -1 })
    .limit(1)
    .then((id) => {
      res.status(200).json({
        success: true,
        message: "sucessful",
        payload: id[0].id + 1,
      });
    })
    .catch((e) => {
      res.status(400).json({ success: false, message: e.message, payload: {} });
    });
});

router.delete("/itemlist/delete", (req, res, next) => {
  itemModel
    .updateOne({ id: req.query.id }, { $set: { status: false } })
    .then((result) => {
      res.json({
        success: true,
        message: "inserted sucessful",
        payload: {},
      });
    })
    .catch((e) => {
      res.status(400).json({ success: false, message: e.message, payload: {} });
    });
});

module.exports = router;
