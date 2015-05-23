var Type =require('../module').Type;

/**
 * proxy - type.js
 * @class type-proxy
 * @exmaple
 * 		//这里传入的回调函数的参数一律是
 * 		callback(err,results)
 * 		//results是从mongodb中取得的结果集
 */

/**
 * 获取所有type类型
 * @method getAll
 * @param {function} cb
 */
exports.getAll = function (cb) {
  Type.find().sort({create_date:1}).exec(cb);
};

/**
 * 增加一个type类型
 * @method AddOne
 * @param {object} type
 * @param {function} cb
 */
exports.AddOne = function (type,cb) {
  (new Type(type)).save(cb);
};
