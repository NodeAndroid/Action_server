var Notification =require('../module').Notification;

/**
 * 推送API
 * @class Notification
 */


/**
 * 增加一条推送
 * @method addOne
 * @param {String} content 推送的内容
 * @param {objectid} from 推送的创建者
 * @param {array} to 通送给的人，数组内容是ObjectId
 * @param {number} prority 优先级
 * @param {function} callback 回调函数
 */
exports.addOne = function (content,from,to,creator,prority,callback) {
  if(typeof to !== Array){
    to = [to,];
  }
  var notification = new Notification({content:content,send_from:from,send_to:to,prority:prority,});
  notification.save(callback);
};


/**
 * 将某条推送标记为已读
 * @method hasRead
 * @param {objectid} nid 该推送的_id
 * @param {function} callback
 */
exports.hasRead = function (nid,callback) {
  Notification.update({_id:nid},{hasRead:true},callback);
};

/**
 * 根据to字段中的用户id获取推送信息
 * @method getByToUid
 * @param {objecid} uid 用户uid
 * @param {fucntion} callback
 */
exports.getByToUid = function (uid,callback) {
  Notification.find({send_to:{$in:[uid]}}).sort({create_at:-1}).exec(callback);
};
