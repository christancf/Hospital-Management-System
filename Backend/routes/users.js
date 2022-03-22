var express = require('express');
const auth = require("../middleware/auth");
var router = express.Router();


router.get('/', auth, function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
