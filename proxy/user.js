/**
 *
 */
 var User = require('../module').User;
 var Role = require('../module').Role;
 //var DB_ERROR = '数据库错误，请联系管理员';

 /**
  * proxy - user.js
  * @class user-proxy
  * @exmaple
  * 		//这里传入的回调函数的参数一律是
  * 		callback(err,results)
  * 		//results是从mongodb中取得的结果集
  */

 /**
  * 根据用户名列表查找用户列表
  * @method getUsersBynames
  * @param {array} names
  * @param {function} callback
  */
 exports.getUsersBynames=function(names,callback){
   if(names.length===0){
     return callback(null,[]);
   }
   User.find({loginname:{ $in:names}},callback);
 };

 /**
  * 根据用户登录名查找用户列表
  * @method getUserByLoginName
  * @param {string} loginname
  * @param {function} callback
  */
 exports.getUserByLoginName=function(loginname,callback){
   User.findOne({loginname:loginname},callback);
 };

 /**
  * 根据用户id查找用户列表
  * @method getUserById
  * @param {objectid} id
  * @param {function} callback
  */
 exports.getUserById=function(id,callback){
   User.findOne({_id:id},callback);
 };
 /**
  * 根据用户email查找用户列表
  * @method getUserByMail
  * @param {objectid} id
  * @param {function} callback
  */
 exports.getUserByMail=function(email,callback){
   User.findOne({email:email},callback);
 };
 /**
  * 根据用户id列表查找用户列表
  * @method getUserByIds
  * @param {array} ids
  * @param {function} callback
  */
 exports.getUserByIds=function(ids,callback){
   if(ids.length===0){
     return callback(null,[]);
   }
   User.find({_id:{ $in:ids}},callback);
 };
 /**
  * 新建并保存用户
  * @method newAndSave
  * @param {object} profiles
  * @param {function} callback
  */
 exports.newAndSave=function(profiles,callback){
   var user=new User(profiles);
  //  user.name=profiles.name;
  //  user.loginname=profiles.loginname;
  //  user.passwd=profiles.passwd;
  //  user.email=profiles.email;
  //  user.phone=profiles.phone;
  //  user.nickname=profiles.nickname;
  //  user.friends=profiles.friends;
  //  user.role_id=profiles.role_id;
   user.save(callback);
 };
 /**
  * 更新用户资料
  * @method updateByid
  * @param {objectid} id
  * @param {object} profiles
  * @param {function} callback
  */
 exports.updateByid = function (id,profile,cb) {
   user.update({id:id},profile,cb);
 };
