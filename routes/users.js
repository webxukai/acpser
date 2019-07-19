var express = require('express');
var router = express.Router();
//设置允许跨域访问该服务.
router.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/blogWrite', function (req, res) {
  let blogName = req.body.blogTitle
  let blogDescription = req.body.blogcontent
  let userId = req.body.userId
  console.log(blogName)
  console.log(blogDescription)
  console.log(userId)
  blogDao.blogWrite(blogName, blogDescription, userId ,function ( results) {
    console.log(results)

    res.json({
      code: 200,
      message: {
        res: true
      }
    })
  })
})

module.exports = router;
