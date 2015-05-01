
var express = require('express');
var router = express.Router();
var validator = require('validator');
var Action = require('../proxy').Action;

/**
 * 主页的一些API  path-prefix '/'
 *
 * @class index-router
 */

/**
 * 获取最新活动10条
 * @method /
 * @return {date} time
 * @return {array} actions
 */
router.get('/', function(req, res) {
 // res.render('index', { title: 'Express' });
  Action.getActions(function (actions) {
    res.json({time:new Date(),actions:actions});
  });
});


/**
 * 获取最新的活动10条，但是跳过之前的条数
 * @method /more
 * @param {number} skip
 * @return {date} time
 * @return {array} actions
 * @example
 * 		http.get(SERVER_URL,{skip:10}) //假设原本已经显示了10条，跳过之前的10条获取之后的action
 */
router.get('/more',function (req,res,next) {
  var skip = req.params.skip;
  skip = validator.isNumeric(skip)?Number(skip):0;
  Action.getActions(skip,function (actions) {
    res.json({time:new Date(),actions:actions});
  });
});

/**
 * 判断是否已经有更新的action条目,返回status = -1说明已经需要更新,status=1说明不需要更新
 * @method /isTimeout
 * @param {date} date
 * @return {String} message
 * @return {number} status
 * @example
 * 		http.get(Server_Url,{date:new Date}) //参数date表示目前客户端中最新一条非置顶action的创建时间
 */
router.get('/isTimeout',function (req,res,next) {
  var date = req.params.date;
  if(validator.isDate(date)){
      date = new Date(date);
      Action.getLastActionDate(function (cdate) {
        if(date < cdate){
          res.json({message:'timeout',status:-1});
        }else{
          res.json({message:'already update',status:1});
        }
      });
  }else{
    return res.json({message:'参数错误'});
  }
});



/**
 * NOTE:过期API
 * @depracated
 */
router.get('/message',function(req,res){
    res.render('message');
});


/**
 * NOTE:过期API
 * @depracated
 */
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



/**
 * NOTE:过期API
 * @depracated
 */
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
/**
 * NOTE:过期API
 * @depracated
 */
router.get('/post', function (req,res) {
    return res.json({title:'title',img:'imgsrc',auth:'auth',content:'content',join:1,start:1});
});


//加入一个活动
//status:1代表成功，0代表失败，-1代表异常或者未知错误
/**
 * NOTE:过期API
 * @depracated
 */
router.get('/joinpost', function (req,res) {
    return res.json({message:'',status:1});
});

//退出一个活动
//status:1代表成功，0代表失败，-1代表异常或者未知错误
/**
 * NOTE:过期API
 * @depracated
 */
router.get('/getoutpost', function (req,res) {
    return res.json({message:'',status:1});
});

//新建一个活动
//status:1代表成功，0代表失败，2代表无权限，-1代表异常或者未知错误
/**
 * NOTE:过期API
 * @depracated
 */
router.post('/newaction', function (req,res) {
    return res.json({message:'',status:1});
});


//删除活动
//status:1代表成功，0代表失败，2代表无权限，-1代表异常或者未知错误
/**
 * NOTE:过期API
 * @depracated
 */
router.delete('/deleteaction',function(req,res){
    return res.json({message:'',status:1});
});







module.exports = router;
