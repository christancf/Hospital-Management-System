var express = require('express');
const wardModel = require('../models/ward');
var router = express.Router();
const auth = require("../middleware/auth");

//testing
router.get('/', (req, res, next) => {
  res.send("IT works")
})

//add ward details
router.post('/details/add', async (req, res, next) => {
  
  let ward = new wardModel({
    id: req.body.id,
    category: req.body.category,
    capacity: req.body.capacity,
    status: req.body.status
  })1

  try {

     let ward =  await ward.save();
    res.status(200).json({message: 'Successful', id: ward_id})

  } catch (error) {
    res.status(400).json({message: error.message})
  }

});

//read ward details
router.get('/details/read?:id', async (req, res, next) => {
  try {
    let wardDetail = await wardModel.find({id: req.query.id})
    res.status(200).json({details: wardDetail})
  } catch (error) {
    res.status(400).json({message: error.message})
  }
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
