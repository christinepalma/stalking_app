var express = require('express');
var XMLHttpRequest = require("xhr2");

var router = express.Router();

router.get("/:id",function (req,res) {
  // res.send("hi");


  var username=req.params.id;
  var channelId;
<<<<<<< HEAD
  getJSON('https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername='+username+'&key='+process.env.WDI_PROJECT_3_YOUTUBE_API_KEY
  , function(data) {
=======
  getJSON('https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername='+username+'&key='+process.env.WDI_PROJECT_3_YOUTUBE_API_KEY,
  function(data) {
>>>>>>> master
   // do something with 'data'
   console.log(data.items[0].id);
   channelId=data.items[0].id;

   console.log('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId='+channelId+'&order=date&key='+process.env.WDI_PROJECT_3_YOUTUBE_API_KEY);
<<<<<<< HEAD
   getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId='+channelId+'&order=date&key='+process.env.WDI_PROJECT_3_YOUTUBE_API_KEY
   , function(data) {
=======
   getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId='+channelId+'&order=date&key='+process.env.WDI_PROJECT_3_YOUTUBE_API_KEY,
   function(data) {
>>>>>>> master
     // do something with 'data'
     console.log(data);
     res.send(data);
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
var xhr = typeof XMLHttpRequest != 'undefined'
 ? new XMLHttpRequest()
 : new ActiveXObject('Microsoft.XMLHTTP');
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
