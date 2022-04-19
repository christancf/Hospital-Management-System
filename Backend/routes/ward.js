var express = require('express');
const wardModel = require('../models/ward');
var router = express.Router();
const auth = require("../middleware/auth");

//testing
router.get('/', (req, res, next) => {
  res.send("IT works")
})

//add ward details
router.post('/details/add', (req, res, next) => {
  
  let newWard = new wardModel({
    id: req.body.id,
    category: String(req.body.category),
    capacity: Number(req.body.capacity),
    status: Boolean(req.body.status)
  })

  newWard.save()
  .then(() => {
    res.json("Ward Added!")
  }).catch((e) => {
    console.log(`Error Add: ${e}`)
  })

});

//read ward details
router.get('/details/read?:id', (req, res, next) => {
  wardModel.find({id:String(req.query.id)})
  .then((wardDetails) => {
    res.json(wardDetails)
  }).catch((e) =>{
    console.log(`Error Read: ${e}`)
  })
})
//update ward details
router.put('/details/update', (req, res, next) => {
  wardModel.updateOne({id: String(req.body.id)},
    {$set: {"capacity": String(req.body.capacity), "status": String(req.body.status)}})
    .then((result) => {
      res.json(`Successfully Updated!`)
    }).catch((e) => {
      console.log(`Error Update: ${e}`)
    })
})



module.exports = router;
