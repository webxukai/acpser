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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/login', function (req, res) {
  console.log(req.body)
  console.log(typeof req.body)
  let account = req.body.account
  let agentPwd = req.body.agentPwd
  console.log(account)
  console.log(agentPwd)
  if (account == '' && agentPwd == 'b33aed8f3134996703dc39f9a7c95783') {
    res.send('良民')
  } else {
    res.send('傻逼')
  }
})


module.exports = router;
