
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
  Action.find({_id:{$in:ids}},callback);
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
 * 新建并存入action到数据库
 * @method newAndSave
 * @param {json} mb十几个参数，懒得写了，自己看代码
 */
exports.newAndSave=function(pjson,callback){
  var action=new Action(pjson);
  action.save(callback);
};

exports.updateAction=function(query,pjson,callback){
  // action.upadte(query,njson,options,callback);
  Action.update(query,pjson,callback);
};

exports.deleteById = function (aid,callback) {
  action.delete({_id:aid},callback);
};

exports.addFork=function(query,callback){
  var fork=new fork(query);
  fork.save(callback);
};
exports.removeFork=function(aid,callback){
  fork.delete({_id:aid},callback);
};
