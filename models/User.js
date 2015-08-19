var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = mongoose.Schema({
  email: {type:String, required:true, unique:true},
  login_type: {type:String, required:true},
  third_party_id: String,
  first_name: {type:String, required:true},
  last_name: {type:String, default:""},
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
