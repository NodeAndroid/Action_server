
var mongoose = require('mongoose');

var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

/**
 * @module Fork
 */
var Fork = new Schema({
  action_id:{type:ObjectId},
  create_date:{type:Date,default:Date.now},
  user_id: ObjectId,
  fork_from:ObjectId,
});

//{action_id,user_id,{unique :  true}}

//保证这两个字段是唯一的组合,不能重复参与一个action
Fork.index({action_id:1,user_id:1},{unique:true});
mongoose.model('Fork',Fork);
