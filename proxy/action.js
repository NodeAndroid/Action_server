
var Action=require('../module').Action;
var Type=require('../module').Type;
var Attend=require('../module').Attend;

var Fork=require('../module').Fork;

/**
 * proxy - action.js
 * @class action-proxy
 * @exmaple
 * 		//这里传入的回调函数的参数一律是
 * 		callback(err,results)
 * 		//results是从mongodb中取得的结果集
 */

/**
 * 获取最近一个新增Acion的时间
 * @method getLastActionDate
 * @param {function} cb
 */
exports.getLastActionDate = function (cb) {
  Action.findOne().sort({create_date:-1}).select('create_date').exec(function (err,results) {
    if(err){
    	console.err(err.stack);
    	throw err;
    }
    cb(results);
  });
};


/**
 * @depracated 使用getActions代替
 * 获取最新的action条目，但是跳过skip条
 * @method getBySkip
 * @optional @param {number} skip
 *
 * @param {function} cb
 */
exports.getBySkip = function (skip,cb) {
  Action.find().sort({top:1,create_date:-1}).skip(skip).limit(10).exec(function (err,results) {
    if(err){
    	console.err(err.stack);
    	throw err;
    }
    cb(results);
  });
};


/**
 * 获取最新的action条目，但是跳过skip条
 * @method getActions
 * @param @option {number} skip
 * @param {function} cb
 */
exports.getActions = function (skip,cb) {
  if(!cb){
    cb = skip;
    skip = 0;
  }
  Action.find().sort({top:1,create_date:-1}).skip(skip).limit(10).exec(function (err,results) {
    if(err){
    	console.err(err.stack);
    	throw err;
    }
    cb(results);
  });
};


/**
 * 根据name获取一条action
 * @method getActionByName
 * @param {string} name
 * @param {function} cb
 */
exports.getActionByName=function(name,callback){
  Action.findOne({name:name},callback);
};

/**
 * 根据name数组获取一系列action
 * @method getActionByNames
 * @param {array} names
 * @param {function} cb
 */
exports.getActionByNames=function(names,callback){
  if(names.length===0){
    return callback(null,[]);
  }
  Action.find({name:{$in:names}},callback);
};

/**
 * 根据id获取一条action
 * @method getActionById
 * @param {objectid} id
 * @param {function} cb
 */
exports.getActionById=function(id,callback){
  Action.findOne({_id:id},callback);
};

/**
 * 根据id数组获取一系列action
 * @method getActionByIds
 * @param {array} ids
 * @param {function} cb
 */
exports.getActionByIds=function(ids,callback){
  if(ids.length===0){
    return callback(null,[]);
  }
  Action.find({_id:{$in:ids}}).sort({create_date:-1}).exec(callback);
};
/**
 * @depracated
 * 根据id数组获取一系列action
 * @method getActionByCreateDate
 */
exports.getActionByCreateDate=function(create_date,callback){
  Action.findOne({create_date:create_date},callback);
};
/**
 * @depracated
 * 根据id数组获取一系列action
 * @method getActionByEndDate
 */
exports.getActionByEndDate=function(end_date,callback){
  Action.findOne({end_date:end_date},callback);
};

/**
 * 根据uid获取所有的action条目，通常用于获取某个user的所有action条目,默认十条
 * @method getActionBycreator
 * @param {objectid} uid
 * @param @optional {number} skip
 * @param @optional {number} limit
 * @param @optional {function} callback
 */
exports.getActionBycreator = function (uid,skip,limit,callback) {
  if(typeof uid == 'function'){
    throw new Error('must have uid!');
  }else if(typeof skip == 'function'){
    callback = skip;
    skip = 0;
    limit = 10;
  }else if(typeof limit == 'function'){
    callback = limit;
    limit = 10;
  }
  Action.find({creator:uid}).sort({create_date:-1}).skip(skip).limit(limit).exec(callback);
};


/**
 * 新建并存入action到数据库
 * @method newAndSave
 * @param {json} mb十几个参数，懒得写了，自己看代码
 */
exports.newAndSave=function(pjson,callback){
  var action=new Action(pjson);
  console.log(pjson);
  action.save(callback);
};

/**
 * 更新action信息
 * @method updateAction
 * @param {json} query
 * @param {json} pjson
 * @param {function} callback
 */
exports.updateAction=function(query,pjson,callback){
  // action.upadte(query,njson,options,callback);
  Action.update(query,pjson,callback);
};

/**
 * 根据ID删除一个action，不会删除多个
 * @method deleteById
 * @param {objectid} aid
 * @param {function} callback
 */
exports.deleteById = function (aid,callback) {
  console.log(aid);
  Action.remove({_id:aid},callback);
};

/**
 * 增加一个fork，这个方法不会验证是否已经有重复的fork
 * @method addFork
 * @param {json} query
 * @param {function} callback
 */
exports.addFork=function(query,callback){
  var fork=new Fork(query);
  fork.save(callback);
};

exports.updateForkByAidAndUid = function (aid,uid,fork,callback) {
  Fork.update({action_id:aid,user_id:uid},fork,callback);
};

exports.getForkByUid = function (uid,skip,limit,callback) {
  if(typeof uid == 'function'){
    throw new Error('must have uid!');
  }else if(typeof skip == 'function'){
    callback = skip;
    skip = 0;
    limit = 10;
  }else if(typeof limit == 'function'){
    callback = limit;
    limit = 10;
  }
  Fork.find({user_id:uid}).select('action_id').sort({create_date:-1}).skip(skip).limit(limit).exec(callback);
};

exports.getForkByUidAndAid =function (uid,aid,callback) {
  Fork.find({user_id:uid,action_id:aid},callback);
};

exports.getForkByAid = function (aid,callback) {
  Fork.find({action_id:aid}).lean().exec(callback);
};

/**
 * 根据删除一个fork，注意此方法会删除所有的匹配，不会只删除一个
 * @method removeFork
 * @param {objectid} aid action id
 * @param {objectid} uid user id
 * @param {function} callback
 */
exports.removeFork=function(aid,uid,callback){
  // console.log('point');
  Fork.remove({action_id:aid,user_id:uid},callback);
};

/**
 * 搜索action的标题
 * @method searchActionByName
 */
exports.searchActionByName = function (key,cb) {
  // Action.find({$text:{$search:key,$language:'none'}},cb);
    // key = '['+key+']';
    console.log(key);
  Action.find({name:{$regex:key}}).lean().exec(cb);
};

/**
 * 搜索action的描述
 * @method searchActionByName
 */
exports.searchActionByDesc = function (key,cb) {
  // Action.find({$text:{$search:key,$language:'none'}},cb);
    // key = '['+key+']';
    // console.log(key);
  Action.find({desc:{$regex:key}},cb);
};

/**
 * 统计用户action的个数
 */
exports.countActionsById = function (uid,callback) {
  Action.count({creator:uid},callback);
};

/**
 * 获取用户的fork数目
 * @method countForkById
 * @param  {objectid}      uid      user ids
 * @param  {Function}    callback callback
 */
exports.countForkById = function (uid,callback) {
  Fork.count({user_id:uid},callback);
};

/**
 * 改变赞数
 * @method updateStar
 * @param  {Number}   opt      加减数目
 * @param  {objectid}   aid      action id
 * @param  {Function} callback
 */
exports.updateStar = function (opt,aid,callback) {
  if(opt === 1){
    Action.update({_id:aid},{$inc:{like_count:+1}},callback);
  }else if(opt === -1){
    Action.update({_id:aid},{$inc:{unlike_count:+1}},callback);
  }else{
    callback(new Error('invalid opt'));
  }
};

/**
 * 获取地理位置靠近的活动
 * @getActionByPos
 * @param {number} x
 * @param {number} x
 * @param {number} limit 寻找的范围，单位度，寻找的范围是一个类似矩形
 * @param {function} callback
 */
exports.getActionByPos = function (x,y,limit,callback) {
  // console.log('point');
  Action.find().where('addr_position_x').gt(x-limit).lt(x+limit).where('addr_position_y').gt(y-limit).lt(y+limit).lean().lean().exec(callback);
};
