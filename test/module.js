var assert = require('assert');
var modules = require('../module');

describe('module', function() {
  describe('#index.init', function() {
    it('should return .js file array',function (done) {
          modules.init(function (array) {
          console.log(array);
          assert(array.length !== 0 );
          done();
        });
    });

    it('should has Action,User,etc module',function (done) {
        assert(modules.Action!=null);
        assert(modules.User!=null);
        // console.log(modules.Action);
        done();

    });
  });

  describe('module save and get', function() {
    it('save Action entety',function (done) {
       var item = new (modules.Action) ();
       item.save(done);
    });

    it('get Action enterty',function (done) {
      var action = modules.Action;
      action.findOne({name:'Action'},function (err,items) {
        if(items == null || items.length === 0){
          throw new Error('get a item == null');
        }
        else{
          done();
        }
      });
    });
  });

});
