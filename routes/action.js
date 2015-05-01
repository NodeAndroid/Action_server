
var express = require('express');
var router = express.Router();
var validator = require('validator');
var _ = require('lodash');
var Action = require('../proxy/action');
var seHelper = require('../middleware/session');
/**
 * action操作的一些API  path-prefix '/action'
 * @class action-router
 */

/**
 * 新建一个action
 * @method /new
 * @return {json} status 0 代表成功 ，否则失败
 * @example
 *   // name:{type:String,default:'Action'},
 * // create_date:{type:Date,default:Date.now},
 * // start_date:{type:Date,default:Date.now},
 * // end_date:{type:Date,default:Date.now},
 * // edit_date:{type:Date,default:Date.now},
 * // desc:{type:String,default:'desciption'},
 * // addr_name:{type:String},
 * // addr_position_x:{type:Number,default:-1},
 * // addr_position_y:{type:Number,default:-1},
 * // creator: ObjectId,
 * // article_id:ObjectId,
 * // reply_count:{type:Number,default:0},
 * // visit_count:{type:Number,default:0},
 * // like_count:{type:Number,default:0},
 * // unlike_count:{type:Number,default:0},
 * // forkable:{type:Boolean,default:true},
 * // type_id:{type:Number,default:1},
 * // //是否置顶
 * // top:{type:Boolean,default:false},
 *
 */
router.post('/new',seHelper.loginRequire,function (req,res,next) {
  var body = req.body;
  console.log(body);
  var pjson ={};
  pjson.name = body.name?_.trim(body.name):'';
  var date = new Date();

  // name:{type:String,default:'Action'},
  // create_date:{type:Date,default:Date.now},
  // start_date:{type:Date,default:Date.now},
  // end_date:{type:Date,default:Date.now},
  // edit_date:{type:Date,default:Date.now},
  // desc:{type:String,default:'desciption'},
  // addr_name:{type:String},
  // addr_position_x:{type:Number,default:-1},
  // addr_position_y:{type:Number,default:-1},
  // creator: ObjectId,
  // article_id:ObjectId,
  // reply_count:{type:Number,default:0},
  // visit_count:{type:Number,default:0},
  // like_count:{type:Number,default:0},
  // unlike_count:{type:Number,default:0},
  // forkable:{type:Boolean,default:true},
  // type_id:{type:Number,default:1},
  // //是否置顶
  // top:{type:Boolean,default:false},
  //
  pjson.start_date = validator.isDate(body.start_date)?Date(body.start_date):new Date(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds());
  pjson.end_date = validator.isDate(body.end_date)?Date(body.end_date):new Date(date.getFullYear(),date.getMonth(),date.getDate()+1,date.getHours(),date.getMinutes(),date.getSeconds());
  pjson.desc = body.desc?_.trim(body.desc):'';
  pjson.addr_name = body.addr_name?_.trim(body.addr_name):'';
  pjson.addr_position_x = validator.isNumeric(body.addr_position_x)?Number(body.addr_position_x):-1;
  pjson.addr_position_y = validator.isNumeric(body.addr_position_y)?Number(body.addr_position_y):-1;
  pjson.creator = req.session.user._id;
  // validator.isBoolean(body.forkable,'strict');
  pjson.forkable = validator.toBoolean(body.forkable,'strict');
  pjson.type_id = validator.isNumeric(body.type_id)?Number(body.type_id):1;
  pjson.top = validator.toBoolean(body.top,'strict');
  if(!validator.isDate(pjson.end_date)){
    return res.json({status:-1,message:'end_date error'});
  }
  if(pjson.name === ''){
    return res.json({status:-1,message:'name can not be blank'});
  }
  if(pjson.desc === ''){
    return res.json({status:-1,message:'desc can not be blank'});
  }
  if(pjson.addr_name === ''){
    return res.json({status:-1,message:'addr_name can not be blank'});
  }
  if(pjson.type_id < 0){
    return res.json({status:-1,message:'type_id error'});
  }
  console.log('point');
  Action.newAndSave(pjson,function (err) {
    if(err){
    	console.err(err);
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
router.get('/delete/:aid',seHelper.loginRequire,function (req,res,next) {
  var aid = req.params.aid;
  if(!aid || aid.length !== 24){
    return res.json({status:-1,message:'objectid error'});
  }
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
router.get('/active/:aid',seHelper.loginRequire,function(req,res,next){
  var aid=req.params.aid;
  // Action.getActionById(aid,function(err,action){
  //   if(err){
  //     console.log(err.stack);
  //     res.json({status:-1,message:'server error'});
  //     throw err;
  //   }
  //   res.json({status:0,message:action});
  // });
  Action.updateAction({_id:aid},{active:true},function (err) {
    if(err){
    	console.err(err.stack);
    	throw err;
    }
    return res.json({status:1,message:'done'});
  });

});

//fork 参加一个action
/**
 * 参加一个活动
 * @method /fork/:aid
 * @param {string} aid action的ObjectId
 * @return {json} status 0 成功，否则失败
 */
router.get('/fork/:aid',function (req,res,next) {

});


 /**
  * 退出一个action
  * @method /exit/:aid
  * @param {string} aid action的ObjectId
  * @return {json} status 0 成功，否则失败
  */
router.get('/exit/:aid',seHelper.loginRequire,function(req,res,next){
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
router.get('/pull/:aid',seHelper.loginRequire,function(req,res,next){
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
router.post('/push/:aid',seHelper.loginRequire,function(res,req,next){
  // Action.update()
  // var aid=req.params.aid;
  // var body=req.body;
  // var pjson={};
  // pjson.name = _.trim(body.name);
  // pjson.end_date = new Date(body.end_date);
  // pjson.desc = _.trim(body.desc);
  // pjson.creator = req.session.user._id;
  // pjson.forkable = Booelan(body.forkable);
  // pjson.type_id = Number(body.type_id);
  // pjson.top = Boolean(req.top);
  // if(!validator.isDate(pjson.end_date)){
  //   return res.json({status:-1,message:'end_date error'});
  // }
  // if(pjson.name === ''){
  //   return res.json({status:-1,message:'name can not be blank'});
  // }
  // if(pjson.desc === ''){
  //   return res.json({status:-1,message:'desc can not be blank'});
  // }
  // Action.updateAction(aid,pjson,function(err){
  //
  // });
});


/**
 * 获取我的action列表
 * @return {json} status 0 成功 否则失败 ；actions action对象列表
 *
 */
router.post('/listAll');

module.exports = router;
