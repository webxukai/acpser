const mysql = require("mysql");

function createConnection() {
    const connection = mysql.createConnection({
        host: '129.211.47.103', //数据库地址
        user: 'root', //用户名
        password: '123456', //密码
        port: '3306', //端口
        database: 'acpser', //库名
        multipleStatements: true //允许执行多条语句
    })
    return connection;
}

module.exports.createConnection = createConnection;