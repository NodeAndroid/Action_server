
 var mongoose = require('mongoose');

 var Schema = mongoose.Schema,
 ObjectId = Schema.ObjectId;

/**
 * @module User
 */
 var Notification = new Schema({
  content:{type:String,default:''},
  create_at:{type:Date,default:Date.now},
  send_from:{type:ObjectId},
  send_to:[ObjectId],
  hasRead:{type:Boolean,default:false},
  prority:{type:Number,default:0},
  action_id:{type:ObjectId},
 });

 Notification.index({create_at:-1});

 mongoose.model("Notification",Notification);
