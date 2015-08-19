var express = require('express');
var router  = express.Router();
var Panel   = require("../models/Panel");

router.route('/')
  .get(function (req, res) {
    Panel.find({},function (err, panels) {
      if(err) return res.json({sucess:false, message:err});

      res.json({sucess:true, data:panels});
    });
  })
  .post(function (req, res) {
    console.log(req.body);
    Panel.create(req.body,function (err, panel) {
      if(err) return res.json({sucess:false, message:"err"});

      res.json({sucess:true, data:panel});
    });
  });

router.route('/:id')
  .get(function (req, res) {
    Panel.findOne({_id:req.params.id},function (err,panel) {
      if(err) return res.json({sucess:false, message:"err"});

      if(!panel) return res.json({sucess:false, message:"No panel founds"});
      res.json({sucess:true, data:panel});
    });
  })
  .delete(function (req, res) {
    Panel.findOneAndRemove({_id:req.params.id},function (err,panel) {
      if(err) return res.json({sucess:false, message:"err"});

      if(!panel) return res.json({sucess:false, message:"No panel founds"});
      res.json({success:true, message:"panel deleted"});
    });
  })
  .put(function (req, res) {
    Panel.findOne({_id:req.body._id}, function (err, panel){
      if(err) return res.json({sucess:false, message:"err"});

      if(!panel) return res.json({sucess:false, message:"No panel founds"});
      res.json({success:true, message:"panel updated"});
    });
  });

module.exports=router;
