var User = require('../proxy').User;
var jwt = require('jwt-simple');
var secret = require('../config').secret;
var exp = require('../config').expire;
var User = require('../proxy/user');
module.exports = {
  loginRequire:  function (req,res,next) {
    // if(req.session.user){
    //   next();
    // }else{
    //   // return res.json({status:-1,message:'please login first'});
    //   User.getUserByLoginName('huangyao',function (err,user) {
    //     req.session.user = user;
    //     next();
    //   });
    // }
    var token = req.query.token;
    if(token){
      var uid = jwt.decode(token,secret).uid;
      // if((new Date()).getTime() - jObject.exp * 1000 > exp){
      //   return res.json({status:102,message:'token expired'});
      // }
        // console.log('point');
      User.getUserById(uid,function (err,user) {
        if(err){
        	console.err(err.stack);
        	throw err;
        }
        if(!user){
          return res.json({status:101,message:'wrong token'});
        }else{
          req.session.user=user;
          next();
        }
      });
    }else if(!req.session.user){
      return res.json({status:100,message:'please login first!'});
    }else{
      next();
    }
  }
};
