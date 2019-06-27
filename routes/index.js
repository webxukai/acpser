var express = require('express');
var router = express.Router();

//使用mysql中间件连接MySQL数据库
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost', //数据库地址
  user: 'root', //用户名
  password: 'newpassword', //密码
  port: '3306', //端口
  database: 'acpser', //库名
  multipleStatements: true //允许执行多条语句
})

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
router.post('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

// 登录接口
router.post('/login', function (req, res) {
  let account = req.body.account
  let agentPwd = req.body.agentPwd
  console.log(account)
  console.log(agentPwd)

  // const sql = 'SELECT * FROM user_info' //user_info 为表名
  const sql_select = `SELECT *  FROM user_info WHERE user_name = '${account}' AND user_password = '${agentPwd}'` //user_info 为表名

  connection.query(sql_select, (err, results) => {
    console.log(111)
    console.log('err', err)
    console.log('res', results)
    if (err) {
      return res.json({
        code: 1,
        message: '用户不存在',
        affextedRows: 0
      })
    }
    console.log(results)
    res.json({
      code: 200,
      message: results,
      affextedRows: results.affextedRows
    })
  })

})


module.exports = router;