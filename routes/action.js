
var express = require('express');
var router = express.Router();
var validator = require('validator');
var _ = require('lodash');
var Action = require('../proxy/action');
/**
 * action操作的一些API  path-prefix '/action'
 * @class action-router
 */

/**
 * 新建一个action
 * @method /new
 * @return {json} status 0 代表成功 ，否则失败
 * @example
 * 				//完整的action数据结构
 * 			  name:{type:String,default:'Action'},
 *        end_date:{type:Date,default:Date.now},
 *        edit_date:{type:Date,default:Date.now},
 *        desc:{type:String,default:'desciption'},
 *        creator: ObjectId,
 *        forkable:{type:Boolean,default:true},
 *        type_id:{type:ObjectId},
 *        //是否置顶
 *        top:{type:Boolean,default:false},
 *
 */
router.post('/new',function (req,res,next) {
  var body = req.body;
  var pjson ={};
  pjson.name = _.trim(body.name);
  pjson.end_date = new Date(body.end_date);
  pjson.desc = _.trim(body.desc);
  pjson.creator = req.session.user._id;
  pjson.forkable = Booelan(body.forkable);
  pjson.type_id = Number(body.type_id);
  pjson.top = Boolean(req.top);
  if(!validator.isDate(pjson.end_date)){
    return res.json({status:-1,message:'end_date error'});
  }
  if(pjson.name === ''){
    return res.json({status:-1,message:'name can not be blank'});
  }
  if(pjson.desc === ''){
    return res.json({status:-1,message:'desc can not be blank'});
  }
  Action.newAndSace(pjson,function (err) {
    if(err){
    	console.err(err.stack);
    	throw err;
    }
    res.json({status:0,message:'success'});
  });
});

/**
 * 删除一个action
 * @method /delete/:aid
 * @param {string} aid action的ObjectId
 * @return {json} status 0 代表成功，否则就是失败
 * @example
 * 		var ServerUrl = 'xxxxxx/action/delete';
 * 		http.get(ServerUrl+'/'+ObjectId+'/');
 */
router.get('/delete/:aid',function (req,res,next) {
  var aid = req.params.aid;
  Action.deleteById(aid,function (err) {
    if(err){
    	console.err(err.stack);
      res.json({status:-1,message:'server error'});
    	throw err;
    }
    res.json({status:0,message:'success'});
  });
});


/**
 * 激活一个action，默认新建之后是激活状态
 * @method /active/:aid
 * @param {string} aid action的ObjectId
 * @return {json} status 0 代表成功，否则失败
 */
router.get('/active/:aid',function(req,res,next){
  var aid=req.params.aid;
  // Action.getActionById(aid,function(err,action){
  //   if(err){
  //     console.log(err.stack);
  //     res.json({status:-1,message:'server error'});
  //     throw err;
  //   }
  //   res.json({status:0,message:action});
  // });

});

//fork 参加一个action
/**
 * 参加一个活动
 * @method /fork/:aid
 * @param {string} aid action的ObjectId
 * @return {json} status 0 成功，否则失败
 */
router.get('/fork/:aid');


 /**
  * 退出一个action
  * @method /exit/:aid
  * @param {string} aid action的ObjectId
  * @return {json} status 0 成功，否则失败
  */
router.get('/exit/:aid',function(req,res,next){
  var user=req.session.user;
  // if(err){
  //   console.log(err.stack);
  //   res.json({status:-1,message:'server error'});
  //   throw err;
  // }

});


/**
 * 获取一个action的资料
 * @method /pull/:aid
 * @param {string} aid action的ObjectId
 * @return {json} status 0 成功，否则失败, action\{status,action\}
 */
router.get('/pull/:aid',function(req,res,next){
  var aid=req.params.aid;
  Action.getActionById(aid,function(err,action){
    if(err){
        console.log(err.stack);
        res.json({status:-1,message:'server error'});
        throw err;
      }
      res.json({status:0,message:action});
  });
});

/**
 * 修改一个action的资料，类似于/new
 * @param {string} aid action的ObjectId
 * @return {json} status 0 成功，否则失败
 */
router.post('/push/:aid',function(res,req,next){
  // Action.update()
  var aid=req.params.aid;
  var pjson={};
  pjson.name = _.trim(body.name);
  pjson.end_date = new Date(body.end_date);
  pjson.desc = _.trim(body.desc);
  pjson.creator = req.session.user._id;
  pjson.forkable = Booelan(body.forkable);
  pjson.type_id = Number(body.type_id);
  pjson.top = Boolean(req.top);
  Action.updateAction(aid,njson,function(){

  });
});


/**
 * 获取我的action列表
 * @return {json} status 0 成功 否则失败 ；actions action对象列表
 *
 */
router.post('/listAll');

module.exports = router;
