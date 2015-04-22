/**
 *
 */
var Action=require('../module').Action;
var Type=require('../module').Type;
var Attend=require('../module').Attend;

exports.getActionByName=function(name,callback){
  Action.findOne({name:name},callback);
};

exports.getActionByNames=function(names,callback){
  if(names.length===0){
    return callback(null,[]);
  }
  Action.find({name:{$in:names}},callback);
};

exports.getActionById=function(id,callback){
  Action.findOne({_id:id},callback);
};

exports.getActionByIds=function(ids,callback){
  if(ids.length===0){
    return callback(null,[]);
  }
  Action.find({_id:{$in:ids}},callback);
};

exports.getActionByCreateDate=function(create_date,callback){
  Action.findOne({create_date:create_date},callback);
};

exports.getActionByEndDate=function(end_date,callback){
  Action.findOne({end_date:end_date},callback);
};

exports.newAndSave=function(name,create_date,end_date,edit_date,desc,creator,article_id,reply_count,visit_count,like_count,unlike_count,forkable,type_id,callback){
  var action=new Action();
  action.name=name;
  action.create_date=create_date;
  action.end_date=end_date;
  action.edit_date=edit_date;
  action.desc=desc;
  action.creator=creator;
  action.article_id=article_id;
  action.reply_count=reply_count;
  action.visit_count=visit_count;
  action.like_count=like_count;
  action.unlike_count=unlike_count;
  action.forkable=forkable;
  action.type_id=type_id;
  action.save(callback);
};
