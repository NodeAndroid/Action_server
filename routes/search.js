
var express = require('express');
var router = express.Router();
var validator = require('validator');
var Action = require('../proxy').Action;
var _ = require('lodash');
var xss = require('xss');

/**
 * 搜索相关的API
 * @class Search
 *
 */

/**
 * 搜索action名称
 * @method /name
 * @param {string} key
 */
router.get('/name',function (req,res,next) {
  var title = xss(_.trim(req.query.key));
  // console.log(title);
  Action.searchActionByName(title,function (err,results) {
    if(err){
    	console.log(err.stack);
    	throw err;
    }
    return res.json({message:results,status:0});
  });
});

/**
 * 搜索action描述
 * @method /desc
 * @param {string} key
 */
router.get('/desc',function (req,res,next) {
  var title = xss(_.trim(req.query.key));
  // console.log(title);
  Action.searchActionByDesc(title,function (err,results) {
    if(err){
    	console.log(err.stack);
    	throw err;
    }
    return res.json({message:results,status:0});
  });
});







module.exports = router;