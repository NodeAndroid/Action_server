/**
 *
 */
 var mongoose = require('mongoose');
 var Schema = mongoose.Schema,
     ObjectId = Schema.ObjectId;
/**
 * @module Type
 */
 var Type=new Schema({
   type:{type:String,default:'action type'},
   creator: ObjectId,
   create_date:{type:Date,default:Date.now}
 });

 module.exports = mongoose.model('Type',Type);
