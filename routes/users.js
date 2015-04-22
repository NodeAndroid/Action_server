var express = require('express');
var router = express.Router();
var User=require('../proxy').User;
var session=require('../util/session');
/* GET users listing. */
router.get('/', function(req, res) {
  res.send('welcome to Action');
});


//登陆验证
//message:登陆之后的回话
//status:1代表成功，0代表账号或密码错误，-1代表异常或未知错误
router.post('/signin',function(req,res,next){
    var user_name=req.body.name;
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
//status:1代表成功，0代表已存在账号，2代表账号密码格式有问题，-1代表异常或者未知错误
router.post('/signup', function(req, res) {
    res.json({message:'',status:1});
});


//账号服务
//status:1代表成功，0代表修改失败，2代表账号密码格式有问题，-1代表异常或者未知错误
router.post('/accountservice', function(req, res) {
    res.json({message:'',status:1});
});


//其他账号登陆  QQ github 手机
//status:1代表成功，0代表账号或密码错误，-1代表异常或未知错误
router.post('/3partsignup', function(req, res) {
    res.json({message:'',status:1});
});


//获取账号信息

router.get('/3partsignup', function(req, res) {
    res.json({name:'user',avatar:'img',sign:'sign'});
});




module.exports = router;
