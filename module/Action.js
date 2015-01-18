/**
 * Created by huangyao on 14-10-1.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Action = new Schema({
  name:{type:String,default:'Action'},
  create_date:{type:Date,default:Date.now},
  edit_date:{type:Date,default:Date.now},
  desc:{type:String,default:'desciption'},
  creator: ObjectId,
  reply_count:{type:Number,default:0},
  visit_count:{type:Number,default:0},
  like_count:{type:Number,default:0},
  unlike_count:{type:Number,default:0},
  forkable:{type:Boolean,default:true},
});


module.exports = mongoose.model('Action',Action);


//require this module , var mod = require('module')
// if you want use User schema,like this
// var user = new mod.User()
