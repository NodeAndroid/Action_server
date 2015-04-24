
var express = require('express');
var router = express.Router();


//新建一个action
router.post('/new');

//删除一个action
router.get('/delete/:aid');

//激活一个action，默认新建之后是激活状态
router.get('/active/:aid');

//fork 参加一个action
router.get('/fork/:aid');

//退出一个action
router.get('/exit/:aid');

//获取一个action的资料
router.get('/pull/:aid');

//修改一个action的资料
router.post('/push/:aid');


module.exports = router;
