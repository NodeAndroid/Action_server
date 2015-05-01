/**
 *
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


/**
 * @module Article
 */
var Article=new Schema({
  title:{type:String},
  //内容
  content:{type:String},
  //是否置顶
  top:{type:Boolean,default:0},
  // 回复数目
  reply_count:{type:Number,default:0},
  // 访问数目
  visit_count:{type:Number,default:0},
  // 创建日期
  create_at:{type:Date,default:Date.now},
  // 创建人
  create_by:{type:ObjectId},
  // 更新时间
  update_at: {type: Date, default: Date.now},
  // 更新人
  update_by:{type: ObjectId},
  // 最后回复人
  last_reply_at:{type:Date,default:Date.now},
  // 标签
  tag:{type:Array,defualt:[]},
  // 是否为草稿
  draft:{type:Boolean,default:true},
  // SEO 关键词
  /*seo_keywd:{type:String},
  // SEO 描述
  seo_desc:{type:String},*/
});


mongoose.model('Article',Article);
