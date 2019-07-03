var express = require('express');

var router = express.Router();

var redis = require('redis')

// var client = redis.createClient(6379, '127.0.0.1')
// client.on('error', function (err) {
//   console.log('Error ' + err);
// });
var client = redis.createClient(6379, '129.211.47.103')
client.on('error', function (err) {
  console.log('Error ' + err);
});

// 1 键值对
client.set('color', 'red', redis.print);
client.get('color', function (err, value) {
  if (err) throw err;
  console.log('Got: ' + value)
  client.quit();
})

client.hmset('kitty', {
  'age': '2-year-old',
  'sex': 'male'
}, redis.print);
client.hget('kitty', 'age', function (err, value) {
  if (err) throw err;
  console.log('kitty is ' + value);
});

//哈希表
client.hkeys('kitty', function (err, keys) {
  if (err) throw err;
  keys.forEach(function (key, i) {
    console.log(key, i);
  });
  client.quit();
});

//链表
client.lpush('tasks', 'Paint the house red.', redis.print);
client.lpush('tasks', 'Paint the house green.', redis.print);
client.lrange('tasks', 0, -1, function (err, items) {
  if (err) throw err;
  items.forEach(function (item, i) {
    console.log(' ' + item);
  });
  client.quit();
});

// 集合
client.sadd('ip', '192.168.3.7', redis.print);
client.sadd('ip', '192.168.3.7', redis.print);
client.sadd('ip', '192.168.3.9', redis.print);
client.smembers('ip', function (err, members) {
  if (err) throw err;
  console.log(members);
  client.quit();
});

// // 信道
// var redis = require('redis')
// var clientA = redis.createClient(6379, '127.0.0.1')
// var clientB = redis.createClient(6379, '127.0.0.1')

// clientA.on('message', function (channel, message) {
//   console.log('Client A got message from channel %s: %s', channel, message);
// });
// clientA.on('subscribe', function (channel, count) {
//   clientB.publish('main_chat_room', 'Hello world!');
// });
// clientA.subscribe('main_chat_room');

//使用mysql中间件连接MySQL数据库
const mysql = require('mysql')
// const connection = mysql.createConnection({
//   host: 'localhost', //数据库地址
//   user: 'root', //用户名
//   password: 'newpassword', //密码
//   port: '3306', //端口
//   database: 'acpser', //库名
//   multipleStatements: true //允许执行多条语句
// })
const connection = mysql.createConnection({
  host: '129.211.47.103', //数据库地址
  user: 'root', //用户名
  password: '123456', //密码
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
  res.cookie("name",'zhangsan',{maxAge: 900000, httpOnly: true});  
  // res.cookie('user', 'lililiwen');
  console.log(req.cookies);

  const sql = 'SELECT * FROM userInfo' //userInfo 为表名
  const sql_select = `SELECT *  FROM userInfo WHERE userName = '${account}' AND userPassword = '${agentPwd}'` //user_info 为表名

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