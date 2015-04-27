
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

module.exports = mongoose.model('Fork',Fork);
