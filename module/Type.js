/**
 *
 */
 var mongoose = require('mongoose');
 var Schema = mongoose.Schema,
     ObjectId = Schema.ObjectId;
/**
 * @module Type
 */
 var Type=new Schema({
  //  type名称
   type:{type:String,default:'action type'},
  //  type的数字ID
   type_id:{type:Number},
  //  创建者
   creator: ObjectId,
  //  创建时间
   create_date:{type:Date,default:Date.now}
 });

Type.index({type:1},{unique:true});
// Type.index({type_id:1},{unique:true});

mongoose.model('Type',Type);
