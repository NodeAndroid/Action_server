/**
 *
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Attend=new Schema({
    action_id:{type:ObjectId},
    user_id:{type:ObjectId},
    type_id:ObjectId
});

module.exports = mongoose.model('Attend',Attend);
