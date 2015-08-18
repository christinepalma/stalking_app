var express = require('express');
var router  = express.Router();
var passport= require('passport');
var User    = require('../models/User');
var jwt     = require('jsonwebtoken');
var secret  = require('../config/jwtsecret.js');

router.get('/pass',check_existing_user);

router.get('/facebook', passport.authenticate('facebook', {
//  scope: ['email', 'user_birthday', 'user_location', 'user_education_history']
}));

router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/auth/pass',
  failureRedirect: '/login'
}));

router.get('/google',
  passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/auth/pass');
  }
);

router.get('/twitter',
  passport.authenticate('twitter'));

router.get('/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    console.log("passed");
    // Successful authentication, redirect home.
    res.redirect('/auth/pass');
  }
);

function check_existing_user(req, res) {
 console.log(req.user);
 if(req.isAuthenticated()){
   var user={};
   User.findOne({login_type:req.user.provider, third_party_id:req.user.id},function (err, existing_user) {
     if(err) return res.json(err);

     if(!existing_user){
       User.create({email:req.user.provider+req.user.id, first_name:req.user.displayName, login_type:req.user.provider, third_party_id:req.user.id, password:"3rdParty"},function (err,new_user) {
         if(err) return res.json(err);
         console.log(new_user);
         create_token(req, res, new_user);
       });
     } else {
       create_token(req, res, existing_user);
     }

   });
 } else {
   res.redirect('/login');
 }
}

function create_token(req, res, user) {
  var token = jwt.sign({
      id: user._id,
      login_type: user.login_type,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    }, secret,  {
      expiresInMinutes: 1440 // expires in 24 hours
    });
  res.cookie("token",token);
  res.redirect('/');
}

module.exports=router;
