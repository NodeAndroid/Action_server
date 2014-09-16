"use strict";
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


router.get('/message',function(req,res){
    res.render('message')
})

router.get('/news', function (req,res) {
    var message = ''
    if(Math.random() < 0.5){
        message = '_end_'
    }
    else{
        message = 'hello'
    }
    return res.json({message:'hello'})
//    return res.send('<div class="item">fdsfdsa</div><a href="/news"></a>')
})
module.exports = router;
