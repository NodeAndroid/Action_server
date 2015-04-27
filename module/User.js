/**
 * Created by huangyao on 14-10-1.
 */
 var mongoose = require('mongoose');

 var Schema = mongoose.Schema,
 ObjectId = Schema.ObjectId;

/**
 * @module User
 */
 var User = new Schema({
   name:{type:String,default:"user name"},
   loginname: { type: String},
   passwd:{type:String},
   email:{type:String},
   phone:{type:String},
   nickname:{type:String,default:"your nickname"},
   friends:{},
   role_id:{type:ObjectId}
 });

 User.index({loginname:1},{unique:true});
 User.index({email:1},{unique:true});

 module.exports = mongoose.model("User",User);
