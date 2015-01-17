/**
 * Created by huangyao on 14-10-1.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Action = new Schema({
  name:{type:String,default:'Action'},
  date:{type:Date,default:Date.now},
  desc:{type:String,default:'desciption'},
  creator: ObjectId,
});


module.exports = mongoose.model('Action',Action);
