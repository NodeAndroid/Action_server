/**
 * Created by huangyao on 14-10-1.
 */
 var mongoose = require('mongoose');

 var Schema = mongoose.Schema,
 ObjectId = Schema.ObjectId;

/**
 * @module User
 */
 var User = new Schema({
   // 用户名
   name:{type:String,default:"user name"},
  //  用户登录名
   loginname: { type: String},
  //  用户密码
   passwd:{type:String},
  //  用户email
   email:{type:String},
  //  用户email是否公开
   email_enable:{type:Boolean,default:true},
  //  用户电话
   phone:{type:String},
  //  用户电话是否公开
   phone_enable:{type:Boolean,default:true},
  //  用户头衔或者职位
   title:{type:String},
  //  用户所在学校
   school:{type:String},
  //  用户昵称
   nickname:{type:String,default:"your nickname"},
  //  用户好友 已废弃
   friends:{},
  //  用户角色ID 已废弃
   role_id:{type:ObjectId}
 });

 User.index({loginname:1});
 User.index({email:1});

 mongoose.model("User",User);
