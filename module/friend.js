
 var mongoose = require('mongoose');
 var Schema = mongoose.Schema,
     ObjectId = Schema.ObjectId;

 var Friend=new Schema({
   fid:{type:ObjectId},
   _fid:{type:ObjectId},
 });


 module.exports = mongoose.model('Friend',Friend);
