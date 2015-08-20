var express = require('express');
var router = express.Router();
var twitter = require("../config/twitter");

router.get("/:id",function (req,res) {
  twitter.get('statuses/user_timeline', { screen_name: req.params.id, count: 10 }, function(err, data, response) {
    res.render("panels/twitter", {data:data});
    console.log(data);
  });
});

router.get("/:id/.json",function (req,res) {
  twitter.get('statuses/user_timeline', { screen_name: req.params.id, count: 10 }, function(err, data, response) {
    res.send(data);
  });
});

module.exports = router;
