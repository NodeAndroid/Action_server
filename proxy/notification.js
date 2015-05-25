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
  console.log(to);
  if(!(to instanceof Array)){
    console.log('point');
    to = [to,];
  }
  var notification = new Notification({content:content,send_from:from,send_to:to,prority:prority,});
  console.log('save one notification ',content,to);
  notification.save(callback);
};


/**
 * 将某条推送标记为已读
 * @method hasRead
 * @param {objectid} nid 该推送的_id
 * @param {function} callback
 */
exports.hasRead = function (nids,callback) {
  Notification.update({_id:{$in:nids}},{hasRead:true},{multi:true},callback);
};

/**
 * 根据to字段中的用户id获取推送信息
 * @method getByToUid
 * @param {objecid} uid 用户uid
 * @param {number} size 获取多少条目
 * @param {fucntion} callback
 */
exports.getByToUid = function (uid,size,callback) {
  // console.log('point');
  console.log(uid);
  Notification.find({send_to:{$in:[uid]},hasRead:false}).sort({create_at:-1}).limit(size).exec(callback);
};

/**
 * 根据to字段中的用户id获取所有信息
 * @method getAllByToUid
 * @param {objecid} uid 用户uid
 * @param {number} size 获取多少条目
 * @param {fucntion} callback
 */
exports.getAllByToUid = function (uid,skip,limit,callback) {
  // console.log('point');
  console.log(uid);
  Notification.find({send_to:{$in:[uid]}}).sort({create_at:-1}).skip(skip).limit(limit).exec(callback);
};
