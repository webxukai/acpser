var express = require('express');

var router = express.Router();

// var redis = require('redis')

var formidable = require('formidable');

var loginDao = require('../dao/loginDao')
var blogDao = require('../dao/blogDao')

// var client = redis.createClient(6379, '127.0.0.1')
// client.on('error', function (err) {
//   console.log('Error ' + err);
// });
// var client = redis.createClient(6379, '129.211.47.103')
// client.on('error', function (err) {
//   console.log('Error ' + err);
// });

// // 1 键值对
// client.set('color', 'red', redis.print);
// client.get('color', function (err, value) {
//   if (err) throw err;
//   console.log('Got: ' + value)
//   client.quit();
// })

// client.hmset('kitty', {
//   'age': '2-year-old',
//   'sex': 'male'
// }, redis.print);
// client.hget('kitty', 'age', function (err, value) {
//   if (err) throw err;
//   console.log('kitty is ' + value);
// });

// //哈希表
// client.hkeys('kitty', function (err, keys) {
//   if (err) throw err;
//   keys.forEach(function (key, i) {
//     console.log(key, i);
//   });
//   client.quit();
// });

// //链表
// client.lpush('tasks', 'Paint the house red.', redis.print);
// client.lpush('tasks', 'Paint the house green.', redis.print);
// client.lrange('tasks', 0, -1, function (err, items) {
//   if (err) throw err;
//   items.forEach(function (item, i) {
//     console.log(' ' + item);
//   });
//   client.quit();
// });

// // 集合
// client.sadd('ip', '192.168.3.7', redis.print);
// client.sadd('ip', '192.168.3.7', redis.print);
// client.sadd('ip', '192.168.3.9', redis.print);
// client.smembers('ip', function (err, members) {
//   if (err) throw err;
//   console.log(members);
//   client.quit();
// });

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


//设置允许跨域访问该服务.
router.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});


// 登录接口
router.post('/login', function (req, res) {
  let account = req.body.account
  let agentPwd = req.body.agentPwd
  loginDao.userLogin(account, agentPwd, function (results) {
    console.log(results)
    if (results.length) {
      res.json({
        code: 200,
        message: {
          userId: results[0].userId,
          userName: results[0].userName,
          res: true
        }
      })
    } else {
      res.json({
        code: 200,
        message: {
          res: false
        }
      })
    }
  })
})

// 注册接口
router.post('/register', function (req, res) {
  let account = req.body.account
  let agentPwd = req.body.agentPwd
  console.log(account)
  console.log(agentPwd)
  loginDao.userRegister(account,agentPwd,function ( results) {
    console.log(results)

    res.json({
      code: 200,
      message: {
        userId: results.insertId,
        userName: account,
        res: true
      }
    })
  })
})

// 写博客接口
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

// 获取博客列表
router.post('/getBlogList', function (req, res) {

  blogDao.getBlogList(function ( results) {
    console.log(results)
    res.json({
      code: 200,
      message: {
        res: true,
        results
      }
    })
  })
})

// 变更图片
router.post('/img', function (req, res) {
  // console.log(req)
  // let img = req.body
  // console.log(img)

  var form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  console.log(form)
  console.log(__dirname)
  form.uploadDir = path.join(__dirname);
  form.keepExtensions = true;//保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024;
  //处理图片
  form.parse(req, function (err, fields, files){
    console.log('+++++++++++++++++')
    console.log(files)
      console.log(files.the_file);
      var filename = files.the_file.name
      var nameArray = filename.split('.');
      var type = nameArray[nameArray.length - 1];
      var name = '';
      for (var i = 0; i < nameArray.length - 1; i++) {
          name = name + nameArray[i];
      }
      var date = new Date();
      var time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
      var avatarName = name + time + '.' + type;
      var newPath = form.uploadDir + "/" + avatarName;
      fs.renameSync(files.the_file.path, newPath);  //重命名
      res.send({data:"/upload/"+avatarName})
  })
})


module.exports = router;