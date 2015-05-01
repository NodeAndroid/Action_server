
 var mongoose = require('mongoose');
 var Schema = mongoose.Schema,
     ObjectId = Schema.ObjectId;
/**
 * @module Friend
 */
 var Friend=new Schema({
   fid:{type:ObjectId},
   _fid:{type:ObjectId},
 });


 mongoose.model('Friend',Friend);
