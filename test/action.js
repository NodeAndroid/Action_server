var app = require('../app');
var request = require('supertest').agent(app);
var should = require('should');

describe('actions ', function() {
  before(function (done) {
    request.post('/users/login')
            .send({loginname:'huangyao',passwd:'123'})
            .expect(200)
            .end(function (err,res) {
              res.body.should.have.property('status',0);
              done();
            });
  });

  it('/action/new',function (done) {
    request.post('/action/new')
            .send({name:'test',desc:'desc',addr_name:'hnust',addr_position_x:1,addr_position_y:2,type_id:1})
            .expect(200)
            .end(function (err,res) {
              res.body.should.have.property('status',0);
              done();
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
                res.body.should.have.property('status',0);
                done(err);
              });
    });
  });

  describe('actions--active', function() {
    it('delete a illegal id(length !== 24',function (done) {
      request.get('/action/active/fsafdsafdsa')
              .expect(200)
              .end(function (err,res) {
                if(err) throw err;
                res.body.should.have.property('status',-1);
                done(err);
              });
    });
    it('delete a blank',function (done) {
      request.get('/action/active/')
              .expect(404)
              .end(function (err,res) {
                if(err) throw err;
                // res.body.should.have.property('status',-1);
                done(err);
              });
    });
  });
  describe('actions--fork', function() {
    it('fork a illegal idlength !== 24',function (done) {
      request.get('/action/fork/fsafdsafdsa')
              .expect(200)
              .end(function (err,res) {
                if(err) throw err;
                res.body.should.have.property('status',-1);
                done(err);
              });
    });
    it('fork a blank',function (done) {
      request.get('/action/fork/')
              .expect(404)
              .end(function (err,res) {
                if(err) throw err;
                // res.body.should.have.property('status',-1);
                done(err);
              });
    });

    it('fork with obid',function (done) {
      request.get('/action/fork/5545900deafe22a023c199ef')
              .expect(200)
              .end(function (err,res) {
                if(err) throw err;
                res.body.should.have.property('status');
                done(err);
              });
    });
  });

  describe('action-exit', function(done) {
    it('exit a illegal idlength !== 24',function (done) {
      request.get('/action/exit/fsafdsafdsa')
              .expect(200)
              .end(function (err,res) {
                if(err) throw err;
                res.body.should.have.property('status',-1);
                done(err);
              });
    });
    it('exit a blank',function (done) {
      request.get('/action/exit/')
              .expect(404)
              .end(function (err,res) {
                if(err) throw err;
                // res.body.should.have.property('status',-1);
                done(err);
              });
    });

    it('exit with obid',function (done) {
      request.get('/action/exit/5545900deafe22a023c199ef')
              .expect(200)
              .end(function (err,res) {
                if(err) throw err;
                res.body.should.have.property('status');
                done(err);
              });
    });
  });
});
