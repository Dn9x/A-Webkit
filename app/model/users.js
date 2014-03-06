var db = require('./db');

function Users(user){
	this.id = user.id;
	this.login = user.login;
	this.pswd = user.pswd;
	this.name = user.name;
	this.type = user.type;
};

module.exports = Users;

/**
 * 根据用户名查询用户信息
 * Callback:
 * - err, 数据库错误
 * @param {string} login 查询的登录名
 * @param {Function} callback 回调函数
 */
Users.getUser = function(login, callback){

	//从连接池中获取一个连接
	db.getConnection(function(err, connection) {

	  //查询
	  connection.query('select u.id, u.login, u.pswd, u.name, u.type from users u where u.type="T" and u.login='+connection.escape(login), function(err, user) {
		if (err){
		  callback(err, null);
		}

		callback(null, user);

		connection.release();		//使用完之后断开连接，放回连接池
	  });
	});
};

/**
 * 添加学生信息
 * Callback:
 * - err, 数据库错误
 * @param {string} name 学生信息
 * @param {Function} callback 回调函数
 */
Users.addStu = function(name, callback){

	//从连接池中获取一个连接
	db.getConnection(function(err, connection) {

	  //拼接sql,数据库里面的login和pswd可以为空，学生不能登录
	  var sql = "insert into users(name, type) values(?, 'S')";
	  var inserts = [name];
	  sql = connection.format(sql, inserts);

	  //添加
	  connection.query(sql, function(err, info) {
		if (err){
		  callback(err, null);
		}

		callback(null, info);

		connection.release();		//使用完之后断开连接，放回连接池
	  });
	});
};


/**
 * 查询所有学生列表
 * Callback:
 * - err, 数据库错误
 * @param {Function} callback 回调函数
 */
Users.getStuList = function(callback){

	//从连接池中获取一个连接
	db.getConnection(function(err, connection) {

	  //查询
	  connection.query("select id, name from users where type='S'", function(err, stus) {
		if (err){
		  callback(err, null);
		}

		callback(null, stus);

		connection.release();		//使用完之后断开连接，放回连接池
	  });
	});
};


