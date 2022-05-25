var express = require('express');
const staffModel = require('../models/staff');
const attendanceModel = require('../models/attendance');
const bonusModel = require('../models/bonus');
var router = express.Router();
const auth = require("../middleware/auth");
const staff = require('../models/staff');
const e = require('express');

//staff ID auto increment
router.get('/id', auth, function (req, res, next) {
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
router.post('/add-member', auth, function (req, res, next) {

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

//read staff member details by id
router.get('/read-details?:id', auth, (req, res, next) => {
  staffModel.find({staffID: req.query.id})
  .then((staffDetails) => res.json(staffDetails))
  .catch((e) => console.log(`Error: ${ e }`))
});

//read all staff details
router.get('/read-staffs', auth, (req, res, next) => {
  staffModel.find()
  .then((details) => res.json(details))
  .catch((e) => console.log(`Error: ${ e }`))
})

//update staff details
router.put('/update-details', auth, (req, res, next) => {
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
router.put('/resign', auth, (req, res, next) => {
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
router.post('/attendance/checkin', auth, function (req, res, next) {
  staffModel.findOne({staffID: Number(req.body.staffID)}, {_id: 0})
  .then((r) => {
    if(r.status == 'Resigned') {
      res.json("Resigned")
    }
    else {
      attendanceModel.countDocuments({staffID: Number(req.body.staffID)})
      .then((value) => {
        console.log(value)
        if(value != 0) {
          attendanceModel.findOne({staffID: Number(req.body.staffID)}).sort({_id: -1})
          .then((data) => {
            console.log(data.checkOut)
            if(data?.checkOut?true:false) {
              const attendance = new attendanceModel({
                staffID: Number(req.body.staffID),
                checkIn: req.body.checkIn
              });
            
              attendance.save()
              .then(() => res.json("marked"))
              .catch((e) => console.log(`Error: ${ e }`))
            }
            else {
              res.json("not_marked")
            }
          }).catch((e) => console.log(`Error: ${ e }`))
        }else {
          const attendance = new attendanceModel({
            staffID: Number(req.body.staffID),
            checkIn: req.body.checkIn
          });

          attendance.save()
          .then(() => res.json("marked"))
          .catch((e) => console.log(`Error: ${ e }`))
        }
      })
    }
  }).catch((e) => console.log(`Error: ${ e }`))
});

//update checkout attendance
router.put('/attendance/checkout', auth, function (req, res, next) {
  staffModel.findOne({staffID: Number(req.body.staffID)}, {_id: 0})
  .then((r) => {
    if(r.status == 'Resigned') {
      res.json('Resigned')
    }
    else {
      attendanceModel.countDocuments({staffID: Number(req.body.staffID)})
      .then((value) => {
        if(value != 0) {
          attendanceModel.findOne({staffID: Number(req.body.staffID)}).sort({_id: -1})
          .then((data) => {
            if(data?.checkOut?false:true) {
              attendanceModel.updateOne({_id: data._id}, {$set: {checkOut: req.body.checkOut}})
              .then(() => res.json("marked")) 
              .catch((e) => console.log(`Error ${ e }`))
            }
            else {
              res.json("not_marked")
            }
          }).catch((e) => console.log(`Error: ${e}`))
        } else {
          res.json("not_marked")
        }
      })
    }
  }).catch((e) => console.log(`Error: ${e}`))
});

//insert bonuses
router.post('/salary/bonus', auth, function (req, res, next) {
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
router.get('/salary/othours?:month', auth, (req, res, next) => {

  const monthlyWorkingHours = 10
  let currentYear = new Date().getFullYear()
  let startDate = String(currentYear) + '-' + String(req.query.month) + '-' + '26'
  let endDate = String(currentYear) + '-' + String(Number(req.query.month) + 1) + '-' + '25 23:59'  
  startDate = new Date(startDate).getTime()
  endDate = new Date(endDate).getTime()

  attendanceModel.aggregate([
    // First Stage
    {
      $match : { "checkIn": { $gte: startDate, $lte: endDate } }
    },
    // Second Stage
    {
      $group : {_id:"$staffID" , count:{$sum: {$subtract: ["$checkOut", "$checkIn"]}}}
    },
  ])
  .then((r) => {
    r.map(d => {
      d.count = (Math.floor(d.count/(1000 * 3600)))
      if(d.count > monthlyWorkingHours) {
        d.othrs = d.count - monthlyWorkingHours
      } else {
        d.othrs = 0
      }
    })
    res.json(r)
  })
})

//calculate bonus
router.get('/salary/bonus-calculate?:month', auth, (req, res, next) => {
  console.log('month', req.query.month)
  let currentYear = new Date().getFullYear()
  let startDate = String(currentYear) + '-' + String(req.query.month) + '-' + '26'
  let endDate = String(currentYear) + '-' + String(Number(req.query.month) + 1) + '-' + '25 23:59'  

  startDate = new Date(startDate).getTime()
  endDate = new Date(endDate).getTime()
  
  bonusModel.aggregate([
    // First Stage
    {
      $match : { "addedDate": { $gte: startDate, $lte: endDate } }
    },
    // Second Stage
    {
      $group : {_id:"$staffID", count:{$sum:"$bonusAmount"}}
    },
  ])
  .then((r) => {
    res.json(r)
  })
})

//read staff details for salary
router.get('/salary/staffdetails', auth, (req, res, next) => {
  staffModel.find({status: 'Employed'}, {_id: 0, staffID: 1, staffName: 1, basicSalary: 1})
  .then((details) => res.json(details))
  .catch((e) => console.log(`Error: ${ e }`))
})


module.exports = router; 
