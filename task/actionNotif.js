var Action=require('../module').Action;
var Fork=require('../module').Fork;
var Notification = require('../proxy/notification');
var moment = require('moment');
module.exports = function (tick) {

  var int = setInterval(function () {
    console.log('task actionNotif trun');
    var now = new Date();
    var later = moment(now).add(6,'hours').toDate();
    // console.log(now,later);
    //扫描六小时之内的所有活动
    Action.find().where('start_date').gte(now).lt(later).exec(function (err,actions) {
      // console.log(actions);
      actions.forEach(function (action) {
        Fork.find({action_id:action._id,has_noti:false}).exec(function (err,users) {
          users.forEach(function (user) {
            user.has_noti = true;
            user.save();
            console.log('send notification to ',user.user_id);
            Notification.addOne('您有一个活动即将开始',action.creator,user.user_id,action.creator,action._id,0);
          });
        });
      });
    });
  }, tick);
  return int;
};
