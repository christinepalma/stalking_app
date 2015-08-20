var express = require('express');
var Panel   = require("../models/Panel");
var router  = express.Router();

router.route('/')
  .get(function (req, res) {
    Panel.find({},function (err, panels) {
      if(err) return res.json({sucess:false, message:err});

      res.json({sucess:true, data:panels});
    });
  })
  .post(function (req, res) {
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
    Panel.findOne({_id:req.params.id}, function (err, panel){
      if(err) return res.json({sucess:false, message:"err"});

      if(!panel) return res.json({sucess:false, message:"No panel founds"});
      Panel.findOneAndUpdate({_id:req.params.id},req.body,function (err, panel) {
        if(err) return res.json({sucess:false, message:"err"});

        res.json({success:true, message:"panel updated"});
      });
    });
  });

module.exports=router;
