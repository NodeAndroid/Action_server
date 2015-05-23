
var express = require('express');
var router = express.Router();
var validator = require('validator');
var Type = require('../proxy').Type;
var seHelper = require('../middleware/session');
/**
 * 活动类型相关的操作
 * @class type-router
 */

/**
 * 获取所有类型
 * @method /pull
 * @return {json} {message 类型数组,status 0 为成功,否则出错}
 * @example message 是type的一个数组,没想type是一个对象,有这些属性
 *           type:{type:String},类型名称,必选
 *           type_id:{type:Number}, 类型ID,可自由设置编号,必选
 *           creator: ObjectId, 创建者ID,可选
 */
router.get('/pull',function (req,res,next) {
  Type.getAll(function (err,results) {
  console.log('point');
    if(err){
    	console.log(err.stack);
    	throw err;
    }
    res.json({message:results,status:0});
  });
});

/**
 * 新增一个type,此API为私有,只有管理员可以使用
 * @method /push
 * @param {string} type
 * @param {number} type_id
 * @param @optional creator
 * @return {json} status为 0 成功插入,-1 发生错误,1 已存在该type
 */
router.post('/push',seHelper.loginRequire,function (req,res,next) {
  var body = req.body;
  var tmp;
  var pjson = {};
  pjson.type = (tmp = xss(_.trim(body.type)))?tmp:exit('invalidate type');
  pjson.type_id = validator.isNumeric(body.type_id)?Number(body.type_id):exit('invalidate type_id');
  pjson.creator = req.session.user._id;
  function exit(msg) {
    return res.json({message:msg,status:-1});
  }
  Type.AddOne(pjson,function (err,results) {
    if(err){
      if(err.code === 11000)
        return res.json({status:1,message:'dupliate type'});
    	console.err(err.stack);
    	throw err;
    }
    res.json({status:0,message:'success'});
  });
});


module.exports = router;
