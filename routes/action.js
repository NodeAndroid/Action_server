
var express = require('express');
var router = express.Router();
var validator = require('validator');
var _ = require('lodash');
var Action = require('../proxy/action');
var User = require('../proxy/user');
var seHelper = require('../middleware/session');
var xss = require('xss');
var busboy = require('busboy');
var path = require('path');
var fs = require('fs');
var Notification = require('../proxy/notification');
var async = require('async');
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
 * // like_count:{type:Number,default:0},
 * // visit_count:{type:Number,default:0},
 * // unlike_count:{type:Number,default:0},
 * // forkable:{type:Boolean,default:true},
 * // type_id:{type:Number,default:1},
 * // //是否置顶
 * // top:{type:Boolean,default:false},
 *
 */
router.post('/new',seHelper.loginRequire,function (req,res,next) {
  var body = req.body;
  // console.log(body);

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

  var pjson ={};
  pjson.name = body.name?_.trim(body.name):'';
  var date = new Date();
  console.log(new Date(Number(body.start_date)));
  console.log(validator.isDate(new Date(Number(body.start_date))));
  pjson.start_date = validator.isDate(new Date(Number(body.start_date)))?new Date(Number(body.start_date)):new Date(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds());
  pjson.end_date = validator.isDate(new Date(Number(body.end_date)))?new Date(Number(body.end_date)):new Date(date.getFullYear(),date.getMonth(),date.getDate()+1,date.getHours(),date.getMinutes(),date.getSeconds());
  // pjson.start_date = validator.is(new Date(body.start_date);
  // pjson.end_date = new Date(body.end_date);
  // console.log(body.start_date,body.end_date);

  pjson.desc = body.desc?_.trim(body.desc):'';
  // console.log(new Date(1432475010032));
  pjson.addr_name = body.addr_name?_.trim(body.addr_name):'';
  pjson.addr_position_x = validator.isFloat(body.addr_position_x)?Number(body.addr_position_x):-1;
  pjson.addr_position_y = validator.isFloat(body.addr_position_y)?Number(body.addr_position_y):-1;
  pjson.creator = req.session.user._id;
  pjson.type_id = validator.isNumeric(body.type_id)?Number(body.type_id):1;
  pjson.top = validator.toBoolean(body.top,'strict');
  pjson.img_url = body.img_url?_.trim(body.img_url):'';
  console.log(pjson);
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
  if(pjson.addr_position_x < 0){
    return res.json({status:-1,message:'addr_position_x must be a number'});
  }
  if(pjson.addr_position_y < 0){
    return res.json({status:-1,message:'addr_position_y must be a number'});
  }
  if(pjson.type_id < 0){
    return res.json({status:-1,message:'type_id error'});
  }
  // console.log('point');
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

  var aid = xss(req.params.aid);
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
  var aid=xss(req.params.aid);
  // Action.getActionById(aid,function(err,action){
  //   if(err){
  //     console.log(err.stack);
  //     res.json({status:-1,message:'server error'});
  //     throw err;
  //   }
  //   res.json({status:0,message:action});
  // });
  console.log(aid);
  if(!aid || aid==='' || aid.length !== 24){
    return res.json({status:-1,message:'illegal objectid'});
  }
  Action.updateAction({_id:aid},{active:true},function (err) {
    if(err){
    	console.err(err.stack);
    	throw err;
    }
    return res.json({status:0,message:'done'});
  });

});

//fork 参加一个action
/**
 * 参加一个活动
 * @method /fork/:aid
 * @param {string} aid action的ObjectId
 * @return {json} status 0 成功，1 此用户已经参加了
 */

router.get('/fork/:aid',seHelper.loginRequire,function(req,res,next){
  var aid = xss(req.params.aid);
  var pjson={};
  pjson.action_id=aid;
  // pjson.create_date=validator.isDate(body.create_date)?Date(body.create_date):new Date(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds());
  pjson.user_id=req.session.user._id;
  if(!pjson.action_id || pjson.action_id.trim().length!==24){
    return res.json({status: -1,message: 'invalid ObjectId'});
  }
  // if(!validator.isDate(pjson.create_date)){
  //   return res.json({status:-1,message:'create_date error'});
  // }

    Action.addFork(pjson,function(err){
      if(err){
        // console.err(err.stack);
        // console.log(err);
        if(err.code === 11000)
          return res.json({status:-1,message:'had join this action'});
        else{
          console.error(err.stack);
          throw err;
        }
      }
      res.json({status:0,message:'success'});
      //增加通知
      Action.getActionById(aid,function (err,action) {
        if(err){
        	console.err(err.stack);
        	throw err;
        }
        var toid = action.creator;
        Notification.addOne('有一个新用户参加了您的活动',pjson.user_id,toid,pjson.user_id,aid,0);
      });
    });
});


 /**
  * 退出一个action
  * @method /exit/:aid
  * @param {string} aid action的ObjectId
  * @return {json} status 0 成功，否则失败
  */
router.get('/exit/:aid',seHelper.loginRequire,function(req,res,next){
  var uid=req.session.user._id;
  var aid = req.params.aid?_.trim(req.params.aid):'';
  aid = xss(aid);
  if(!aid || aid.length !== 24){
    return res.json({status: -1,message: 'invalid ObjectId'});
  }
  aid = xss(aid);
  Action.removeFork(aid,uid,function (err,results) {
    if(err){
    	console.err(err.stack);
    	throw err;
    }
    res.json({status: 0,message: 'done'});
    Action.getActionById(aid,function (err,action) {
      if(err){
      	console.err(err.stack);
      	throw err;
      }
      var toid = action.creator;
      Notification.addOne('有一个新用户退出了您的活动',uid,toid,uid,aid,0);
    });
  });
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
 * @return {json} status 0 成功，否则失败, message action的具体资料, fork 是否已参加
 */
router.get('/pull/:aid',seHelper .loginRequire,function(req,res,next){
  var aid = req.params.aid?_.trim(req.params.aid):'';
  aid=xss(aid);
  if(!aid || aid.length !== 24){
    return res.json({status:1,message:'invalid objectid'});
  }
  Action.getActionById(aid,function(err,action){
    if(err){
        console.log(err.stack);
        res.json({status:-1,message:'server error'});
        throw err;
    }
    Action.getForkByUidAndAid(req.session.user._id,action._id,function (err,results) {
      var fork = false;
      if(results.length === 0){
        fork = false;
      }else{
        fork = true;
      }

      var tactions = action.toJSON();
      // results.forEach(function (item,index) {
      //   tactions[index] = item.toJSON();
      //   if(item.create_date)
      //     tactions[index].create_date = item.create_date.getTime();
      //   if(item.start_date)
      //     tactions[index].start_date = item.start_date.getTime();
      //   if(item.end_date)
      //     tactions[index].end_date = item.end_date.getTime();
      //   if(item.edit_date)
      //     tactions[index].edit_date = item.edit_date.getTime();
      // });
        if(action.create_date)
          tactions.create_date = action.create_date.getTime();
        if(action.start_date)
          tactions.start_date = action.start_date.getTime();
        if(action.end_date)
          tactions.end_date = action.end_date.getTime();
        if(action.edit_date)
          tactions.edit_date = action.edit_date.getTime();
      return res.json({status:0,message:tactions,fork:fork});

    });
  });
});

/**
 * 修改一个action的资料，类似于/new 如果某个最短格式错误，那么这个字段不会被修改，注意格式错误不会导致报错，只是单纯的不会更新这个字段
 * @method /push/:aid
 * @param {string} aid action的ObjectId
 * @return {json} status 0 成功，否则失败
 */
router.post('/push/:aid',seHelper.loginRequire,function(res,req,next){
  var tbody = req.body;
  //module中可以修改的字段
  var params = ['name',
      'start_date',
      'end_date',
      'desc',
      'addr_name',
      'addr_position_x',
      'addr_position_y',
      'forkable',
      'type_id',
      'top',
      'active',
      'img_url',];
  //过滤掉不该有的字段
  var body = tbody.filter(function (item,index) {
    return params.indexOf(item) > -1;
  });
  var aid = req.params.aid;
  if(!aid || aid.length !== 24){
    return res.json({status:-1,message:'aid error'});
  }

  //校验字段类型
  var pjson = {};
  if(body.name && _.trim(body.name) !== ''){
    pjson.name = _.trim(body.name);
  }
  // if(body.start_date && validator.isDate(body.start_date)){
  //   pjson.start_date = new Date(body.start_date);
  // }
  // if(body.end_date && validator.isDate(body.end_date)){
  //   pjson.end_date = new Date(body.end_date);
  // }
  pjson.start_date = new Date(Number(body.start_date));
  pjson.end_date = new Date(Number(body.end_date));
  if(body.desc && _.trim(body.desc) !== ''){
    pjson.desc = _.trim(body.desc);
  }
  if(body.addr_name && _.trim(body.addr_name) !== ''){
    pjson.addr_name = _.trim(body.addr_name);
  }
  if(body.addr_position_x && validator.isNumeric(body.addr_position_x)){
    pjson.addr_position_x = Number(pjson.addr_position_x);
  }
  if(body.addr_position_y && validator.isNumeric(body.addr_position_y)){
    pjson.addr_position_y = Number(pjson.addr_position_y);
  }
  if(validator.isBoolean(body.forkable)){
    pjson.forkable = Boolean(pjson.forkable);
  }
  if(body.type_id && validator.isNumeric(body.type_id)){
    pjson.type_id = Number(pjson.type_id);
  }
  if(validator.isBoolean(body.top)){
    pjson.top = Boolean(pjson.top);
  }
  if(validator.isBoolean(body.active)){
    pjson.active = Boolean(pjson.active);
  }
  if(body.img_url && _.trim(body.img_url) !== ''){
    pjson.img_url = _.trim(body.img_url);
  }
  Action.updateAction({_id:aid},pjson,function (err) {
    if(err){
    	console.err(err.stack);
    	throw err;
    }
    res.json({status:0,message:'done'});
  });
});


/**
 * 获取我新建的action列表
 * @method /listAllofMy
 * @param  @optional skip 跳过的条数
 * @return {json} status 0 成功 否则失败 ；actions action对象列表
 */
router.get('/listAllofMy',seHelper.loginRequire,function (req,res,next) {
  var userid = req.session.user._id;
  var skip = validator.isNumeric(req.query.skip)?Number(req.query.skip):0;
  Action.getActionBycreator(userid,skip,10,function (err,actions) {
    if(err){
    	console.err(err.stack);
    	throw err;
    }
    var tactions = actions;
    actions.forEach(function (item,index) {
      tactions[index] = item.toJSON();
      if(item.create_date)
        tactions[index].create_date = item.create_date.getTime();
      if(item.start_date)
        tactions[index].start_date = item.start_date.getTime();
      if(item.end_date)
        tactions[index].end_date = item.end_date.getTime();
      if(item.edit_date)
        tactions[index].edit_date = item.edit_date.getTime();
    });
    return res.json({status:0,actions:tactions});
  });
});

/**
 * 获取我参加的action列表
 * @method /listAllMyjoin
 * @param  @optional skip 跳过的条数
 * @return {json} status 0 成功 否则失败 ；actions action对象列表
 */
router.get('/listAllMyjoin',seHelper.loginRequire,function (req,res,next) {
  var userid = req.session.user._id;
  var skip = validator.isNumeric(req.query.skip)?Number(req.query.skip):0;
  Action.getForkByUid(userid,skip,10,function (err,aids) {
    if(err){
    	console.err(err.stack);
    	throw err;
    }
    //aids只是一个对象数组，这里先把对象数组整理成需要的ObjectId数组
    var daids = [];
    aids.reduce(function (pre,cur) {
      pre.push(cur.action_id);
      return pre;
    },daids);
    //去除重复的action_id
    var taids = daids.filter(function (item,index) {
      return daids.indexOf(item) === index;
    });
    Action.getActionByIds(taids,function (err,actions) {
      if(err){
      	console.err(err.stack);
      	throw err;
      }
      var tactions = actions;
      actions.forEach(function (item,index) {
        tactions[index] = item.toJSON();
        if(item.create_date)
          tactions[index].create_date = item.create_date.getTime();
        if(item.start_date)
          tactions[index].start_date = item.start_date.getTime();
        if(item.end_date)
          tactions[index].end_date = item.end_date.getTime();
        if(item.edit_date)
          tactions[index].edit_date = item.edit_date.getTime();
      });
      return res.json({status:0,actions:actions});
    });
  });
});


/**
 * 文件上传，仅支持['jpg', 'png', 'gif', 'jpeg', 'bmp', 'JPG', 'PNG', 'GIF', 'JPEG', 'BMP']
 * @method /uploadImg
 * @return {json}   status 1 错误，查阅message获得详细情况 0 成功
 */
router.post('/uploadImg',seHelper.loginRequire,function (req,res,next) {
  var IMG_FILE_TYPE = ['jpg', 'png', 'gif', 'jpeg', 'bmp', 'JPG', 'PNG', 'GIF', 'JPEG', 'BMP'];
  var query = req.query;
  var date = new Date();
  date = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate().toString();
  var FileName = '';
  var imgPath = path.resolve(__dirname, '../public/uploads', date);
    // debug('upload image + path is ' + imgPath);
    req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
  // console.log('point');
      // debug('busboy on file');
      if (!filename) {
        return res.json({
          status: 1,
          message: '文件名无法获取，可能是网络拥堵原因造成'
        });
      }
      var type = filename.split('.');
      if (!type && !type.length) {
        return res.json({
          status: 1,
          message: '无法识别文件类型'
        });
      }
      type = type[type.length - 1];
      // debug('type = ' + type);
      if (_.indexOf(IMG_FILE_TYPE, type || 'null') < 0) {
        return res.json({
          status: 1,
          message: '不支持的类型'
        });
      }
      // debug('after _.index');
      //make timestap to filename,avoid dupliacte filename
      FileName = filename = (new Date()).getTime() + filename;
      fs.exists(imgPath, function(exists) {
        // debug('img path exists ' + exists);
        if (exists) {
          file.pipe(fs.createWriteStream(path.join(imgPath, filename)));
        } else {
          fs.mkdir(imgPath, function(err) {
            if (err) {
              // debug('image file save error,maybe you dont have permission to write');
              console.log('image file save error,maybe you dont have permission to write');
              throw error;
            }
            file.pipe(fs.createWriteStream(path.join(imgPath, filename)));
          });
        }
      });
    });
    req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
      // console.log('arguments'+arguments);
    });
    req.busboy.on('finish', function(field) {
      // console.log('finish');
      res.json({
        status: 0,
        url: '/uploads/' + date + '/' + FileName
      });
      // return Action.updateAction({_id:req.session.user._id},{img_url:'/uploads/' + date + '/' + FileName});
    });
    req.pipe(req.busboy);
});

/**
 * 	赞一个action
 *
 * @method /starUp/:aid
 */
router.get('/starUp/:aid',seHelper.loginRequire,function (req,res,next) {
  var aid = xss(_.trim(req.params.aid));
  if(!aid || aid.length !== 24){
    return res.json({status:-1,message:'invalid aid'});
  }
  Action.updateStar(+1,aid,function (err) {
    // console.log('point');

    if(err){
    	console.err(err.stack);
    	throw err;
    }
    res.json({status:0,message:'success'});
  });

});
/**
 * 	踩一个action
 *
 * @method /starDown
 */
router.get('/starDown/:aid',seHelper.loginRequire,function (req,res,next) {
  var aid = xss(_.trim(req.params.aid));
  if(!aid || aid.length !== 24){
    return res.json({status:-1,message:'invalid aid'});
  }
  Action.updateStar(-1,aid,function (err) {

    if(err){
    	console.err(err.stack);
    	throw err;
    }
    res.json({status:0,message:'success'});
  });

});

/**
 * 签到
 * @method /signMark/:aid
 * @param {number} x
 * @param {number} y
 */
router.get('/signMark/:aid',seHelper.loginRequire,function (req,res,next) {
  var aid = xss(_.trim(req.params.aid));
  if(!aid || aid.length !== 24){
    return res.json({status:-1,message:'invalid aid'});
  }
  var x = validator.isNumeric(req.query.x)?Number(req.query.x):exit('invalid x position');
  var y = validator.isNumeric(req.query.y)?Number(req.query.y):exit('invalid y position');
  function exit(msg){
    return res.json({status:-1,message:msg});
  }
  Action.updateForkByAid(aid,req.session.user._id,{sign_mark:true},function (err,results) {
      if(err){
      	console.err(err.stack);
      	throw err;
      }
      res.json({status:0,message:'success'});
  });

});

/**
 * @method /checkIn/:aid
 * @param {number} x
 * @param {number} y
 * @return {json} status -1 各种参数错误 1 太远了不能签到 2 没有参加这个action 0 成功
 */
router.get('/checkIn/:aid',seHelper.loginRequire,function (req,res,next) {
  var uid = req.session.user._id;
  var aid = req.params.aid;
  if(!aid || aid.length !== 24){
    exit('invalid aid');
  }
  var x_position = validator.isFloat(req.query.x)?Number(req.query.x):exit('invalid x position');
  var y_position = validator.isFloat(req.query.x)?Number(req.query.y):exit('invalid y position');
  if (Math.abs(x_position) > 90) {
    return exit('x must in -90,+90');
  }
  if(Math.abs(y_position) > 180) {
    return exit('x must in -180,+180');
  }
  function exit(msg) {
    return res.json({status:-1,message:msg});
  }
  Action.getActionById(aid,function (err,action) {
  console.log(aid);
    if(err){
    	console.err(err.stack);
    	throw err;
    }
    if(!action){
      return exit('action not exit');
    }
    var ax = action.addr_position_x;
    var ay = action.addr_position_y;
    var distance = GetDistance(ax,ay,x_position,y_position);
    // console.log(distance);
    if(distance > 1000){
      return res.json({status:1,message:'far away'});
    }
    Action.getForkByUidAndAid(uid,aid,function (err,results) {
      if(err){
      	console.err(err.stack);
      	throw err;
      }
      if(results.length === 0){
        return res.json({status:2,message:'you never join this action'});
      }
      results = results[0];
      // console.log(results);
      results.sign_mark = true;
      results.save(function (err,results) {
        if(err){
        	console.err(err.stack);
        	throw err;
        }
        res.json({status:0,message:'success'});
      });
    });
  });
});

function rad(d) {
  return d * Math.PI / 180.0;
}

/**
 * 返回单位是M
 */
function GetDistance(lat1, lng1, lat2, lng2) {
  if ((Math.abs(lat1) > 90) || (Math.abs(lat2) > 90)) {
    return -1;
  }
  if ((Math.abs(lng1) > 180) || (Math.abs(lng2) > 180)) {
    return -1;
  }
  var radLat1 = rad(lat1);
  var radLat2 = rad(lat2);
  var a = radLat1 - radLat2;
  var b = rad(lng1) - rad(lng2);
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137; // EARTH_RADIUS;
  s = Math.round(s * 10000) / 10;
  return s;
}

/**
 * 查询附近的活动
 * @method /near
 * @param {number} x
 * @param {number} y
 */
router.get('/near',seHelper.loginRequire,function (req,res,next) {
  var x_position = validator.isFloat(req.query.x)?Number(req.query.x):exit('invalid x position');
  var y_position = validator.isFloat(req.query.x)?Number(req.query.y):exit('invalid y position');
  function exit(msg) {
    return res.json({status:-1,message:msg});
  }
  if (Math.abs(x_position) > 180) {
    return exit('x must in -90,+90');
  }
  if(Math.abs(y_position) > 90) {
    return exit('y must in -180,+180');
  }
  var LIMIT = 0.1; //寻找范围，此范围经度差10.3067km，纬度差11.1319km
  Action.getActionByPos(x_position,y_position,LIMIT,function (err,actions) {
    if(err){
    	console.err(err.stack);
    	throw err;
    }
    async.map(actions,function (action,cb) {
      User.getUserById(action.creator,function (err,results) {
        cb(err,results);
      });
    },function (err,users) {
      // console.log(users);
      users.forEach(function (item,index) {
        actions[index].creator = item;
      });
      // console.log(actions);
      return res.json({status:0,message:actions});
    });
  });

});

/**
 * 根据aid查询所有参加的人
 * @method /listJoin/:aid
 * @return status,-1 invalid id, -2 no uesr join, 0 success
 */
router.get('/listJoinUser/:aid',seHelper.loginRequire,function (req,res,next) {
  var uid = req.session.user._id;
  var aid = req.params.aid;
  if(!aid || aid.length !== 24){
    return res.json({status:0,message:'invalid aid'});
  }
  Action.getForkByAid(aid,function (err,forks) {
    var ids = [];
    if(forks.length === 0){
      return res.json({status:-2,message:'no user join'});
    }
    forks.forEach(function (item,index) {
      forks[index] = item.user_id;
    });
    ids = forks.filter(function (item,index) {
      return forks.indexOf(item) === index;
    });
    // console.log(ids);
    async.map(ids,function (uid,cb) {
      // uid = item.user_id;
      User.getUserById(uid,function (err,user) {
        cb(err,user);
      });
    },function (err,users) {
      if(forks.length !== 0){
        Action.getActionById(aid,function (err,action) {
          User.getUserById(action.creator,function (err,user) {
            res.json({status:0,message:users,creator:user});
          });
        });
      }
    });
  });
});


module.exports = router;
