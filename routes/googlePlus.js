var express = require('express');
var XMLHttpRequest = require("xhr2");

var router = express.Router();

router.get("/:id",function (req,res) {
  var username=req.params.id;

  getJSON('https://www.googleapis.com/plus/v1/people/'+username+'/activities/public?key='+process.env.WDI_PROJECT_3_YOUTUBE_API_KEY
  , function(data) {
   // do something with 'data'
   res.render('panels/googleplus',{data:data})

  }, function(status) {
  // err
    res.send("something went wrong")
  });
});

router.get("/:id/.json",function (req,res) {
  var username=req.params.id;

  getJSON('https://www.googleapis.com/plus/v1/people/'+username+'/activities/public?key='+process.env.WDI_PROJECT_3_YOUTUBE_API_KEY
  , function(data) {
   // do something with 'data'
   res.json(data);

  }, function(status) {
  // err
    res.send("something went wrong")
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
};
xhr.send();
}

module.exports = router;
