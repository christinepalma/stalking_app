var express = require('express');
var router  = express.Router();
var User    = require('../models/User');
var jwt     = require('jsonwebtoken');
var secret  = require('../config/jwtsecret.js');

router.route('/')
  .get(function (req, res) {
    res.render("index",req.decoded);
  });

router.route('/logout')
  .get(function (req, res) {
    res.clearCookie('token');
    res.redirect("/login");
  });

router.route('/login')
  .get(function (req, res) {
    if(req.cookies.token) return res.redirect("/");

    res.render("login",{errmsgs:[]});
  })
  .post(function (req, res) {
    User.findOne({email:req.body.email}).select("email first_name last_name password").exec(function (err, user) {

      if(err) return res.render('login',{errmsgs:[err.message]});
      if(!user) return res.render('login',{errmsgs:["no user found"]});

      var isMatched = user.authenticate(req.body.password);

      if(isMatched){
      console.log(user);
        var token = jwt.sign({
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
          }, secret,  {
            expiresInMinutes: 1440 // expires in 24 hours
          });
        res.cookie("token",token);
        res.redirect('/');
      } else {
        return res.render("login",{errmsgs:["wrong password"]});
      }
    });
  });

module.exports=router;
