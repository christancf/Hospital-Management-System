var express = require('express');
const staffModel = require('../models/staff');
const attendanceModel = require('../models/attendance');
const bonusModel = require('../models/bonus');
var router = express.Router();
const auth = require("../middleware/auth");
const staff = require('../models/staff');
const e = require('express');

//staff ID auto increment
router.get('/id', function (req, res, next) {
  staffModel.find().sort({staffID : -1}).limit(1)
  .then((id) => {
    res.status(200).json({
        success:true,
        message:'sucessful',
        payload:id[0].staffID + 1
    })
  })
  .catch((e) => {
    res.status(400).json({success:false,message:e.message,payload:{}})
  })
});

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

//resign member
router.put('/resign', (req, res, next) => {
  staffModel.findOne({staffID: Number(req.body.staffID)}, {_id: 0})
  .then((r) => {
    if(r.status == 'Resigned') {
      res.json('Resigned')
    }
    else {
      console.log(req.body.staffID)
      staffModel.updateOne({staffID: req.body.staffID},
        {$set: {status: 'Resigned'}})
        .then(() => res.json("Marked as Resigned!"))
        .catch((e) => console.log(`Error: ${ e }`))
    }
  })
})

//insert checkIn attendance
router.post('/attendance/checkin', function (req, res, next) {
  staffModel.findOne({staffID: Number(req.body.staffID)}, {_id: 0})
  .then((r) => {
    if(r.status == 'Resigned') {
      res.json("Resigned")
    }
    else {
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
      }).catch((e) => console.log(`Error: ${ e }`))
    }
  })
  .catch((e) => console.log(`Error: ${ e }`))
});

//update checkout attendance
router.put('/attendance/checkout', function (req, res, next) {
  staffModel.findOne({staffID: Number(req.body.staffID)}, {_id: 0})
  .then((r) => {
    if(r.status == 'Resigned') {
      res.json('Resigned')
    }
    else {
      attendanceModel.findOne({staffID: Number(req.body.staffID)}).sort({_id: -1})
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
    }
  }).catch((e) => console.log(`Error: ${e}`))
});

//insert bonuses
router.post('/salary/bonus', function (req, res, next) {
  const bonus = new bonusModel({
    staffID: Number(req.body.staffID),
    bonusAmount: req.body.bonusAmount,
    addedDate: req.body.addedDate
  });
  staffModel.findOne({staffID: Number(req.body.staffID)}, {_id: 0})
  .then((r) => {
    //console.log(r.status)
    if(r.status == 'Resigned') res.json(false)
    else{
      bonus.save()
      .then(() => res.json(true))
      .catch((e) => console.log(`Error: ${ e }`))
    }
  }).catch((e) => console.log(`Error: ${e}`))
});

//calculate ot hours
router.get('/salary/othours', (req, res, next) => {

  const monthlyWorkingHours = 160
  let currentYear = new Date().getFullYear()
  let startDate = String(currentYear) + '-' + String(req.body.month) + '-' + '26'
  let endDate = String(currentYear) + '-' + String(Number(req.body.month) + 1) + '-' + '25 23:59'  
  let totalWorkHours = 0
  startDate = new Date(startDate).getTime()
  endDate = new Date(endDate).getTime()

  attendanceModel.aggregate( [
    {
      $match: {
        checkIn: { $gte:startDate, $lte:endDate }
      }
    },
    {
      $group: {
         _id: "$staffID",
         workHours: { $sum: {$subtract: ["$checkOut", "$checkIn"]} }
      }
    }
  ] )
  .then(r => {
    r.map(d => {
    
      totalWorkHours = Math.floor(d.workHours / (1000 * 3600))
      d.otHours = totalWorkHours > monthlyWorkingHours? totalWorkHours - monthlyWorkingHours:0
  })
    res.json(r)
  })
  
  // attendanceModel.find({checkIn: { $gte:startDate, $lte:endDate }}, {_id:0, staffID:1, checkIn:1, checkOut:1}).sort({staffID:0})
  // .then(r => {
  //    res.json({r})
    // let sum = 0
    // r.map(d => (
    //   sum += d.checkOut - d.checkIn
    // ))
    // let totalWorkHours = Math.floor(sum / (1000 * 3600))
    // let OThours = totalWorkHours > monthlyWorkingHours? totalWorkHours - monthlyWorkingHours:0
    // res.json({"othours": OThours})
  })
// })

//calculate bonus
router.get('/salary/bonus', (req, res, next) => {

  let currentYear = new Date().getFullYear()
  let startDate = String(currentYear) + '-' + String(req.body.month) + '-' + '26'
  let endDate = String(currentYear) + '-' + String(Number(req.body.month) + 1) + '-' + '25 23:59'  

  startDate = new Date(startDate).getTime()
  endDate = new Date(endDate).getTime()
  bonusModel.find({staffID: req.body.id, dateAdded: { $gte:startDate, $lte:endDate }}, {_id:0, bonusAmount: 1, dateAdded: 1})
  .then(r => {
    let bonusSum = 0
    r.map(d => (
      bonusSum += d.bonusAmount
    ))
    res.json({"bonusAmount":bonusSum})
  })
})

module.exports = router; 
