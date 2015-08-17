var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = mongoose.Schema({
  email: {type:String, required:true, unique:true},
  first_name: {type:String, required:true},
  last_name: String,
  password: {type:String, required:true, select:false}
});

UserSchema.pre("save", function (next){
  var user = this;

  if(!user.isModified("password")) return next();

  user.password = bcrypt.hashSync(user.password, 10);
  next();
});

UserSchema.methods.authenticate = function (password) {
  var user = this;
  return bcrypt.compareSync(password,user.password);
};

module.exports = mongoose.model("User",UserSchema);
