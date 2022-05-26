var express = require('express');
const wardModel = require('../models/ward')
const staffModel = require('../models/staff')
const assignNurseModel = require('../models/assigned-nurses')
const attendanceModel = require('../models/attendance')
const wardCategoryModel = require('../models/ward-category')
var router = express.Router();
const auth = require("../middleware/auth");

//testing
router.get('/', (req, res, next) => {
  res.send("IT works")
})

const setWardId = id => {
  id += 1
  id = String(id)
  
  if(id.length === 1) return "00" + id
  if(id.length === 2) return "0" + id
  return id
}

//add ward details
router.post('/details/add', auth, (req, res, next) => {
  //get previous ward id
  wardModel.findOne({category: req.body.category}, {_id:0, id:1}).sort({_id: -1})
  .then(prevId => {
    const abbr = req.body.abbreviation
    let wardId
    if(prevId?.id){
      prevId = prevId.id.substring(abbr.length)
      wardId = abbr + setWardId(Number(prevId))
    }else{ //first record
      wardId = abbr + "001"
    }
    res.json({wardId, "num": Number(prevId)})
    let newWard = new wardModel({
      id: wardId,
      category: req.body.category,
      capacity: req.body.capacity,
      roomCharge: req.body.roomCharge,
      status: req.body.status
    })
  
    newWard.save()
    .then(() => {
      res.json("Ward Added!")
    }).catch((e) => {
      console.log(`Error Add: ${e}`)
    })
  })
});

//read ward details
router.get('/details/read?:id', auth, (req, res, next) => {
  wardModel.find({id:String(req.query.id)})
  .then((wardDetails) => {
    res.json(wardDetails)
  }).catch((e) =>{
    console.log(`Error Read: ${e}`)
  })
})
//update ward details
router.put('/details/update', auth, (req, res, next) => {
  wardModel.updateOne({id: req.body.id},
    {
      $set: {
        "capacity": req.body.capacity, 
        "roomCharge": req.body.roomCharge, 
        "status": req.body.status
      }
    })
    .then(() => {
      res.json(`Successfully Updated!`)
    }).catch((e) => {
      console.log(`Error Update: ${e}`)
    })
})

//retrieve ward categories
router.get('/category/names', auth, (req, res, next) => {
  wardModel.aggregate([{$group: { _id: '$category'}}])
  .then((d) => res.json(d))
  .catch((e) => console.log(`Error retrieving categories: ${ e }`))
})

//retrieve ward ids according to the category
router.get('/category/ids?:category', auth, (req, res, next) => {
  wardModel.find({category: req.query.category}, {_id:0, id:1})
  .then((d) => res.json(d))
  .catch((e) => console.log(`Error: ${ e }`))
})

//retrieve nurse details when id provided
router.get('/nurse/read?:id', auth, (req, res, next) => {
  staffModel.findOne({staffID: req.query.id, designation: "nurse"})
  .then((data) => res.json(data))
  .catch((e) => console.log(`Error: ${ e }`))
})

//assign nurse
router.post('/nurse/assign', auth, (req, res, next) => {
  const assign = new assignNurseModel({
    nurseID: req.body.id,
    assignedDate: req.body.assignedDate,
    reassignDate: req.body.reassignDate,
    wardCategory: req.body.category,
    wardID: req.body.wardID,
    role: req.body.role
  })
  assign.save()
  .then(() => res.json({message: "Nurse assigned successfully"}))
  .catch((e) => console.log(`Error: ${ e }`))
})

//read all assigned nurses
router.get('/nurse/details', (req, res, next) => {
  assignNurseModel.aggregate([{
    $lookup: {
      from: "staffs",
      localField: "nurseID",
      foreignField: "staffID",
      as: 'details'
    }
  }])
  .then((resp) => res.json(resp))
  .catch((e) => res.json(e))
})

router.get('/nurse/details/stats', (req, res, next) => {
  assignNurseModel.aggregate([
    {
      $group:{_id:'$wardCategory', nurseCount: {$sum:1}}
    }
  ]).then(r => {
    let series = []
    let label = []
    r.forEach(d => {
      series.push(d.nurseCount)
      label.push(d._id)
    })
    res.json({
      series,
      label
    })
  })
  .catch(e => console.log('Error', e))
})

//read all nurses who does't have assignment
router.get('/nurse/read/all-unassigned', auth, (req, res, next) => {
  staffModel.aggregate([
    {
      $lookup: {
        from: "assignednurses",
        localField: "staffID",
        foreignField: "nurseID",
        as: 'data'
      },
    },
    {
      $match: {
        "data.user": {
          $exists: false
        },
        "designation": "nurse"
      }
    },
    {
      $project: {
        "_id": 0,
        "NIC": 0,
        "email": 0,
        "dateOfBirth": 0, 
        "gender": 0, 
        "address": 0, 
        "basicSalary": 0, 
        "mobile": 0, 
        "home": 0, 
        "status": 0, 
        "__v": 0
      }
    }
  ])
  .then(data => {
    data = data.filter(v => {
      if(v.data.length === 0){
        delete v.data
        return v
      } 
    })
    res.json(data)
  })
})

//check whether a nurse assigned
router.get('/nurse/assign/check?:id', auth, (req, res, next) => {
  assignNurseModel.findOne({nurseID: Number(req.query.id)})
  .then(data => {
    res.json(data)
  }).catch(e => res.json(e))
})

//check status
router.get('/nurse/status?:id', auth, (req, res, next) => {
    const data = attendanceModel.findOne({staffID: req.query.id})
    data.sort({staffID: -1})
    data.then(data => res.json(data.checkOut))
        .catch(e => res.json(e))
  
})

//unassign a nurse
router.delete('/nurse/unassign?:id', auth, (req, res, next) => {
  assignNurseModel.findOneAndRemove({nurseID: req.query.id})
  .then(() => res.json('Nurse Unassigned!'))
  .catch(e => res.json(e))
})


//add ward category
router.post('/category/add', auth, (req, res, next) => {

  let newCategory = new wardCategoryModel({
    category: req.body.category,
    abbreviation: req.body.abbreviation
  })

  newCategory.save()
  .then(() => {
    res.json({message:"Category Added!"})
  }).catch((e) => {
    console.log(`Error Add: ${e}`)
  })
})

//read all ward category
router.get('/category/read/all', auth, (req, res, next) => {
  wardCategoryModel.find()
  .then(data => res.json(data))
  .catch(e => console.log(`Error Add: ${e}`))
})

//read all ward details
router.get('/details/read/all', (req, res, next) => {
  wardModel.find()
  .then(data => res.json(data))
  .catch(e => console.log(`Error: ${e}`))
})




module.exports = router;
