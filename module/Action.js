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
  name:{type:String,default:'Action'},
  create_date:{type:Date,default:Date.now},
  start_date:{type:Date,default:Date.now},
  end_date:{type:Date,default:Date.now},
  edit_date:{type:Date,default:Date.now},
  desc:{type:String,default:'desciption'},
  addr_name:{type:String},
  addr_position_x:{type:Number,default:-1},
  addr_position_y:{type:Number,default:-1},
  creator: ObjectId,
  article_id:ObjectId,
  reply_count:{type:Number,default:0},
  visit_count:{type:Number,default:0},
  like_count:{type:Number,default:0},
  unlike_count:{type:Number,default:0},
  forkable:{type:Boolean,default:true},
  type_id:{type:Number,default:1},
  //是否置顶
  top:{type:Boolean,default:false},
  active:{type:Boolean,default:true},
});

Action.index({name:1});
Action.index({create_date:1});
Action.index({end_date:1});

mongoose.model('Action',Action);


//require this module , var mod = require('module')
// if you want use User schema,like this
// var user = new mod.User()
