
var express = require('express');
var router = express.Router();
var validator = require('validator');
var Notification = require('../proxy/notification');
var seHelper = require('../middleware/session');
var async = require('async');
var User = require('../proxy/user');
var Action = require('../proxy/action');
/**
 * 通知推送有关的API
 * @class notif-router
 */

/**
 * 得到未读通知
 * @method /
 * @param {number} size 获取的数目，如果请求中没有这个字段，默认是五条。
 * @return {json} status 0 代表成功，非零错误，message,消息数组
 * @example
 * 		{
 * 			  content:{type:String,default:''},
 *        create_at:{type:Date,default:Date.now},
 *        send_from:{type:ObjectId},
 *        send_to:{type:Array},
 *        hasRead:{type:Boolean,default:false},
 *    }
 */
router.get('/',seHelper.loginRequire,function (req,res,next) {
  var size = req.query.size;
  size = validator.isNumeric(size)?Number(size):5;
  if(size > 10){
    size = 10;
  }
  // console.log(Notification);
  Notification.getByToUid(req.session.user._id,size,function (err,results) {
    if(err){
    	console.err(err.stack);
    	throw err;
    }
    // console.log();
    var status = 0;
    if(results.length === 0){
      status = 1;
    }
    async.map(results,function (item,cb) {
      var fid = item.send_from;
      // var tid = item.send_to;
      var aid = item.action_id;
      User.getUserById(fid,function (err,fuser) {
        Action.getActionById(aid,function (err,action) {
          cb(null,[fuser,action]);
        });
      });
    },function (err,aresults) {
      // console.log(results);
      aresults.forEach(function(item,index){
        // console.log(item);
        results[index] = results[index].toJSON();
        delete results[index].send_to;
        if(item[0])
          results[index].send_from_name = item[0].loginname;
        if(item[1])
          results[index].action_name = item[1].name;
      });
      res.json({status:status,message:results});
    });
    var ids = results.reduce(function (pre,cur) {
      pre.push(cur._id);
      return pre;
    },[]);
    // console.log(ids);
    Notification.hasRead(ids,function (err,results) {
      console.log(results);
    });
  });
});


/**
 * 获取历史所有通知
 * @method /history
 */
router.get('/history',seHelper.loginRequire,function (req,res,next) {
  var skip = req.query.skip;
  skip = validator.isNumeric(skip)?Number(skip):0;
  Notification.getAllByToUid(req.session.user._id,skip,10,function (err,results) {
    if(err){
      console.err(err.stack);
      throw err;
    }
    // console.log();
    async.map(results,function (item,cb) {
      var fid = item.send_from;
      var aid = item.action_id;
      User.getUserById(fid,function (err,fuser) {
        Action.getActionById(aid,function (err,action) {
          cb(null,[fuser,action]);
        });
      });
    },function (err,aresults) {
      // console.log(results);
      aresults.forEach(function(item,index){
        // console.log(item);
        results[index] = results[index].toJSON();
        delete results[index].send_to;
        if(item[0])
          results[index].send_from_name = item[0].loginname;
        if(item[1])
          results[index].action_name = item[1].name;
      });
      res.json({status:0,message:results});
    });
  });
});



module.exports = router;
