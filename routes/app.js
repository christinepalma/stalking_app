var express = require('express');
var Panel   = require("../models/Panel");
var router  = express.Router();

router.route('/')
  .get(function (req, res) {

    res.render("index",{user:req.decoded, panels:[]});
  });

module.exports=router;
