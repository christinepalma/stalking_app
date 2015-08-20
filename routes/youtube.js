var express = require('express');
var XMLHttpRequest = require("xhr2");

var router = express.Router();

router.get("/channel/:id",function (req,res) {
  getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId='+req.params.id+'&order=date&key='+process.env.WDI_PROJECT_3_YOUTUBE_API_KEY
  , function(data) {
    // do something with 'data'
    res.render('panels/youtube',{data:data});
  }, function(status) {
    // err
    res.send("something went wrong");
 });
});

router.get("/channel/:id/.json",function (req,res) {
  getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId='+req.params.id+'&order=date&key='+process.env.WDI_PROJECT_3_YOUTUBE_API_KEY
  , function(data) {
    // do something with 'data'
    res.json(data);
  }, function(status) {
    // err
    res.send("something went wrong");
 });
});

router.get("/user/:id",function (req,res) {
  var username=req.params.id;
  var channelId;

  getJSON('https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername='+username+'&key='+process.env.WDI_PROJECT_3_YOUTUBE_API_KEY
  , function(data) {
    // do something with 'data'
    channelId=data.items[0].id;
    getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId='+channelId+'&order=date&key='+process.env.WDI_PROJECT_3_YOUTUBE_API_KEY
    , function(data) {
      // do something with 'data'
      res.render('panels/youtube',{data:data});
    }, function(status) {
      // err
      res.send("something went wrong");
   });
  }, function(status) {
    // err
    res.send("something went wrong");
  });
});

router.get("/user/:id/.json",function (req,res) {
  var username=req.params.id;
  var channelId;

  getJSON('https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername='+username+'&key='+process.env.WDI_PROJECT_3_YOUTUBE_API_KEY
  , function(data) {
    // do something with 'data'
    channelId=data.items[0].id;
    getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId='+channelId+'&order=date&key='+process.env.WDI_PROJECT_3_YOUTUBE_API_KEY
    , function(data) {
      // do something with 'data'
      res.json(data);
    }, function(status) {
      // err
      res.send("something went wrong");
   });
  }, function(status) {
    // err
    res.send("something went wrong");
  });
});

function getJSON(url, successHandler, errorHandler) {
var xhr = new XMLHttpRequest();
xhr.open('get', url, true);
xhr.onreadystatechange = function() {
 var status;
 var data;
 // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
 if (xhr.readyState == 4) { // `DONE`
   status = xhr.status;
   if (status == 200) {
     data = JSON.parse(xhr.responseText);
     successHandler && successHandler(data);
   } else {
     errorHandler && errorHandler(status);
   }
 }
}
xhr.send();
}

module.exports = router;
