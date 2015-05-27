
var mongoose = require('mongoose');

var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

/**
 * @module Fork
 */
var Fork = new Schema({
  // 活动ID
  action_id:{type:ObjectId},
  // 创建日期
  create_date:{type:Date,default:Date.now},
  // 参加用户ID
  user_id: ObjectId,
  // 活动创建者ID
  fork_from:ObjectId,
  //签到
  sign_mark:{type:Boolean,default:false},
  //是否已在活动开始的六个小时内提醒用户参加活动
  has_noti:{type:Boolean,default:false},
});

//{action_id,user_id,{unique :  true}}

//保证这两个字段是唯一的组合,不能重复参与一个action
Fork.index({action_id:1,user_id:1},{unique:true});
mongoose.model('Fork',Fork);
