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
  
})
/*router.get('/', auth, function (req, res, next) {
  
  res.send('Hello World!');

});

router.get('/users', auth, function (req, res, next) {

  res.send({ user: ['Susith', 'Sayumi', 'Shavi', 'Nimtara', 'Christan'] });

});

router.post('/users', auth, function (req, res, next) {

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

});*/



module.exports = router;
