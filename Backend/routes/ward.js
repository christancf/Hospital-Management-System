var express = require('express');
const wardModel = require('../models/ward');
var router = express.Router();
const auth = require("../middleware/auth");

//add ward details
router.post('/add-details', (req, res, next) => {
  
  const ward = new wardModel({
    id: req.body.id,
    category: req.body.category,
    capacity: req.body.capacity,
    status: req.body.status
  })

  try {
    const addWard = ward.save()
    if(addWard){
      res.status(200).json(addWard)
    }else{
      res.status(400).json({message: 'Cannot add data right now!'})
    }
  } catch (error) {
    res.status(400).json({message: error.message})
  }

});

router.get('/', (req, res, next) => {
  res.send("IT works")
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
