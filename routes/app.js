var express = require('express');
var Panel   = require("../models/Panel");
var router  = express.Router();

router.route('/')
  .get(function (req, res) {
    console.log(req.user);
    var user_id = req.decoded.id;
    Panel.find({owner:req.decoded.id}).sort('order').exec( function (err, panels) {
      if (err) return res.json(err);
      // console.log(panels);
      res.render("index",{user:req.decoded, panels:panels});
    });
  });

module.exports=router;
