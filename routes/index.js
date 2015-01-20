
var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
 res.render('index', { title: 'Express' });
});






router.get('/message',function(req,res){
    res.render('message');
});

router.get('/news', function (req,res) {
    var message = '';
    if(Math.random() < 0.5){
        message = '_end_';
    }
    else{
        message = 'hello';
    }
    return res.json({title:'title',img:'imgsrc',auth:'auth',message:'hello'});
});


//获取新的活动条目默认条目暂定为一条
router.get('/newpost', function (req,res) {
    var message = '';
    if(Math.random() < 0.5){
        message = '_end_';
    }
    else{
        message = 'hello';
    }
    return res.json({title:'title',img:'imgsrc',auth:'auth',message:'hello'});
});

//获取特定一条post的信息
router.get('/post', function (req,res) {
    return res.json({title:'title',img:'imgsrc',auth:'auth',content:'content',join:1,start:1});
});


//加入一个活动
//status:1代表成功，0代表失败，-1代表异常或者未知错误
router.get('/joinpost', function (req,res) {
    return res.json({message:'',status:1});
});

//退出一个活动
//status:1代表成功，0代表失败，-1代表异常或者未知错误
router.get('/getoutpost', function (req,res) {
    return res.json({message:'',status:1});
});

//新建一个活动
//status:1代表成功，0代表失败，2代表无权限，-1代表异常或者未知错误
router.post('/newaction', function (req,res) {
    return res.json({message:'',status:1});
});


//删除活动
//status:1代表成功，0代表失败，2代表无权限，-1代表异常或者未知错误
router.delete('/deleteaction',function(req,res){
    return res.json({message:'',status:1});
});







module.exports = router;
