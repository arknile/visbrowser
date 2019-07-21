var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');
 
// 连接数据库
var conn = mysql.createConnection(models.mysql);
 
conn.connect();
var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};
 
// 增加用户接口
router.post('/addUser', (req, res) => {
    var sql = $sql.user.add;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.username, params.age], function(err, result) {
        if (err) {
            console.log(err);
            jsonWrite(res,result)
        }
        if (result) {
            result = {
                code: 200,
                msg:'增加成功'
            };    
            jsonWrite(res, result);
        }
    })
});

router.post('/addimg', (req, res) => {
    var sql = $sql.user.addimg;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.username], function(err, result) {
        if (err) {
            console.log(err);
            jsonWrite(res,result)
        }
        if (result) {
            result = {
                code: 200,
                msg:'增加成功'
            };    
            jsonWrite(res, result);
        }
    })
});

router.post('/getimg', (req, res) => {
    var sql = $sql.user.takimg;
    var params = req.body;
    console.log(params);
    conn.query(sql, function(err, result) {
        res.send(result)
    })
});

router.post('/deleteUser', (req, res) => {
    var sql = $sql.user.deleteS;
    var params = req.body;
    console.log(sql);
    conn.query(sql, [params.username], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.post('/searchUser', (req, res) => {
    var sql = $sql.user.search;
    var params = req.body;
    console.log(sql);
    conn.query(sql, [params.username], function(err, result) {
        res.send(result)
    })
});

module.exports = router;