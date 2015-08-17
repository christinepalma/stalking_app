var express = require('express');
var router  = express.Router();
var passport= require('passport');
var User    = require('../models/User');
var jwt     = require('jsonwebtoken');
var secret  = require('../config/jwtsecret.js');

router.get('/auth/facebook', passport.authenticate('facebook', {
//  scope: ['email', 'user_birthday', 'user_location', 'user_education_history']
}));

router.get('/auth/facebook/callback', passport.authenticate('facebook', { //
  successRedirect: '/auth/facebook/new',
  failureRedirect: '/login'
}));

router.get('/auth/facebook/new', function (req, res) {
  if(req.isAuthenticated()){
    var user={};
    User.findOne({login_type:"facebook", third_party_id:req.user.id},function (err, facebook_user) {
      if(err) return res.json(err);

      if(!facebook_user){
        User.create({email:"facebook"+req.user.id, first_name:req.user.displayName, last_name:"", login_type:"facebook", third_party_id:req.user.id, password:"facebook"},function (err,new_facebook_user) {
          if(err) return res.json(err);
          console.log(new_facebook_user);
          create_token(new_facebook_user, res);
        });
      } else {
        console.log("here222");
        create_token(facebook_user, res);
      }

    });
  } else {
    res.redirect('/login');
  }
});

function create_token(user, res) {
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
