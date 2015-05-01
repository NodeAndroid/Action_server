/**
 * Created by huangyao on 14-10-1.
 */
var _ = require('lodash');
var color =require('colors');
var fs =require('fs');
var config = require('../config.js');
var path = config.path;
var mongoose = require("mongoose");
var lcommon = require('lush').common;
console.log(config.db);
mongoose.connect(config.db,function (err) {
  if(err){
      throw new Error('db connect error!\n'+err);
  }
  console.log('db connect success!'.yellow);
});
// console.log('point');

var models = {

  init : function (callback) {
    fs.readdir(path+'/module',function (err,files) {
      if(err){
        throw err;
      }
      //  console.log(files);
      return callback(files.filter(function (item) {
        return !(item === "index.js" || item === "." || item === "..");
      }));
    });
  },
};


models.init(function (files) {
  for (var item in files) {
    //reuire all modules
    // console.log(lcommon.literat(files[item]).slice(0,-3));
    console.log(files[item]);
    item = item.split('.')[0];
    require('./'+ item);
    var m = common.literat(item);
    console.log('loading and use ',m,' model');
    exports[m] = mongoose.model(m);

    // _.extend(models,file.exports);
    // console.log(file);
  }
});


module.exports = models;
