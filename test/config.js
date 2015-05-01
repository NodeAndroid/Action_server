var assert = require('assert');


describe('config.js test', function() {
  describe('config path', function() {
    it('should return config path',function (done) {
      var config = require('../config');
      assert(config.path == process.cwd());
      done();
    });
  });
});
