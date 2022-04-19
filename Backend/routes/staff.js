var express = require('express');
const staffModel = require('../models/staff');
const attendanceModel = require('../models/attendance');
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

//read staff details
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
router.put('/update-status', (req, res, next) => {
  staffModel.updateOne({staffID: req.body.staffID},
    {$set: {status: 'Resigned'}})
    .then(() => res.json("Marked as Resigned!"))
    .catch((e) => console.log(`Error: ${ e }`))
})

//insert checkIn attendance
router.post('/attendance/checkin', function (req, res, next) {

  const attendance = new attendanceModel({
    staffID: String(req.body.staffID),
    checkIn: req.body.checkIn
  });

  attendance.save()
  .then(() => res.json("Check In Attendance Marked!"))
  .catch((e) => console.log(`Error: ${ e }`))

});

//update checkout attendance
router.put('/attendance/checkout', function (req, res, next) {
  attendanceModel.find({staffID: req.body.staffID}, {_id: 1, checkIn:1}).sort({_id: -1}).limit(1)
  .then((data) => {
    attendanceModel.updateOne({_id: data[0]._id}, {$set: {checkOut: req.body.checkOut}})
    .then(() => res.json("Check Out Attendance Marked!")) 
    .catch((e) => console.log(`Error ${ e }`))
  }).catch((e) => console.log(`Error: ${e}`))
});



module.exports = router; 
