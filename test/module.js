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
        assert(modules.Action!==null);
        assert(modules.User!==null);
        done();
    });
  });


});
