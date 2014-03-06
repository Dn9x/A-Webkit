var db = require('./db');

var Class = {};

module.exports = Class;


/**
 * 查询所有学生列表
 * Callback:
 * - err, 数据库错误
 * @param {Function} callback 回调函数
 */
Class.getClass = function(callback){

	//从连接池中获取一个连接
	db.getConnection(function(err, connection) {

	  //查询
	  connection.query("select id, name from class", function(err, classes) {
		if (err){
		  callback(err, null);
		}

		callback(null, classes);

		connection.release();		//使用完之后断开连接，放回连接池
	  });
	});
};


