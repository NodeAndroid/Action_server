/**
 * Created by huangyao on 14-10-1.
 */
 var mongoose = require('mongoose');

 var Schema = mongoose.Schema,
 ObjectId = Schema.ObjectId;


 var User = new Schema({
   name:{type:String,default:"user name"},
   email:{type:String},
   passwd:{type:String},
   phone:{type:String},
   friends:{}
 });
module.exports = mongoose.model("User",User);
