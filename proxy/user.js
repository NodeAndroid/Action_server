/**
 *
 */
 var User = require('../module').User;
 var Role = require('../module').Role;
 //var DB_ERROR = '数据库错误，请联系管理员';

 /**
  * 根据用户名列表查找用户列表

  */
 exports.getUsersBynames=function(names,callback){
   if(names.length===0){
     return callback(null,[]);
   }
   User.find({loginname:{ $in:names}},callback);
 };

 exports.getUserByLoginName=function(loginname,callback){
   User.findOne({loginname:loginname},callback);
 };

 exports.getUserById=function(id,callback){
   User.findOne({_id:id},callback);
 };

 exports.getUserByMail=function(email,callback){
   User.findOne({email:email},callback);
 };

 exports.getUserByIds=function(ids,callback){
   if(ids.length===0){
     return callback(null,[]);
   }
   User.find({_id:{ $in:ids}},callback);
 };

 exports.newAndSave=function(name,loginname,passwd,email,phone,nickname,friends,role_id,callback){
   var user=new User();
   user.name=name;
   user.loginname=loginname;
   user.passwd=passwd;
   user.email=email;
   user.phone=phone;
   user.nickname=nickname;
   user.friends=friends;
   user.role_id=role_id;
   user.save(callback);
 };
