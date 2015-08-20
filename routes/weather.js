var express = require('express');
var XMLHttpRequest = require("xhr2");
var router = express.Router();

router.get("/:id",function (req,res) {
  var cityname=req.params.id

  getJSON('http://api.openweathermap.org/data/2.5/weather?q='+cityname+'&units=imperial'
  , function(data) {
   // do something with 'data'
   res.render('panels/weather',{data:data})

  }, function(status) {
  // err
    res.send("something went wrong")
  });
});
router.get("/:id/.json",function (req,res) {
  var cityname=req.params.id

  getJSON('http://api.openweathermap.org/data/2.5/weather?q='+cityname+'&units=imperial'
  , function(data) {
   // do something with 'data'
   res.json(data)

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
