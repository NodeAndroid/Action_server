
 var mongoose = require('mongoose');
 var Schema = mongoose.Schema,
     ObjectId = Schema.ObjectId;
/**
 * @module Role
 */
 var Role=new Schema({
     role_type:{type:String,default:'admin'}

 });


 module.exports = mongoose.model('Role',Role);
