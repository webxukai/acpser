const dbutil = require("./DBUtil");

// 登录接口
function userLogin(account, agentPwd, success) {
    const sql_select = `SELECT *  FROM userInfo WHERE userName = ? AND userPassword = ?;` //user_info 为表名
    const params = [account, agentPwd]
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql_select, params, (err, results) => {
        console.log('err', err)
        console.log('res', results)
        if (err) {
            return res.json({
                code: 1,
                message: '用户不存在',
            })
        }
        console.log(results)
        success(results)
    })
    connection.end();
}

// 注册接口
function userRegister(account, agentPwd, success) {
    const sql_insert = `INSERT INTO userinfo (userName,userPassword) VALUES ( ? , ? );` //user_info 为表名
    const params = [account, agentPwd]
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql_insert,params, (err, results) => {
        console.log('err', err)
        console.log('res', results)
        if (err) {
            return res.json({
                code: 1,
                message: '注册失败',
            })
        }
        console.log(results)
        success(results)
    })
    connection.end();
}






module.exports = {
    userLogin,
    userRegister
}