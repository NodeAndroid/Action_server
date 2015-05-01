

module.exports = {
  loginRequire:  function (req,res,next) {
    if(req.session.user){
      next();
    }else{
      return res.json({status:-1,message:'please login first'});
    }
  }
};
