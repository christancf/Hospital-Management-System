var express = require('express');
const userModel = require('../models/user');
const bcrypt = require("bcryptjs");
var router = express.Router();
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
var config = require("../configs/authConfig");



router.post('/register',   async function (req, res, next) {

    try {
  
    const encryptedPassword =  await bcrypt.hash(req.body.password, 10);
    const user = new userModel({
      email: req.body.email,
      role: req.body.role,
      password: encryptedPassword
    });
  
    
  
      user.save().then((resp)=> {
  
        res.status(200).json(
          {
            succuss: true,
            message: 'Insertion succussfull'
          }
        );
  
  
      }).catch(async (error)=> {
  
        res.status(400).json(
          {
            succuss: false,
            message: error.message
          }
        );
  
      });
     
  
    }
    catch (error) {
      res.status(400).json(
        {
          succuss: false,
          message: error.message
        }
      );
    }
  
  });


  router.post('/login',   async function (req, res, next) {

    try {
  
        const user = await userModel.findOne({ email: req.body.email});

        if (user && (await bcrypt.compare(req.body.password, user.password)) && user.role ==  req.body.role) {
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email : user.email, role: user.role },
            config.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
    
          let jsonuser = JSON.stringify(user)
          jsonuser = JSON.parse(jsonuser)
          const resp = {...jsonuser}
          delete resp.password
          resp.token = token;
          res.status(200).json(
            {
                succuss: true,
                message: "Credentials matched !",
                payload: resp
            }
            );
  
        }
        else{
            res.status(400).send(
                {
                    succuss: false,
                    message: "Credentials or user role invalid !",
                    payload: {}
                }
                );
        }
    
    }
    catch (error) {
        res.status(400).send(
            {
                succuss: false,
                message: error.message,
                payload: {}
              }
        );
    }
  
  });

  module.exports = router;