
var express = require('express');
var router = express.Router();

/**
 * action操作的一些API  path-prefix '/action'
 * @class action-router
 */

/**
 * 新建一个action--暂未实现
 * @method /new
 * @return {json} status 0 代表成功 ，否则失败
 * @example
 * 				//完整的action数据结构
 * 			  name:{type:String,default:'Action'},
 *        create_date:{type:Date,default:Date.now},
 *        end_date:{type:Date,default:Date.now},
 *        edit_date:{type:Date,default:Date.now},
 *        desc:{type:String,default:'desciption'},
 *        creator: ObjectId,
 *        article_id:ObjectId,
 *        reply_count:{type:Number,default:0},
 *        visit_count:{type:Number,default:0},
 *        like_count:{type:Number,default:0},
 *        unlike_count:{type:Number,default:0},
 *        forkable:{type:Boolean,default:true},
 *        type_id:{type:ObjectId},
 *        //是否置顶
 *        top:{type:Boolean,default:false},
 *
 */
router.post('/new');

/**
 * 删除一个action
 * @method /delete/:aid
 * @param {string} aid action的ObjectId
 * @return {json} status 0 代表成功，否则就是失败
 * @example
 * 		var ServerUrl = 'xxxxxx/action/delete';
 * 		http.get(ServerUrl+'/'+ObjectId+'/');
 */
router.get('/delete/:aid');


/**
 * 激活一个action，默认新建之后是激活状态
 * @method /active/:aid
 * @param {string} aid action的ObjectId
 * @return {json} status 0 代表成功，否则失败
 */
router.get('/active/:aid');

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
router.get('/exit/:aid');


/**
 * 获取一个action的资料
 * @method /pull/:aid
 * @param {string} aid action的ObjectId
 * @return {json} status 0 成功，否则失败, action\{status,action\}
 */
router.get('/pull/:aid');

/**
 * 修改一个action的资料，类似于/new
 * @param {string} aid action的ObjectId
 * @return {json} status 0 成功，否则失败
 */
router.post('/push/:aid');


module.exports = router;
