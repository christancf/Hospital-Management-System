var express = require('express');
const staffModel = require('../models/staff');
var router = express.Router();
const auth = require("../middleware/auth");


//add new staff member
router.post('/add-member', function (req, res, next) {

  const staff = new staffModel({
    staffID: req.body.staffID,
    staffName: req.body.staffName,
    NIC: req.body.NIC,
    email: req.body.email,
    designation: req.body.designation,
    qualification: req.body.qualification,
    dateOfBirth: req.body.dateOfBirth,
    gender: req.body.gender,
    address: req.body.address,
    basicSalary: req.body.basicSalary,
    mobile: req.body.mobile,
    home: req.body.home
  });

  try {
    const addStaffMember = staff.save()
    if(addStaffMember){
      res.status(200).json(addStaffMember)
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

//read staff member details
router.get('/read-details?:id', async (req, res, next) => {
  try {
    let staffDetails = await staffModel.find({staffID: req.query.id})
    res.status(200).json({details: staffDetails})
  } catch (error) {
    res.status(400).json({message: error.message})
  }
});

router.post('/update-details', function (req, res, next) {

})

module.exports = router;
