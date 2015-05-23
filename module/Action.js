/**
 * Created by huangyao on 14-10-1.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

/**
 * @module Action
 */
var Action = new Schema({
  //活动名称
  name:{type:String,default:'Action'},
  //创建日期
  create_date:{type:Date,default:Date.now},
  // 活动开始时间
  start_date:{type:Date,default:Date.now},
  // 活动结束时间
  end_date:{type:Date,default:Date.now},
  //最后一次编辑的时间
  edit_date:{type:Date,default:Date.now},
  //活动描述内容
  desc:{type:String,default:'desciption'},
  // 活动地点名称
  addr_name:{type:String},
  // 活动地点GPS X 坐标
  addr_position_x:{type:Number,default:-1},
  // 活动地点GPS Y 坐标
  addr_position_y:{type:Number,default:-1},
  // 活动发起人ID
  creator: ObjectId,
  // 活动相关文章id，已废弃
  article_id:ObjectId,
  // 回复数目，已废弃
  reply_count:{type:Number,default:0},
  // 活动信息访问数目
  visit_count:{type:Number,default:0},
  // 活动点赞数目
  like_count:{type:Number,default:0},
  // 活动点不赞数目
  unlike_count:{type:Number,default:0},
  // 活动是否可以被参加
  forkable:{type:Boolean,default:true},
  // 活动类型id
  type_id:{type:Number,default:1},
  //是否置顶
  top:{type:Boolean,default:false},
  // 活动是否被激活
  active:{type:Boolean,default:true},
  //参加的人数
  fork_count:{type:Number,default:0},
  //图片的url
  img_url:{type:String,default:''},
});

// Action.index({name:'text'});
// Action.index({desc:'text'});
Action.index({create_date:1});

// Action.index({end_date:1},{unique:true});
mongoose.model('Action',Action);


//require this module , var mod = require('module')
// if you want use User schema,like this
// var user = new mod.User()
