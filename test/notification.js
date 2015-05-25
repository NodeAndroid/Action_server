var app = require('../app');
var request = require('supertest').agent(app);
var should = require('should');
var Notification = require('../proxy').Notification;

describe('actions ', function() {
  it('/action/new',function (done) {
    request.get('/notification')
            // .send({name:'test',desc:'desc',addr_name:'hnust',addr_position_x:1,addr_position_y:2,type_id:1})
            .expect(200)
            .end(function (err,res) {
              // res.body.should.have.property('status',0);
              console.log(res.body);
              done();
            });
    // Notification.add('有一个新用户参加了您的活动','5558445b9ceaae901450232b','5558445b9ceaae901450232b',0);
  });

});
