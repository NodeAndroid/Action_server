/**
 *
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
/**
 * @module Attend
 */
var Attend=new Schema({
    action_id:{type:ObjectId},
    user_id:{type:ObjectId},
    type_id:ObjectId
});
// Attend.index({action_id:1,user_id:1},{unique:true});
mongoose.model('Attend',Attend);
