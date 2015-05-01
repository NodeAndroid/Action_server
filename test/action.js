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
describe('actions--delete by action _id', function() {
  it('delete a illegal id(length !== 24)',function (done) {
    request.get('/action/delete/fsafdsafdsa')
            .expect(200)
            .end(function (err,res) {
              if(err) throw err;
              res.body.should.have.property('status',-1);
              done(err);
            });
  });
  it('delete a unexist id(length === 24)',function (done) {
    request.get('/action/delete/54c84a33b8b9d5b40a26da7b')
            .expect(200)
            .end(function (err,res) {
              if(err) throw err;
              res.body.should.have.property('status',-1);
              done(err);
            });
  });
});
