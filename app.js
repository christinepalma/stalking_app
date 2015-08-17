//package load
var express       = require('express');
var mongoose      = require('mongoose');
var bcrypt        = require('bcrypt');
var jwt           = require('jsonwebtoken');
var path          = require('path');
var morgan        = require('morgan');
var bodyParser    = require('body-parser');
var cookieParser  = require('cookie-parser');
var methodOverride= require('method-override');

//app
var app = express();

//base setup
var port = 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//database setup
mongoose.connect('mongodb://localhost:27017/logindb');
var db =mongoose.connection;
db.on("error",function (err) {
  console.log("DB ERROR :",err.message);
});
db.once("open",function () {
  console.log("DB connected");
});

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

//routes
var routes=require("./routes/index");
var users=require("./routes/users");

app.use(isLoggedIn);
app.use('/', routes);
app.use('/users', users);

//server
app.listen(3000,function () {
  console.log("http://127.0.0.1:"+port+"/");
});

//login check
var secret= require('./config/jwtsecret');
function isLoggedIn(req, res, next) {
  var openPaths = {'/favicon.ico':["GET"], '/login':["GET","POST"], '/users':["GET", "POST"], '/users/new':["GET"]};
  var reqPath = req._parsedUrl.pathname;
  var reqMethod = req.method;

  if( openPaths[reqPath] && openPaths[reqPath].indexOf(reqMethod) >= 0 ) return next();

  var token = req.cookies.token || req.body.token || req.param('token') || req.headers['x-access-token'];

  if(token){
    jwt.verify(token, secret, function (err, decoded) {
      if(err){
        res.clearCookie('token');
        return res.render("login",{errmsgs:["session expired. please login again"]});
      }
      req.decoded = decoded;
      console.log("TOKEN : ",decoded);
      next();
    });
  } else {
    res.redirect("/login");
  }
}
