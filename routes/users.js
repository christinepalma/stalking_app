var express = require('express');
var router  = express.Router();
var User = require("../models/User");

router.route('/')
  .get(function (req, res) {
    User.find({},function (err, users) {
      if(err) return res.json(err);

      res.json(users);
    });
  })
  .post(function (req, res) {
    console.log(req.body);
    if(req.body.email) req.body.email=req.body.email.toLowerCase();
    var user = new User(req.body);
    user.login_type = "local";
    user.save(function (err, user) {
      if (err) {
        var errmsgs=[err.message];
        for(var key in err.errors){
          errmsgs.push(err.errors[key].message);
        }
        return res.render("users/new", {errmsgs:errmsgs});
      }
      res.redirect("/login");
    });
  });

router.route('/new')
  .get(function (req, res) {
    res.render("users/new",{errmsgs:[]});
  });

router.route('/:id')
  .get(function (req, res) {
    if(req.params.id != req.decoded.id) return res.redirect('/');

    User.findOne({_id:req.params.id},function (err,user) {
      if(err) return res.json(err);

      console.log(user);
      if(!user) return redirect('/');
        res.render('users/show',user);
    });
  })
  .delete(function (req, res) {
    if(req.params.id != req.decoded.id) return res.redirect('/');

    User.findOneAndRemove({_id:req.params.id},function (err,user) {
      if(err) return res.json(err);

      if(!user) return redirect('/');
        res.clearCookie('token');
        res.render('login',{errmsgs:[]});
    });
  })
  .put(function (req, res) {
    if(req.params.id != req.decoded.id) return res.redirect('/');

    if(req.body.email) req.body.email=req.body.email.toLowerCase();
    User.findOne({_id:req.params.id}).select("email first_name last_name password").exec(function (err, user){
      if(err) return res.json(err);

      var isMatched = user.authenticate(req.body.cur_password);
      if(isMatched){
        user.email = req.body.email;
        user.first_name = req.body.first_name;
        user.last_name = req.body.last_name;
        if(req.body.password) user.password = req.body.password;
        user.save(function (err, user) {
          if (err) {
            user.errmsgs=[];
            for(var key in err.errors){
              user.errmsgs.push(err.errors[key].message);
            }
            return res.render("users/edit", user);
          }
        });
      }else{
        user.errmsgs=["Current password is wrong"];
        return res.render("users/edit", user);
      }
      res.redirect(req.body._id+"/edit");
    });
  });

router.route('/:id/edit')
  .get(function (req, res) {
    if(req.params.id != req.decoded.id) return res.redirect('/');

    User.findOne({_id:req.params.id},function (err,user) {
      if(err) return res.json(err);

      console.log(user);
      user.errmsgs=[];
      res.render("users/edit",user);
    });
  });

module.exports=router;
