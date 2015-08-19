var express = require('express');
var XMLHttpRequest = require("xhr2");

var router = express.Router();

router.get("/:id",function (req,res) {
  console.log("HIHIHIHIHI");


  var username=req.params.id
  console.log(username);
  getJSON('https://www.googleapis.com/plus/v1/people/'+username+'/activities/public?key='+process.env.WDI_PROJECT_3_YOUTUBE_API_KEY
  // getJSON('https://www.googleapis.com/plus/v1/people/'+username+'/activities/public?key=AIzaSyDolzZwX8aWFhU0L5fd28p-5nqNySw2-fg'
  , function(data) {
   // do something with 'data'
   res.send(data);

  }, function(status) {
  // err
    res.send("something went wrong")
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
};
xhr.send();
};

module.exports = router;
