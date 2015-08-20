var mongoose = require('mongoose');

var PanelSchema = mongoose.Schema({
  owner: {type:mongoose.Schema.Types.ObjectId, ref:'User',  required:true},
  name: {type:String, required:true},
  type: {type:String, required:true},
  target_id: {type:String, required:true},
  order: {type:Number, required:true}
});

module.exports = mongoose.model("Panel",PanelSchema);
