var assert = require('assert');


describe('module', function() {
  describe('#index.init', function() {
    it('should return .js file array',function (done) {
        require('../module').init(function (array) {
          console.log(array);
          assert(array.length !== 0 );
          done();
        });
    });

    // it('should has Action module',function (done) {
    //   var module = require('../module');
    //
    //     assert(module.Action==null);
    //     done();
    // });
  });


});
