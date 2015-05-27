var express = require('express');
var router = express.Router();
var User=require('../proxy').User;
var session=require('../util/session');
var _ = require('lodash');
var seHelper = require('../middleware/session');
var xss = require('xss');
var async = require('async');
var jwt = require('jwt-simple');
var secret = require('../config').secret;

var Action = require('../proxy').Action;

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('welcome to Action');
});


/**
 * 用户登录，获取用户信息和属性的相关API path-prefix '/users'
 * @class users-router
 */

/**
 * 登陆验证
 * @deprecated
 */
router.post('/signin',function(req,res,next){
    var user_name=xss(req.body.name);
    User.getUserByLoginName(user_name,function(err,user){
      if(err){
        return next(err);
      }
      if(!user){
        return res.json({message:'账号错误',status:0});
      }

    });
    res.json({message:'welcome',status:1});

});


//注册
//status:1代表成功，0代表已存在账号，2代表账号用户名或者密码格式有问题，-1代表异常或者未知错误
/**
 * 注册
 * @method /signup
 * @param {string} loginname
 * @param {string} passwd
 * @return {json} status:1代表成功，0代表已存在账号，2代表账号用户名或者密码格式有问题，-1代表异常或者未知错误
 */
router.post('/signup', function(req, res) {
  var body = req.body;
  console.log(body);
  var loginname = xss(_.trim(body.loginname));
  var passwd = xss(_.trim(body.passwd));
  var email = xss(_.trim(body.email));
  var phone = xss(_.trim(body.phone));
  // var name = xss(_.trim(body.name));
  var title = xss(_.trim(body.title));
  var school = xss(_.trim(body.school));
  var avatar = xss(_.trim(body.avatar));
  if(loginname ==='' || passwd === '' || email === '' || phone === ''|| title === ''|| school === ''){
    return res.json({message:'信息格式错误',status:2});
  }
  if(loginname === null || passwd === null || email === null || phone === null|| title === null|| school === null){
    return res.json({message:'信息不能为空',status:2});
  }
  User.getUserByLoginName(loginname,function (err,user) {
    if(err){
    	console.err(err.stack);
    	throw err;
    }
    console.log(user);
    if(user){
      return res.json({message:'exist username',status:0});
    }else{
      User.newAndSave({loginname:loginname,passwd:passwd,email:email,phone:phone,title:title,school:school,avatar:avatar},function (err) {
        if(err){
        	console.err(err.stack);
        	throw err;
        }
        return res.json({message:'done',status:1});
      });
    }
  });
  // res.json({message:'done',status:1});
});



/**
 * 退出登录
 * @mothod /logout
 * @return {json} status:1注销成功，0没有登录，2内部错误
 */
 router.get('/logout',function (req,res,next) {
   req.session.user = null;
   res.json({message:'success',status:1});
 });

 /**
  * 登录
  * @method /login
  * @param {string} loginname
  * @param {string} passwd
  * @return {json} status:0成功，1密码或者账号错误，2已登录，请先退出当前账户
  *
  */
  router.post('/login',function (req,res,next) {
    var body = req.body;
    // console.log(body);
    var loginname = xss(_.trim(body.loginname));
    var passwd = xss(_.trim(body.passwd));
    if(loginname ==='' || passwd === ''){
      return res.json({message:'账号或者密码格式错误',status:1});
    }
    console.log(req.session.user);
    if(req.session.user){
      return res.json({message:'user had login!',status:2});
    }
    User.getUserByLoginName(loginname,function (err,user) {
      if(err){
      	console.err(err.stack);
      	throw err;
      }
      // console.log(user);
      if(!user || user.length ===0 || user.passwd !== passwd){
        return res.json({message:'loginname or passwd error',status:1});
      }else{
        var token = jwt.encode({uid:user._id},secret);
        req.session.user = user;
        return res.json({message:'success',status:0,token:token,user:user});
      }
    });
  });



/**
 *  账号服务 NOTE 未开放API
 * @method /accountservice
 * @return {json} status:1代表成功，0代表修改失败，2代表账号密码格式有问题，-1代表异常或者未知错误
 */
router.post('/accountservice', seHelper.loginRequire,function(req, res) {
    res.json({message:'',status:1});
});


/**
 * 其他账号登陆  QQ github 手机 NOTE 未开放API
 * @method /3partsignup
 * @return {json} status:1代表成功，0代表账号或密码错误，-1代表异常或未知错误
 */
router.post('/3partsignup', function(req, res) {
    res.json({message:'',status:1});
});




/**
 * 获取自身账号信息
 * @method /profile
 * @return {json} {tatus:1 成功，0 错误，2 未登录 message{countOfMy 我创建的action countOfJoin 我参加的action user 我的基本信息}}
 */
router.get('/profile',seHelper.loginRequire, function(req, res) {
  var uid = req.session.user._id;
  async.parallel([
    function (cb) {
      Action.countActionsById(uid,cb);
    },
    function (cb) {
      Action.countForkById(uid,cb);
    }
  ],function (err,results) {
  // console.log('point');
    var msg = {};
    // console.log(results);
    msg.countOfMy = results[0];
    msg.countOfJoin = results[1];
    // msg.user = req.session.user;
    User.getUserById(uid,function (err,user) {
      if(err){
      	console.err(err.stack);
      	throw err;
      }
      msg.user = user;
      return res.json({message:msg,status:1});
    });
    // console.log(msg);
  });
});


/**
 * 获取其他用户的账号信息
 * @method /profile/:uid
 * @param {string} uid User的ObjectId
 * @return {json} status:1 成功，0 错误，2 没有权限
 */
router.get('/profile/:uid',seHelper.loginRequire,function (req,res,next) {
  var uid = req.params.uid;
  if(!uid || uid.length !== 24){
    return res.json({message:'invalidate uid',status:-1});
  }
  User.getUserById(uid,function (err,user) {
    if(err){
    	console.log(err.stack);
    	throw err;
    }
    // console.log('point');
    if(!user.email_enable){
      delete user.email;
    }
    if(!user.phone_enable){
      delete user.phone;
    }
    async.parallel([
      function (cb) {
        Action.countActionsById(uid,cb);
      },
      function (cb) {
        Action.countForkById(uid,cb);
      }
    ],function (err,results) {
    // console.log('point');
      var msg = {};
      // console.log(results);
      msg.countOfMy = results[0];
      msg.countOfJoin = results[1];
      msg.user = user;
      console.log(msg);
      return res.json({message:msg,status:1});
    });
    // res.json({message:user,status:1});
  });
});


router.post('/update',seHelper.loginRequire,function (req,res,next) {
  var body = req.body;
  // console.log(body);
  var pjson = {};
  var args = [
    'name',
    'passwd',
    'email',
    'email_enable',
    'phone',
    'phone_enable',
    'title',
    'school',
    'nickname',
    'avatar',
  ];
  // args.forEach(function (item,index) {
  //   if(body[item]){
  //     pjson[item] = xss(_.trim(body.item));
  //   }
  // });
  if(body.name){
    pjson.name = xss(_.trim(body.name));
  }
  if(body.passwd){
    pjson.passwd = xss(_.trim(body.passwd));
  }
  if(body.email){
    pjson.email = xss(_.trim(body.email));
  }
  if(body.phone){
    pjson.phone = xss(_.trim(body.phone));
  }
  if(body.title){
    pjson.title = xss(_.trim(body.title));
  }
  if(body.school){
    pjson.school = xss(_.trim(body.school));
  }
  if(body.nickname){
    pjson.nickname = xss(_.trim(body.nickname));
  }
  if(body.avatar){
    pjson.avatar = xss(_.trim(body.avatar));
  }
  if(pjson.email_enable !== null){
    pjson.email_enable = Boolean(pjson.email_enable);
  }
  if(pjson.phone_enable !== null){
    pjson.phone_enable = Boolean(pjson.phone_enable);
  }
  console.log(pjson);
  User.updateByid(req.session.user._id,pjson,function (err) {
    if(err){
    	console.err(err.stack);
    	throw err;
    }
    res.json({message:'success',status:0});
  });
});


module.exports = router;
