var express = require('express');
var XMLHttpRequest = require("xhr2");

var router = express.Router();

router.get("/:id",function (req,res) {
  getJSON('http://api.tumblr.com/v2/blog/'+req.params.id+'/posts?limit=10', function(data) {
   // do something with 'data'
   res.render("panels/tumblr", {data:data});
  }, function(status) {
   // err
   res.send("something went wrong");
  });
});

router.get("/:id/.json",function (req,res) {
  getJSON('http://api.tumblr.com/v2/blog/'+req.params.id+'/posts?limit=10', function(data) {
   // do something with 'data'
   res.send({data:data});
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
};
xhr.send();
}

module.exports = router;
