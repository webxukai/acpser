const dbutil = require("./DBUtil");

// 发布blog接口
function blogWrite(blogName, blogDescription, userId ,blogLove,blogTranspond,blogVisit,blogComment , blogTime , success) {
    const sql_insert = `INSERT INTO blog (blogName, blogDescription, userId ,blogLove,blogTranspond,blogVisit,blogComment ,blogTime) VALUES ( ? , ? , ? , ? , ? , ? , ?, ?);` //user_info 为表名
    const params = [blogName, blogDescription, userId ,blogLove,blogTranspond,blogVisit,blogComment, blogTime]
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql_insert,params, (err, results) => {
        console.log('err', err)
        console.log('res', results)
        if (err) {
            return res.json({
                code: 1,
                message: '发布失败',
            })
        }
        console.log(results)
        success(results)
    })
    connection.end();
}

//获取blog列表接口
function getBlogList( success) {
    const slq_query = `SELECT blogName, blogDescription, userId ,blogLove,blogTranspond,blogVisit,blogComment , blogTime FROM blog;`
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(slq_query, (err, results) => {
        console.log('err', err)
        console.log('res', results)
        if (err) {
            return res.json({
                code: 1,
                message: '发布失败',
            })
        }
        console.log(results)
        success(results)
    })
    connection.end();
}





module.exports = {
    blogWrite,
    getBlogList
}