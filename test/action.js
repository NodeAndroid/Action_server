var app = require('../app');
var request = require('supertest')(app);
var should = require('should');

describe('actions ', function() {
  it('/action/new',function (done) {
    request.post('/action/new')
            .send({name:'test',desc:'desc',type_id:1})
            .expect(200)
            .end(function (err,res) {
              res.body.should.have.property('status',0);
              done();
            });
  });
});
