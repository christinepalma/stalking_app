var express = require('express');
var router  = express.Router();

router.route('/')
  .get(function (req, res) {
    console.log(req.decoded);
    res.render("index",req.decoded);
  });

module.exports=router;
