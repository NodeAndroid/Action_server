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

mongoose.model('Attend',Attend);
