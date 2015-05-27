var Action=require('../module').Action;

module.exports = function (tick) {
  Action.find().where('start_date');
};
