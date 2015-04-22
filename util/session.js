module.exports = {
  getSessionUserId : function (req) {
    // debug('get session user ' + req.session.user._id);
    if(!req.session.user)
      return null;
    else
      return req.session.user._id;
  },
  hasUser : function (req) {
    return true;
  },
  getSessionLoginName: function (req) {
    if(!req.session.user){
      return null;
    }else{
      return req.session.user.loginname;
    }
  }
};
