var express = require('express');
const staffModel = require('../models/staff');
const attendanceModel = require('../models/attendance');
const bonusModel = require('../models/bonus');
var router = express.Router();
const auth = require("../middleware/auth");


//add new staff member
router.post('/add-member', function (req, res, next) {

  const staff = new staffModel({
    staffID: req.body.staffID,
    staffName: req.body.staffName,
    NIC: req.body.NIC,
    email: req.body.email,
    designation: String(req.body.designation),
    qualification: req.body.qualification,
    dateOfBirth: req.body.dateOfBirth,
    gender: String(req.body.gender),
    address: req.body.address,
    basicSalary:Number( req.body.basicSalary),
    mobile: req.body.mobile,
    home: req.body.home,
    status: 'Employed'
  });

  staff.save()
  .then(() => res.json("Staff Member Added!"))
  .catch((e) => console.log(`Error: ${ e }`))

});


router.get('/', (req, res, next) => {
  res.send("IT works")
})

//read staff member details by id
router.get('/read-details?:id', (req, res, next) => {
  staffModel.find({staffID: req.query.id})
  .then((staffDetails) => res.json(staffDetails))
  .catch((e) => console.log(`Error: ${ e }`))
});

//read all staff details
router.get('/read-staffs', (req, res, next) => {
  staffModel.find()
  .then((details) => res.json(details))
  .catch((e) => console.log(`Error: ${ e }`))
})

//update staff details
router.put('/update-details', (req, res, next) => {
  staffModel.updateOne({staffID: req.body.staffID},
    {$set: 
      {
        staffName: req.body.staffName, 
        NIC: req.body.NIC, 
        email: req.body.email, 
        designation: String(req.body.designation),
        qualification: req.body.qualification, 
        dateOfBirth: req.body.dateOfBirth,
        gender: String(req.body.gender),
        address: req.body.address,
        basicSalary: Number( req.body.basicSalary),
        mobile: req.body.mobile,
        home: req.body.home,
        status: 'Employed'
      }
    })
      .then(() => res.json("Successfully Updated!"))
      .catch((e) => console.log(`Error: ${ e }`))
})

//update staff member status
router.put('/resign', (req, res, next) => {
  console.log(req.body.staffID)
  staffModel.updateOne({staffID: req.body.staffID},
    {$set: {status: 'Resigned'}})
    .then(() => res.json("Marked as Resigned!"))
    .catch((e) => console.log(`Error: ${ e }`))
})

//insert checkIn attendance
router.post('/attendance/checkin', function (req, res, next) {
  attendanceModel.findOne({staffID: Number(req.body.staffID)}).sort({_id: -1})
  .then((data) => {
    if(data?.checkOut?true:false) {
      const attendance = new attendanceModel({
        staffID: Number(req.body.staffID),
        checkIn: req.body.checkIn
      });
    
      attendance.save()
      .then(() => res.json(true))
      .catch((e) => console.log(`Error: ${ e }`))
    }
    else {
      res.json(false)
    }
  }).catch((e) => console.log(`Error: ${e}`))
});

//update checkout attendance
router.put('/attendance/checkout', function (req, res, next) {
  attendanceModel.findOne({staffID: req.body.staffID}).sort({_id: -1})
  .then((data) => {
    if(data?.checkOut?false:true) {
      attendanceModel.updateOne({_id: data._id}, {$set: {checkOut: req.body.checkOut}})
      .then(() => res.json(true)) 
      .catch((e) => console.log(`Error ${ e }`))
    }
    else {
      res.json(false)
    }
  }).catch((e) => console.log(`Error: ${e}`))
});

//update checkout attendance
router.get('/attendance/test?:staffID', function (req, res, next) {
  attendanceModel.findOne({staffID: Number(req.query.staffID)}).sort({_id: -1})
  .then((data) => {
    res.json(data?.checkOut?true:false)
  }).catch((e) => console.log(`Error: ${e}`))
});

// //update bonus
// router.put('/salary/bonus', (req, res, next) => {
//   staffModel.updateOne({staffID: req.body.staffID},
//     {$inc: {bonus: Number(req.body.bonus)}})
//     .then(() => res.json("Bonus Added!"))
//     .catch((e) => console.log(`Error: ${ e }`))
// });

//insert bonuses
router.post('/salary/bonus', function (req, res, next) {
  const bonus = new bonusModel({
    staffID: Number(req.body.staffID),
    bonusAmount: req.body.bonusAmount,
    addedDate: req.body.addedDate
  });

  bonus.save()
  .then(() => res.json("Bonus Added!"))
  .catch((e) => console.log(`Error: ${ e }`))

});



module.exports = router; 
