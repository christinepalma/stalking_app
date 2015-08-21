var express = require('express');
var router = express.Router();
var ig = require("../config/instagram");

router.get("/:id",function (req,res) {
  var userId;
  ig.user_search(req.params.id, function(err, result, remaining, limit) {
    userId=result[0].id;
    ig.user_media_recent(userId, function(err, result, remaining, limit) {
      res.render("panels/instagram", {data:result});
    });
  });
});


router.get("/:id/.json",function (req,res) {

  var userId;
  ig.user_search(req.params.id, function(err, result, remaining, limit) {
    userId=result[0].id;
    ig.user_media_recent(userId, function(err, result, remaining, limit) {
      res.send(result);
    });
  });
});

module.exports = router;
