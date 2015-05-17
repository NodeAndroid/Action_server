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
   email_enable:{type:Boolean,default:true},
   phone:{type:String},
   phone_enable:{type:Boolean,default:true},
   title:{type:String},
   school:{type:String},
   nickname:{type:String,default:"your nickname"},
   friends:{},
   role_id:{type:ObjectId}
 });

 User.index({loginname:1});
 User.index({email:1});

 mongoose.model("User",User);
